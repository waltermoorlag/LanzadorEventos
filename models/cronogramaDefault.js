var cronograma = require('./cronograma');
cronograma.remove({},function(err,cro){
    cronograma.create(
        {
            lista: [
                {
                    descrip: "Limpieza de Logs Amazon",
                    time: "0100",
                    opt: {
                        timeout: 60000,
                        url: "http://18.229.201.234:3000/deleteLog",
                        method: 'GET'
                        // form: { 'action': 'sap_pm' }
                    },
                    reintenta: false
                },
                {
                    descrip: "Reporte Turno 3",
                    time: "0450",
                    opt: {
                        timeout: 60000,
                        url: "https://dbsmartfleetne69414e6.br1.hana.ondemand.com/Tenaris/Reportes?Request=Alarmas&Turno=3",
                        method: 'GET'
                        // form: { 'action': 'sap_pm' }
                    },
                    reintenta: false
                },
                {
                    descrip: "Reporte Turno 1",
                    time: "1250",
                    opt: {
                        timeout: 60000,
                        url: "https://dbsmartfleetne69414e6.br1.hana.ondemand.com/Tenaris/Reportes?Request=Alarmas&Turno=1",
                        method: 'GET'
                        // form: { 'action': 'sap_pm' }
                    },
                    reintenta: false
                },
                {
                    descrip: "Reporte Turno 2",
                    time: "2050",
                    opt: {
                        timeout: 60000,
                        url: "https://dbsmartfleetne69414e6.br1.hana.ondemand.com/Tenaris/Reportes?Request=Alarmas&Turno=2",
                        method: 'GET'
                        // form: { 'action': 'sap_pm' }
                    },
                    reintenta: false
                },
                {
                    descrip: "SAP PM",
                    time: "2300",
                    opt: {
                        timeout: 60000,
                        url: "https://dbsmartfleetne69414e6.br1.hana.ondemand.com/Tenaris/Servlet",
                        method: 'POST',
                        form: { 'action': 'sap_pm' }
                    },
                    reintenta: true
                },
                {
                    descrip: "SP Reporte SAC",
                    time: "2305",
                    opt: {
                        timeout: 60000,
                        url: "https://dbsmartfleetne69414e6.br1.hana.ondemand.com/Tenaris/Servlet",
                        method: 'POST',
                        form: { 'action': 'callSP' }
                    },
                    reintenta: false
                },
                { 
                    descrip: "Sp HANA Devices",
                    time: "0001", 
                    callOpt : "(function(){ return bodySpEvent(1)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0033", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0133", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0233", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0333", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0433", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0533", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0633", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0733", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0833", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "0933", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1033", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1133", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1233", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1333", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1433", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1533", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1633", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1733", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1833", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "1933", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "2033", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "2133", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "2233", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                },
                { 
                    descrip: "Sp Check HANA status",
                    time: "2333", 
                    callOpt : "(function(){ return bodySpEvent(2)})", 
                    reintenta: false
                }
            ]
        }
    );
    
},function(err,crono){
    console.log("ok");
    return;
});
