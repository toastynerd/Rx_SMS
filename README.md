# Rx_SMS

[![Build Status](https://travis-ci.org/aliza89p/Rx_SMS.svg?branch=staging)](https://travis-ci.org/aliza89p/Rx_SMS)

## Summary  
Rx_SMS is a back-end drug interaction app using text messaging. New users can create an account with their cell phone number and provider (Sprint, T-Mobile, etc.) along with any medications that they take. Users can then send a text from their cell phone with the name of a new drug to see if it interacts with any of their saved medications. Rx SMS will send a text response with details on any drug interactions found.  

<b>Disclaimer</b>: Rx_SMS is intended for educational purposes only. For advice on medications, please consult with a qualified physician.

Rx_SMS currently works with Sprint and T-Mobile. More provider will be available in the future.

## Developers  
- Aliza Pilisuk  
- Tracey Radcliffe  
- Tre Cain  

## Instructions  

<b>Note</b>: Replace ``#Content`` with your personalized information  

### Setup  

- Create a new user:  
`http POST rx-sms.herokuapp.com/api/user/signup phoneNumber=#YourPhoneNumber carrier=#YourPhoneCarrier username=#username password=#password`  

- Sign in as a user:  
`http -a #username:#password rx-sms.herokuapp.com/api/user/signin`

- After signing in, you will get a token. Copy the token and save as environmental variable.:  
`export TOKEN=#yourToken`  

- Create a new drug and add it to the user:  
`echo '{"drug":"#drugname"}' | http POST rx-sms.herokuapp.com/api/drug/newDrug authorization:"Bearer $TOKEN"`      

## Texting  
- When signing up as a new user,    

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

## Future Releases  
- Integrate Twillio as text message provider  
- Create front end for user friendly sign up
- Availability for all cell phone providers  
