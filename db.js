var mongoose = require('mongoose');

//DB Connection
mongoose.connect('mongodb://localhost/testdatabase', function (error) {
    if (error) {
            console.log(error);
    }
});

module.exports = mongoose.connection;