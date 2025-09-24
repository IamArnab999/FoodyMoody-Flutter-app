import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { UtensilsCrossed } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-20rem)] text-center px-4">
        <UtensilsCrossed className="w-16 h-16 text-primary mb-4" />
      <h1 className="text-5xl font-bold tracking-tight mb-2">404 - Page Not Found</h1>
      <p className="text-lg text-muted-foreground mb-6">Oops! The page you're looking for doesn't exist.</p>
      <Button asChild>
        <Link href="/">Go back to Home</Link>
      </Button>
    </div>
  )
}
