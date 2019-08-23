process.env.ENVIRONMENT = "testing";
const Location = require("../api/models/location");
const app = require("../app");
const chai = require("chai");
const supertest = require("supertest");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

describe("Population management", () => {
  // clear the database after every test
  beforeEach(done => {
    Location.remove({}, err => {
      if (err) console.log(err);
      done();
    });
  });
  describe("The welcome route", () => {
    it("should show a welcome message", done => {
      chai
        .request(app)
        .get("/")
        .end((req, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/GET Population routes", () => {
    it("should show a list of populations", done => {
      chai
        .request(app)
        .get("/api/v1/locations/")
        .end((req, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/POST -Add location", () => {
    it("should post a new location", done => {
      const newLocation = {
        name: "Kiambu",
        femalePopulation: "600",
        malePopulation: "600"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          expect(res).to.have.status(200);
          done();
        });
    });
  });

  describe("/POST -Add duplicate location error", () => {
    it("should not post a new location twice", done => {
      const newLocation = {
        name: "Kiambu",
        femalePopulation: "600",
        malePopulation: "600"
      };
      const secondLocation = {
        name: "Kiambu",
        femalePopulation: "600",
        malePopulation: "600"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end(() => {
          chai
            .request(app)
            .post("/api/v1/locations/")
            .send(secondLocation)
            .end((err, res) => {
              expect(res).to.have.status(500);
              done();
            });
        });
    });
  });

  describe("/POST -Add location with empty data", () => {
    it("should return an error message when the data is empty", done => {
      const newLocation = {
        name: "   ",
        femalePopulation: "600",
        malePopulation: "600"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          expect(res).to.have.status(400);
          done();
        });
    });
  });

  describe("/PUT -Edit location", () => {
    it("should edit an existing location", done => {
      const newLocation = {
        name: "Thika",
        femalePopulation: "600",
        malePopulation: "600"
      };
      const newLocationData = {
        femalePopulation: "6000"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          chai
            .request(app)
            .put("/api/v1/locations/" + res.body.createdLocation._id)
            .send(newLocationData)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });
  });

  describe("/PUT -Edit missing location", () => {
    it("should return 404 message if the location does not exist", done => {
      const newLocation = {
        name: "Thika",
        femalePopulation: "600",
        malePopulation: "600"
      };
      const newLocationData = {
        femalePopulation: "6000"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          chai
            .request(app)
            .put("/api/v1/locations/5d53f0a2465b148903a783b0")
            .send(newLocationData)
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
    });
  });

  describe("/PUT -Edit location error", () => {
    it("should not edit if location name exists", done => {
      const newLocation = {
        name: "Thika",
        femalePopulation: "600",
        malePopulation: "600"
      };
      const newLocationData = {
        name: "Thika"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          chai
            .request(app)
            .put("/api/v1/locations/" + res.body.createdLocation._id)
            .send(newLocationData)
            .end((err, res) => {
              expect(res).to.have.status(500);
              done();
            });
        });
    });
  });

  describe("/DELETE -Delete a location", () => {
    it("should delete an existing location", done => {
      const newLocation = {
        name: "Thika",
        femalePopulation: "600",
        malePopulation: "600"
      };
      const newLocationData = {
        femalePopulation: "6000"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          chai
            .request(app)
            .delete("/api/v1/locations/" + res.body.createdLocation._id)
            .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
        });
    });
  });

  describe("/DELETE -Delete a location that does not exist", () => {
    it("should return 404 if the location does not exist", done => {
      const newLocation = {
        name: "Thika",
        femalePopulation: "600",
        malePopulation: "600"
      };
      const newLocationData = {
        femalePopulation: "6000"
      };
      chai
        .request(app)
        .post("/api/v1/locations/")
        .send(newLocation)
        .end((err, res) => {
          chai
            .request(app)
            .delete("/api/v1/locations/5d53f0a2465b148903a783b0")
            .end((err, res) => {
              expect(res).to.have.status(404);
              done();
            });
        });
    });
  });
});
