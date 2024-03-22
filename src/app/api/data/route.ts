'use server';
import { AllEnvDataResponse } from '@/types/backend.schema';
import { RequestMethod, ServerApiUrl } from '@/types/enum';

export async function GET(req: Request) {
  try {
    const response = await fetch(`${ServerApiUrl[RequestMethod.GET].getAllData()}`, {
      next: { revalidate: 0.75 },
    });

    const data = AllEnvDataResponse.parse(await response.json());

    return Response.json({ success: true, data: data.data });
  } catch (err) {
    console.error(err);
    return Response.json({ success: true, message: err });
  }
}
