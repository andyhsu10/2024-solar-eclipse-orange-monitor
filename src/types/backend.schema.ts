import { z, ZodType } from 'zod';

export const ApiSuccessResponse = <T extends ZodType>(dataType: T) => {
  return z.object({
    success: z.literal(true),
    data: dataType,
  });
};

export const ApiFailedResponse = z.object({
  success: z.literal(false),
  message: z.string(),
});

export const EnvData = z.object({
  ts: z.number(),
  t: z.number(),
  h: z.number(),
  p: z.number(),
});

export const AllEnvData = z.array(EnvData);

export const AllEnvDataResponse = ApiSuccessResponse(AllEnvData);
export const LatestEnvDataResponse = ApiSuccessResponse(EnvData.nullable());

export type AllEnvDataResponse = z.infer<typeof AllEnvDataResponse>;
export type LatestEnvDataResponse = z.infer<typeof LatestEnvDataResponse>;
