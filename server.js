const express = require('express');

const app = express();

const cors = require('cors');
const bcrypt = require('bcrypt-nodejs');
const knex = require('knex');
const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image.js');

const db = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'test',
      database : 'smart_face'
    }
});

//Showing Full Table
// db.select('*').from('users').then(data => {
//     console.log(data);
// });
 
app.use(express.json());
app.use(cors());

// const database = {
//     users : [
//         {
//             id: '123',
//             name: 'John',
//             email: 'john@gmail.com',
//             password: 'cookies',
//             entries: 0,
//             joined: new Date()
//         },
//         {
//             id: '124',
//             name: 'Sally',
//             email: 'sally@gmail.com',
//             password: 'banana',
//             entries: 0,
//             joined: new Date()
//         }
//     ],
//     login: [
//         {
//             id: '987',
//             hash: '$2a$10$GZMbNOcjSPsD7Fz8FdjX8eFd8oJllpmUiwgHQDNWyJzMaUV7WhtUC',
//             email: 'john@gmail.com'
//         }
//     ]
// }

app.get('/', (req, res) => {res.send(database.users) })

//SignIn
app.post('/signin', signin.handleSignin(db, bcrypt)); //Can also be shortened (check signin.js)

//Register
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)});

//Profile
app.get('/profile/:id', (req, res) => {profile.handleProfileGet(req, res, db)});

//Image
app.put('/image', (req, res) => { image.handleImage(req, res, db)});

//Api Request
app.post('/imageurl', (req, res) => {image.handleApiCall(req, res)});

app.listen(3000, () => {
    console.log('App is running');
})

console.log(process.env);

/*
========Planning the API============

Following are the required end-points:

/ --> res = this is working
/signin --> POST = success/fail
/register --> POST = return user object
/profile/?userId --> GET = user
/image --> PUT (checking the number of times user serached and giving them a rank) = return the updated user object



*/