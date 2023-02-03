import { Configuration } from "openai";
export const configuration = new Configuration({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
});
