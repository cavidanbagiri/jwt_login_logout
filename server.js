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
const { UserRouter } = require('./src/routes');

// use routes
app.use('/api/user', UserRouter);


// handle error
app.use(error_handler);

app.listen(process.env.PORT, () => {
    console.log('port Listening in ', process.env.PORT);
    require('./src/configs/databaseConnection');
});

