const express = require('express');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
var db = require('./database.js');

const app = express();
app.use(express.json());

// FIXME: env var
let port, parser;
try {
  port = new SerialPort({
    path: '/dev/cu.usbserial-14330',
    baudRate: 2000000,
  });
  parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
} catch (error) {
  console.error(err);
}

// API Endpoint to send command and receive response
app.get('/data', (req, res) => {
  const sql = 'select * from environmental_data';
  const params = [];
  db.all(sql, params, (err, rows) => {
    if (err) {
      res.status(400).json({ success: false, message: err.message });
      return;
    }

    res.json({
      success: true,
      data: rows,
    });
  });
});

app.post('/data', (req, res) => {
  const now = new Date();

  // Write command to the Arduino board
  port.write(':I#', (err) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
      return;
    }

    // Listen for a single line of data from the Arduino (assuming response ends with newline)
    parser.once('data', (data) => {
      const info = data.split(',');
      if (info.length >= 3) {
        const temperature = Number(info[1]);
        const humidity = Number(info[2]);

        const insert = 'INSERT INTO environmental_data (unix_timestamp, temperature, humidity) VALUES (?,?,?)';
        db.run(insert, [now.getTime(), temperature, humidity], (err, result) => {
          if (err) {
            console.error(err);
            res.status(500).send({ success: false, message: 'Something went wrong when inserting data.' });
            return;
          } else {
            res.send({
              success: true,
              data: {
                timestamp: now.getTime(),
                temperature,
                humidity,
                result,
              },
            });
            return;
          }
        });
      }
    });
  });
});

const serverPort = 3001; // Ensure this does not conflict with your Next.js port
app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});
