import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import Exa from "exa-js";

export const exa = new Exa(process.env.EXA_RESERCH_API_KEY || "");

export const openrouter = createOpenRouter({
  apiKey: process.env.OPENROUTER_API_KEY || "",
});
