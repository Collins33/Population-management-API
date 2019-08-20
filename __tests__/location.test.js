const Location = require("../api/models/location");
const express = require("express");
const app = require("../app");
const chai = require("chai");
const mongoose = require("mongoose");
const supertest = require("supertest");
const expect = chai.expect;
const chaiHttp = require("chai-http");
chai.use(chaiHttp);

const api = supertest(app);

describe("Population management", () => {
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

  describe("Population routes", () => {
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
});
