process.env.ENVIRONMENT = "testing";
const User = require("../api/models/user");
const app = require("../app");
const chai = require("chai");
const supertest = require("supertest");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("User authentication", () => {
  // clear database after each test
  beforeEach(done => {
    User.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });

  it("should create a new user", done => {
    const user = {
      email: "collins.muru@andela.com",
      password: "partyTime"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(201);
        done();
      });
  });

  it("should return an error if the user exists", done => {
    const user = {
      email: "collins.muru@andela.com",
      password: "partyTime"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end(() => {
        chai
          .request(app)
          .post("/api/v1/users/signup")
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(422);
            done();
          });
      });
  });

  it("should return an error if the email does not meet standards", done => {
    const user = {
      email: "collins.muruandela.com",
      password: "partyTime"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(500);
        done();
      });
  });
});