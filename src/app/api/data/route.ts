'use server';
import { CreateEnvDataResponse } from '@/types/backend.schema';
import { RequestMethod, ServerApiUrl } from '@/types/enum';

export async function POST(req: Request) {
  try {
    const response = await fetch(`${ServerApiUrl[RequestMethod.POST].createData()}`);
    const data = CreateEnvDataResponse.parse(await response.json());

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ success: true, message: err });
  }
}
