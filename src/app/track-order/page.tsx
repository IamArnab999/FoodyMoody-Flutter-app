'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Circle, CookingPot, Bike, Home } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

const steps = [
  { name: 'Order Confirmed', icon: CheckCircle },
  { name: 'Preparing', icon: CookingPot },
  { name: 'Out for Delivery', icon: Bike },
  { name: 'Delivered', icon: Home },
];

export default function TrackOrderPage() {
  const mapImage = PlaceHolderImages.find((img) => img.id === 'map-tracking');
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prevStep) => {
        if (prevStep < steps.length - 1) {
          return prevStep + 1;
        }
        clearInterval(interval);
        return prevStep;
      });
    }, 5000); // Move to next step every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Track Your Order</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Your delicious meal is on its way!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card className="overflow-hidden">
            {mapImage && (
              <div className="relative aspect-video w-full">
                <Image
                  src={mapImage.imageUrl}
                  alt={mapImage.description}
                  fill
                  className="object-cover"
                  data-ai-hint={mapImage.imageHint}
                />
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                    <Bike className="w-10 h-10 text-white bg-primary p-2 rounded-full shadow-lg animate-pulse" />
                </div>
              </div>
            )}
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative flex flex-col gap-8">
                <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -z-10" />
                 <div 
                    className="absolute left-4 top-4 w-0.5 bg-primary -z-10 transition-all duration-1000" 
                    style={{ height: `calc(${currentStep * (100 / 3)}% - 1rem)` }}
                />
                
                {steps.map((step, index) => {
                  const isActive = index <= currentStep;
                  const Icon = step.icon;
                  return (
                    <div key={step.name} className="flex items-center gap-4">
                      <div
                        className={cn(
                          'w-8 h-8 rounded-full flex items-center justify-center transition-colors',
                          isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                        )}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <p className={cn('font-semibold', isActive ? 'text-foreground' : 'text-muted-foreground')}>
                          {step.name}
                        </p>
                        {index === currentStep && <p className="text-sm text-primary animate-pulse">In progress...</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
              <Separator className="my-6" />
              <div>
                <h4 className="font-semibold mb-2">Estimated Arrival</h4>
                <p className="text-3xl font-bold text-primary">15-20 minutes</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
