//npm install express http body-parser reload morgan path node-fetch socket.io nodemon reload
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');
var reload = require('reload');
var logger = require('morgan');
var app = express();
var path = require('path');
const fetch = require('node-fetch');
app.use('/', express.static(__dirname + '/public'));
app.use(bodyParser.json());
//app.use(logger('combined'));
app.set('port', process.env.PORT || 3000);

app.get('/', function (req, res) {
  res.sendFile('index.html');
});

const uri = "d1be1b68";

//const URL=`https://${uri}.ngrok.io/adoweb/php/`;
const URL = `http://127.0.0.1/adoweb/php/`;

const getData = async (file, fechas) => {


  console.log(`${URL}${file}.php`);
  try {
    let data = `?fecha1=${fechas.fecha1}&fecha2=${fechas.fecha2}`;
    console.log(`${URL}${file}.php${data}`);
    const response = await fetch(`${URL}${file}.php${data}`);
    let datos = await response.json();
    //    console.log(datos);
    return (datos);
  } catch (error) {
    console.error("Error:" + error.message);

  }
}

const getDatai = async (file, dfechas) => {

  console.log(dfechas);
  console.log(`${URL}${file}.php`);
  try {
    let data = `?paciente=${dfechas.paciente}&fecha1=${dfechas.fecha1}&fecha2=${dfechas.fecha2}`;
    console.log(`${URL}${file}.php${data}`);
    const response = await fetch(`${URL}${file}.php${data}`);
    let datos = await response.json();
    //    console.log(datos);
    return (datos);
  } catch (error) {
    console.error("Error:" + error.message);

  }
}


const postData = async (file, data) => {


  console.log(`${URL}${file}.php`);
  console.log(data);
  try {


    let info = { data: data };
    console.log(info);
    const response = await fetch(`${URL}${file}.php`, {

      method: 'POST', // or 'PUT'
      body: JSON.stringify(data), // data can be `string` or {object}!
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Content-Length': data.length
      }
    });


    let datos = await response.json();
    console.log(datos);
    return (datos);
  } catch (error) {
    console.error("Error:" + error.message);

  }
}



app.post('/citas', async (req, res) => {

  console.log(req.body);
  res.send(await getData("getCitas_", req.body));

});

app.post('/arips', async (req, res) => {

  console.log(req.body);
  res.send(await getData("arips", req.body));

});


app.get('/url', async (req, res) => {

  res.send({ "servidor": URL });
});

app.post('/ripsUsuarios', async (req, res) => {


  res.send(await getData("ripsUsuarios", req.body));

});


app.post('/ripsConsulta', async (req, res) => {


  res.send(await getData("ripsConsulta", req.body));

});

app.post('/ripsConsultai', async (req, res) => {

  console.log(req.body);
  res.send(await getDatai("ripsConsulta", req.body));

});

app.post('/ripsProcedimientos', async (req, res) => {


  res.send(await getData("ripsProcedimientos", req.body));

});


app.post('/ripsTransacciones', async (req, res) => {


  res.send(await getData("ripsTransacciones", req.body));

});


app.post('/actualizaInds', async (req, res) => {


  res.send(await postData("actualizaInds", req.body));

});

app.post('/actuaEvol', async (req, res) => {


  res.send(await postData("actualizaEvolucion", req.body));

});



app.post('/noactualizaInds', async (req, res) => {


  res.send(await postData("noactualizaInds", req.body));

});


var server = http.createServer(app);
reload(app).then(function (reloadReturned) {
  // reloadReturned is documented in the returns API in the README

  // Reload started, start web server
  server.listen(app.get('port'), function () {
    console.log('Web server listening on port ' + app.get('port'))
  })
}).catch(function (err) {
  console.error('Reload could not start, could not start server/sample app', err)
})
/*
app.listen(8080,()=>{


  console.log("Server on port 8080");

});*/