const mongoose = require('mongoose');


let db

module.exports = function Connection(){
    if  (!db) {
        db = mongoose.connect('mongodb://localhost/compraventa')
            .then(db => console.log("DB Connect"))
            .catch(err => console.log(err));
    }
}