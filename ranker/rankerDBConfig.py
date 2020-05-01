import os

username = 'admin'
password = ''

try:
  password = open("../../Chefmate_auth/pw.txt").read()
except:
  print("Error getting Mongo password. Make sure Chefmate_auth/pw.txt exists and is populated.")
# password = os.environ.get('MONGODB_PW') or ''

databaseName = 'ChefmateDB'
#databaseName = 'ChefmateDB_Alt'
host = '18.219.145.177' #NEW DB
#host = 'localhost'
#host = '18.222.251.5'
port = 27017

#Do *NOT* hardcode password, ever
databaseAddr = 'mongodb://' + username + ":" + password.rstrip() + "@" + host + ":" + str(port) + "/" + databaseName