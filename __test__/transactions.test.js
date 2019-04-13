import chaiHttp from "chai-http";
import chai, { expect } from "chai";
import moment from "moment";

import app from "../app";

chai.use(chaiHttp);

describe("Testing transaction controller", () => {
      describe("Testing credit account controller", () => {
        const creditAccountUrl = "/api/v1/transactions/:accountnumber/credit";
        it("staff should credit an account when all the parameters are given", (done) => {
          chai
            .request(app)
            .post(creditAccountUrl)
            .send({
              transactionid: 1,
              accountNumber: 12345,
              amount: 10000,
              cashier: 32,
              createdon: moment().format(),
              transactiontype: "credit",
              oldBalance: 0.00,
              newBalance: 10000
            })
            .end((error, res) => {
              console.log(res.body);
              expect(res.body).to.be.an("object");
              expect(res).to.have.status(201);
              expect(res.body.status).to.equal(201);
              expect(res.body.data).to.be.an("object");
              expect(res.body.data).to.have.property("accountNumber");
              expect(res.body.data).to.have.property("transactionid");
              expect(res.body.data).to.have.property("amount");
              expect(res.body.data).to.have.property("cashier");
              expect(res.body.data).to.have.property("createdon");
              expect(res.body.data).to.have.property("transactiontype");
              expect(res.body.data).to.have.property("oldBalance");
              expect(res.body.data).to.have.property("newBalance");
              done();
            });
        });
        it("should not credit a client when the account number is missing", (done) => {
                chai
                  .request(app)
                  .post(creditAccountUrl)
                  .send({
                    transactionid: 1,
                    amount: 10000,
                    cashier: 32,
                    createdon: moment().format(),
                    transactiontype: "credit",
                    oldBalance: 0.00,
                    newBalance: 10000
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("Account number is required");
                    done();
                  });
              });

              it("should not credit a client when the transaction type is missing", (done) => {
                chai
                  .request(app)
                  .post(creditAccountUrl)
                  .send({
                    transactionid: 1,
                    accountNumber: 12345,
                    amount: 10000,
                    cashier: 32,
                    createdon: moment().format(),
                    oldBalance: 0.00,
                    newBalance: 10000
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("Transaction type is required");
                    done();
                  });
              });

              it("should not credit a client when the transaction type is not credit", (done) => {
                chai
                  .request(app)
                  .post(creditAccountUrl)
                  .send({
                    transactionid: 1,
                    accountNumber: 12345,
                    amount: 10000,
                    cashier: 32,
                    createdon: moment().format(),
                    transactiontype: "debit",
                    oldBalance: 0.00,
                    newBalance: 10000
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("Transaction type is not credit");
                    done();
                  });
              });

              it("should not credit a client when the amount is not stated", (done) => {
                chai
                  .request(app)
                  .post(creditAccountUrl)
                  .send({
                    transactionid: 1,
                    accountNumber: 12345,
                    cashier: 32,
                    createdon: moment().format(),
                    transactiontype: "credit",
                    oldBalance: 0.00,
                    newBalance: 10000
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("Amount is not stated");
                    done();
                  });
              });

              it("should not credit a client when the new balance is not updated", (done) => {
                chai
                  .request(app)
                  .post(creditAccountUrl)
                  .send({
                    transactionid: 1,
                    accountNumber: 12345,
                    cashier: 32,
                    amount: 10000,
                    createdon: moment().format(),
                    transactiontype: "credit",
                    oldBalance: 0.00,
                    newBalance: 11000
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("Amount is not updated");
                    done();
                  });
              });

              it("should not credit a client when the transactionid is missing", (done) => {
                chai
                  .request(app)
                  .post(creditAccountUrl)
                  .send({
                    accountNumber: 12345,
                    amount: 10000,
                    cashier: 32,
                    createdon: moment().format(),
                    transactiontype: "credit",
                    oldBalance: 0.00,
                    newBalance: 10000
                  })
                  .end((error, res) => {
                    expect(res.body).to.be.an("object");
                    expect(res).to.have.status(400);
                    expect(res.body.error).to.be.a("string");
                    expect(res.body.error).to.equal("Transaction id is required");
                    done();
                  });
              });

    });

    describe("Testing debit account controller", () => {
      const debitAccountUrl = "/api/v1/transactions/:accountnumber/debit";
    //   it("staff should debit an account when all the parameters are given", (done) => {
    //     chai
    //       .request(app)
    //       .post(debitAccountUrl)
    //       .send({
    //         transactionid: 1,
    //         accountNumber: 12345,
    //         amount: 10000,
    //         cashier: 32,
    //         createdon: moment().format(),
    //         transactiontype: "debit",
    //         oldBalance: 0.00,
    //         newBalance: 10000
    //       })
    //       .end((error, res) => {
    //         console.log(res.body);
    //         expect(res.body).to.be.an("object");
    //         expect(res).to.have.status(201);
    //         expect(res.body.status).to.equal(201);
    //         expect(res.body.data).to.be.an("object");
    //         expect(res.body.data).to.have.property("accountNumber");
    //         expect(res.body.data).to.have.property("transactionid");
    //         expect(res.body.data).to.have.property("amount");
    //         expect(res.body.data).to.have.property("cashier");
    //         expect(res.body.data).to.have.property("createdon");
    //         expect(res.body.data).to.have.property("transactiontype");
    //         expect(res.body.data).to.have.property("oldBalance");
    //         expect(res.body.data).to.have.property("newBalance");
    //         done();
    //       });
    //   });
      it("should not debit a client when the account number is missing", (done) => {
              chai
                .request(app)
                .post(debitAccountUrl)
                .send({
                  transactionid: 1,
                  amount: 10000,
                  cashier: 32,
                  createdon: moment().format(),
                  transactiontype: "debit",
                  oldBalance: 0.00,
                  newBalance: 10000
                })
                .end((error, res) => {
                  expect(res.body).to.be.an("object");
                  expect(res).to.have.status(400);
                  expect(res.body.error).to.be.a("string");
                  expect(res.body.error).to.equal("Account number is required");
                  done();
                });
            });

            it("should not debit a client when the transaction type is missing", (done) => {
              chai
                .request(app)
                .post(debitAccountUrl)
                .send({
                  transactionid: 1,
                  accountNumber: 12345,
                  amount: 10000,
                  cashier: 32,
                  createdon: moment().format(),
                  oldBalance: 0.00,
                  newBalance: 10000
                })
                .end((error, res) => {
                  expect(res.body).to.be.an("object");
                  expect(res).to.have.status(400);
                  expect(res.body.error).to.be.a("string");
                  expect(res.body.error).to.equal("Transaction type is required");
                  done();
                });
            });

            it("should not debit a client when the transaction type is not debit", (done) => {
              chai
                .request(app)
                .post(debitAccountUrl)
                .send({
                  transactionid: 1,
                  accountNumber: 12345,
                  amount: 10000,
                  cashier: 32,
                  createdon: moment().format(),
                  transactiontype: "credit",
                  oldBalance: 0.00,
                  newBalance: 10000
                })
                .end((error, res) => {
                  expect(res.body).to.be.an("object");
                  expect(res).to.have.status(400);
                  expect(res.body.error).to.be.a("string");
                  expect(res.body.error).to.equal("Transaction type is not debit");
                  done();
                });
            });

            it("should not debit a client when the amount is not stated", (done) => {
              chai
                .request(app)
                .post(debitAccountUrl)
                .send({
                  transactionid: 1,
                  accountNumber: 12345,
                  cashier: 32,
                  createdon: moment().format(),
                  transactiontype: "debit",
                  oldBalance: 0.00,
                  newBalance: 10000
                })
                .end((error, res) => {
                  expect(res.body).to.be.an("object");
                  expect(res).to.have.status(400);
                  expect(res.body.error).to.be.a("string");
                  expect(res.body.error).to.equal("Amount is not stated");
                  done();
                });
            });

            it("should not debit a client when the new balance is not updated", (done) => {
              chai
                .request(app)
                .post(debitAccountUrl)
                .send({
                  transactionid: 1,
                  accountNumber: 12345,
                  cashier: 32,
                  amount: 10000,
                  createdon: moment().format(),
                  transactiontype: "debit",
                  oldBalance: 0.00,
                  newBalance: 11000
                })
                .end((error, res) => {
                  expect(res.body).to.be.an("object");
                  expect(res).to.have.status(400);
                  expect(res.body.error).to.be.a("string");
                  expect(res.body.error).to.equal("Incorrect amount");
                  done();
                });
            });

});
});
