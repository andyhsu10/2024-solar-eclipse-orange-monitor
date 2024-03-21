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
  },
  [RequestMethod.POST]: {
    createData: () => `${env.API_BASE_URL}/data`,
    backup: () => `${env.API_BASE_URL}/backup`,
  },
  [RequestMethod.PATCH]: {},
  [RequestMethod.PUT]: {},
  [RequestMethod.DELETE]: {},
});
