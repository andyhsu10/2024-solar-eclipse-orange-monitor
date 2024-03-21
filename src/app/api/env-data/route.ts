'use server';

import { SerialPort } from 'serialport';

import { env } from '@/env/server.mjs';
import { ReadlineParser } from '@serialport/parser-readline';

// Create a port
const port = new SerialPort({
  path: env.SERIAL_PORT_PATH,
  baudRate: env.BAUD_RATE,
}).setEncoding('utf8');
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }))

export async function POST(req: Request) {
  const reqData = await req.json();
  console.log({ reqData })

  try {
    port.write(':I#', (err) => {
      if (err) {
        return Response.json({success: false, message: err}, {status: 500});
      }

      // Listen for a single line of data from the Arduino (assuming response ends with newline)
      parser.once('data', data => {
        console.log('Received response from Arduino:', data);
      });
  });
    return Response.json({ success: true, data: true });
  } catch (err) {
    return Response.json({ success: true, message: err });
  }
}
