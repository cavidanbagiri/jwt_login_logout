const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const cors = require('cors');
require('dotenv').config()


app.use(express.json());
app.use(cookieParser());
app.use(cors(
  {
    credentials: true,
    origin: ['http://localhost:5173'],
  }
));

// import error 
const error_handler = require('./src/middleware/errorHandler');

// import routes
const { UserRouter, CategoryRouter, CountriesRouter, ItemsRouter, CardRouter } = require('./src/routes');

// use routes
app.use('/api/user', UserRouter);
app.use('/api/category', CategoryRouter);
app.use('/api/countries', CountriesRouter);
app.use('/api/items', ItemsRouter);
app.use('/api/cards', CardRouter);


// handle error
app.use(error_handler);

app.listen(process.env.PORT, () => {
    console.log('port Listening in ', process.env.PORT);
    require('./src/configs/databaseConnection');
});

