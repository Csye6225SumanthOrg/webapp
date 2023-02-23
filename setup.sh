#!/bin/bash

# cd ../ && zip -r webapp.zip webapp && cd - && cp ../webapp.zip .

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    INSTALL SCRIPT                           |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Upgrade OS Packages                      |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo yum update
sudo yum upgrade -y


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install NodeJS                           |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo yum install -y gcc-c++ make
curl -sL https://rpm.nodesource.com/setup_16.x | sudo -E bash -
sudo yum install -y nodejs
node -v

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Install POSTGRESQL                       |"   
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo amazon-linux-extras enable postgresql14
sudo yum install postgresql-server -y
sudo PGSETUP_INITDB_OPTIONS=" --auth=trust" postgresql-setup --initdb --unit postgresql --debug


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    Start POSTGRESQL                         |"   
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo systemctl start postgresql
sudo systemctl enable postgresql
sudo systemctl status postgresql
sudo -u postgres psql
sudo -u postgres psql -c "ALTER USER postgres WITH PASSWORD 'myPassword';"

sudo cat /var/lib/pgsql/data/pg_hba.conf



echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    UNZIP WEBAPP                             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"


echo "check webapp.zip"
SOURCE_ZIP="/tmp/apps/webapp.zip"
APP_FOLDER="/home/ec2-user/"
echo "----Checking if the file exists----"
ls -a SOURCE_ZIP


echo "copying the webapp to -" $APP_FOLDER

# APP_FOLDER="/var/www/html/webapp"
sudo mkdir -p $APP_FOLDER
unzip $SOURCE_ZIP -d $APP_FOLDER
cd $APP_FOLDER/webapp

echo "listing var/www/html"
ls -a $APP_FOLDER/webapp

chmod -R 777 $APP_FOLDER/webapp
echo "pwd" - $(pwd)

echo "Check permissions $APP_FOLDER/webapp"
ls -la $APP_FOLDER/webapp

echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    INSTALL NPM PACKAGES                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"

npm i
sudo npm install pm2 -g


echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|           STARTING THE APPLICATION AS A SERVICE             |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ec2-user --hp /home/ec2-user
pm2 start server.js
pm2 save

pm2 list

# Test Application
echo "+-------------------------------------------------------------+"
echo "|                                                             |"
echo "|                    TEST THE APPLICATION                     |"
echo "|                                                             |"
echo "+-------------------------------------------------------------+"
npm run test

npm run test2
