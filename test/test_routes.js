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
  it('should POST a new user', (done) => {
    request('localhost:4001')
      .post('/api/user/signup')
      .send({phoneNumber:'1234456', carrier:'sprint', username:'me1', password:'yep'})
      .end((err, res)=>{
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not POST a new user', (done) => {
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
        userToken = res.body.token;
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('token');
        done();
      });
  });

  it('should not GET a new user due to bad credentials', (done) => {
    request('localhost:4001')
      .get('/api/user/signin')
      .auth('notAUser', 'nope')
      .end((err, res)=>{
        expect(res).to.have.status(404);
        expect(res.body).to.have.string('could not authorize');
        done();
      });
  });

  it('should POST a new drug', (done) =>{
    request('localhost:4001')
      .post('/api/drug/newDrug')
      .set('Authorization', 'Bearer ' + userToken)
      .send({drug: 'zocor'})
      .end((err, res)=>{
        drugId = res.body._id;
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

  it('should not POST a new drug due to no drug being sent', (done) =>{
    request('localhost:4001')
      .post('/api/drug/newDrug')
      .set('Authorization', 'Bearer ' + userToken)
      .end((err, res)=>{
        expect(res).to.have.status(400);
        done();
      });
  });

  it('should not POST a new drug due to no auth token', (done) =>{
    request('localhost:4001')
      .post('/api/drug/newDrug')
      .set('Authorization', 'Bearer ')
      .end((err, res)=>{
        expect(res).to.have.status(401);
        done();
      });
  });


  it('should GET data form the homepage', (done) =>{
    request('localhost:4001')
      .get('/')
      .end((err, res) =>{
        expect(res.text).to.have.string('Welcome to Rx SMS');
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should POST data and get back no interactions', (done) =>{
    request('localhost:4001')
      .post('/inbound')
      .send({HtmlBody:'warfarin', From:'1234456@pm.sprint.com'})
      .end((err, res) =>{
        expect(res).to.have.status(200);
        expect(res.body).to.eql('no interactions found');
        done();
      });
  });

  it('should POST data and get back interactions', (done) =>{
    request('localhost:4001')
      .post('/inbound')
      .send({HtmlBody:'<html><head><title>T-Mobile</title></head><body marginwidth="0" marginheight="0" leftmargin="0" topmargin="0" bgcolor="#ffffff"><table border="0" width="600" cellspacing="0" cellpadding="0"><tr><td width="600" colspan="2"><img src="cid:dottedline600.gif" width="600"></td></tr><br><tr><td width="600" colspan="2"><img src="cid:tmobilespace.gif" width="600" height="20"></td></tr><tr><tr><td colspan="1" align="left">Verapamil</td></tr> <TR><TD width=350 colSpan=1><IMG src="cid:tmobilespace.gif" width="350" height="30"></TD></TR><TR></TR><td width="240" bgcolor="#f2f2f2">&nbsp;</td></tr><tr><td width="600" colspan="2"><img src="cid:footer.gif" width="600" height="105"></td></tr></tr><tr><td width="600" colspan="2"><img src="cid:tmobilespace.gif" width="600" height="40"></td></tr></table></body></html>', From:'1234456@pm.sprint.com'})
      .end((err, res) =>{
        expect(res).to.have.status(200);
        expect(res.body).to.eql('Interaction between zocor and Verapamil: The serum concentration of Simvastatin can be increased when it is combined with Verapamil.');
        done();
      });
  });

  it('should GET a drug by id', (done) =>{
    request('localhost:4001')
      .get('/api/drug/' + drugId)
      .end((err, res) =>{
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('interactions');
        done();
      });
  });

});
