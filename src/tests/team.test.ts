import app from "..";
import { agent as request } from "supertest";
import { expect } from "chai";

// Dummy data
const email = "test1@test.com";
const password = "123456";
var userId;
let token;

it("Test GET endpoints: /team, /transfer, /player", function (done) {
  request(app)
    .post("/user")
    .set("Connection", "keep alive")
    .set("Content-Type", "application/json")
    .send({
      email: email,
      countryCode: "UY",
      password: password,
    })
    .end(function (err, res) {
      expect(res.status).equals(200);
      userId = res.body.id;
      it("Many tests authenticated ", function () {
        // Authenticate
        it("POST /session should return a token.", function (doneAuth) {
          request(app)
            .post("/session")
            .send({ email: email, password: password })
            .set("Connection", "keep alive")
            .set("Content-Type", "application/json")
            .end(function (err, res) {
              expect(res.status).equals(200);
              expect(res.body).to.have.property("token");
              token = res.body.token;

              // Get team
              it("GET /team authenticated should return team", function (done) {
                var req = request(app)
                  .get("/team/1") // revised
                  .set("Authorization", "Bearer " + token)
                  .send()
                  .expect("Content-Type", /json/)
                  .expect(200)
                  .end(function (err, res) {
                    expect(res.status).equals(200);
                  });
              });

              // Get transfer list
              it("GET /transfer", function (done) {
                var req = request(app)
                  .get("/transfer") // revised
                  .set("Authorization", "Bearer " + token)
                  .send()
                  .expect("Content-Type", /json/)
                  .expect(200)
                  .end(function (err, res) {
                    expect(res.status).equals(200);
                  });
              });

              // Get player
              it("GET /player", function (done) {
                var req = request(app)
                  .get("/player") // revised
                  .set("Authorization", "Bearer " + token)
                  .send()
                  .expect("Content-Type", /json/)
                  .expect(200)
                  .end(function (err, res) {
                    expect(res.status).equals(200);
                  });
              });

              // Put team
              it("PUT /team", function (done) {
                var req = request(app)
                  .put("/team") // revised
                  .set("Authorization", "Bearer " + token)
                  .send({ countryCode: "US", name: "test1" })
                  .set("Connection", "keep alive")
                  .set("Content-Type", "application/json")
                  .expect(200)
                  .end(function (err, res) {
                    expect(res.status).equals(200);
                  });
              });
            });
        });
      });
      done();
    });
});
