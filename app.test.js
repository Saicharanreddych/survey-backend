

const request = require('supertest');
const app = require('./app');
var res;
var loginresponse;
describe('USER API',()=>{
    it('GET ALL USERS: /api/surveys/users/all',()=>{
        return request(app)
              .get('/api/surveys/users/all')
              .expect(200)
              .then(response =>{
                this.res = response.body;
                expect(response.body).toEqual(
                    expect.arrayContaining([
                        expect.objectContaining({
                            id: expect.any(Number),
                            username: expect.any(String),
                            email: expect.any(String),
                            password: expect.any(String),
                            createdAt: expect.any(String),
                            updatedAt: expect.any(String),
                        })
                    ])
                )
        })
    });

    it('GET a specific user with id',()=>{
        
        var id = this.res[0].id;
        return request(app)
        .get('/api/surveys/user/'+id)
        .expect(200)
        .then(response =>{
          
          expect(response.body).toEqual(
                  expect.objectContaining({
                      id: expect.any(Number),
                      username: expect.any(String),
                      email: expect.any(String),
                      password: expect.any(String),
                      createdAt: expect.any(String),
                      updatedAt: expect.any(String),
                  })
              
          )
          expect(response.body.id).toBe(id);
  })
    });

    it('UPDATE user information with an id',()=>{
        const user = {
            username: 'Testname'
          };
          var userid = this.res[0].id;
        return request(app)
        .put('/api/surveys/user/'+userid)
        .send(user)
        .expect(200)
        .then(response =>{
         
          expect(response.body).toEqual(
                  expect.objectContaining({
                      message: expect.any(String),
                  })
              
          )
          expect(response.body.message).toBe("User was updated successfully.");
        });
    })

    it('POST - REGISTER a new user',()=>{
        const newuser = {
            username:"Test",
            email:"test@gmail.com",
            password:"test@password",
            roles:"user"
        }

        return request(app)
        .post('/api/surveys/user')
        .send(newuser)
        .expect(200)
        .then(response =>{
          
          expect(response.body).toEqual(
            expect.objectContaining({
                message: expect.any(String)
            }))
        expect(response.body.message).toBe("User registered successfully!")
          
          
    });
    })

    it('POST - LOGIN a user',()=>{
        const newuser = {
            username:"Test",
            password:"test@password"
        }
        const email = "test@gmail.com";
        return request(app)
        .post('/api/surveys/userlogin')
        .send(newuser)
        .expect(200)
        .then(response =>{
          
          this.loginresponse = response.body;
          expect(response.body).toEqual(
            expect.objectContaining({
                id: expect.any(Number),
                username: expect.any(String),
                email: expect.any(String),
                accessToken: expect.any(String),
                roles:expect.any(Array),
            }))
        expect(response.body.username).toBe(newuser.username);
        expect(response.body.email).toBe(email);   
    });
    })


    it('DELETE an user using user id',()=>{
        var userid = this.loginresponse.id;

        return request(app)
        .delete('/api/surveys/user/'+userid)
        .expect(200)
        .then(response =>{
          
          expect(response.body).toEqual(
                  expect.objectContaining({
                      message: expect.any(String),
                  })
              
          )
          expect(response.body.message).toBe("User was deleted successfully!")

    });
    })
})

