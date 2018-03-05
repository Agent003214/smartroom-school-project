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
  //client.end()
})

//Semmi/teszt, szerintem így nem is mûködik
client.on('connect', function () {
    console.log('connect')
    var lampa = client.subscribe('Neumann/SmartRoom/Livingroom/Ambient')
    if (lampa==1) {
        client.publish('Neumann/SmartRoom/Livingroom/Lamp/1', '0')
    }
    else if (lampa==0) {
        client.publish('Neumann/SmartRoom/Livingroom/Lamp/1', '1')
    }
    
})