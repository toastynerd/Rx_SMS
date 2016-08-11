# Rx_SMS

[![Build Status](https://travis-ci.org/aliza89p/Rx_SMS.svg?branch=staging)](https://travis-ci.org/aliza89p/Rx_SMS)

## Summary  
Rx_SMS is a back-end drug interaction app using text messaging. New users can create an account with their cell phone number and provider (e.g. Sprint, T-Mobile, etc.) along with any medications that they take. Users can then send a text from their cell phone with the name of a new drug to see if it interacts with any of their saved medications. Rx SMS will send a text response with details on any drug interactions found.  

<b>Disclaimer</b>: Rx_SMS is intended for educational purposes only. For advice on medications, please consult with a qualified physician.

## Developers  
- Aliza Pilisuk  
- Tracey Radcliffe  
- Tre Cain  

## Instructions  

<b>Note</b>: Replace ``$Content`` with your personalized information  

### Setup  

- Create a new user:  
`http POST rx-sms.herokuapp.com/api/user/newUser phoneNumber=$YourName carrier=$YourPhoneCarrier`

- Create a new drug:  
``http POST rx-sms.herokuapp.com/api/drug/newDrug drug=$Drug``  

- Save a specified user with specified drug:  
``http PUT rx-sms.herokuapp.com/api/user/$UserId/drug/$DrugId``    

## Texting  
- Text a drug name to ``rx.sms.app@gmail.com``  

- Receive a response containing any interactions with your saved medications

## GET Requests  

- Get a specified drug's data:  
``http GET rx-sms.herokuapp.com/api/drug/$DrugId``  

- Get a specified user's data:  
``http GET rx-sms.herokuapp.com/api/user/$UserId``  

## Testing

- `git clone https://github.com/aliza89p/Rx_SMS.git`  

- `cd` into `Rx_SMS` directory  

- `npm install`  

- `mkdir db`  

- `mongod --dbpath db`  

- Run linter: `gulp eslint`  

- Run test files: `gulp mocha`  

- Run both linter and tests: `gulp`  

## Resources  
- SendGrid: https://sendgrid.com/  
- Postmark: https://postmarkapp.com/  
- RxNav Drug Interaction API: https://rxnav.nlm.nih.gov/InteractionAPIs.html
