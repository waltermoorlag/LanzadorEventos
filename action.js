var request = require('request');
var monitorEventos = require('./models/monitor_eventos');
var cronograma = require('./models/cronograma');
var processday = require('./models/processDay');
var event = [];
// var processError = [];
var dia = new Date();
dia.setHours(dia.getHours() - 3);

var timeInterval = 60000; // cada 1 minutos

var iniSetInterval = function () {
	processday.findOne({}, function (err, listProcess) {
		cronograma.findOne({}, function (err, listCrono) {
			var crono = listCrono.lista;
			var datenow = new Date();
			datenow.setHours(datenow.getHours() - 3);
			if (listProcess.day !== datenow.getDay().toString()) {
				listProcess.lista = [];
				listProcess.day = datenow.getDay().toString();
				listProcess.save();
			}
			var dif = 60 - datenow.getSeconds();
			timeInterval = (dif + 3) * 1000;
			var inde = "" + ajustar(2, datenow.getHours()) + ajustar(2, datenow.getMinutes());

			agregarEvento("Buscando evento:" + inde, false);

			event = crono.filter(function (item) {
				return item.time <= inde && listProcess.lista.indexOf(item.time) < 0;
			});

			// adjuntarEventError(event);

			if (event.length > 0) {
				execEvent();
			} else {
				setTimeout(iniSetInterval, timeInterval);
			}
			
		})
	})
}

// function adjuntarEventError(eventArray) {
// 	if (processError.length > 0) {
// 		for (let index = 0; index < processError.length; index++) {
// 			if (eventArray.filter(item => item.time === processError[index].time).length === 0) {
// 				eventArray.push(processError[index]);
// 			}
// 		}
// 	}
// }

function execEvent() {
	if (event.length > 0) {
		// console.log(event[0].callOpt);
		if(event[0].callOpt){
			event[0]['opt'] = eval(event[0].callOpt)();
		}
		// console.log(event[0].opt);
		request(event[0].opt, function (error, response) {
			// console.log("Codigo de respuesta:",response.statusCode);
			if (error || (response.statusCode !== 200 && response.statusCode !== 201)) {
				// processError.push(event[0]);
				console.log(error);
				enviarEmail(event[0], ((response && response.body) ? response.body : ""));
				
				if(!event[0].reintenta){
					processday.findOne({}, function (err, listProcess) {
						listProcess.lista.push(event[0].time);
						listProcess.save();
						event.splice(0, 1);
						execEvent();	
					});	
				} else {
					event.splice(0, 1);
					execEvent();
				}

				
			} else {
				processday.findOne({}, function (err, listProcess) {
					listProcess.lista.push(event[0].time);
					listProcess.save();
					// processday.update({},{ $push : { lista: event[0].time }});
					// processError = processError.filter(item => item.time !== event[0].time);
					var datenow = new Date();
					datenow.setHours(datenow.getHours() - 3);
					var stringData = 'Evento exitoso: ' + event[0].time + ' -> ' + event[0].descrip + '<br>';
					stringData += 'Datos de evento:' + JSON.stringify(event[0].opt).toString() + '<br>';
					stringData += 'StatusCode:' + response.statusCode + '<br>';
					if (response.body.length > 0) {
						stringData += 'Body:' + response.body + '';
					} else {
						response.on('error', function (e) {
							stringData += e;
						});
					}
					agregarEvento(stringData, true);
					event.splice(0, 1);
					execEvent();
				});
			}
		});
	} else {
		setTimeout(iniSetInterval, timeInterval);
	}
	return;

}
iniSetInterval();


