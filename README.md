# Rx_SMS

[![Build Status](https://travis-ci.org/aliza89p/Rx_SMS.svg?branch=staging)](https://travis-ci.org/aliza89p/Rx_SMS)

## Developers  
- Aliza Pilisuk  
- Tracey Radcliffe  
- Tre Cain  

## Instructions  
- To create a new user, run post request with a new phone number: http POST rx-sms.herokuapp.com/api/user/newUser name=$YourName phoneNumber=$YourPhoneNumber
- To get a user, run get request with a user's id: http GET rx-sms.herokuapp.com/api/user/$UserId
- To get all users, run: http GET rx-sms.herokuapp.com/api/user/allUsers
- To create a new drug, run a post request with a new drug: http POST rx-sms.herokuapp.com/api/drug/newDrug drug=$Drug  
- To get a drug, run a get request with a drug's id: http GET rx-sms.herokuapp.com/api/drug/$DrugId
- To get all drugs, run: http GET rx-sms.herokuapp.com/api/drug/allDrugs  
- To save a medication to a user, run: http PUT rx-sms.herokuapp.com/api/user/$UserId/drug/$DrugId  
- To get a list of all drug names that interact with a user's saved drugs, run: http GET rx-sms.herokuapp.com/api/interactions/$UserId  
- To check for specific interactions between a new drug and a users saved drugs, run: http GET rx-sms.herokuapp.com/api/interactions/$UserId/$NewDrug

- Note: Replace $Content with your personalized information
