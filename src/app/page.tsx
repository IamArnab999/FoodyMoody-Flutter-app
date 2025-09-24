import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Search,
  Star,
  Sparkles,
  ChevronDown,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { restaurants } from "@/lib/data";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import type { Restaurant } from "@/lib/types";
import AiSuggestionModal from "@/components/ai-suggestion-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function RestaurantCard({ restaurant }: { restaurant: Restaurant }) {
  const image = PlaceHolderImages.find((img) => img.id === restaurant.imageId);

  return (
    <Card className="overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1 duration-300 ease-in-out">
      <Link href={`/restaurants/${restaurant.slug}`} className="block">
        <CardHeader className="p-0">
          {image && (
            <div className="aspect-video relative">
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            </div>
          )}
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-xl mb-1">{restaurant.name}</CardTitle>
          <CardDescription>{restaurant.cuisine}</CardDescription>
          <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{restaurant.rating.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-1">
              <Bike className="w-4 h-4" />
              <span>{restaurant.deliveryTime} min</span>
            </div>
            <span>{restaurant.price}</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center py-12 md:py-20">
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary border-primary/20"
        >
          Welcome to FoodyMood!
        </Badge>
        <h1 className="text-4xl md:text-6xl font-bold tracking-tighter mt-4 max-w-3xl mx-auto">
          Food for every mood, delivered to your door.
        </h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-xl mx-auto">
          Discover and order from the best local restaurants. Quick, easy, and
          delicious.
        </p>
        <div className="mt-8 max-w-lg mx-auto flex gap-2">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search for restaurants or dishes..."
              className="pl-10 h-12"
            />
          </div>
          <Button size="lg" className="h-12">
            Search
          </Button>
        </div>
      </section>

      <section className="py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="flex flex-col items-center justify-center p-6 text-center bg-card">
            <Sparkles className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-muted-foreground mb-4">
              Get personalized meal ideas based on your tastes and diet.
            </p>
            <AiSuggestionModal />
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center bg-card">
            <Bike className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
            <p className="text-muted-foreground">
              Your favorite food delivered to your door in minutes.
            </p>
          </Card>
          <Card className="flex flex-col items-center justify-center p-6 text-center bg-card">
            <Star className="w-10 h-10 text-primary mb-3" />
            <h3 className="text-xl font-semibold mb-2">Top Restaurants</h3>
            <p className="text-muted-foreground">
              Explore a curated list of the best eateries in town.
            </p>
          </Card>
        </div>
      </section>

      <section className="py-12">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl font-bold tracking-tight">
            Featured Restaurants
          </h2>
          <div className="flex gap-2 items-center">
            <Select defaultValue="delivery_time">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="delivery_time">Delivery Time</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by Cuisine" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Cuisines</SelectItem>
                <SelectItem value="italian">Italian</SelectItem>
                <SelectItem value="japanese">Japanese</SelectItem>
                <SelectItem value="american">American</SelectItem>
                <SelectItem value="mexican">Mexican</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {restaurants.map((restaurant) => (
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
          ))}
        </div>
      </section>
    </div>
  );
}
