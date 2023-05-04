const request = require("supertest");
const app = require("../index");

describe("Authorization Tests", function () {
it("should return 401 unauthorized for unauthenticated requests", function (done) {
    request(app).get("/getallemp").expect(401, done);
});
});

describe("Employee Tests", function () {
  // Create a user and get a token
let token;
before(function (done) {
    request(app)
    .post("/login")
    .send({
        email: "vamsi@gmail.com",
        password: "vamsi123",
        username: "vamsi"
    })
    .end(function (err, res) {
        token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmFtc2kiLCJpYXQiOjE2ODMxNzY3MzksImV4cCI6MTY4MzM5MjczOX0.YNHGmVFB3XWeBSyv6D7ArCVbZNv_UfLPUdjc1YMbezw";
        done();
    });
});

it("should return all employees when authenticated", function (done) {
    request(app)
    .get("/getallemp")
    .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmFtc2kiLCJpYXQiOjE2ODMxNzY3MzksImV4cCI6MTY4MzM5MjczOX0.YNHGmVFB3XWeBSyv6D7ArCVbZNv_UfLPUdjc1YMbezw`)
    .expect(200)
    .end(function (err, res) {
        if (err) return done(err);
        // Check that the response contains an array of employees
        assert.isArray(res.body, "response contains an array of employees");
        done();
    });
});

it("should return a single employee when authenticated and given a valid employee ID", function (done) {
    request(app)
    .get("/getemp/643b9b7f9dd8ad7b7822a7b8")
    .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmFtc2kiLCJpYXQiOjE2ODMxNzY3MzksImV4cCI6MTY4MzM5MjczOX0.YNHGmVFB3XWeBSyv6D7ArCVbZNv_UfLPUdjc1YMbezw`)
    .expect(200)
    .end(function (err, res) {
        if (err) return done(err);
        // Check that the response contains the correct employee object
        assert.isObject(res.body, "response contains an employee object");
        assert.equal(
        res.body.id,
        "643b9b7f9dd8ad7b7822a7b8",
        "response contains the correct employee ID"
    );
        done();
    });
});

it("should return a 404 not found when authenticated and given an invalid employee ID", function (done) {
    request(app)
    .get("/getemp/643b9b7f9dd8ad7b7822a7b8")
    .set("Authorization", `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjoidmFtc2kiLCJpYXQiOjE2ODMxNzY3MzksImV4cCI6MTY4MzM5MjczOX0.YNHGmVFB3XWeBSyv6D7ArCVbZNv_UfLPUdjc1YMbezw`)
    .expect(404, done);
});
});