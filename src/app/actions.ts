'use server';

import { answerForestryQuery } from '@/ai/flows/answer-forestry-query';

export async function submitQuery(
  query: string
): Promise<{ answer: string } | { error: string }> {
  if (!query || query.length < 10) {
    return { error: 'Query must be at least 10 characters long.' };
  }
  if (query.length > 500) {
    return { error: 'Query cannot be more than 500 characters.' };
  }

  try {
    const result = await answerForestryQuery({ query });
    if (!result.answer) {
        throw new Error("Received an empty answer from the AI.");
    }
    return { answer: result.answer };
  } catch (e) {
    console.error('Error in submitQuery action:', e);
    return { error: 'Failed to get an answer from the AI. Please try again later.' };
  }
}
