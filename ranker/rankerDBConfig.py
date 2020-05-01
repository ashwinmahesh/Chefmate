import os

username = 'admin'
password = os.environ.get('MONGODB_PW') or ''

databaseName = 'ChefmateDB'
#databaseName = 'ChefmateDB_Alt'
host = '18.219.145.177' #NEW DB
#host = 'localhost'
#host = '18.222.251.5'
port = 27017

#Do *NOT* hardcode password, ever
databaseAddr = 'mongodb://' + username + ":" + password + "@" + host + ":" + str(port) + "/" + databaseName