var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.office.kibu.hu:1883')
 
client.on('connect', function () {
	console.log('connect')
  client.subscribe('/test/temp')
  client.publish('/Lights/VRarea', '0000')
})
 
client.on('message', function (topic, message) {
  // message is Buffer
  console.log(message.toString())
  console.log(topic.toString())
  //client.end()   /test/temp
})

//Semmi/teszt, szerintem így nem is mûködik
//Fölülírja a website-ot
//ha minden kész:
  //ha website-on fel/le kapcsoljuk a lámpát, akkor ezt a funkciót megállítja x ideig

//lámpa automatika
client.on('connect', function () {
    console.log('connect')
    var belsolampa = client.subscribe('Neumann/SmartRoom/Livingroom/Ambient')
    var kulsolapma = client.subscribe('Neumann/SmartRoom/Frontyard/Ambient')
    if (belsolampa==0 && kulsolampa==0) {
        client.publish('Neumann/SmartRoom/Livingroom/Lamp/1', '1')
        client.publish('Neumann/SmartRoom/Livingroom/Lamp/2', '1')
    }
    else if (belsolampa==0 && kulsolampa==1) {
        client.publish('Neumann/SmartRoom/Livingroom/Lamp/1', '0')
        client.publish('Neumann/SmartRoom/Livingroom/Lamp/1', '0')
    }
})
