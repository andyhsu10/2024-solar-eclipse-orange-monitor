import { env } from '@/env/server.mjs';

export const enum RequestMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

export const ServerApiUrl = Object.freeze({
  [RequestMethod.GET]: {
    getAllData: () => `${env.API_BASE_URL}/data`,
    getLatestData: () => `${env.API_BASE_URL}/data/latest`,
  },
  [RequestMethod.POST]: {},
  [RequestMethod.PATCH]: {},
  [RequestMethod.PUT]: {},
  [RequestMethod.DELETE]: {},
});
