var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gate_NEWMODEL", {
    reconnectTries: 60,
    reconnectInterval: 1000
});

module.exports = mongoose.model('processday',
    new mongoose.Schema({
        day: String,
        lista: []

    })
);