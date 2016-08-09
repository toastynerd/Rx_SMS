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

let server, userID, drugId;

describe('testing different routes for our server ', () => {
  before((done) =>{
    server = app.listen(4000, ()=>{
      console.log('Server on 4000');
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
    request('localhost:4000')
      .post('/api/user/newUser')
      .send({name: 'Tracey', phoneNumber:'123456078'})
      .end((err, res)=>{
        userID = res.body._id;
        console.log(userID);
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name');
        done();
      });
  });

  it('should not create a new user', (done) => {
    request('localhost:4000')
      .post('/api/user/newUser')
      .send({phoneNumber:'123456078'})
      .end((err, res)=>{
        expect(res).to.have.status(400);
        expect(res.text).to.have.string('Nope');
        done();
      });
  });

  it('should GET a new user', (done) => {
    request('localhost:4000')
      .get('/api/user/' + userID)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('name');
        expect(res.body.name).to.eql('Tracey');
        done();
      });
  });

  it('should not GET a new user', (done) => {
    request('localhost:4000')
      .get('/api/user/1234')
      .end((err, res)=>{
        expect(res).to.have.status(400);
        expect(res.body).to.have.string('invalid id');
        done();
      });
  });

  it('should GET all users', (done) => {
    request('localhost:4000')
      .get('/api/user/allUsers')
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should POST a new drug', (done) =>{
    request('localhost:4000')
      .post('/api/drug/newDrug')
      .send({drug: 'zocor'})
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
    request('localhost:4000')
      .get('/api/drug/' + drugId)
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.drug).to.eql('zocor');
        done();
      });
  });

  
});
