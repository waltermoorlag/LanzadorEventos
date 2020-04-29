var mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/gate_NEWMODEL", {
    reconnectTries: 60,
    reconnectInterval: 1000
});

module.exports = mongoose.model('monitor_eventos',
    new mongoose.Schema({
        ultima_busqueda: String,
        eventos: []
    })
);