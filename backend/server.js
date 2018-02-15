//import { require } from '../frontend/src/test'

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

let messages = [{text: 'some text', owner: 'Pesho'}, {text: 'other text', owner: 'Gosho'}];
let users = [{firstName: 'Pesho', lastName: 'Peshev', email: 'test@test.com', password: '111111'}];

// app.use(cors());

app.use(bodyParser.json());
app.use((req, res, next) => {
   res.header('Access-Control-Allow-Origin', '*');
   res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Access');
   next();
});

let api = express.Router();
let auth = express.Router();

api.get('/messages', (req, res) => {
   res.json(messages);
});

api.get('/messages/:user', (req, res) => {
  let user = req.params.user;
  let result = messages.filter(message => message.owner === user);

  res.json(result);
});

api.post('/messages', (req, res) => {
  messages.push(req.body);
  res.json(req.body);
});

auth.post('/login', (req, res) => {
 const user = users.find(user => user.email === req.body.email)
  if(!user) {
   sendAuthError(res);
  }

  if(user.password === req.body.password) {
    sendToken(user, res);
  } else {
    sendAuthError(res);
  }
})

auth.post('/register', (req, res) => {
  let index = users.push(req.body) - 1;

  let user = users[index];
  user.id = index;

  sendToken(user, res);
})

function sendToken (user, res) {
  let token = jwt.sign(user, '123');
  res.json({firstName: user.firstName, token});
}

function sendAuthError (res) {
  return res.json({success: false, message: 'Email or password incorrect'});
}

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);
