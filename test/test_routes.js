'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
const request = chai.request;
const expect = chai.expect;
const mongoose = require('mongoose');

const TEST_DB_SERVER = 'mongodb://localhost/test_db';
process.env.DB_SERVER = TEST_DB_SERVER;

let app = require('./test_server');

let server, userToken, drugId;

describe('testing different routes for our server ', () => {
  before((done) =>{
    server = app.listen(4001, ()=>{
      console.log('Server on 4001');
      done();
    });
  });
  after((done) =>{
    mongoose.connection.db.dropDatabase(()=>{
      mongoose.disconnect(() => {
        server.close();
        done();
      });
    });
  });
  it('should create a new user', (done) => {
    request('localhost:4001')
      .post('/api/user/newUser')
      .send({phoneNumber:'1234456', carrier:'sprint', username:'me1', password:'yep'})
      .end((err, res)=>{
        userToken = res.body.token;
        console.log(userToken);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not create a new user', (done) => {
    request('localhost:4001')
      .post('/api/user/signup')
      .send({phoneNumber:'123456078'})
      .end((err, res)=>{
        expect(res).to.have.status(400);
        expect(res.text).to.have.string('Nope');
        done();
      });
  });

  it('should GET a new user', (done) => {
    request('localhost:4001')
      .get('/api/user/signin')
      .auth('me1', 'yep')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not GET a new user', (done) => {
    request('localhost:4001')
      .get('/api/user/signin')
      .auth('notAUser', 'nope')
      .end((err, res)=>{
        expect(res).to.have.status(404);
        expect(res.body).to.have.string('could not authorize');
        done();
      });
  });

  it('should GET all users', (done) => {
    request('localhost:4001')
      .get('/api/user/allUsers')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should POST a new drug', (done) =>{
    request('localhost:4001')
      .post('/api/drug/newDrug')
      .send({drug: 'zocor'})
      .auth({authorization:'"Bearer ' + userToken +'"'})
      .end((err, res)=>{
        drugId = res.body._id;
        console.log('drugz are bad' + drugId);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.drug).to.eql('zocor');
        done();
      });
  });

  it('should GET a drug', (done) =>{
    request('localhost:4001')
      .get('/api/drug/' + drugId)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.drug).to.eql('zocor');
        done();
      });
  });

  it('should not POST a new drug', (done) =>{
    request('localhost:4001')
      .post('/api/drug/newDrug')
      .end((err, res)=>{
        expect(res).to.have.status(400);
        done();
      });
  });

});
