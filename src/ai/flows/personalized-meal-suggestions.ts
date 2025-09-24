'use server';

/**
 * @fileOverview A personalized meal suggestion AI agent.
 *
 * - personalizedMealSuggestions - A function that generates personalized meal suggestions based on dietary restrictions and previous orders.
 * - PersonalizedMealSuggestionsInput - The input type for the personalizedMealSuggestions function.
 * - PersonalizedMealSuggestionsOutput - The return type for the personalizedMealSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const PersonalizedMealSuggestionsInputSchema = z.object({
  dietaryRestrictions: z
    .string()
    .describe('The dietary restrictions of the user (e.g., vegetarian, vegan, gluten-free, allergies).'),
  previousOrders: z
    .string()
    .describe('The user\'s previous orders, as a list of meal names and restaurant names.'),
});
export type PersonalizedMealSuggestionsInput = z.infer<
  typeof PersonalizedMealSuggestionsInputSchema
>;

const PersonalizedMealSuggestionsOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('A list of personalized meal suggestions based on the dietary restrictions and previous orders.'),
});
export type PersonalizedMealSuggestionsOutput = z.infer<
  typeof PersonalizedMealSuggestionsOutputSchema
>;

export async function personalizedMealSuggestions(
  input: PersonalizedMealSuggestionsInput
): Promise<PersonalizedMealSuggestionsOutput> {
  return personalizedMealSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'personalizedMealSuggestionsPrompt',
  input: {schema: PersonalizedMealSuggestionsInputSchema},
  output: {schema: PersonalizedMealSuggestionsOutputSchema},
  prompt: `You are a personalized meal suggestion agent. Given the dietary restrictions and previous orders of a user, you will generate a list of personalized meal suggestions.\n\nDietary Restrictions: {{{dietaryRestrictions}}}\nPrevious Orders: {{{previousOrders}}}\n\nSuggestions:`, // Improved prompt
});

const personalizedMealSuggestionsFlow = ai.defineFlow(
  {
    name: 'personalizedMealSuggestionsFlow',
    inputSchema: PersonalizedMealSuggestionsInputSchema,
    outputSchema: PersonalizedMealSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
