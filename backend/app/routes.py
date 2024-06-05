from flask import Blueprint, request, jsonify
from app import mongo
from bson import ObjectId

reservations = Blueprint('reservations', __name__)
venues = Blueprint('venues', __name__)

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