const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const compraRouter = require('./routes/compra');
const productoRouter = require('./routes/producto');
const terceroRouter = require('./routes/tercero');
const usuarioRouter = require('./routes/usuario');
const ventaRouter = require('./routes/venta');

const app = express();

// Connect database
mongoose.connect('mongodb://localhost/compraventa')
  .then(db => console.log('DB Connected'))
  .catch(err => console.log(err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'assets')));

app.use('/', indexRouter);
app.use('/compra', compraRouter);
app.use('/producto', productoRouter);
app.use('/tercero', terceroRouter);
app.use('/usuario', usuarioRouter);
app.use('/venta', ventaRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
