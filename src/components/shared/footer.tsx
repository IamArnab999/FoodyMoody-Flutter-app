import Link from "next/link";
import { Icons } from "../icons";
import { Button } from "../ui/button";
import { MessageCircle } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "../ui/input";

function SupportChat() {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button variant="outline" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    Support
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="space-y-2">
                        <h4 className="font-medium leading-none font-headline">Live Chat</h4>
                        <p className="text-sm text-muted-foreground">
                            How can we help you today?
                        </p>
                    </div>
                    <div className="space-y-2 h-48 overflow-y-auto p-2 border rounded-md bg-muted/50">
                        <div className="text-xs p-2 rounded-md bg-primary text-primary-foreground self-end max-w-[80%] ml-auto">Hello! I have an issue with my order.</div>
                        <div className="text-xs p-2 rounded-md bg-secondary text-secondary-foreground self-start max-w-[80%]">Hi there! I'm sorry to hear that. Please tell me your order ID.</div>
                    </div>
                    <Input placeholder="Type your message..." />
                    <Button>Send</Button>
                </div>
            </PopoverContent>
        </Popover>
    )
}


export default function AppFooter() {
  return (
    <footer className="border-t bg-card">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Icons.Logo className="w-6 h-6 text-primary" />
              <span className="font-bold text-xl font-headline">FoodyMood</span>
            </Link>
            <p className="text-muted-foreground text-sm">
              Food for every mood, delivered.
            </p>
          </div>
          <div>
            <h4 className="font-semibold font-headline mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">About Us</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Careers</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">Press</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold font-headline mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="#" className="text-muted-foreground hover:text-foreground">FAQ</Link></li>
              <li><Link href="/track-order" className="text-muted-foreground hover:text-foreground">Track Order</Link></li>
               <li><SupportChat /></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold font-headline mb-4">Follow Us</h4>
             <p className="text-sm text-muted-foreground">Join our community</p>
          </div>
        </div>
        <div className="mt-8 border-t pt-4 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} FoodyMood. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
