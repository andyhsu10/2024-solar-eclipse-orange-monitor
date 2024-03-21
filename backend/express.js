const { ReadlineParser } = require('@serialport/parser-readline');
const express = require('express');
const { SerialPort } = require('serialport');

require('dotenv').config();
const db = require('./database.js');

const app = express();
app.use(express.json());

// FIXME: env var
let port, parser;
try {
  port = new SerialPort({
    path: process.env.SERIAL_PORT_PATH ?? '',
    baudRate: Number(process.env.BAUD_RATE) ?? 2 * 1000 * 1000, // default = 2M
  });
  parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
} catch (error) {
  console.error(error);
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

    const length = getDataNumber(rows.length);
    const interval = rows.length / length;
    const sampledRows = [];
    for (let i = 0; i < length; i += interval) {
      sampledRows.push(rows[Math.floor(i)]);

      // Ensure exactly sampleSize elements are added
      if (sampledRows.length >= length) break;
    }

    res.json({
      success: true,
      data: sampledRows,
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
                unix_timestamp: now.getTime(),
                temperature,
                humidity,
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

const getDataNumber = (num) => {
  if (num <= 0) return num;
  if (num < 100) return num;

  const magnitude = Math.floor(Math.log10(num));
  return Math.pow(10, magnitude);
};
