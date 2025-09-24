
'use client';
import Link from "next/link";
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
import { ShoppingCart, UtensilsCrossed } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";
import { useCart } from "@/hooks/use-cart.tsx";

export default function CartSheet() {
  const { items, totalItems, totalPrice } = useCart();
  const deliveryFee = 2.99;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open Cart</span>
          {totalItems > 0 && (
            <Badge className="absolute -right-2 -top-2 h-5 w-5 p-0 flex items-center justify-center text-xs" variant="destructive">{totalItems}</Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        {items.length > 0 ? (
          <>
            <div className="flex-1 py-4 space-y-4 overflow-y-auto">
              {items.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold">{item.meal.name} (x{item.quantity})</p>
                    {/* Could add customizations here */}
                  </div>
                  <p className="font-semibold">€{(item.meal.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>
            <Separator />
            <div className="py-4 space-y-2">
                <div className="flex justify-between">
                    <p>Subtotal</p>
                    <p>€{totalPrice.toFixed(2)}</p>
                </div>
                <div className="flex justify-between">
                    <p>Delivery Fee</p>
                    <p>€{deliveryFee.toFixed(2)}</p>
                </div>
                <div className="flex justify-between font-bold text-lg">
                    <p>Total</p>
                    <p>€{(totalPrice + deliveryFee).toFixed(2)}</p>
                </div>
            </div>
            <SheetFooter>
              <Button asChild className="w-full" size="lg">
                <Link href="/track-order">Proceed to Checkout</Link>
              </Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <UtensilsCrossed className="w-16 h-16 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">Your cart is empty.</p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
