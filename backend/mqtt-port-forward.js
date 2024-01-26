const randomPort = process.argv[2];
const mqtt = require('mqtt');
const { forwardLocalPortToMqtt } = require('mqtt-port-forward');
// const topic = 'mydevicessh';


// Connect to the MQTT broker (Replace this with your MQTT broker URL)
const mqttClient = mqtt.connect('mqtt://20.127.107.99:1883/');

mqttClient.on('connect', () => {
    console.log(`Connected to MQTT broker on port ${randomPort}.`);

    // Listen on localhost:2222 for connection requests and forward to 'mydevice/tunnel/down/+'
    forwardLocalPortToMqtt(mqttClient, randomPort, '7F6C');
});

mqttClient.on('message', function (topic, message) {
    console.log(message.toString())
});