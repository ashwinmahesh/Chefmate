from flask import Flask
from pymongo import MongoClient

app = Flask(__name__)
mongoUri = 'mongodb://localhost/chefmateDB'
mongoServer = MongoClient(mongoUri)
mongo = mongoServer.admin
try:
  mongo.command('isMaster')
  print("Success: Connected successfully to database.")
except ConnectionError:
  print("Error: Database connection failed.")


# connect to MongoDB, change the << MONGODB URL >> to reflect your own connection string
# client = MongoClient(<<MONGODB URL>>)
# db=client.admin

# Issue the serverStatus command and print the results
# serverStatusResult=db.command("serverStatus")
# pprint(serverStatusResult)



@app.route('/')
def index():
  return 'Hello World!'

if __name__ == "__main__":
  app.run(debug=True, host='0.0.0.0', port=8001)