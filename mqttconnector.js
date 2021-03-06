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

    //2 szenzoros
 /* if ((topic == "Neumann/SmartRoom/Frontyard/Ambient" && message == 0) && (topic == "Neumann/SmartRoom/Livingroom/Ambient" && message == 0)) {
      client.publish("Neumann/SmartRoom/Livingroom/Lamp/1", "1");
      client.publish("Neumann/SmartRoom/Livingroom/Lamp/2", "1");
  }
  else if ((topic == "Neumann/SmartRoom/Frontyard/Ambient" && message == 1) && (topic == "Neumann/SmartRoom/Livingroom/Ambient" && message == 0)) {
      client.publish("Neumann/SmartRoom/Livingroom/Lamp/1", "0");
      client.publish("Neumann/SmartRoom/Livingroom/Lamp/2", "0");
  }*/
})


//Red�ny
client.on('connect', function () {
    client.subscribe('Neumann/SmartRoom/Livingroom/Window')
    client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    console.log(topic)
    if (topic == 'Neumann/SmartRoom/Livingroom/Shades' && message >= 2) {
        console.log("A red�ny le van h�zva")
    }
    else if (topic == 'Neumann/SmartRoom/Livingroom/Shades' && message <= 2) {
        client.publish("Neumann/SmartRoom/Livingroom/Window")
    }
})

//T�z
client.on('connect', function () {
    client.subscribe('Neumann/SmartRoom/Livingroom/Smoke');
})

client.on('message', function (topic, message) {

    console.log(message);
    console.log(topic);
    if (topic == "Neumann/SmartRoom/Livingroom/Smoke" && message == 0) {
        break;
    }
    else if (topic == "Neumann/SmartRoom/Livingroom/Smoke" && message == 1) {
        client.publish("Neumann/SmartRoom/Livingroom/Window", "0");
        client.publish("Neumann/SmartRoom/Livingroom/Heater", "0");
        client.publish("Neumann/SmartRoom/Livingroom/Cooler", "100");
        client.publish("Neumann/SmartRoom/Frontyard/Doorlock", "0");
        client.publish("Neumann/SmartRoom/Livingroom/Lamp/1", "0");
        client.publish("Neumann/SmartRoom/Livingroom/Lamp/2", "0");
    }
})


//alapk�d
/*var mqtt = require('mqtt')
var client = mqtt.connect('mqtt://test.mosquitto.org')

client.on('connect', function () {
    client.subscribe('presence')
    client.publish('presence', 'Hello mqtt')
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString())
    client.end()
})*/