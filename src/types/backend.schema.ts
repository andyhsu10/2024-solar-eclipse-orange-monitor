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

export const CreateEnvData = z.object({
  unix_timestamp: z.number(),
  temperature: z.number(),
  humidity: z.number(),
});

export const EnvData = CreateEnvData.merge(
  z.object({
    id: z.number(),
    created_at: z.string(),
  }),
);

export const AllEnvData = z.array(EnvData);

export const CreateEnvDataResponse = ApiSuccessResponse(CreateEnvData);
export const AllEnvDataResponse = ApiSuccessResponse(AllEnvData);

export type CreateEnvDataResponse = z.infer<typeof CreateEnvDataResponse>;
export type AllEnvDataResponse = z.infer<typeof AllEnvDataResponse>;
