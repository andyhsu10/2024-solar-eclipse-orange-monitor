const { ReadlineParser } = require('@serialport/parser-readline');
const axios = require('axios');
const crypto = require('crypto');
const fs = require('fs');
const { SerialPort } = require('serialport');

require('dotenv').config();

// Configuration
const API_SECRET = process.env.API_SECRET;
const SERVER_URL = process.env.SERVER_URL;
const BACKUP_MINUTES = Number(process.env.BACKUP_MINUTES ?? 2);

const db = require('./database.js');

let port, parser;
try {
  port = new SerialPort({
    path: process.env.SERIAL_PORT_PATH ?? '',
    baudRate: Number(process.env.BAUD_RATE) ?? 115200, // default = 115200
  });
  parser = port.pipe(new ReadlineParser({ delimiter: '\r\n' }));
} catch (error) {
  console.error(error);
}

setTimeout(() => {
  setInterval(
    processData,
    1000 / Number(process.env.SAMPLING_RATE) ?? 2,
  );
}, 1500)

// Backup
setInterval(
  () => {
    const now = new Date();
    const sourceFilePath = 'db.sqlite';
    const destinationFilePath = `backup/${now.getTime()}.backup.sqlite`;

    // Copy the file
    fs.copyFile(sourceFilePath, destinationFilePath, (err) => {
      if (err) {
        console.error(`${now.getTime()} - Failed to backup SQLite file.`, err);
        return;
      }
      console.log(`${now.getTime()} - SQLite file backup successfully.`);
    });
  },
  BACKUP_MINUTES * 60 * 1000,
);

const processData = () => {
  const now = new Date();

  // Write command to the Arduino board
  port.write(':I#', (err) => {
    if (err) {
      res.status(500).send({ success: false, message: err });
      return;
    }

    // Listen for a single line of data from the Arduino (assuming response ends with newline)
    parser.once('data', (data) => {
      const info = data.replace(':i', '').split(',');
      if (info.length >= 4) {
        const temperature = Number(info[0]);
        let humidity = Number(info[1]);
        const pressure = Number(info[2]);

        if (humidity > 100)
          humidity = 100;
        if (humidity < 0)
          humidity = 0;

        const insert = 'INSERT INTO environmental_data (unix_timestamp, temperature, humidity, pressure) VALUES (?,?,?,?)';
        db.run(insert, [now.getTime(), temperature, humidity, pressure], (err, _) => {
          if (err) console.error(err);
        });

        // POST data to API server
        if (now.getTime() % 2000 < 500) {
          const postData = {
            h: humidity,
            t: temperature,
            ts: now.getTime(),
            p: pressure,
          };
          const sortedData = Object.keys(postData).sort().reduce((acc, key) => {
            acc[key] = postData[key];
            return acc;
          }, {});
          const payload = JSON.stringify(sortedData);
          const checksum = crypto
            .createHash('sha256')
            .update(payload + API_SECRET)
            .digest('hex');

          axios.post(`${SERVER_URL}/data`, sortedData, {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': API_SECRET,
              'X-Checksum': checksum,
            },
          })
          .then(_ => {
            const update = 'UPDATE environmental_data SET updated_at = CURRENT_TIMESTAMP, uploaded = TRUE WHERE unix_timestamp = ?';
            db.run(update, [now.getTime()], (err, _) => {
              if (err) console.error(err);
            });
            console.log('Data uploaded:', sortedData);
          })
          .catch(error => {
            console.log(sortedData, checksum)
            console.error('Error sending data to API server:', error);
          });
        }
      }
    });
  });
}