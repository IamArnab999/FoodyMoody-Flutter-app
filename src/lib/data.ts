import type { Restaurant } from './types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    slug: 'bella-italia',
    name: 'Bella Italia',
    cuisine: 'Italian',
    rating: 4.5,
    deliveryTime: 25,
    price: '€€',
    imageId: 'bella-italia-hero',
    menu: [
      {
        id: 'm1',
        name: 'Margherita Pizza',
        description: 'Classic cheese and tomato pizza.',
        price: 9.99,
        imageId: 'margherita-pizza',
        category: 'Main Courses',
        customizations: [
          {
            title: 'Extra Toppings',
            type: 'checkbox',
            options: [
              { name: 'Mushrooms', priceModifier: 1.5 },
              { name: 'Pepperoni', priceModifier: 2.0 },
              { name: 'Olives', priceModifier: 1.0 },
            ],
          },
          {
            title: 'Crust',
            type: 'radio',
            options: [
              { name: 'Thin Crust' },
              { name: 'Thick Crust', priceModifier: 1.0 },
            ],
          },
        ],
      },
      {
        id: 'm2',
        name: 'Spaghetti Carbonara',
        description: 'Creamy pasta with bacon and cheese.',
        price: 12.5,
        imageId: 'spaghetti-carbonara',
        category: 'Main Courses',
      },
      {
        id: 'm3',
        name: 'Tiramisu',
        description: 'Classic Italian coffee-flavored dessert.',
        price: 6.0,
        imageId: 'tiramisu',
        category: 'Desserts',
      },
    ],
  },
  {
    id: '2',
    slug: 'sushi-zen',
    name: 'Sushi Zen',
    cuisine: 'Japanese',
    rating: 4.8,
    deliveryTime: 35,
    price: '€€€',
    imageId: 'sushi-zen-hero',
    menu: [
      {
        id: 'm4',
        name: 'Assorted Sushi Platter',
        description: '16 pieces of assorted nigiri and maki.',
        price: 25.0,
        imageId: 'sushi-platter',
        category: 'Main Courses',
        customizations: [
            {
                title: 'Add-ons',
                type: 'checkbox',
                options: [
                    { name: 'Extra Wasabi', priceModifier: 0.5 },
                    { name: 'Extra Ginger', priceModifier: 0.5 },
                ]
            }
        ]
      },
      {
        id: 'm5',
        name: 'Tonkotsu Ramen',
        description: 'Rich pork broth ramen with chashu pork.',
        price: 14.0,
        imageId: 'ramen-bowl',
        category: 'Main Courses',
      },
    ],
  },
  {
    id: '3',
    slug: 'burger-bliss',
    name: 'Burger Bliss',
    cuisine: 'American',
    rating: 4.2,
    deliveryTime: 20,
    price: '€',
    imageId: 'burger-bliss-hero',
    menu: [
      {
        id: 'm6',
        name: 'Classic Bliss Burger',
        description: 'Beef patty, lettuce, tomato, and our special sauce.',
        price: 8.99,
        imageId: 'classic-burger',
        category: 'Main Courses',
        customizations: [
            {
                title: 'Add Cheese',
                type: 'radio',
                options: [
                    { name: 'No Cheese' },
                    { name: 'Cheddar', priceModifier: 1.0 },
                    { name: 'Swiss', priceModifier: 1.0 },
                ]
            },
            {
                title: 'Extras',
                type: 'checkbox',
                options: [
                    { name: 'Bacon', priceModifier: 1.5 },
                    { name: 'Avocado', priceModifier: 1.5 },
                ]
            }
        ]
      },
      {
        id: 'm7',
        name: 'Loaded Fries',
        description: 'Fries with cheese sauce, bacon, and chives.',
        price: 5.5,
        imageId: 'loaded-fries',
        category: 'Appetizers',
      },
    ],
  },
  {
    id: '4',
    slug: 'taco-fiesta',
    name: 'Taco Fiesta',
    cuisine: 'Mexican',
    rating: 4.6,
    deliveryTime: 30,
    price: '€€',
    imageId: 'taco-fiesta-hero',
    menu: [
      {
        id: 'm8',
        name: 'Carne Asada Tacos',
        description: 'Three grilled steak tacos with onion and cilantro.',
        price: 11.0,
        imageId: 'carne-asada-tacos',
        category: 'Main Courses',
      },
      {
        id: 'm9',
        name: 'Guacamole & Chips',
        description: 'Freshly made guacamole with crispy tortilla chips.',
        price: 7.0,
        imageId: 'guacamole',
        category: 'Appetizers',
      },
    ],
  },
];
