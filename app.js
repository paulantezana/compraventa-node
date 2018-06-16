
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');

var app = express();

const indexRoutes = require('./routes/index.js');


// Settings
app.set('port',process.env.PORT || 3000);
app.set('views',path.join(__dirname, 'views')); // settign directoy views
app.set('view engine', 'pug'); // set render engiene

// Midelwares
app.use(bodyParser.urlencoded({extended: false}));

// Rutes
app.use('/', indexRoutes);

// Startting app in node js
app.listen(app.get('port'), () => {
  console.log('Sistema compra venta EN Node JS');
});
