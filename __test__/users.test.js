/* eslint-disable no-undef */
import chaiHttp from "chai-http";
import chai, { expect } from "chai";

import app from "../app";

chai.use(chaiHttp);

describe("Testing user controller", () => {
  describe("Testing signup controller", () => {
    const signupUrl = "/api/v1/signup";
    it("should register a user when all the parameters are given", (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          id: 1,
          firstName: "bill",
          lastName: "gates",
          email: "bill@gates.com",
          password: "password",
          confirmPassword: "password"
        })
        .end((error, res) => {
          expect(res.body).to.be.an("object");
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.an("object");
          expect(res.body.data).to.have.property("token");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("firstName");
          expect(res.body.data).to.have.property("lastName");
          expect(res.body.data).to.have.property("email");
          expect(res.body.data).to.have.property("password");
          expect(res.body.data.token).to.be.a("string");
          expect(res.body.data.email).to.be.equal("bill@gates.com");
          done();
        });
    });

    it("should not register a user when the email is missing", (done) => {
      chai
        .request(app)
        .post(signupUrl)
        .send({
          firstName: "bill",
          lastName: "gates",
          password: "password",
          confirmPassword: "password"
        })
        .end((error, res) => {
          expect(res.body).to.be.an("object");
          expect(res).to.have.status(400);
          expect(res.body.error).to.be.a("string");
          expect(res.body.error).to.equal("email is required");
          done();
        });
    });

      it('should not register a user when the firstname is missing', 
        (done) => {
            chai.request(app)
            .post(signupUrl)
            .send({
              lastName: 'gates',
              email: 'bill@gates.com',
              password: 'password',
              confirmPassword: 'password',
            })
            .end((error, responce) => {
              expect(responce.body).to.be.an('object');
              expect(responce).to.have.status(400);
              expect(responce.body.error).to.be.a('string');
              expect(responce.body.error).to.equal('Firstname is required');
              done();
            })
      },
    );

    it('should not register a user when the lastname is missing',
        (done) => {
            chai.request(app)
            .post(signupUrl)
            .send({
              firstName: 'bill',
              email: 'bill@gates.com',
              password: 'password',
              confirmPassword: 'password',
            })
            .end((error, responce) => {
              expect(responce.body).to.be.an('object');
              expect(responce).to.have.status(400);
              expect(responce.body.error).to.be.a('string');
              expect(responce.body.error).to.equal('Lastname is required');
              done();
            })
      },
    );

    it('should not register a user when the password is missing',
        (done) => {
            chai.request(app)
            .post(signupUrl)
            .send({
              firstName: 'bill',
              lastName: 'gates',
              email: 'bill@gates.com',
              confirmPassword: 'password',
            })
            .end((error, responce) => {
              expect(responce.body).to.be.an('object');
              expect(responce).to.have.status(400);
              expect(responce.body.error).to.be.a('string');
              expect(responce.body.error).to.equal('password is required');
              done();
            })
      },
    );

    it('should not register a user when the passwords do not match',
        (done) => {
            chai.request(app)
            .post(signupUrl)
            .send({
              firstName: 'bill',
              lastName: 'gates',
              email: 'bill@gates.com',
              password: 'password',
              confirmPassword: 'passwords do not match',
            })
            .end((error, responce) => {
              expect(responce.body).to.be.an('object');
              expect(responce).to.have.status(400);
              expect(responce.body.error).to.be.a('string');
              expect(responce.body.error).to.equal('passwords do not match');
              done();
            })
      },
    );

  });
  
  describe("Testing signin controller", () => {
    const signinUrl = "/api/v1/signin";
    it("should login a user when all the parameters are given", 
    (done) => {
      chai
        .request(app)
        .post(signinUrl)
        .send({
          id: 1,
          firstName: "bill",
          lastName: "gates",
          email: "bill@gates.com",
          password: "password",
        })
        .end((error, res) => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.an("object");
          expect(res.body.data).to.have.property("token");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("firstName");
          expect(res.body.data).to.have.property("lastName");
          expect(res.body.data).to.have.property("email");
          expect(res.body.data).to.have.property("password");
          expect(res.body.data.token).to.be.a("string");
          expect(res.body.data.email).to.be.equal("bill@gates.com");
          done();
        });
    });

    it("should not register a user when the email is missing", (done) => {
        chai
          .request(app)
          .post(signinUrl)
          .send({
            firstName: "bill",
            lastName: "gates",
            password: "password",
            confirmPassword: "password"
          })
          .end((error, res) => {
            expect(res.body).to.be.an("object");
            expect(res).to.have.status(400);
            expect(res.body.error).to.be.a("string");
            expect(res.body.error).to.equal("email is required");
            done();
          });
      });

      it('should not register a user when the password is missing',
      (done) => {
          chai.request(app)
          .post(signinUrl)
          .send({
            firstName: 'bill',
            lastName: 'gates',
            email: 'bill@gates.com',
            confirmPassword: 'password',
          })
          .end((error, responce) => {
            expect(responce.body).to.be.an('object');
            expect(responce).to.have.status(400);
            expect(responce.body.error).to.be.a('string');
            expect(responce.body.error).to.equal('password is required');
            done();
          })
    },
  );


});
});
