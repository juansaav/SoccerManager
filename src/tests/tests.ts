
// // Separate this file in: movie, session.. Mocha tests order problem

// import app from '../../src';
// import {agent as request} from 'supertest';
// import {expect} from 'chai'; 
// import randomEmail from 'random-email'; 

// // Dummy data
// const email = randomEmail();
// const password =  "123456";
// const firstName = "Test firstName";
// const lastName = "Test lastName";
// var token;
// var userId;
// var movieId;

// // Try create user with invalid data
// it('POST /user should get validations errors.', async function () {
//       const res = await request(app)
//         .post("/user")
//         .set("Connection", "keep alive")
//         .set("Content-Type", "application/json") 
//         .send({ email: "invalid email",firstName: "", lastName: "", password: ""});
//     expect(res.status).equals(400);
//     expect(res.body.errors).to.have.lengthOf(4);
// }); 

// // Try Login invalid credentials
// it('POST /session and get an error.', async function () {
//       const res = await request(app)
//         .post("/session")
//         .set("Connection", "keep alive")
//         .set("Content-Type", "application/json") 
//         .send({ email: email, password: "111"});
//     expect(res.status).equals(500); 
// }); 

// // Try to get all movies Unauthorized
// it('GET /movie should get Unauthorized error.', async function () {
//       const res = await request(app)
//         .get("/movie")
//         .set("Connection", "keep alive") 
//         .send();
//     expect(res.status).equals(401); 
// }); 
// // Register
// it('POST /user should get create user.', function (done) {
//     request(app)
//         .post("/user")
//         .set("Connection", "keep alive")
//         .set("Content-Type", "application/json") 
//         .send({ email: email,firstName: firstName, lastName: lastName, password: password})
//         .end(function(err, res) { 
//               expect(res.status).equals(200);  
//               userId = res.body.id; 
//               done();
//         }); 
// }); 

// // Test endpoints authenticated 
// it('Many tests authenticated ', function() {  
//   // Authenticate
//   it('POST /session should return a token.', function(doneAuth) { 
//         request(app).post('/session') 
//             .send( {email: email, password: password} )
//             .set("Connection", "keep alive")
//             .set("Content-Type", "application/json") 
//             .end(function(err, res) { 
//                   expect(res.status).equals(200); 
//                   expect(res.body).to.have.property('token');
//                   token = res.body.token; 
//                   userId = res.body.user.id;

//                   // Get movies
//                   it('GET /movie authenticated should return movies', function(done) {
//                     var req = request(app).get('/movie') // revised
//                             .set("Authorization", "Bearer " + token) 
//                             .send()
//                             .expect('Content-Type', /json/)
//                             .expect(200)
//                             .end(function(err, res) {
//                                 expect(res.status).equals(200);
//                                 expect(res.body).to.be.an('array');
//                                 done();
//                                 movieId = res.body[0].id;
//                             });
//                   });  

//                   // Get favourite movies Unauthorized                  
//                   it('GET user/'+userId+1+'/movie (favourite movies) should return Unauthorized', function(done) {
//                     var req = request(app).get('user/'+userId+1+'/movie') // revised
//                             .set("Authorization", "Bearer " + token) 
//                             .send()
//                             .expect('Content-Type', /json/)
//                             .expect(200)
//                             .end(function(err, res) {
//                                 expect(res.status).equals(404);
//                                 done();
//                             });
//                   }); 
//                   // Get favourite movies 
//                   it('GET user/'+userId+'/movie (favourite movies) should return empty array', function(done) {
//                     var req = request(app).get('user/'+userId+'/movie') // revised
//                             .set("Authorization", "Bearer " + token) 
//                             .send()
//                             .expect('Content-Type', /json/)
//                             .expect(200)
//                             .end(function(err, res) {
//                                 expect(res.status).equals(200);
//                                 expect(res.body).to.be.an('array').of.length(0);
//                                 done(); 
//                             });
//                   });

//                   // Add favourite movies
//                   it('POST user/userId/movie/id ', function(done) {
//                     var req = request(app).post('user/'+userId+'/movie/'+ movieId) // revised
//                             .set("Authorization", "Bearer " + token) 
//                             .send()
//                             .expect('Content-Type', /json/)
//                             .expect(200)
//                             .end(function(err, res) {
//                                 expect(res.status).equals(200); 
//                                 doneAuth();
//                             });
//                   });

//             });
//   }); 
  

 

// });
