const express = require('express');
const PORT = process.env.PORT || 3002;
const app = express();
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

//parse string - array data
app.use(express.urlencoded({ extended: true}));

//parse json data
app.use(express.json());

//parse api routes
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// middleware instruct server to make pub folder available
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`API server now on port &{PORT}`);
});
