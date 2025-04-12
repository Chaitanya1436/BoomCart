// data.js - Product data for BoomCart website

const products = [
    // Men's products
    {
      id: 1,
      category: 'men',
      name: 'Men Red Blaser',
      description: 'A timeless Fire Blaser for all occasions.',
      price: 79900, // in paise (₹799.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/men/Men Red Blaser.jpg'
    },
    {
      id: 2,
      category: 'men',
      name: 'Slim Fit Jeans',
      description: 'Comfortable slim fit jeans for everyday wear.',
      price: 119900, // in paise (₹1199.00)
      originalPrice: 149900, // in paise (₹1499.00)
      image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 3,
      category: 'men',
      name: 'Classic Orange Jerkin',
      description: 'Premium cotton Orange Jerkin.',
      price: 59900, // in paise (₹599.00)
      image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 4,
      category: 'men',
      name: 'Brown Riding Jacket',
      description: 'Elegant Jacket Also for Style.',
      price: 249900, // in paise (₹2499.00)
      originalPrice: 299900, // in paise (₹2999.00)
      image: 'https://images.unsplash.com/photo-1614252369475-531eba835eb1?auto=format&fit=crop&w=400&h=400&q=80'
    },


    {
      id: 5,
      category: 'men',
      name: 'Men Yellow Hoodie',
      description: 'Cool Stylish Winter Hoodie.',
      price: 149900, // in paise (₹2499.00)
      originalPrice: 19900, // in paise (₹2999.00)
      image: 'dp/men/Men Yellow Hoodie.jpg'
    },

    {
      id: 6,
      category: 'men',
      name: 'Men Cream Blazzer',
      description: 'Elegent office suit',
      price: 249900, // in paise (₹2499.00)
      originalPrice: 299900, // in paise (₹2999.00)
      image: 'dp/men/Cream Suit Men.jpeg'
    },

    {
      id: 7,
      category: 'men',
      name: 'Men Solid Color Rain Coat',
      description: 'Rain Coat With Solid Colors',
      price: 149900, // in paise (₹2499.00)
      originalPrice: 299900, // in paise (₹2999.00)
      image: 'dp/men/Multi Colour Rain Sweater.jpeg'
    },

    {
      id: 8,
      category: 'men',
      name: 'Men Casual Orange Shoes',
      description: 'Orage Is Classic EveryTime',
      price: 149900, // in paise (₹2499.00)
      originalPrice: 299900, // in paise (₹2999.00)
      image: 'dp/men/Orange Shoes.jpg'
    },

    {
      id: 9,
      category: 'men',
      name: 'Men Denim White Jeans',
      description: 'Torren 2022 trend Setter',
      price: 139900, // in paise (₹2499.00)
      originalPrice: 199900, // in paise (₹2999.00)
      image: 'dp/men/Demin White Jeans.jpg'
    },
    
    // Women's products
    {
      id: 11,
      category: 'women',
      name: 'Floral Women Pink Stiched Saree',
      description: 'Elegant floral dress perfect for 2025.',
      price: 149900, // in paise (₹1499.00)
      originalPrice: 199900, // in paise (₹1999.00)
      image: 'dp/Woman/Women Pink Stiched Saree.avif'
    },
    {
      id: 12,
      category: 'women',
      name: 'White top and Yellow Bottom Set',
      description: 'Stylish White top and Yellow Bottom Set.jpeg',
      price: 199900, // in paise (₹2999.00)
      image: 'dp/Woman/Stylish White top and Yellow Bottom Set.jpeg'
    },
    {
      id: 13,
      category: 'women',
      name: 'Women Green SweatShirt',
      description: 'Classic Green for any occasion.',
      price: 99900, // in paise (₹1999.00)
      originalPrice: 149900, // in paise (₹2499.00)
      image: 'dp/Woman/Women Green SweatShirt.jpg'
    },
    {
      id: 14,
      category: 'women',
      name: 'Women Safrom Shaded Dress',
      description: 'Women Safrom Shaded Dress printed Set.',
      price: 129900, // in paise (₹1799.00)
      image: 'dp/Woman/Women Safrom Shaded Dress.jpg'
    },
    {
      id: 15,
      category: 'women',
      name: 'Women Cool Summer Outfit',
      description: 'Cotton leveled handmade Summer Dress',
      price: 79900, // in paise (₹1799.00)
      image: 'dp/Woman/Women Cool Summer Outfit.webp'
    },
    {
      id: 16,
      category: 'women',
      name: 'Casual Women Wear For Summer',
      description: 'Woman Off Breeze Printed Set.',
      price: 179900, // in paise (₹1799.00)
      image: 'dp/Woman/Woman Off Breeze Printed Set.jpg'
    },
    {
      id: 12,
      category: 'women',
      name: 'Designer Handbag',
      description: 'Stylish handbag with plenty of compartments.',
      price: 299900, // in paise (₹2999.00)
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 18,
      category: 'women',
      name: 'Brown Printed Cotton Kaftan',
      description: 'Woman Casual For Digrant Looks',
      price: 179900, // in paise (₹1799.00)
      image: 'dp/Woman/Brown Printed Cotton Kaftan.webp'
    },
    {
      id: 13,
      category: 'women',
      name: 'Blue shaded Heels',
      description: 'Classic Blue heels for any occasion.',
      price: 199900, // in paise (₹1999.00)
      originalPrice: 249900, // in paise (₹2499.00)
      image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?auto=format&fit=crop&w=400&h=400&q=80'
    },
    
    // Kids' products
    {
      id: 21,
      category: 'kids',
      name: 'Cartoon T-Shirt',
      description: 'Fun cartoon print t-shirt for kids.',
      price: 39900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'https://images.unsplash.com/photo-1522771930-78848d9293e8?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 22,
      category: 'kids',
      name: 'School Backpack',
      description: 'Durable backpack for school with multiple compartments.',
      price: 79900, // in paise (₹799.00)
      image: 'dp/Kids/Backpack Red.jpg'
    },
    {
      id: 23,
      category: 'kids',
      name: 'Kids Sneakers',
      description: 'Comfortable sneakers for active kids.',
      price: 89900, // in paise (₹899.00)
      originalPrice: 129900, // in paise (₹999.00)
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=400&h=400&q=80'
    },
    {
      id: 29,
      category: 'kids',
      name: 'Kids pink Palazzo With Jacket',
      description: 'Comfortable Palazzo for active kids.',
      price: 89900, // in paise (₹899.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/Kids/Kids pink Palazzo With Jacket.jpg'
    },
    {
      id: 24,
      category: 'kids',
      name: 'B&W Cotton Full Sleeves Set',
      description: 'Boys Full Sleeves Printed Set For Kids.',
      price: 49900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'dp/Kids/Boys Trendy Clothing W&B set.webp'
    },
    {
      id: 25,
      category: 'kids',
      name: 'Casual Girls Pink Strips T-Shirt',
      description: 'Girls Casual Wear',
      price: 19900, // in paise (₹499.00)
      originalPrice: 29900, // in paise (₹599.00)
      image: 'dp/Kids/Kids simple summer clothes.jpeg'
    },
    {
      id: 26,
      category: 'kids',
      name: 'Boys Printed Captain America Shirt',
      description: 'Fun cartoon print t-shirt for kids.',
      price: 39900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'dp/Kids/Boys Printed Captain America Shirt.webp'
    },
    {
      id: 27,
      category: 'kids',
      name: 'Boys Full Sleeves Cotton Kurta',
      description: 'Ramrak Set For Boys',
      price: 39900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'dp/Kids/Boys Full Sleeves Cotton Kurta.webp'
    },
    {
      id: 28,
      category: 'kids',
      name: 'Kids Colourful Dress',
      description: 'Fun cartoon print dress for kids.',
      price: 49900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'dp/Kids/Kids Colourful Dress.webp'
    },
    
    // Beauty products
    {
      id: 31,
      category: 'beauty',
      name: 'Lipstick Set',
      description: 'Set of 5 premium lipsticks in various shades.',
      price: 79900, // in paise (₹799.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/Beauty/lipstick.avif'
    },
    {
      id: 33,
      category: 'beauty',
      name: 'Perfume',
      description: 'Long-lasting luxury perfume.',
      price: 249900, // in paise (₹2499.00)
      image: 'dp/Beauty/MAMDLB perfume.jpg'
    },
    {
      id: 34,
      category: 'beauty',
      name: 'Makeup Brushes',
      description: 'Set of 12 professional makeup brushes.',
      price: 99900, // in paise (₹999.00)
      originalPrice: 129900, // in paise (₹1299.00)
      image: 'dp/Beauty/makeup brusshes.avif'
    },
    {
      id: 35,
      category: 'beauty',
      name: 'Sunglasses',
      description: 'Set of Sunglasses With 5 Shades',
      price: 39900, // in paise (₹799.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/Beauty/Women SunGlasses.jpeg'
    },
    {
      id: 36,
      category: 'beauty',
      name: 'Hair Serum Set For Good Hair',
      description: 'Streax Walnut Hair Serum',
      price: 29900, // in paise (₹799.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/Beauty/Streax Walnut Hair Serum.webp'
    },
    {
      id: 37,
      category: 'beauty',
      name: 'EyeLinner Set',
      description: 'Set of 5 premium Linner in various shades.',
      price: 79900, // in paise (₹799.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/Beauty/Holagraphic Eyeliner.webp'
    },
    {
      id: 38,
      category: 'beauty',
      name: 'Face Wash Men',
      description: 'Bamboo Charcoal Face Wash Men',
      price: 59900, // in paise (₹799.00)
      originalPrice: 99900, // in paise (₹999.00)
      image: 'dp/Beauty/Bamboo Charcoal Face Wash Men.avif'
    },
    // Kitchen products
    {
      id: 41,
      category: 'kitchen',
      name: 'Non-Stick Cookware Set',
      description: '5-piece non-stick cookware set for all your cooking needs.',
      price: 199900, // in paise (₹2999.00)
      originalPrice: 299900, // in paise (₹3999.00)
      image: 'dp/kitc/Non-Stick Cookware Set.avif'
    },
    {
      id: 42,
      category: 'kitchen',
      name: 'Electric Kettle',
      description: 'Fast heating electric kettle with auto shut-off.',
      price: 149900, // in paise (₹1499.00)
      image: 'dp/kitc/Stainless Electric Kettle.jpeg'
    },
    {
      id: 43,
      category: 'kitchen',
      name: 'Coffee Maker',
      description: 'Programmable coffee maker for perfect coffee every time.',
      price: 159900, // in paise (₹1599.00)
      originalPrice: 199900, // in paise (₹1999.00)
      image: 'dp/kitc/Morning Coffee Maker- 250ml.webp'
    },
    {
      id: 44,
      category: 'kitchen',
      name: 'Chef\'s Knife Set',
      description: 'Professional grade knife set for cooking enthusiasts.',
      price: 49900, // in paise (₹2499.00)
      image: 'dp/kitc/Stainkess Kitchen Knife Set- 6 pieces.avif'
    },
    {
      id: 44,
      category: 'kitchen',
      name: 'Chef\'s Plastic Oil Dispenser',
      description: 'Professional grade Oil Dispenser for cooking enthusiasts.',
      price: 29900, // in paise (₹2499.00)
      image: 'dp/kitc/Plastic Oil Dispenser.jpg'
    },
    
    // Toys
    {
      id: 51,
      category: 'toys',
      name: 'Remote Control Car',
      description: 'High-speed remote control car with long battery life.',
      price: 159900, // in paise (₹1599.00)
      originalPrice: 179900, // in paise (₹1799.00)
      image: 'dp/Toys/Remote car batman.avif'
    },
    {
      id: 52,
      category: 'toys',
      name: 'Mijornyl',
      description: 'Thor Hammer With Color Effects',
      price: 99900, // in paise (₹999.00)
      image: 'dp/Toys/Thor Hammer.jpg'
    },
    {
      id: 52,
      category: 'toys',
      name: 'TV Game Stick',
      description: 'Video Game Set With 999+ Games',
      price: 99900, // in paise (₹999.00)
      image: 'dp/Toys/Video Game set with 999+ games.jpg'
    },
    {
      id: 53,
      category: 'toys',
      name: 'Cricket Set',
      description: 'LightWeight Bat with Stumps.',
      price: 89900, // in paise (₹499.00)
      originalPrice: 99900, // in paise (₹599.00)
      image: 'dp/Toys/Cricket Set With Stumps.webp'
    },
    {
      id: 55,
      category: 'toys',
      name: 'Kids Wall Climbing car',
      description: 'Crazy wall Climbing Remote Control Car.',
      price: 299900, // in paise (₹499.00)
      originalPrice: 559900, // in paise (₹599.00)
      image: 'dp/Toys/Remote control car.avif'
    },
    {
      id: 56,
      category: 'toys',
      name: 'Teddy Bear',
      description: 'Soft and cuddly teddy bear.',
      price: 49900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'dp/Toys/Teddy Bear.jpg'
    },
    {
      id: 52,
      category: 'toys',
      name: 'Building Blocks Set',
      description: '120-piece building blocks set for endless creativity.',
      price: 29900, // in paise (₹999.00)
      image: 'dp/Toys/Building set.avif'
    },
    {
      id: 57,
      category: 'toys',
      name: 'Teddy Bear',
      description: 'Soft and cuddly teddy bear.',
      price: 49900, // in paise (₹499.00)
      originalPrice: 59900, // in paise (₹599.00)
      image: 'dp/Toys/Teddy Bear.jpg'
    },

  ];
  
  // Get products by category
  function getProductsByCategory(category) {
    return products.filter(product => product.category === category);
  }
  
  // Get product by ID
  function getProductById(id) {
    return products.find(product => product.id === id);
  }
  
  // Make functions available globally
  window.dataService = {
    getProductsByCategory,
    getProductById,
    getAllProducts: () => products
  };
  
