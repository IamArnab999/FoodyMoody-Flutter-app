'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Sparkles, Loader2 } from 'lucide-react';
import { personalizedMealSuggestions } from '@/ai/flows/personalized-meal-suggestions';
import { Textarea } from './ui/textarea';
import { useToast } from '@/hooks/use-toast';

export default function AiSuggestionModal() {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [suggestion, setSuggestion] = useState('');
  const [dietaryRestrictions, setDietaryRestrictions] = useState('Vegetarian');
  const [previousOrders, setPreviousOrders] = useState('Margherita Pizza from Bella Italia, Tonkotsu Ramen from Sushi Zen');
  const { toast } = useToast();

  const getSuggestion = async () => {
    setLoading(true);
    setSuggestion('');
    try {
      const result = await personalizedMealSuggestions({
        dietaryRestrictions,
        previousOrders,
      });
      setSuggestion(result.suggestions);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Could not generate suggestions. Please try again.",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <Sparkles className="mr-2 h-4 w-4" />
          Get Suggestions
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="font-headline text-2xl">Personalized Suggestions</DialogTitle>
          <DialogDescription>
            Tell us your preferences, and we'll suggest something delicious.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="diet" className="text-right">
              Diet
            </Label>
            <Input
              id="diet"
              value={dietaryRestrictions}
              onChange={(e) => setDietaryRestrictions(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Vegetarian, Gluten-Free"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="orders" className="text-right">
              Past Orders
            </Label>
            <Textarea
              id="orders"
              value={previousOrders}
              onChange={(e) => setPreviousOrders(e.target.value)}
              className="col-span-3"
              placeholder="e.g., Pizza, Sushi, Burgers"
            />
          </div>
        </div>

        {loading && (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        )}

        {suggestion && (
          <div className="p-4 border bg-muted/50 rounded-md">
            <h4 className="font-semibold mb-2 font-headline">Here's what we found for you:</h4>
            <p className="text-sm text-foreground">{suggestion}</p>
          </div>
        )}

        <DialogFooter>
          <Button onClick={getSuggestion} disabled={loading}>
            {loading ? 'Generating...' : 'Generate Suggestions'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
