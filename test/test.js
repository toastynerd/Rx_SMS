'use strict';

const chai = require('chai');
const chaiHTTP = require('chai-http');
chai.use(chaiHTTP);
// const request = chai.request;
const expect = chai.expect;
// const mongoose = require('mongoose');

describe('blah', () => {
  it('blah', (done) => {
    expect('blah').to.eql('blah');
    done();
  });
});
