'use client';

import { RequestMethod } from '@/types/enum';

export const getData = async () => {
  const res = await fetch('/api/data');

  const data = await res.json();
  return data;
};

export const createData = async () => {
  const res = await fetch('/api/data', { method: RequestMethod.POST });

  const data = await res.json();
  return data;
};

export const apiWrapper = (api: () => Promise<any>, callback: (result: any) => void) => {
  api()
    .then((result) => {
      if ('errObj' in result) {
        console.error(`Ooops... Something went wrong: ${result}`);
      }

      callback(result);
    })
    .catch((err) => console.error(`Ooops... Something went wrong: ${err}`));
};
