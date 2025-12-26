# Adding Images to Menu Items

## ✅ Images Added Successfully!

All menu items now have images from Unsplash. The images are automatically loaded when you view the menu.

## What Was Done

1. Created an image update script that adds appropriate images to each menu item
2. Updated all 43 menu items with food/coffee/drink images
3. Images are stored as URLs pointing to high-quality food photography

## How to Add Your Own Images

If you want to replace the placeholder images with your own:

### Option 1: Update via Script
1. Edit `backend/src/seeders/updateMenuImages.js`
2. Replace the image URLs with your own image URLs
3. Run: `cd backend && npm run update-images`

### Option 2: Use Admin Dashboard
1. Log in as admin
2. Go to Admin Dashboard → Menu Management
3. Edit each menu item and update the image URL

### Option 3: Upload Images
1. Store images in `backend/uploads/` folder
2. Update image URLs to: `http://localhost:5000/uploads/your-image.jpg`
3. Make sure images are accessible via the backend server

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Size**: Recommended 800x600px or larger
- **Aspect Ratio**: 4:3 or 16:9 works best
- **File Size**: Keep under 500KB for faster loading

## Current Image Sources

All images are currently from Unsplash (free stock photos):
- Food images for Chadian dishes
- Coffee images for coffee items
- Drink images for beverages
- Tea images for tea varieties

## Viewing Images

After updating, refresh your browser and visit the menu page. All items should now display with images!

## Need Help?

- Check browser console for image loading errors
- Verify image URLs are accessible
- Make sure backend server is running on port 5000
- Check CORS settings if images are blocked

