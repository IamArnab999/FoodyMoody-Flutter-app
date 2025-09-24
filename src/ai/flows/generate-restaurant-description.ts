'use server';

/**
 * @fileOverview An AI agent that generates a description of a restaurant based on its menu and reviews.
 *
 * - generateRestaurantDescription - A function that generates the restaurant description.
 * - GenerateRestaurantDescriptionInput - The input type for the generateRestaurantDescription function.
 * - GenerateRestaurantDescriptionOutput - The return type for the generateRestaurantDescription function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateRestaurantDescriptionInputSchema = z.object({
  menu: z.string().describe('The menu of the restaurant.'),
  reviews: z.string().describe('The reviews of the restaurant.'),
});
export type GenerateRestaurantDescriptionInput = z.infer<
  typeof GenerateRestaurantDescriptionInputSchema
>;

const GenerateRestaurantDescriptionOutputSchema = z.object({
  description: z
    .string()
    .describe('A description of the restaurant based on its menu and reviews.'),
});
export type GenerateRestaurantDescriptionOutput = z.infer<
  typeof GenerateRestaurantDescriptionOutputSchema
>;

export async function generateRestaurantDescription(
  input: GenerateRestaurantDescriptionInput
): Promise<GenerateRestaurantDescriptionOutput> {
  return generateRestaurantDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateRestaurantDescriptionPrompt',
  input: {schema: GenerateRestaurantDescriptionInputSchema},
  output: {schema: GenerateRestaurantDescriptionOutputSchema},
  prompt: `You are a restaurant critic. Generate a description of the restaurant based on its menu and reviews.

Menu: {{{menu}}}

Reviews: {{{reviews}}}

Description:`,
});

const generateRestaurantDescriptionFlow = ai.defineFlow(
  {
    name: 'generateRestaurantDescriptionFlow',
    inputSchema: GenerateRestaurantDescriptionInputSchema,
    outputSchema: GenerateRestaurantDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