function enviarEmail(event, detailError) {
	var stringData = '<h1>' + event.time + ' -> ' + event.descrip + '</h1>';
	stringData += '<p>{ timeout: ' + event.opt.timeout + ',</p>';
	stringData += '<p>  url: ->' + event.opt.url + '<-,</p>';
	stringData += '<p>  method: ' + event.opt.method + ',</p>'; 
	stringData += event.opt.form ? ('<p>  form: ' + JSON.stringify(event.opt.form).toString() + ' }</p>') : '';
	stringData += event.opt.body ? ('<p>  body: ' + JSON.stringify(event.opt.body).toString() + ' }</p>') : '';
	stringData += '<br>';
	stringData += '<h3>  Error: </h3>';
	stringData += '<div>' + detailError + '</div>';

	var stringEvent = 'Error evento:' + event.time + ' -> ' + event.descrip + '<br>';
	stringEvent += 'Datos de evento:' + JSON.stringify(event.opt).toString() + '<br>';
	stringEvent += 'Error: ' + decodeError(detailError) + '';
	agregarEvento(stringEvent, true);
	var emailBody = {
		to: 'tenaris@dbtrust.com.ar',
		subject: 'Error en Evento ' + event.time,
		text: 'Texto del evento',
		specific_html: stringData
	}
	var optionEmail = {
		timeout: 10000,
		url: "http://34.209.112.168:3000/service/emailEvent",
		method: 'POST',
		form: emailBody
	}
	request(optionEmail, function (error, response) {
	});

}

function ajustar(tam, num) {
	tam = tam - 1;
	if (num.toString().length <= tam) return ajustar(tam, "0" + num)
	else return num;
}

function agregarEvento(stringData, esEvento) {
	// var datenow = new Date();
	// datenow.setHours(datenow.getHours() - 3);
	var stringDate = obtenerStringHora();
	monitorEventos.findOne({}, function (err, monitor) {
		if (!monitor) {
			if (esEvento) {
				monitorEventos.create({
					ultima_busqueda: "",
					eventos: [{ date: stringDate, message: stringData }]
				});
			} else {
				monitorEventos.create({
					ultima_busqueda: stringData,
					eventos: [{ date: "", message: "" }]
				})
			}
		} else {
			if (esEvento) {
				monitor.eventos.push({ date: stringDate, message: stringData });
				if (monitor.eventos.length > 30) {
					monitor.eventos.splice(0, 1);
				}
			} else {
				monitor.ultima_busqueda = stringData;
			}
			monitor.save();
		}
	});
}

function obtenerStringHora() {
	var dateNow = new Date();
	var dateUTC = new Date(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(), dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds())
	var tz = -3;
	var seconds = (tz * 60 * 60) * 1000;
	dateUTC.setTime(dateUTC.getTime() + seconds);
	var fechayhora = dateUTC;
	var stringHora = ajustar(2, fechayhora.getDate()) + '/' + ajustar(2, (fechayhora.getMonth() + 1)) + '/' + fechayhora.getFullYear() + ' ' + ajustar(2, fechayhora.getHours()) + ':' + ajustar(2, fechayhora.getMinutes()) + ':' + ajustar(2, fechayhora.getSeconds());
	return stringHora;
}

function decodeError(errString) {
	var stringReturn = "";
	if (errString.indexOf('<body><h1>') >= 0) {
		stringReturn = errString.substring(errString.indexOf('<body><h1>') + 10, errString.indexOf('</h1></body>'));
	} else {
		stringReturn = errString
	}
	return stringReturn;
}


var bodySpEvent = function (eventNumber) {
	var username = "dbtrust_team", password = "dbTrust#6";
	var auth = "Basic " + new Buffer(username + ":" + password).toString("base64");
	var item = {
		"DATE": "/Date(" + getTime() + ")/",
		"EVENT": eventNumber
	}
	return {
		timeout: 30000,
		url: "https://smtf1ne69414e6.br1.hana.ondemand.com/Connected/app.xsodata/P_EVENT",
		method: 'POST',
		headers: {
			"Authorization": auth,
			"x-csrf-token": "fetch",
			"Content-Type": "application/json",
			"Accept": "application/json"
		},
		body: JSON.stringify(item)
	}

}

function getTime() {
    var dateNow = new Date();
    var dateUTC = new Date(dateNow.getUTCFullYear(), dateNow.getUTCMonth(), dateNow.getUTCDate(), dateNow.getUTCHours(), dateNow.getUTCMinutes(), dateNow.getUTCSeconds())
    var tz = -3;
    var seconds = (tz * 60 * 60) * 1000;
    return dateUTC.getTime() + seconds;
}
