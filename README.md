# Rx_SMS

[![Build Status](https://travis-ci.org/aliza89p/Rx_SMS.svg?branch=staging)](https://travis-ci.org/aliza89p/Rx_SMS)

## Developers  
- Aliza Pilisuk  
- Tracey Radcliffe  
- Tre Cain  

## Instructions  
### Setup  
1. `git clone https://github.com/aliza89p/Rx_SMS.git`  

2. `cd` into `./Rx_SMS` directory  

3. `npm install`  

4. `mkdir db`  

5. First tab: `mongodb --dbpath db`

6. Second tab: `nodemon server.js`  

7. Third tab: CRUD requests. See below...  

### CRUD Requests  

NOTE: Replace ``$Content`` with your personalized information

Create a new user:  
`http POST rx-sms.herokuapp.com/api/user/newUser name=$YourName phoneNumber=$YourPhoneNumber`

Get specified user's data:  
``http GET rx-sms.herokuapp.com/api/user/$UserId``  

Get all user data:  
``http GET rx-sms.herokuapp.com/api/user/allUsers``  

Create a new drug:  
``http POST rx-sms.herokuapp.com/api/drug/newDrug drug=$Drug``  

Get a specified drug's data:  
``http GET rx-sms.herokuapp.com/api/drug/$DrugId``  

Get all drug data:  
``http GET rx-sms.herokuapp.com/api/drug/allDrugs``  

Save specified user with specified drug:  
``http PUT rx-sms.herokuapp.com/api/user/$UserId/drug/$DrugId``  

Get list of all drug names interacting with specified user's saved drugs:  
``http GET rx-sms.herokuapp.com/api/interactions/$UserId``  

Check for interactions between a specified user's saved drugs and a new drug:  
``http GET rx-sms.herokuapp.com/api/interactions/$UserId/$NewDrug``

## Testing  
Run linter:  
``gulp eslint``  
Run test files:  
``gulp mocha``  
Run both:  
``gulp``  
