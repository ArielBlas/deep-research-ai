import { generateObject, generateText } from "ai";
import { ModelCallOptions, ResearchState } from "./types";
import { openrouter } from "./service";

export async function callModel<T>(
  { model, prompt, system, schema }: ModelCallOptions<T>,
  researchState: ResearchState
): Promise<T | string> {
  if (schema) {
    const { object, usage } = await generateObject({
      model: openrouter(model),
      prompt,
      system,
      schema,
    });

    researchState.tokenUsed += usage.totalTokens;
    researchState.completedSteps++;

    return object;
  } else {
    const { text, usage } = await generateText({
      model: openrouter(model),
      prompt,
      system,
    });

    researchState.tokenUsed += usage.totalTokens;
    researchState.completedSteps++;

    return text;
  }
}
