import Image from "next/image";
import { notFound } from "next/navigation";
import { restaurants } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Meal } from "@/lib/types";
import { Star, Bike, Utensils, Tag, PlusCircle } from "lucide-react";
import OrderCustomizationSheet from "@/components/order-customization-sheet";

function MenuItem({ item }: { item: Meal }) {
  const image = PlaceHolderImages.find((img) => img.id === item.imageId);
  return (
    <div className="flex items-start justify-between py-4">
      <div className="flex-1 pr-4">
        <h4 className="font-semibold text-base">{item.name}</h4>
        <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
        <p className="text-base font-semibold mt-2">€{item.price.toFixed(2)}</p>
      </div>
      <div className="flex flex-col items-end gap-2">
        {image && (
          <div className="relative w-24 h-24 rounded-md overflow-hidden">
            <Image
              src={image.imageUrl}
              alt={image.description}
              fill
              className="object-cover"
              data-ai-hint={image.imageHint}
            />
          </div>
        )}
        <OrderCustomizationSheet meal={item}>
          <Button variant="outline" size="sm" className="w-24">Add</Button>
        </OrderCustomizationSheet>
      </div>
    </div>
  );
}

export default function RestaurantPage({
  params,
}: {
  params: { slug: string };
}) {
  const restaurant = restaurants.find((r) => r.slug === params.slug);

  if (!restaurant) {
    notFound();
  }

  const heroImage = PlaceHolderImages.find(
    (img) => img.id === restaurant.imageId
  );
  const menuByCategory = restaurant.menu.reduce((acc, item) => {
    (acc[item.category] = acc[item.category] || []).push(item);
    return acc;
  }, {} as Record<Meal["category"], Meal[]>);

  return (
    <div>
      <div className="relative h-64 md:h-80 w-full">
        {heroImage && (
          <Image
            src={heroImage.imageUrl.replace('/600/400', '/1600/400')}
            alt={heroImage.description}
            fill
            className="object-cover"
            priority
            data-ai-hint={heroImage.imageHint}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 p-8 container mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
            {restaurant.name}
          </h1>
          <div className="flex items-center gap-6 mt-2 text-sm text-white/90">
            <div className="flex items-center gap-1">
              <Utensils className="w-4 h-4" />
              <span>{restaurant.cuisine}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bike className="w-4 h-4" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{restaurant.price}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="container mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold tracking-tight mb-6">Menu</h2>
        <Accordion type="multiple" defaultValue={Object.keys(menuByCategory)} className="w-full">
          {Object.entries(menuByCategory).map(([category, items]) => (
            <AccordionItem value={category} key={category}>
              <AccordionTrigger className="text-2xl font-semibold">
                {category}
              </AccordionTrigger>
              <AccordionContent>
                <div className="divide-y">
                  {items.map((item) => (
                    <MenuItem key={item.id} item={item} />
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
