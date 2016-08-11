# Rx_SMS

[![Build Status](https://travis-ci.org/aliza89p/Rx_SMS.svg?branch=staging)](https://travis-ci.org/aliza89p/Rx_SMS)

## Summary  
Rx SMS is a back-end drug interaction app using text messaging. New users can create an account with their cell phone number and provider (e.g. Sprint, T-Mobile, etc.) along with any medications that they take. Users can then send a text from their cell phone with the name of a new drug to see if it interacts with any of their saved medications. Rx SMS will send a text response with details on any drug interactions found.  

<b>Disclaimer</b>: Rx_SMS is intended for educational purposes only. For advice on medications, please consult with a qualified physician.

## Developers  
- Aliza Pilisuk  
- Tracey Radcliffe  
- Tre Cain  

## Instructions  
### Setup  
NOTE: Replace ``$Content`` with your personalized information  

- Create a new user:  
`http POST rx-sms.herokuapp.com/api/user/newUser phoneNumber=$YourName carrier=$YourPhoneCarrier`

- Create a new drug:  
``http POST rx-sms.herokuapp.com/api/drug/newDrug drug=$Drug``  

- Save a specified user with specified drug:  
``http PUT rx-sms.herokuapp.com/api/user/$UserId/drug/$DrugId``

## Texting  
- Text a drug name to ``rx.sms.app@gmail.com``  

- Receive a response containing any interactions with your saved medications

## Dev work

- `git clone https://github.com/aliza89p/Rx_SMS.git`  

- `cd` into `Rx_SMS` directory  

- `npm install`  

- `mkdir db`  

- `mongod --dbpath db`  

- New tab: `nodemon server`      

- Get a specified drug's data:  
``http GET rx-sms.herokuapp.com/api/drug/$DrugId``  

- Get all drug data:  
``http GET rx-sms.herokuapp.com/api/drug/allDrugs``  

- Get list of all drug names interacting with specified user's saved drugs:  
``http GET rx-sms.herokuapp.com/api/interactions/$UserId``  

- Check for interactions between a specified user's saved drugs and a new drug:  
``http GET rx-sms.herokuapp.com/api/interactions/$UserId/$NewDrug``

- Get a list of all incoming text data:  
``http GET rx-sms.herokuapp.com/inbound``

## Testing  
Run linter:  
``gulp eslint``  
Run test files:  
``gulp mocha``  
Run both:  
``gulp``  
