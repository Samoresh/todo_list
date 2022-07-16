const mongoose=require('mongoose');
const { once } = require('../../contact_list/models/contact');

mongoose.connect('mongodb://localhost/tasks_list_db');

const db=mongoose.connection;

db.on('error',console.error.bind(console,'error connecting to db'));

db.once('open',function(){
    console.log('Successfully connected to the database');
});