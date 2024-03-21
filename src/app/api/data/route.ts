'use server';
import { AllEnvDataResponse, CreateEnvDataResponse } from '@/types/backend.schema';
import { RequestMethod, ServerApiUrl } from '@/types/enum';

export async function GET(req: Request) {
  try {
    const response = await fetch(`${ServerApiUrl[RequestMethod.GET].getAllData()}`);
    const data = AllEnvDataResponse.parse(await response.json());

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ success: true, message: err });
  }
}

export async function POST(req: Request) {
  try {
    const response = await fetch(`${ServerApiUrl[RequestMethod.POST].createData()}`);
    const data = CreateEnvDataResponse.parse(await response.json());

    return Response.json({ success: true, data });
  } catch (err) {
    return Response.json({ success: true, message: err });
  }
}
