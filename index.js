'use strict';

const express = require('express');
const app = express();

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

app.get('/jokebook/categories', (req, res) => {
  res.json(categories);
});

app.get('/jokebook/joke/:category', (req, res) => {
  const c = req.param("category")
  let result;
  if(categories.includes(c)){
    let t, e = false;
    if(c == "funnyJoke")
      t = funnyJoke;
    else if(c == "lameJoke")
      t = lameJoke;
    else
      e = true;

    if(e)
      result = {error: "wrong table definition in database"}
    else{
      const r = Math.floor(Math.random() * t.length);
      result = {joke: t[r]}
    }
  }
  else{
    resut = {error: "no jokes for category " + c}
  }
  res.json(result);
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});