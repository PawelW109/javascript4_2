'use strict';

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors())
app.use(express.json());

let categories = ['funnyJoke', 'lameJoke'];
let funnyJoke = [
  {
    'joke': 'Dlaczego komputer poszedł do lekarza?',
    'response': 'Bo złapał wirusa!'
  },
  {
    'joke': 'Dlaczego komputer nie może być głodny?',
    'response': 'Bo ma pełen dysk!'
  },
  {
    'joke': 'Co mówi jeden bit do drugiego?',
    'response': '„Trzymaj się, zaraz się przestawiamy!”'
  }
];
let lameJoke = [
  {
    'joke': 'Dlaczego programiści preferują noc?',
    'response': 'Bo w nocy jest mniej bugów do łapania!'
  },
  {
    'joke': 'Jak nazywa się bardzo szybki programista?',
    'response': 'Błyskawiczny kompilator!'
  }
];

function getCategoryTable(c) {
   if(c == "funnyJoke")
      return funnyJoke;
    else if(c == "lameJoke")
      return lameJoke;
    return null;
}

app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const c = req.param("category")
  let result;
  let t = getCategoryTable(c);
  if(t == null)
    resut = {error: "no jokes for category " + c}
  else{
    const r = Math.floor(Math.random() * t.length);
    result = {joke: t[r]}
  }
  res.json(result);
});


app.post('/jokebook/joke/:category', (req, res) => {
  const c = req.param("category")
  let result;
  let t = getCategoryTable(c);

  const j = req.body;

  if(t == null)
    result = {error: "no jokes for category " + c}
  else{
    console.log(j)
    if(j.joke && j.response){
      t.push(j)
      result = {message: "joke added successfully", joke: j}
    }
    else{
      result = {error: "wrong ", joke: j}
    }
  }
  res.json(result);
});


app.get('/jokebook/stats/', (req, res) => {
  const result = {funnyJoke: funnyJoke.length, lameJoke: lameJoke.length}
  res.json(result);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});