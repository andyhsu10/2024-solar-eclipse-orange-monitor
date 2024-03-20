import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    BAUD_RATE: z.number().default(2 * 1000 * 1000), // default = 2M
    SAMPLING_RATE: z.number().default(1), // Hz
    SERIAL_PORT_PATH: z.string(),
  },
});
