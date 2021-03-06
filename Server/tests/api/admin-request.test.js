import { describe, it, before } from 'mocha';
import chai from 'chai';
import chaiHttp from 'chai-http';
import dotenv from 'dotenv';

import { server } from '../../../app';
import { generateToken } from '../../helpers/jwtHelper';

dotenv.config();
chai.use(chaiHttp);
chai.should();
let userToken = '';
let superUserToken =
  'jnjsds9sjsds9dskmsd9sdmdsjdsdsk.dsdsos0sld9sdosdsmsdmssdjsnsdjisdjksd';

describe('GET /requests', () => {
  before(() => {
    superUserToken = generateToken(
      { email: 'emecus10@gmail.com', id: 1, admin: true },
      '72h',
    );
    userToken = generateToken(
      { email: 'brighto@gmail.com', id: 2, admin: false },
      '72h',
    );
  });

  it('should return 200 and requests, when token is valid and requests exists', done => {
    chai
      .request(server)
      .get('/api/v1/requests')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have
          .property('message')
          .eql('Requests retrieved successfully');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should return 200 and requests, when token is valid and requests exists from approved filter', done => {
    chai
      .request(server)
      .get('/api/v1/requests?filterType=approved&pageNo=1')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have
          .property('message')
          .eql('Requests retrieved successfully');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should return 200 and requests, when token is valid and requests exists from resolved filter', done => {
    chai
      .request(server)
      .get('/api/v1/requests?filterType=resolved&pageNo=1')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have
          .property('message')
          .eql('Requests retrieved successfully');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should return 200 and requests, when token is valid and requests exists from pending filter', done => {
    chai
      .request(server)
      .get('/api/v1/requests?filterType=pending&pageNo=1')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have
          .property('message')
          .eql('Requests retrieved successfully');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should return 200 and requests, when token is valid and requests exists from repair filter', done => {
    chai
      .request(server)
      .get('/api/v1/requests?filterType=repair&pageNo=1')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have
          .property('message')
          .eql('Requests retrieved successfully');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should return 200 and requests, when token is valid and requests exists from maintenance filter', done => {
    chai
      .request(server)
      .get('/api/v1/requests?filterType=maintenance&pageNo=1')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(200);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('success');
        res.body.should.have
          .property('message')
          .eql('Requests retrieved successfully');
        res.body.should.have.property('code').eql(200);
        res.body.should.have.property('data');
        res.body.data.should.be.an('array');
        done();
      });
  });

  it('should return 400 and requests, when token is valid query params are not', done => {
    chai
      .request(server)
      .get('/api/v1/requests?filterType=repair&pageNo=ko')
      .set('Authorization', `Bearer ${superUserToken}`)
      .end((req, res) => {
        res.should.have.status(400);
        res.should.be.a('object');
        res.body.should.have.property('status').eql('error');
        res.body.should.have.property('code').eql(400);
        done();
      });
  });

  it('should return 401 when token is invalid', done => {
    chai
      .request(server)
      .get('/api/v1/requests')
      .set(
        'Authorization',
        'Bearer ndfkjvksdkvdjsfesfndvi.uhbvwefiuweihiew.bnrejdfjufdj',
      )
      .end((err, res) => {
        res.should.have.status(401);
        res.body.should.be.a('object');
        res.body.should.have.property('code').eql(401);
        res.body.should.have.property('status').eql('fail');
        res.body.should.have
          .property('message')
          .eql('Invalid authorization token');
        done();
      });
  });

  it('should return 403 user is not an admin', done => {
    chai
      .request(server)
      .get('/api/v1/requests')
      .set('Authorization', `Bearer ${userToken}`)
      .end((err, res) => {
        res.should.have.status(403);
        res.body.should.be.a('object');
        res.body.should.have.property('code').eql(403);
        res.body.should.have.property('status').eql('fail');
        res.body.should.have
          .property('message')
          .eql('You dont have access to this resource');
        done();
      });
  });
});
