'use server';
import { LatestEnvDataResponse } from '@/types/backend.schema';
import { RequestMethod, ServerApiUrl } from '@/types/enum';

export async function GET(req: Request) {
  try {
    const response = await fetch(`${ServerApiUrl[RequestMethod.GET].getLatestData()}`, {
      next: { revalidate: 8 },
    });

    const data = LatestEnvDataResponse.parse(await response.json());

    return Response.json({ success: true, data: data.data });
  } catch (err) {
    console.error(err);
    return Response.json({ success: false, message: err });
  }
}
