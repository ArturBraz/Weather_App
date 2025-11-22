import { count } from "console";
import { z } from "zod";

export const FetchWeatherQuerySchema = z.object({
  city: z.string().optional(),
});

export type FetchWeatherQueryType = z.infer<typeof FetchWeatherQuerySchema>;


export const WeatherIdParamSchema = z.object({
  id: z.string(),
});
