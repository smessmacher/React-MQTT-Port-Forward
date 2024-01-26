const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { execSync } = require('child_process');
const mqtt = require('mqtt');
const { forwardLocalPortToMqtt } = require('mqtt-port-forward');

const app = express();
const port = 3001;
const mqttClient = mqtt.connect('mqtt://20.127.107.99:1883/');

mqttClient.on('connect', () => {
  console.log(`Connected to MQTT broker.`);
});

app.use(cors());
app.use(bodyParser.json());

app.post('/api/log', (req, res) => {
    const { message } = req.body;
    console.log('Received message from frontend:', message);

    const result = execSync('./test.sh', { encoding: 'utf-8' });
    const cleanResult = result.trim();
    console.log(`Forwarding port: ${cleanResult}`);

    // Send the cleanResult back to the frontend
    res.status(200).json({ success: true, message: cleanResult });
    forwardLocalPortToMqtt(mqttClient, cleanResult, message);
    
  });


app.listen(port, () => {
  console.log(`Backend server is running on http://localhost:${port}`);
});
