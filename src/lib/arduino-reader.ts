import { SerialPort } from 'serialport';

import { env } from '../env/server.mjs';

// Create a port
const port = new SerialPort({
  path: env.SERIAL_PORT_PATH,
  baudRate: env.BAUD_RATE,
}).setEncoding('utf8');

export const writeData = () => {
  port.write(':I#', function (err) {
    if (err) {
      return console.error('Error on write: ', err.message);
    }
  });
};

// port.on('data', (data) => {
//   const now = new Date();
//   const info = data.split(',');
//   if (info.length >= 3) {
//     console.log(`Time: ${now}, Temperature: ${info[1]}, Humidity: ${info[2]}`);
//   }
// });