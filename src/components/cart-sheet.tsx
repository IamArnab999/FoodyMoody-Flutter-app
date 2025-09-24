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
import { ShoppingCart } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

export default function CartSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-5 w-5" />
          <span className="sr-only">Open Cart</span>
          <Badge className="absolute top-1 right-1 h-4 w-4 p-0 flex items-center justify-center text-xs" variant="destructive">2</Badge>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-headline text-2xl">Your Cart</SheetTitle>
          <SheetDescription>
            Review your items before checkout.
          </SheetDescription>
        </SheetHeader>
        <div className="py-4 space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Margherita Pizza</p>
              <p className="text-sm text-muted-foreground">Thin Crust</p>
            </div>
            <p className="font-semibold">€10.99</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p className="font-semibold">Classic Bliss Burger</p>
              <p className="text-sm text-muted-foreground">Cheddar, Bacon</p>
            </div>
            <p className="font-semibold">€11.49</p>
          </div>
        </div>
        <Separator />
        <div className="py-4 space-y-2">
            <div className="flex justify-between">
                <p>Subtotal</p>
                <p>€22.48</p>
            </div>
            <div className="flex justify-between">
                <p>Delivery Fee</p>
                <p>€2.99</p>
            </div>
            <div className="flex justify-between font-bold text-lg">
                <p>Total</p>
                <p>€25.47</p>
            </div>
        </div>
        <SheetFooter>
          <Button asChild className="w-full" size="lg">
            <Link href="/track-order">Proceed to Checkout</Link>
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
