const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

let messages = [{text: 'some text', owner: 'Pesho'}, {text: 'other text', owner: 'Gosho'}];
let users = [];

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

auth.post('/register', (req, res) => {
  users.push(req.body);
})

app.use('/api', api);
app.use('/auth', auth);

app.listen(63145);
