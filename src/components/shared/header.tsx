import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";
import { ShoppingCart, User } from "lucide-react";
import CartSheet from "../cart-sheet";

export default function AppHeader() {
  return (
    <header className="border-b sticky top-0 bg-background/95 backdrop-blur-sm z-40">
      <div className="container mx-auto px-4 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2">
          <Icons.Logo className="w-6 h-6 text-primary" />
          <span className="font-bold text-xl font-headline">FoodyMood</span>
        </Link>

        <nav className="hidden md:flex gap-6 items-center text-sm font-medium">
          <Link href="/" className="text-foreground/80 hover:text-foreground transition-colors">Home</Link>
          <Link href="/track-order" className="text-foreground/80 hover:text-foreground transition-colors">Track Order</Link>
          <Link href="#" className="text-foreground/80 hover:text-foreground transition-colors">Deals</Link>
        </nav>

        <div className="flex items-center gap-2">
            <CartSheet />
            <Button variant="ghost" size="icon" asChild>
                <Link href="/login">
                    <User className="h-5 w-5" />
                    <span className="sr-only">Profile</span>
                </Link>
            </Button>
        </div>
      </div>
    </header>
  );
}
