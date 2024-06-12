from flask import Blueprint, request, jsonify
from app import mongo
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import jwt
from datetime import datetime, timedelta

SECRET_KEY = 'SECRETRESERVATIONAPPKEY000'

reservations = Blueprint('reservations', __name__)
venues = Blueprint('venues', __name__)
authentication = Blueprint('users', __name__)


@reservations.route('/create-reservation', methods=['POST'])
def create_reservation():
    data = request.json
    reservation_id = mongo.db.reservations.insert_one(data).inserted_id
    return jsonify({'_id': str(reservation_id)}), 201


@reservations.route('/update-reservation/<reservation_id>', methods=['PUT'])
def update_reservation(reservation_id):
    data = request.json
    mongo.db.reservations.update_one({'_id': ObjectId(reservation_id)}, {'$set': data})
    return jsonify({'msg': 'Reservation updated'}), 200


@reservations.route('/delete-reservation/<reservation_id>', methods=['DELETE'])
def delete_reservation(reservation_id):
    mongo.db.reservations.delete_one({'_id': ObjectId(reservation_id)})
    return jsonify({'msg': 'Reservation deleted'}), 200


@reservations.route('/view-reservations', methods=['GET'])
def view_reservations():
    reservations = list(mongo.db.reservations.find())
    for reservation in reservations:
        reservation['_id'] = str(reservation['_id'])
    return jsonify(reservations), 200


@venues.route('/create-venue', methods=['POST'])
def create_venue():
    data = request.json
    venue_id = mongo.db.venues.insert_one(data).inserted_id
    return jsonify({'_id': str(venue_id)}), 201


@venues.route('/update-venue/<venue_id>', methods=['PUT'])
def update_venue(venue_id):
    data = request.json
    mongo.db.venues.update_one({'_id': ObjectId(venue_id)}, {'$set': data})
    return jsonify({'msg': 'Venue updated'}), 200


@venues.route('/delete-venue/<venue_id>', methods=['DELETE'])
def delete_venue(venue_id):
    mongo.db.venues.delete_one({'_id': ObjectId(venue_id)})
    return jsonify({'msg': 'Venue deleted'}), 200


@venues.route('/view-venues', methods=['GET'])
def view_venues():
    venues = list(mongo.db.venues.find())
    for venue in venues:
        venue['_id'] = str(venue['_id'])
    return jsonify(venues), 200


@venues.route('/view-venue/<venue_id>', methods=['GET'])
def view_venue(venue_id):
    venue = mongo.db.venues.find_one({'_id': ObjectId(venue_id)})
    if venue:
        venue['_id'] = str(venue['_id'])
        return jsonify(venue), 200
    else:
        return jsonify({'error': 'Venue not found'}), 404


@authentication.route('/register', methods=['POST'])
def register():
    data = request.json
    if mongo.db.users.find_one({'username': data['username']}):
        return jsonify({'message': 'Username already exists'}), 409
    hash_pass = generate_password_hash(data['password'], method='pbkdf2:sha256')
    mongo.db.users.insert_one({'username': data['username'], 'password': hash_pass, 'type': data['accountType']})
    return jsonify({'message': 'User created successfully'}), 201


@authentication.route('/login', methods=['POST'])
def login():
    data = request.json
    user = mongo.db.users.find_one({'username': data['username']})
    if not user or not check_password_hash(user['password'], data['password']):
        return jsonify({'message': 'Invalid credentials'}), 401

    payload = {
        'user_id': str(user['_id']),
        'exp': datetime.utcnow() + timedelta(days=1)
    }

    user_info = {
        'id': str(user['_id']),
        'username': user['username']
    }
    if user.get('name'):
        user_info['name'] = user['name']
    if user.get('email'):
        user_info['email'] = user['email']
    if user.get('phone'):
        user_info['phone'] = user['phone']

    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')

    return jsonify({'message': 'Login successful', 'token': token, 'user': user_info}), 200


@authentication.route('/user-info', methods=['GET'])
def get_user_info():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'message': 'No token provided'}), 401

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        user_id = payload['user_id']
        user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
        user_info = {
            'id': str(user['_id']),
            'type': user['type'],
            'username': user['username'],
            'name': user.get('name', ''),
            'email': user.get('email', ''),
            'phone': user.get('phone', '')
        }
        return jsonify({'user': user_info}), 200
    except jwt.ExpiredSignatureError:
        return jsonify({'message': 'Token expired'}), 401
    except jwt.InvalidTokenError:
        return jsonify({'message': 'Invalid token'}), 401


@authentication.route('/save-user', methods=['POST'])
def save_user():
    data = request.json
    user_id = data['id']
    user = mongo.db.users.find_one({'_id': ObjectId(user_id)})
    if user:
        if 'name' in data:
            user['name'] = data['name']
        if 'email' in data:
            user['email'] = data['email']
        if 'phone' in data:
            user['phone'] = data['phone']
        mongo.db.users.update_one({'_id': ObjectId(user_id)}, {'$set': user})
        return jsonify({'message': 'User info updated'}), 200
    else:
        return jsonify({'message': 'User not found'}), 404
