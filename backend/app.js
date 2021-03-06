const express = require('express');
const path = require('path');
const {v4} = require('uuid');
const PORT = require('./config/index');
require('colors');

const app = express();

let CONTACTS = [
    { id: v4(), name: 'Alex', value: '8 999 987 65 43', marked: false }
];

app.use(express.json());   // midlleware для работы с response

////endpoints
//GET
app.get('/api/contacts', (req, res) => {
    res.status(200).json(CONTACTS);
});

//POST
app.post('/api/contacts', (req,res) => {   // т.к. REST API, то route тот же самый, что и в GET запросе
    const contact = {...req.body, id: v4(), marked: false};
    CONTACTS.push(contact);
    res.status(201).json(contact);
});

//DELETE
app.delete('/api/contacts/:id', (req, res) => {
    CONTACTS = CONTACTS.filter(item => item.id !== req.params.id);
    res.status(200).json({message: "Contact was deleted"});
});

//PUT
app.put('/api/contacts/:id', (req, res) => {
    const idx = CONTACTS.findIndex(item => item.id === req.params.id);    
    CONTACTS[idx] = req.body;
    res.json(CONTACTS[idx]);
})



// эти строчки следует хранить внизу программы, ничже основного кода
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

const port = 3000 || PORT;

app.listen(port, () => console.log(`Server has started on port ${port}...`.bgMagenta));