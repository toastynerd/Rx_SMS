# Rx_SMS

[![Build Status](https://travis-ci.org/aliza89p/Rx_SMS.svg?branch=staging)](https://travis-ci.org/aliza89p/Rx_SMS)

## Developers  
- Aliza Pilisuk  
- Tracey Radcliffe  
- Tre Cain  

## Instructions  
- To create a new user, run post request with a new phone number: http post :3000/newUser phoneNumber=1234567890  
- To get a user, run get request with a user's id: http get :3000/01234
- To get all users, run: http get :3000/allUsers
- To create a new drug, run a post request with a new drug: http post :3000/newDrug drug=valium  
- To get a drug, run a get request with a drug's id: http get :3000/54321
- To get all drugs, run: http get :3000/allDrugs  
- To add user to drug, run: http put :3000/api/user/$UserId/drug/$DrugId
