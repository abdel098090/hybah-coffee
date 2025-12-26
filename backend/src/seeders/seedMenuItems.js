import { sequelize } from '../config/database.js'
import MenuItem from '../models/MenuItem.js'

const chadianMenuItems = [
  // Chadian Traditional Dishes
  {
    name: 'Boule (Millet Porridge)',
    category: 'chadian_food',
    description: 'Traditional Chadian millet porridge, a staple dish served with various sauces',
    price: 8.99,
    image_url: 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      sauce_options: ['Peanut Sauce', 'Okra Sauce', 'Tomato Sauce', 'Spinach Sauce'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Kissar (Chadian Flatbread)',
    category: 'chadian_food',
    description: 'Traditional Chadian flatbread made from wheat or millet, perfect with stews',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      size: ['Small (2 pieces)', 'Medium (4 pieces)', 'Large (6 pieces)']
    }
  },
  {
    name: 'Daraba (Okra Stew)',
    category: 'chadian_food',
    description: 'Rich and flavorful okra stew with meat, a Chadian favorite',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat', 'Fish'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Aiyash (Peanut Stew)',
    category: 'chadian_food',
    description: 'Creamy peanut stew with vegetables and meat, served with rice or boule',
    price: 13.99,
    image_url: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['peanuts'],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Salade de Légumes (Chadian Vegetable Salad)',
    category: 'chadian_food',
    description: 'Fresh mixed vegetables with traditional Chadian dressing',
    price: 7.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      dressing: ['Traditional', 'Lemon', 'Vinaigrette']
    }
  },
  {
    name: 'Brochettes (Grilled Skewers)',
    category: 'chadian_food',
    description: 'Marinated meat skewers grilled to perfection, served with spicy sauce',
    price: 11.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat'],
      quantity: ['3 pieces', '5 pieces', '7 pieces'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Riz au Gras (Fatty Rice)',
    category: 'chadian_food',
    description: 'Aromatic rice cooked with meat, vegetables, and spices',
    price: 10.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Sauce Gombo (Okra Sauce)',
    category: 'chadian_food',
    description: 'Traditional okra sauce, perfect with boule or rice',
    price: 9.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat', 'None (Vegetarian)'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Ful (Fava Bean Stew)',
    category: 'chadian_food',
    description: 'Hearty fava bean stew with spices, served with bread',
    price: 8.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Thieboudienne (Chadian Style)',
    category: 'chadian_food',
    description: 'Fish and rice dish with vegetables, Chadian style',
    price: 14.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['fish'],
    customization_options: {
      fish_type: ['Tilapia', 'Carp', 'Catfish'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Maffé (Peanut Butter Stew)',
    category: 'chadian_food',
    description: 'Rich peanut butter stew with meat and vegetables',
    price: 13.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['peanuts'],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Boule de Millet avec Sauce',
    category: 'chadian_food',
    description: 'Millet porridge with your choice of traditional sauce',
    price: 9.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      sauce_type: ['Peanut', 'Okra', 'Tomato', 'Spinach', 'Mixed'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  // Coffee & Drinks (Chadian style)
  {
    name: 'Café Touba',
    category: 'coffee',
    description: 'Traditional Chadian spiced coffee with cloves and pepper',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      spice_level: ['Mild', 'Medium', 'Strong']
    }
  },
  {
    name: 'Thé à la Menthe (Mint Tea)',
    category: 'tea',
    description: 'Traditional Chadian mint tea, sweet and refreshing',
    price: 3.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High', 'Very Sweet']
    }
  },
  {
    name: 'Bissap (Hibiscus Drink)',
    category: 'cold_drink',
    description: 'Refreshing hibiscus drink, a Chadian favorite',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      ice_level: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
    }
  },
  {
    name: 'Gingembre (Ginger Drink)',
    category: 'cold_drink',
    description: 'Spicy and refreshing ginger drink',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  // More Chadian Traditional Dishes
  {
    name: 'Karkanji (Hibiscus Tea)',
    category: 'tea',
    description: 'Traditional Chadian hibiscus tea, served hot or cold',
    price: 3.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      temperature: ['Hot', 'Cold', 'Iced']
    }
  },
  {
    name: 'Café Tchadien (Chadian Coffee)',
    category: 'coffee',
    description: 'Traditional Chadian coffee, strong and aromatic',
    price: 5.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      milk: ['No Milk', 'With Milk']
    }
  },
  {
    name: 'Thé Vert (Green Tea)',
    category: 'tea',
    description: 'Traditional green tea, light and refreshing',
    price: 3.49,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High']
    }
  },
  {
    name: 'Café au Lait (Coffee with Milk)',
    category: 'coffee',
    description: 'Chadian style coffee with milk, creamy and smooth',
    price: 5.49,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy'],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      milk_type: ['Whole Milk', 'Condensed Milk']
    }
  },
  {
    name: 'Sauce Arachide (Peanut Sauce)',
    category: 'chadian_food',
    description: 'Rich and creamy peanut sauce, perfect with rice or boule',
    price: 10.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['peanuts'],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat', 'None (Vegetarian)'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Sauce Épinards (Spinach Sauce)',
    category: 'chadian_food',
    description: 'Traditional spinach sauce with meat, nutritious and flavorful',
    price: 11.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat', 'Fish'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Sauce Tomate (Tomato Sauce)',
    category: 'chadian_food',
    description: 'Tangy tomato sauce with meat and vegetables',
    price: 10.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat', 'Fish'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Ndambé (Bean Stew)',
    category: 'chadian_food',
    description: 'Hearty bean stew with vegetables and spices',
    price: 9.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Couscous Tchadien (Chadian Couscous)',
    category: 'chadian_food',
    description: 'Traditional Chadian couscous with meat and vegetables',
    price: 12.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'Goat', 'Lamb'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Poulet Yassa (Yassa Chicken)',
    category: 'chadian_food',
    description: 'Marinated chicken with onions and lemon, tangy and flavorful',
    price: 14.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      spice_level: ['Mild', 'Medium', 'Hot'],
      sides: ['Rice', 'Boule', 'Couscous']
    }
  },
  {
    name: 'Poisson Braisé (Grilled Fish)',
    category: 'chadian_food',
    description: 'Fresh fish grilled to perfection with Chadian spices',
    price: 15.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['fish'],
    customization_options: {
      fish_type: ['Tilapia', 'Carp', 'Catfish', 'Nile Perch'],
      spice_level: ['Mild', 'Medium', 'Hot'],
      sides: ['Rice', 'Plantains', 'Salad']
    }
  },
  {
    name: 'Ragoût de Viande (Meat Stew)',
    category: 'chadian_food',
    description: 'Slow-cooked meat stew with vegetables and spices',
    price: 13.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Goat', 'Lamb'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Sauce Gombo aux Légumes (Okra with Vegetables)',
    category: 'chadian_food',
    description: 'Okra stew with mixed vegetables, vegetarian option available',
    price: 10.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      meat_type: ['Beef', 'Chicken', 'None (Vegetarian)'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Riz Sauce (Rice with Sauce)',
    category: 'chadian_food',
    description: 'Steamed rice served with your choice of traditional sauce',
    price: 9.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sauce_type: ['Peanut', 'Okra', 'Tomato', 'Spinach', 'Mixed'],
      meat_type: ['Beef', 'Chicken', 'Goat', 'None (Vegetarian)'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Tchakpalo (Fried Plantains)',
    category: 'chadian_food',
    description: 'Sweet fried plantains, a popular Chadian side dish',
    price: 6.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      size: ['Small (3 pieces)', 'Medium (5 pieces)', 'Large (7 pieces)'],
      sweetness: ['Regular', 'Extra Sweet']
    }
  },
  {
    name: 'Beignets (Fried Doughnuts)',
    category: 'chadian_food',
    description: 'Sweet fried doughnuts, perfect with coffee or tea',
    price: 5.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs'],
    customization_options: {
      quantity: ['3 pieces', '5 pieces', '10 pieces'],
      sugar: ['Light Sugar', 'Regular', 'Extra Sugar']
    }
  },
  {
    name: 'Thé au Gingembre (Ginger Tea)',
    category: 'tea',
    description: 'Warming ginger tea, perfect for cold days',
    price: 3.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      spice_level: ['Mild', 'Medium', 'Strong']
    }
  },
  {
    name: 'Café Expresso (Espresso)',
    category: 'coffee',
    description: 'Strong espresso, Italian style with Chadian twist',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Single', 'Double'],
      sugar_level: ['None', 'Low', 'Medium', 'High']
    }
  },
  {
    name: 'Café Cappuccino',
    category: 'coffee',
    description: 'Creamy cappuccino with foamed milk',
    price: 5.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy'],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High']
    }
  },
  {
    name: 'Café Latte',
    category: 'coffee',
    description: 'Smooth latte with steamed milk',
    price: 5.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy'],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      milk_type: ['Whole Milk', 'Almond', 'Oat', 'Soy']
    }
  },
  {
    name: 'Jus de Bissap (Hibiscus Juice)',
    category: 'cold_drink',
    description: 'Fresh hibiscus juice, sweet and tangy',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      ice_level: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
    }
  },
  {
    name: 'Jus de Gingembre (Ginger Juice)',
    category: 'cold_drink',
    description: 'Fresh ginger juice, spicy and refreshing',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      spice_level: ['Mild', 'Medium', 'Hot']
    }
  },
  {
    name: 'Jus de Mangue (Mango Juice)',
    category: 'cold_drink',
    description: 'Fresh mango juice, sweet and tropical',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      ice_level: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
    }
  },
  {
    name: 'Jus d\'Ananas (Pineapple Juice)',
    category: 'cold_drink',
    description: 'Fresh pineapple juice, sweet and tangy',
    price: 4.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High'],
      ice_level: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
    }
  },
  {
    name: 'Limonade (Lemonade)',
    category: 'cold_drink',
    description: 'Fresh lemonade, sweet and refreshing',
    price: 3.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      sugar_level: ['None', 'Low', 'Medium', 'High', 'Very Sweet'],
      ice_level: ['No Ice', 'Light Ice', 'Regular Ice', 'Extra Ice']
    }
  },
  {
    name: 'Eau Minérale (Mineral Water)',
    category: 'cold_drink',
    description: 'Pure mineral water, chilled',
    price: 2.99,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small (330ml)', 'Medium (500ml)', 'Large (1L)'],
      temperature: ['Cold', 'Room Temperature']
    }
  },
  {
    name: 'Soda (Soft Drink)',
    category: 'cold_drink',
    description: 'Assorted soft drinks',
    price: 3.49,
    image_url: null,
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      sizes: ['Small', 'Medium', 'Large'],
      flavors: ['Cola', 'Orange', 'Lemon', 'Ginger Ale']
    }
  },
  // Burgers
  {
    name: 'Classic Beef Burger',
    category: 'burger',
    description: 'Juicy beef patty with lettuce, tomato, onion, and special sauce',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs', 'dairy'],
    customization_options: {
      meat_cooking: ['Medium Rare', 'Medium', 'Medium Well', 'Well Done'],
      cheese: ['None', 'Cheddar', 'Swiss', 'Mozzarella'],
      extras: ['Bacon', 'Mushrooms', 'Pickles', 'Jalapeños']
    }
  },
  {
    name: 'Chicken Burger',
    category: 'burger',
    description: 'Grilled chicken breast with fresh vegetables and mayo',
    price: 11.99,
    image_url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs'],
    customization_options: {
      cheese: ['None', 'Cheddar', 'Swiss'],
      extras: ['Bacon', 'Avocado', 'Pickles']
    }
  },
  {
    name: 'Veggie Burger',
    category: 'burger',
    description: 'Plant-based patty with fresh vegetables and special sauce',
    price: 10.99,
    image_url: 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      patty_type: ['Bean', 'Mushroom', 'Chickpea'],
      cheese: ['None', 'Vegan Cheese', 'Swiss'],
      extras: ['Avocado', 'Mushrooms', 'Roasted Peppers']
    }
  },
  {
    name: 'Spicy Chadian Burger',
    category: 'burger',
    description: 'Beef burger with Chadian spices, harissa, and fresh vegetables',
    price: 13.99,
    image_url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs', 'dairy'],
    customization_options: {
      spice_level: ['Mild', 'Medium', 'Hot', 'Very Hot'],
      cheese: ['None', 'Cheddar', 'Spicy Cheese'],
      extras: ['Fried Egg', 'Bacon', 'Jalapeños']
    }
  },
  {
    name: 'Fish Burger',
    category: 'burger',
    description: 'Grilled fish fillet with tartar sauce and vegetables',
    price: 12.99,
    image_url: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'fish', 'eggs'],
    customization_options: {
      fish_type: ['Tilapia', 'Cod', 'Salmon'],
      sauce: ['Tartar', 'Mayo', 'Spicy Sauce']
    }
  },
  // Sandwiches
  {
    name: 'Club Sandwich',
    category: 'sandwich',
    description: 'Triple-decker sandwich with chicken, bacon, lettuce, and tomato',
    price: 10.99,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs'],
    customization_options: {
      bread: ['White', 'Whole Wheat', 'Multigrain'],
      extras: ['Cheese', 'Avocado', 'Pickles']
    }
  },
  {
    name: 'Grilled Chicken Sandwich',
    category: 'sandwich',
    description: 'Marinated grilled chicken with vegetables and mayo',
    price: 9.99,
    image_url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      bread: ['White', 'Whole Wheat', 'Ciabatta'],
      cheese: ['None', 'Cheddar', 'Swiss'],
      extras: ['Bacon', 'Avocado', 'Lettuce']
    }
  },
  {
    name: 'Tuna Salad Sandwich',
    category: 'sandwich',
    description: 'Fresh tuna salad with vegetables on your choice of bread',
    price: 8.99,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'fish'],
    customization_options: {
      bread: ['White', 'Whole Wheat', 'Multigrain'],
      extras: ['Lettuce', 'Tomato', 'Pickles']
    }
  },
  {
    name: 'Vegetable Sandwich',
    category: 'sandwich',
    description: 'Fresh mixed vegetables with hummus and herbs',
    price: 7.99,
    image_url: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten'],
    customization_options: {
      bread: ['White', 'Whole Wheat', 'Multigrain'],
      spread: ['Hummus', 'Mayo', 'Mustard'],
      vegetables: ['Lettuce', 'Tomato', 'Cucumber', 'Bell Peppers']
    }
  },
  {
    name: 'Ham and Cheese Sandwich',
    category: 'sandwich',
    description: 'Classic ham and cheese with lettuce and tomato',
    price: 9.49,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy'],
    customization_options: {
      bread: ['White', 'Whole Wheat', 'Rye'],
      cheese: ['Swiss', 'Cheddar', 'Provolone'],
      extras: ['Pickles', 'Mustard', 'Mayo']
    }
  },
  {
    name: 'Egg Salad Sandwich',
    category: 'sandwich',
    description: 'Creamy egg salad with fresh vegetables',
    price: 7.99,
    image_url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs', 'dairy'],
    customization_options: {
      bread: ['White', 'Whole Wheat'],
      extras: ['Lettuce', 'Tomato', 'Cucumber']
    }
  },
  // Pastries
  {
    name: 'Croissant',
    category: 'pastry',
    description: 'Buttery, flaky French croissant',
    price: 3.99,
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {
      type: ['Plain', 'Butter', 'Chocolate'],
      size: ['Regular', 'Large']
    }
  },
  {
    name: 'Pain au Chocolat',
    category: 'pastry',
    description: 'French pastry with chocolate filling',
    price: 4.49,
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {}
  },
  {
    name: 'Danish Pastry',
    category: 'pastry',
    description: 'Sweet pastry with various fillings',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {
      filling: ['Apple', 'Cherry', 'Blueberry', 'Cream Cheese']
    }
  },
  {
    name: 'Muffin',
    category: 'pastry',
    description: 'Freshly baked muffin',
    price: 3.49,
    image_url: 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs', 'dairy'],
    customization_options: {
      flavor: ['Blueberry', 'Chocolate Chip', 'Banana', 'Bran']
    }
  },
  {
    name: 'Scone',
    category: 'pastry',
    description: 'Traditional British scone, served with jam and cream',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1615367423057-4e29c49f3fbc?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {
      flavor: ['Plain', 'Raisin', 'Cranberry'],
      sides: ['Jam', 'Butter', 'Cream']
    }
  },
  {
    name: 'Cinnamon Roll',
    category: 'pastry',
    description: 'Sweet cinnamon roll with glaze',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1626087927381-8e4d63acead9?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {
      glaze: ['Vanilla', 'Cream Cheese', 'Maple'],
      size: ['Regular', 'Large']
    }
  },
  // Desserts
  {
    name: 'Tiramisu',
    category: 'dessert',
    description: 'Classic Italian dessert with coffee and mascarpone',
    price: 7.99,
    image_url: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy', 'eggs', 'gluten'],
    customization_options: {
      size: ['Regular', 'Large']
    }
  },
  {
    name: 'Chocolate Cake',
    category: 'dessert',
    description: 'Rich chocolate cake with frosting',
    price: 6.99,
    image_url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {
      frosting: ['Chocolate', 'Vanilla', 'Cream Cheese'],
      size: ['Slice', 'Whole Cake']
    }
  },
  {
    name: 'Cheesecake',
    category: 'dessert',
    description: 'Creamy cheesecake with berry topping',
    price: 7.49,
    image_url: 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy', 'eggs', 'gluten'],
    customization_options: {
      topping: ['Strawberry', 'Blueberry', 'Cherry', 'Plain']
    }
  },
  {
    name: 'Ice Cream',
    category: 'dessert',
    description: 'Creamy ice cream in various flavors',
    price: 5.99,
    image_url: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy', 'eggs'],
    customization_options: {
      flavor: ['Vanilla', 'Chocolate', 'Strawberry', 'Caramel', 'Pistachio'],
      size: ['Single Scoop', 'Double Scoop', 'Triple Scoop'],
      toppings: ['Whipped Cream', 'Nuts', 'Chocolate Sauce', 'Caramel Sauce']
    }
  },
  {
    name: 'Fruit Salad',
    category: 'dessert',
    description: 'Fresh mixed seasonal fruits',
    price: 5.49,
    image_url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: [],
    customization_options: {
      dressing: ['None', 'Honey', 'Yogurt', 'Lemon']
    }
  },
  {
    name: 'Crème Brûlée',
    category: 'dessert',
    description: 'Classic French custard with caramelized sugar',
    price: 7.99,
    image_url: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['dairy', 'eggs'],
    customization_options: {
      flavor: ['Vanilla', 'Lavender', 'Coffee']
    }
  },
  {
    name: 'Apple Pie',
    category: 'dessert',
    description: 'Homemade apple pie with cinnamon',
    price: 6.49,
    image_url: 'https://images.unsplash.com/photo-1621293954908-8b1d0a163657?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'dairy', 'eggs'],
    customization_options: {
      size: ['Slice', 'Whole Pie'],
      served_with: ['Ice Cream', 'Whipped Cream', 'Plain']
    }
  },
  {
    name: 'Brownie',
    category: 'dessert',
    description: 'Rich chocolate brownie',
    price: 4.99,
    image_url: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop',
    is_vip_only: false,
    is_available: true,
    allergens: ['gluten', 'eggs', 'dairy'],
    customization_options: {
      type: ['Classic', 'Walnut', 'Caramel'],
      served_with: ['Ice Cream', 'Whipped Cream', 'Plain']
    }
  }
]

export const seedMenuItems = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected for seeding...')

    // Clear existing menu items (optional - comment out if you want to keep existing)
    // await MenuItem.destroy({ where: {} })
    // console.log('Cleared existing menu items')

    // Create menu items
    for (const item of chadianMenuItems) {
      const [menuItem, created] = await MenuItem.findOrCreate({
        where: { name: item.name },
        defaults: item
      })
      if (created) {
        console.log(`Created: ${item.name}`)
      } else {
        console.log(`Already exists: ${item.name}`)
      }
    }

    console.log('Menu items seeded successfully!')
  } catch (error) {
    console.error('Error seeding menu items:', error)
    throw error
  }
}

// Run if called directly
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('seedMenuItems')) {
  seedMenuItems()
    .then(() => {
      console.log('Seeding completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Seeding failed:', error)
      process.exit(1)
    })
}

