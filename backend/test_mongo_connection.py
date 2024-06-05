from pymongo import MongoClient

try:
    client = MongoClient('mongodb://localhost:27017')
    db = client['reservenue']
    collection = db['test']
    document = collection.find_one({"name": "test"})
    if document:
        print("Document found:", document)
    else:
        print("No document found with name 'test'")
except Exception as e:
    print(f"Error: {e}")