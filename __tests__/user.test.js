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

  it("should return an error if the values are missing", done => {
    const user = {
      email: "",
      password: "kamwangi222"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(422);
        done();
      });
  });

  it("should return an error if the password is short", done => {
    const user = {
      email: "king.batch@andela.com",
      password: "123"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });

  it("should return 200 when logging in with correct credentials", done => {
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
          .post("/api/v1/users/login")
          .send(user)
          .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
      });
  });

  it("should return an error if email does not exist when loggin in", done => {
    const user = {
      email: "collins.muru@andela.com",
      password: "partyTime"
    };
    const secondUser = {
      email: "collins.muru10@andela.com",
      password: "partyTime"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end(() => {
        chai
          .request(app)
          .post("/api/v1/users/login")
          .send(secondUser)
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
  });

  it("should return an error message for wrong password", done => {
    const user = {
      email: "collins.muru@andela.com",
      password: "partyTime"
    };
    const secondUser = {
      email: "collins.muru@andela.com",
      password: "partyTime300"
    };
    chai
      .request(app)
      .post("/api/v1/users/signup")
      .send(user)
      .end(() => {
        chai
          .request(app)
          .post("/api/v1/users/login")
          .send(secondUser)
          .end((err, res) => {
            expect(res).to.have.status(401);
            done();
          });
      });
  });
});
