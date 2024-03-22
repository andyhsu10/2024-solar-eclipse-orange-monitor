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

    const interval = getInterval(rows.length);
    const sampledRows = [];
    for (let i = rows.length - 1; i >= 0; i -= interval) {
      sampledRows.push(rows[i]);
    }

    res.json({
      success: true,
      data: sampledRows.reverse(),
    });
  });
});

setInterval(
  () => {
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
            if (err) console.error(err);
          });
        }
      });
    });
  },
  1000 / Number(process.env.SAMPLING_RATE) ?? 2,
);

const serverPort = 3001; // Ensure this does not conflict with your Next.js port
app.listen(serverPort, () => {
  console.log(`Server listening on port ${serverPort}`);
});

const getInterval = (num) => {
  if (num <= 1000) return 1;

  const interval = Math.floor(Math.log10(num)) - 1;
  return interval;
};
