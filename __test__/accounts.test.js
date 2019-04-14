import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import moment from "moment";

import app from "../app";

chai.use(chaiHttp);

describe("Testing Account controller", () => {
  describe("Testing account creation controller", () => {
    const accountUrl = "/api/v1/accounts";
    it("should create an account when all the parameters are given", (done) => {
      chai
        .request(app)
        .post(accountUrl)
        .send({
          id: 1,
          accountNumber: 123456,
          createdon: moment().format(),
          owner: 1,
          firstName: "bill",
          lastName: "gates",
          email: "bill@gates.com",
          type: "savings",
          accountStatus: "active",
          balance: 2300
        })
        .end((error, res) => {
          console.log(res.body);
          expect(res.body).to.be.an("object");
          expect(res).to.have.status(201);
          expect(res.body.status).to.equal(201);
          expect(res.body.data).to.be.an("object");
          expect(res.body.data).to.have.property("accountNumber");
          expect(res.body.data).to.have.property("id");
          expect(res.body.data).to.have.property("createdon");
          expect(res.body.data).to.have.property("owner");
          expect(res.body.data).to.have.property("firstName");
          expect(res.body.data).to.have.property("lastName");
          expect(res.body.data).to.have.property("type");
          expect(res.body.data).to.have.property("accountStatus");
          expect(res.body.data).to.have.property("balance");
          done();
        });
    });

    it("should not create account when account number is missing", (done) => {
              chai
                .request(app)
                .post(accountUrl)
                .send({
                    id: 1,
                    createdon: moment().format(),
                    owner: 1,
                    lastName: "gates",
                    email: "bill@gates.com",
                    type: "savings",
                    accountStatus: "active",
                    balance: 2300
                })
                .end((error, res) => {
                  expect(res.body).to.be.an("object");
                  expect(res).to.have.status(400);
                  expect(res.body.error).to.be.a("string");
                  expect(res.body.error).to.equal("accountNumber is required");
                  done();
                });
            });

            it("should not create account when date  is missing", (done) => {
                chai
                  .request(app)
                  .post(accountUrl)
                  .send({
                      id: 1,
                      accountNumber: 123456,
                      owner: 1,
                      firstName: "bill",
                      lastName: "gates",
                      email: "bill@gates.com",
                      type: "savings",
                      accountStatus: "active",
                      balance: 2300
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("date is required");
                    done();
                  });
              });

              it("should not create account when accountstatus is missing", (done) => {
                chai
                  .request(app)
                  .post(accountUrl)
                  .send({
                    id: 1,
                    accountNumber: 123456,
                    createdon: moment().format(),
                    owner: 1,
                    firstName: "bill",
                    lastName: "gates",
                    email: "bill@gates.com",
                    type: "savings",
                  
                    balance: 2300
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("account status is required");
                    done();
                  });
              });

              
              it("should not create account when first name is missing", (done) => {
                chai
                  .request(app)
                  .post(accountUrl)
                  .send({
                    id: 1,
                    accountNumber: 123456,
                    createdon: moment().format(),
                    owner: 1,
                    lastName: "gates",
                    email: "bill@gates.com",
                    type: "savings",
                    accountStatus: "active",
                    balance: 2300
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("firstname is required");
                    done();
                  });
              });

              it("should not create account when last name is missing", (done) => {
                chai
                  .request(app)
                  .post(accountUrl)
                  .send({
                    id: 1,
                    accountNumber: 123456,
                    createdon: moment().format(),
                    owner: 1,
                    firstName: "bill",
                    email: "bill@gates.com",
                    type: "savings",
                    accountStatus: "active",
                    balance: 2300
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("lastname is required");
                    done();
                  });
              });

              it("should set accountStatus to active ", (done) => {
                chai
                  .request(app)
                  .post(accountUrl)
                  .send({
                    id: 1,
                    accountNumber: 123456,
                    createdon: moment().format(),
                    owner: 1,
                    firstName: "bill",
                    lastName: "gates",
                    email: "bill@gates.com",
                    type: "savings",
                    accountStatus: "dormant",
                    balance: 2300
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("account dormant");
                    done();
                  });
              });
});
});


