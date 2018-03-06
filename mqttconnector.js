var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://iot.office.kibu.hu:1883')

client.on('connect', function () {
client.subscribe('Neumann/SmartRoom/Frontyard/Ambient');
})
 
client.on('message', function (topic, message) {

  console.log(message);
  console.log(topic);
  if(topic=="Neumann/SmartRoom/Frontyard/Ambient"&&message==0){
    client.publish("Neumann/SmartRoom/Livingroom/Lamp/2","0");
  }
  else if(topic=="Neumann/SmartRoom/Frontyard/Ambient"&&message==1){
        client.publish("Neumann/SmartRoom/Livingroom/Lamp/2","1");
  }
})