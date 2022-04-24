const express = require('express');
const path = require('path');
const colors = require('colors');

const app = express();

const CONTACTS = [
    { id: 1, name: 'Alex', value: '154654696', marked: false }
];







// эти строчки следует хранить внизу программы, ничже основного кода
app.use(express.static(path.resolve(__dirname, '../client')));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'index.html'));
});

app.listen(3000, () => console.log('Server has started on port 3000...'.bgMagenta));