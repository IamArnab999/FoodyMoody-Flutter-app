"use client";
import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import type { Meal } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { useToast } from "@/hooks/use-toast";

export default function OrderCustomizationSheet({
  meal,
  children,
}: {
  meal: Meal;
  children: React.ReactNode;
}) {
    const { toast } = useToast();
    const [open, setOpen] = React.useState(false);

    const handleAddToCart = () => {
        toast({
            title: "Added to cart!",
            description: `${meal.name} has been added to your order.`,
        });
        setOpen(false);
    }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">
            Customize {meal.name}
          </SheetTitle>
          <SheetDescription>{meal.description}</SheetDescription>
        </SheetHeader>
        <div className="flex-1 overflow-y-auto py-4 space-y-6">
          {meal.customizations?.map((customization, index) => (
            <div key={index}>
              <h4 className="font-semibold mb-3">{customization.title}</h4>
              {customization.type === "checkbox" && (
                <div className="space-y-3">
                  {customization.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <Checkbox id={`${index}-${optIndex}`} />
                        <Label htmlFor={`${index}-${optIndex}`}>{option.name}</Label>
                      </div>
                      {option.priceModifier && (
                        <span className="text-sm text-muted-foreground">
                          +€{option.priceModifier.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
              {customization.type === "radio" && (
                <RadioGroup defaultValue={customization.options[0].name}>
                  {customization.options.map((option, optIndex) => (
                    <div
                      key={optIndex}
                      className="flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={option.name}
                          id={`radio-${index}-${optIndex}`}
                        />
                        <Label htmlFor={`radio-${index}-${optIndex}`}>{option.name}</Label>
                      </div>
                      {option.priceModifier && (
                        <span className="text-sm text-muted-foreground">
                          +€{option.priceModifier.toFixed(2)}
                        </span>
                      )}
                    </div>
                  ))}
                </RadioGroup>
              )}
            </div>
          ))}
        </div>
        <SheetFooter className="mt-auto">
            <div className="w-full space-y-4">
                <Separator />
                <div className="flex justify-between items-center text-xl font-bold">
                    <span>Total</span>
                    <span>€{meal.price.toFixed(2)}</span>
                </div>
                <Button size="lg" className="w-full" onClick={handleAddToCart}>
                    Add to cart
                </Button>
            </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
