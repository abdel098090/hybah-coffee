import { sequelize } from '../config/database.js'
import MenuItem from '../models/MenuItem.js'

// Image URLs for each menu item - using food images from Unsplash
const menuImages = {
  // Chadian Food
  'Boule (Millet Porridge)': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop',
  'Kissar (Chadian Flatbread)': 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&h=600&fit=crop',
  'Daraba (Okra Stew)': 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&h=600&fit=crop',
  'Aiyash (Peanut Stew)': 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=800&h=600&fit=crop',
  'Salade de Légumes (Chadian Vegetable Salad)': 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&h=600&fit=crop',
  'Brochettes (Grilled Skewers)': 'https://images.unsplash.com/photo-1558030006-450675393462?w=800&h=600&fit=crop',
  'Riz au Gras (Fatty Rice)': 'https://images.unsplash.com/photo-1516684669134-de6f7d473a8a?w=800&h=600&fit=crop',
  'Sauce Gombo (Okra Sauce)': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&h=600&fit=crop',
  'Ful (Fava Bean Stew)': 'https://images.unsplash.com/photo-1574484284002-952d92456975?w=800&h=600&fit=crop',
  'Thieboudienne (Chadian Style)': 'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=600&fit=crop',
  'Maffé (Peanut Butter Stew)': 'https://images.unsplash.com/photo-1574492543229-1a1508063419?w=800&h=600&fit=crop',
  'Boule de Millet avec Sauce': 'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=600&fit=crop',
  'Sauce Arachide (Peanut Sauce)': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
  'Sauce Épinards (Spinach Sauce)': 'https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=800&h=600&fit=crop',
  'Sauce Tomate (Tomato Sauce)': 'https://images.unsplash.com/photo-1563379091339-03246963d19c?w=800&h=600&fit=crop',
  'Ndambé (Bean Stew)': 'https://images.unsplash.com/photo-1588166524941-3bf61a9c41db?w=800&h=600&fit=crop',
  'Couscous Tchadien (Chadian Couscous)': 'https://images.unsplash.com/photo-1551884170-09fb70a3a2ed?w=800&h=600&fit=crop',
  'Poulet Yassa (Yassa Chicken)': 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800&h=600&fit=crop',
  'Poisson Braisé (Grilled Fish)': 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&h=600&fit=crop',
  'Ragoût de Viande (Meat Stew)': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
  'Sauce Gombo aux Légumes (Okra with Vegetables)': 'https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=800&h=600&fit=crop',
  'Riz Sauce (Rice with Sauce)': 'https://images.unsplash.com/photo-1516684669134-de6f7d473a8a?w=800&h=600&fit=crop',
  'Tchakpalo (Fried Plantains)': 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=800&h=600&fit=crop',
  'Beignets (Fried Doughnuts)': 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=800&h=600&fit=crop',
  
  // Coffee
  'Café Touba': 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop',
  'Café Tchadien (Chadian Coffee)': 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800&h=600&fit=crop',
  'Café au Lait (Coffee with Milk)': 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=800&h=600&fit=crop',
  'Café Expresso (Espresso)': 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?w=800&h=600&fit=crop',
  'Café Cappuccino': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
  'Café Latte': 'https://images.unsplash.com/photo-1561882468-9110e03e0f78?w=800&h=600&fit=crop',
  
  // Tea
  'Thé à la Menthe (Mint Tea)': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop',
  'Karkanji (Hibiscus Tea)': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop',
  'Thé Vert (Green Tea)': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop',
  'Thé au Gingembre (Ginger Tea)': 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800&h=600&fit=crop',
  
  // Cold Drinks
  'Bissap (Hibiscus Drink)': 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=800&h=600&fit=crop',
  'Gingembre (Ginger Drink)': 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=800&h=600&fit=crop',
  'Jus de Bissap (Hibiscus Juice)': 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=800&h=600&fit=crop',
  'Jus de Gingembre (Ginger Juice)': 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=800&h=600&fit=crop',
  'Jus de Mangue (Mango Juice)': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
  'Jus d\'Ananas (Pineapple Juice)': 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=800&h=600&fit=crop',
  'Limonade (Lemonade)': 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=800&h=600&fit=crop',
  'Eau Minérale (Mineral Water)': 'https://images.unsplash.com/photo-1548839140-bc69f4a9bb0a?w=800&h=600&fit=crop',
  'Soda (Soft Drink)': 'https://images.unsplash.com/photo-1523677011783-c91d1bbe2fdc?w=800&h=600&fit=crop',
  
  // Burgers
  'Classic Beef Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
  'Chicken Burger': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop',
  'Veggie Burger': 'https://images.unsplash.com/photo-1525059696034-4967a729002e?w=800&h=600&fit=crop',
  'Spicy Chadian Burger': 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=800&h=600&fit=crop',
  'Fish Burger': 'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=800&h=600&fit=crop',
  
  // Sandwiches
  'Club Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
  'Grilled Chicken Sandwich': 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=800&h=600&fit=crop',
  'Tuna Salad Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
  'Vegetable Sandwich': 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=800&h=600&fit=crop',
  'Ham and Cheese Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
  'Egg Salad Sandwich': 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=800&h=600&fit=crop',
  
  // Pastries
  'Croissant': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
  'Pain au Chocolat': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
  'Danish Pastry': 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&h=600&fit=crop',
  'Muffin': 'https://images.unsplash.com/photo-1607958996333-41aef7caefaa?w=800&h=600&fit=crop',
  'Scone': 'https://images.unsplash.com/photo-1615367423057-4e29c49f3fbc?w=800&h=600&fit=crop',
  'Cinnamon Roll': 'https://images.unsplash.com/photo-1626087927381-8e4d63acead9?w=800&h=600&fit=crop',
  
  // Desserts
  'Tiramisu': 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&h=600&fit=crop',
  'Chocolate Cake': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=800&h=600&fit=crop',
  'Cheesecake': 'https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=800&h=600&fit=crop',
  'Ice Cream': 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=800&h=600&fit=crop',
  'Fruit Salad': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800&h=600&fit=crop',
  'Crème Brûlée': 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&h=600&fit=crop',
  'Apple Pie': 'https://images.unsplash.com/photo-1621293954908-8b1d0a163657?w=800&h=600&fit=crop',
  'Brownie': 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=800&h=600&fit=crop'
}

export const updateMenuImages = async () => {
  try {
    await sequelize.authenticate()
    console.log('Database connected for updating images...')

    let updated = 0
    for (const [name, imageUrl] of Object.entries(menuImages)) {
      const [count] = await MenuItem.update(
        { image_url: imageUrl },
        { where: { name } }
      )
      if (count > 0) {
        console.log(`✅ Updated image for: ${name}`)
        updated++
      } else {
        console.log(`⚠️  Not found: ${name}`)
      }
    }

    console.log(`\n✅ Updated images for ${updated} menu items!`)
  } catch (error) {
    console.error('Error updating menu images:', error)
    throw error
  }
}

// Run if called directly
if (import.meta.url.endsWith(process.argv[1]) || process.argv[1]?.includes('updateMenuImages')) {
  updateMenuImages()
    .then(() => {
      console.log('Image update completed')
      process.exit(0)
    })
    .catch((error) => {
      console.error('Image update failed:', error)
      process.exit(1)
    })
}

