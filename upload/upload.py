import pandas as pd
from pymongo import MongoClient

# MongoDB connection string
mongo_uri = "mongodb+srv://Deeps:4b720aCgigLtxsst@cluster0.xdxmah3.mongodb.net/"

# Name of your MongoDB database and collection
db_name = "Cluster0"
collection_name = "trainevents"

# Path to your CSV file
# csv_file_path = 

# Read the CSV file into a pandas DataFrame
df = pd.read_csv(r"C:\Users\itsme\OneDrive\Desktop\csvdata\trainingevents\trainingevents.csv")

# Connect to MongoDB Atlas
client = MongoClient(mongo_uri)

# Access the database
db = client[db_name]

# Access the collection
collection = db[collection_name]

# Convert DataFrame to dictionary (each row becomes a document)
data = df.to_dict(orient='records')

# Insert the data into the MongoDB collection
collection.insert_many(data)

# Close the MongoDB connection
client.close()

print("CSV data uploaded to MongoDB Atlas successfully.")

