import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  server: {
    API_BASE_URL: z.string().url(),
    SAMPLING_RATE: z.coerce.number().default(2), // Hz
  },
});
