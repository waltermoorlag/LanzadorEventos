var process = require('./processDay');
var datenow = new Date();
process.remove({},function(err,cro){
    process.create(
        {
            day: datenow.getDay(),
            lista: [
            ]
        }
    );
    
},function(err,crono){
    console.log("ok");
    return;
});
