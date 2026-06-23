import type { Product, Category, Brand, Testimonial, Notification, Review, Order, User, Seller, ChartData } from '@/types';

// ===== PRODUCTS =====
export const products: Product[] = [
  {
    id: 'p1', name: 'Apple iPhone 15 Pro Max', slug: 'iphone-15-pro-max',
    description: 'The most powerful iPhone ever with the A17 Pro chip, titanium design, and an advanced camera system. Experience the future of smartphone technology with ProRAW and ProRes video capabilities.',
    shortDescription: 'A17 Pro chip, titanium design, 48MP camera system',
    price: 134999, originalPrice: 149999, discount: 10,
    images: [
      'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'smartphones', brand: 'Apple', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png',
    rating: 4.8, reviewCount: 2847, stock: 45, isFeatured: true, isNew: true, isBestSeller: true, isFlashSale: false,
    tags: ['5G', 'ProMax', 'Titanium', 'iOS 17'], colors: [{ label: 'Natural Titanium', value: 'natural', hex: '#b5a99a', available: true }, { label: 'Black Titanium', value: 'black', hex: '#1c1c1e', available: true }, { label: 'White Titanium', value: 'white', hex: '#f5f5f0', available: false }],
    specifications: { 'Display': '6.7" Super Retina XDR OLED', 'Processor': 'A17 Pro Bionic', 'RAM': '8GB', 'Storage': '256GB / 512GB / 1TB', 'Camera': '48MP Main + 12MP Ultra Wide + 12MP 5x Telephoto', 'Battery': '4422 mAh', 'OS': 'iOS 17', 'Connectivity': '5G, Wi-Fi 6E, Bluetooth 5.3' },
    seller: 'Apple Official Store', sellerId: 's1', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p2', name: 'Samsung Galaxy S24 Ultra', slug: 'samsung-galaxy-s24-ultra',
    description: 'Galaxy AI is here. The Galaxy S24 Ultra brings the most advanced AI features to a smartphone, with the S Pen, 200MP camera, and titanium frame.',
    shortDescription: '200MP camera, Galaxy AI, S Pen included',
    price: 129999, originalPrice: 139999, discount: 7,
    images: [
      'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'smartphones', brand: 'Samsung', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png',
    rating: 4.7, reviewCount: 1956, stock: 78, isFeatured: true, isNew: true, isBestSeller: false, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 2).toISOString(),
    tags: ['5G', 'Galaxy AI', 'S Pen', 'Android 14'], colors: [{ label: 'Titanium Black', value: 'black', hex: '#1a1a2e', available: true }, { label: 'Titanium Gray', value: 'gray', hex: '#6b7280', available: true }, { label: 'Titanium Violet', value: 'violet', hex: '#7c3aed', available: true }],
    specifications: { 'Display': '6.8" Dynamic AMOLED 2X, 120Hz', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB', 'Storage': '256GB / 512GB / 1TB', 'Camera': '200MP + 12MP + 10MP + 10MP', 'Battery': '5000 mAh', 'OS': 'Android 14', 'Connectivity': '5G, Wi-Fi 7, Bluetooth 5.3' },
    seller: 'Samsung Store', sellerId: 's2', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p3', name: 'Sony WH-1000XM5 Headphones', slug: 'sony-wh-1000xm5',
    description: 'Industry-leading noise cancellation with two chips and eight microphones. Up to 30 hours battery life. Crystal clear hands-free calling. Lightweight folding design.',
    shortDescription: 'Best-in-class ANC, 30hr battery, premium sound',
    price: 24999, originalPrice: 34999, discount: 28,
    images: [
      'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'headphones', brand: 'Sony', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/200px-Sony_logo.svg.png',
    rating: 4.9, reviewCount: 4231, stock: 120, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000).toISOString(),
    tags: ['ANC', 'Bluetooth 5.2', 'Hi-Res Audio', 'LDAC'], colors: [{ label: 'Midnight Black', value: 'black', hex: '#1a1a1a', available: true }, { label: 'Platinum Silver', value: 'silver', hex: '#c0c0c0', available: true }],
    specifications: { 'Driver': '30mm', 'Frequency': '4Hz–40,000Hz', 'Battery': '30 hours', 'Charging': 'USB-C (3h full charge)', 'Weight': '250g', 'Connectivity': 'Bluetooth 5.2, 3.5mm Jack', 'Codec': 'LDAC, AAC, SBC', 'Microphones': '8 microphones' },
    seller: 'Sony Electronics', sellerId: 's3', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p4', name: 'MacBook Pro 14" M3 Pro', slug: 'macbook-pro-14-m3-pro',
    description: 'The MacBook Pro with M3 Pro chip brings unprecedented performance and efficiency. With up to 22 hours of battery life and a stunning Liquid Retina XDR display.',
    shortDescription: 'M3 Pro chip, Liquid Retina XDR, 22hr battery',
    price: 199999, originalPrice: 219999, discount: 9,
    images: [
      'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'laptops', brand: 'Apple', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png',
    rating: 4.9, reviewCount: 1234, stock: 30, isFeatured: true, isNew: true, isBestSeller: true, isFlashSale: false,
    tags: ['M3 Pro', 'MacOS', 'Retina XDR', 'ProRes'],
    specifications: { 'Processor': 'Apple M3 Pro (12-core)', 'RAM': '18GB / 36GB', 'Storage': '512GB / 1TB / 2TB SSD', 'Display': '14.2" Liquid Retina XDR, 3024×1964', 'Battery': '70Wh, up to 22 hours', 'Ports': '3× Thunderbolt 4, HDMI, SD, MagSafe', 'Weight': '1.61 kg' },
    seller: 'Apple Official Store', sellerId: 's1', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p5', name: 'Nike Air Max 270 React', slug: 'nike-air-max-270-react',
    description: 'The Nike Air Max 270 React combines two of our greatest cushioning technologies for a soft, responsive feel that\'s built to last. The React foam midsole delivers a smooth, springy ride.',
    shortDescription: 'React foam + Air Max 270 unit for ultimate comfort',
    price: 12999, originalPrice: 15999, discount: 18,
    images: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&auto=format&fit=crop&q=80',
    category: 'fashion', subcategory: 'sneakers', brand: 'Nike', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png',
    rating: 4.5, reviewCount: 867, stock: 200, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 3).toISOString(),
    tags: ['Running', 'Lifestyle', 'Air Max', 'React Foam'],
    colors: [{ label: 'Black/White', value: 'black-white', hex: '#1a1a1a', available: true }, { label: 'University Red', value: 'red', hex: '#c0392b', available: true }, { label: 'Royal Blue', value: 'blue', hex: '#2980b9', available: false }],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specifications: { 'Upper': 'Mesh + Synthetic', 'Midsole': 'React Foam + Air Max 270', 'Outsole': 'Rubber', 'Fit': 'True to size', 'Weight': '312g (size UK 9)' },
    seller: 'Nike Official', sellerId: 's4', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p6', name: 'Dyson V15 Detect Absolute', slug: 'dyson-v15-detect',
    description: 'Our most powerful, intelligent cordless vacuum. Laser reveals microscopic dust. Piezo sensor counts and sizes particles. Automatically adapts suction power.',
    shortDescription: 'Laser dust detection, 60min run time, HEPA filtration',
    price: 54999, originalPrice: 64999, discount: 15,
    images: [
      'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1527515637462-cff94eecc1ac?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&auto=format&fit=crop&q=80',
    category: 'home', subcategory: 'vacuum-cleaners', brand: 'Dyson', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dyson_logo.svg/200px-Dyson_logo.svg.png',
    rating: 4.7, reviewCount: 589, stock: 55, isFeatured: true, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['Cordless', 'HEPA', 'Laser Detect', '60min'],
    specifications: { 'Motor': 'Dyson Hyperdymium', 'Suction': '230 AW', 'Runtime': 'Up to 60 minutes', 'Filtration': 'HEPA', 'Weight': '3.1 kg', 'Dustbin': '0.77L' },
    seller: 'Dyson Direct', sellerId: 's5', freeShipping: true, deliveryDays: 4
  },
  {
    id: 'p7', name: 'Levi\'s 501 Original Jeans', slug: 'levis-501-original',
    description: 'The original and most iconic jeans. Button fly, straight leg, and a 5-pocket style. Made with premium denim that\'s built to last decades.',
    shortDescription: 'Original button fly, straight leg, premium denim',
    price: 4499, originalPrice: 5999, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1582552938357-32b906df43c3?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&auto=format&fit=crop&q=80',
    category: 'fashion', subcategory: 'jeans', brand: "Levi's", brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e3/Levi%27s_logo.svg/200px-Levi%27s_logo.svg.png',
    rating: 4.4, reviewCount: 3421, stock: 500, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Denim', 'Casual', 'Straight Fit', 'Classic'],
    colors: [{ label: 'Stonewash Blue', value: 'blue', hex: '#5b7fa6', available: true }, { label: 'Dark Indigo', value: 'indigo', hex: '#2c3e6b', available: true }, { label: 'Black', value: 'black', hex: '#1a1a1a', available: true }],
    sizes: ['28x30', '30x30', '30x32', '32x30', '32x32', '34x32', '36x32'],
    specifications: { 'Material': '100% Cotton', 'Fit': 'Straight', 'Closure': 'Button Fly', 'Rise': 'Mid', 'Wash': 'Machine Wash' },
    seller: "Levi's India", sellerId: 's6', freeShipping: false, deliveryDays: 5
  },
  {
    id: 'p8', name: 'LG OLED C3 65" 4K TV', slug: 'lg-oled-c3-65',
    description: 'Experience perfect blacks, infinite contrast, and over a billion colors. The LG OLED C3 features the α9 AI Processor Gen6, Dolby Vision IQ, and a gaming-ready 120Hz display.',
    shortDescription: 'OLED evo panel, α9 Gen6 AI, 120Hz, Dolby Vision',
    price: 149999, originalPrice: 179999, discount: 16,
    images: [
      'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552533237-c116d68b6b06?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1593784991095-a205069470b6?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'televisions', brand: 'LG', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG-logo.svg/200px-LG-logo.svg.png',
    rating: 4.8, reviewCount: 987, stock: 25, isFeatured: true, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['OLED', '4K', '120Hz', 'Dolby Vision', 'webOS'],
    specifications: { 'Panel': 'OLED evo', 'Resolution': '4K UHD 3840×2160', 'Refresh Rate': '120Hz (HDMI 2.1)', 'HDR': 'Dolby Vision IQ, HDR10, HLG', 'Processor': 'α9 Gen6 AI', 'Smart TV': 'webOS 23', 'HDMI Ports': '4 × HDMI 2.1', 'USB Ports': '3' },
    seller: 'LG Electronics', sellerId: 's7', freeShipping: true, deliveryDays: 5
  },
  {
    id: 'p9', name: 'Instant Pot Duo 7-in-1', slug: 'instant-pot-duo-7in1',
    description: 'Your multicooker of choice — pressure cooker, slow cooker, rice cooker, steamer, sauté, yogurt maker, and food warmer. Cooks up to 70% faster.',
    shortDescription: '7-in-1 multicooker, 6Qt, 13 one-touch programs',
    price: 6999, originalPrice: 9999, discount: 30,
    images: [
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=400&auto=format&fit=crop&q=80',
    category: 'home', subcategory: 'kitchen', brand: 'Instant Pot', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Instant_Pot_logo.svg/200px-Instant_Pot_logo.svg.png',
    rating: 4.6, reviewCount: 12456, stock: 300, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 1.5).toISOString(),
    tags: ['Pressure Cooker', 'Multi-use', 'Steel', 'Easy Clean'],
    specifications: { 'Capacity': '6 Quart', 'Functions': '7-in-1', 'Material': 'Stainless Steel', 'Programs': '13 one-touch', 'Wattage': '1000W', 'Warranty': '1 Year' },
    seller: 'Instant Pot Official', sellerId: 's8', freeShipping: false, deliveryDays: 4
  },
  {
    id: 'p10', name: 'Adidas Ultraboost 23', slug: 'adidas-ultraboost-23',
    description: 'Our best ultraboost yet — made with Primeknit+ upper and Boost midsole for incredible energy return. The Continental rubber outsole delivers superior grip.',
    shortDescription: 'Primeknit+, Boost midsole, Continental rubber',
    price: 17999, originalPrice: 21999, discount: 18,
    images: [
      'https://images.unsplash.com/photo-1587563871167-1ee9c1d2f4b8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1587563871167-1ee9c1d2f4b8?w=400&auto=format&fit=crop&q=80',
    category: 'fashion', subcategory: 'sneakers', brand: 'Adidas', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/200px-Adidas_Logo.svg.png',
    rating: 4.6, reviewCount: 1543, stock: 150, isFeatured: true, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['Running', 'Boost', 'Primeknit', 'Continental'],
    colors: [{ label: 'Core Black', value: 'black', hex: '#1a1a1a', available: true }, { label: 'Cloud White', value: 'white', hex: '#f5f5f5', available: true }, { label: 'Solar Red', value: 'red', hex: '#ef4444', available: true }],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    specifications: { 'Upper': 'Primeknit+', 'Midsole': 'Boost', 'Outsole': 'Continental Rubber', 'Weight': '310g', 'Drop': '10mm' },
    seller: 'Adidas Official', sellerId: 's9', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p11', name: 'iPad Pro 12.9" M2', slug: 'ipad-pro-12-m2',
    description: 'The ultimate iPad experience with the M2 chip, Liquid Retina XDR display, ProMotion technology, and support for Apple Pencil hover.',
    shortDescription: 'M2 chip, Liquid Retina XDR, Apple Pencil hover',
    price: 112900, originalPrice: 124900, discount: 9,
    images: [
      'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589739900243-4b52cd9b104e?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'tablets', brand: 'Apple', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png',
    rating: 4.8, reviewCount: 876, stock: 40, isFeatured: true, isNew: true, isBestSeller: false, isFlashSale: false,
    tags: ['M2', 'Retina XDR', 'ProMotion', 'USB-C'],
    specifications: { 'Chip': 'Apple M2', 'Display': '12.9" Liquid Retina XDR', 'Storage': '128GB–2TB', 'Connectivity': 'Wi-Fi 6E + 5G', 'Battery': '10 hours', 'Camera': '12MP Wide, 10MP Ultra Wide', 'OS': 'iPadOS 17' },
    seller: 'Apple Official Store', sellerId: 's1', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p12', name: 'BoAt Rockerz 550 Bluetooth', slug: 'boat-rockerz-550',
    description: 'Premium Bluetooth headphones with 20 hours playback, 40mm dynamic drivers, and immersive deep bass. Foldable design with voice assistant support.',
    shortDescription: '20hr playback, 40mm drivers, foldable design',
    price: 1799, originalPrice: 3990, discount: 54,
    images: [
      'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'headphones', brand: 'boAt', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Boat_logo.svg/200px-Boat_logo.svg.png',
    rating: 4.1, reviewCount: 28943, stock: 800, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 0.5).toISOString(),
    tags: ['Bluetooth 5.0', 'Bass', '20hr', 'Foldable'],
    colors: [{ label: 'Black', value: 'black', hex: '#1a1a1a', available: true }, { label: 'Red', value: 'red', hex: '#ef4444', available: true }, { label: 'Blue', value: 'blue', hex: '#3b82f6', available: true }],
    specifications: { 'Drivers': '40mm Dynamic', 'Bluetooth': '5.0', 'Battery': '550mAh', 'Playback': '20 hours', 'Charging': 'Micro USB', 'Weight': '231g' },
    seller: 'boAt Official', sellerId: 's10', freeShipping: false, deliveryDays: 4
  },
  {
    id: 'p13', name: 'Ray-Ban Wayfarer Classic', slug: 'rayban-wayfarer-classic',
    description: 'The Wayfarer is the most recognized frame in eyewear history. Available in a variety of lens and frame color combinations. 100% UV protection.',
    shortDescription: 'Iconic design, 100% UV protection, G-15 lens',
    price: 8999, originalPrice: 11999, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&auto=format&fit=crop&q=80',
    category: 'fashion', subcategory: 'sunglasses', brand: 'Ray-Ban', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ce/Ray-Ban_logo.svg/200px-Ray-Ban_logo.svg.png',
    rating: 4.7, reviewCount: 2145, stock: 90, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['UV Protection', 'Iconic', 'Unisex', 'Acetate'],
    colors: [{ label: 'Black/G-15', value: 'black', hex: '#1a1a1a', available: true }, { label: 'Tortoise', value: 'tortoise', hex: '#8B4513', available: true }],
    specifications: { 'Frame': 'Acetate', 'Lens': 'G-15' , 'UV Protection': '100% UV400', 'Frame Width': '150mm', 'Lens Width': '50mm', 'Bridge': '22mm' },
    seller: 'Ray-Ban India', sellerId: 's11', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p14', name: 'Philips Smart LED TV 55"', slug: 'philips-55-smart-led',
    description: '4K UHD display with HDR10+ and Dolby Vision. Built-in Android TV with Google Assistant. Ambilight technology creates an immersive viewing experience.',
    shortDescription: '4K UHD, Ambilight, Android TV, Dolby Vision',
    price: 59999, originalPrice: 74999, discount: 20,
    images: [
      'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509281373149-e957c6296406?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1461151304267-38535e780c79?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'televisions', brand: 'Philips', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Philips_logo.svg/200px-Philips_logo.svg.png',
    rating: 4.3, reviewCount: 432, stock: 60, isFeatured: false, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['4K', 'Ambilight', 'Android TV', 'HDR10+'],
    specifications: { 'Panel': 'LED', 'Resolution': '4K UHD', 'HDR': 'HDR10+, Dolby Vision', 'Smart': 'Android TV 11', 'Ambilight': '3-sided', 'HDMI': '4 ports', 'Audio': '2×10W Dolby Atmos' },
    seller: 'Philips India', sellerId: 's12', freeShipping: true, deliveryDays: 5
  },
  {
    id: 'p15', name: 'OnePlus 12 5G', slug: 'oneplus-12-5g',
    description: 'Powered by Snapdragon 8 Gen 3, the OnePlus 12 delivers flagship performance with Hasselblad-tuned cameras, 100W SUPERVOOC charging, and a 5400mAh battery.',
    shortDescription: 'Snapdragon 8 Gen 3, Hasselblad cameras, 100W charging',
    price: 64999, originalPrice: 69999, discount: 7,
    images: [
      'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1565849906660-bf47d6cc7fa7?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'smartphones', brand: 'OnePlus', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/OnePlus_logo.svg/200px-OnePlus_logo.svg.png',
    rating: 4.6, reviewCount: 3456, stock: 90, isFeatured: true, isNew: true, isBestSeller: false, isFlashSale: false,
    tags: ['5G', 'Hasselblad', '100W', 'AMOLED'],
    colors: [{ label: 'Flowy Emerald', value: 'emerald', hex: '#10b981', available: true }, { label: 'Silky Black', value: 'black', hex: '#1a1a1a', available: true }],
    specifications: { 'Display': '6.82" LTPO AMOLED, 1-120Hz', 'Processor': 'Snapdragon 8 Gen 3', 'RAM': '12GB / 16GB', 'Storage': '256GB / 512GB', 'Camera': '50MP (f/1.6) + 48MP + 64MP Periscope', 'Battery': '5400mAh', 'Charging': '100W SUPERVOOC + 50W Wireless' },
    seller: 'OnePlus Store', sellerId: 's13', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p16', name: 'Fossil Gen 6 Smartwatch', slug: 'fossil-gen-6-smartwatch',
    description: 'The Fossil Gen 6 is our fastest smartwatch yet with Snapdragon Wear 4100+ platform, 20% faster charging, and all-day wellness tracking.',
    shortDescription: 'Wear OS 3, SpO2, rapid charging, 44mm',
    price: 22999, originalPrice: 29999, discount: 23,
    images: [
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'smartwatches', brand: 'Fossil', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/41/Fossil_Group_logo.svg/200px-Fossil_Group_logo.svg.png',
    rating: 4.2, reviewCount: 678, stock: 70, isFeatured: false, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['Wear OS', 'SpO2', 'GPS', 'AMOLED'],
    colors: [{ label: 'Black', value: 'black', hex: '#1a1a1a', available: true }, { label: 'Silver', value: 'silver', hex: '#c0c0c0', available: true }, { label: 'Rose Gold', value: 'rose-gold', hex: '#b76e79', available: true }],
    specifications: { 'OS': 'Wear OS 3 by Google', 'Display': '1.28" AMOLED', 'Processor': 'Snapdragon Wear 4100+', 'Battery': '24hr typical', 'Water Resistance': 'ATM3', 'Sensors': 'HR, SpO2, GPS, Accelerometer' },
    seller: 'Fossil Store', sellerId: 's14', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p17', name: 'Nestlé Nescafé Gold Blend', slug: 'nescafe-gold-blend',
    description: 'Made from the finest Arabica and Robusta beans, Nescafé Gold Blend gives you a rich, balanced flavour with a smooth aroma. Premium instant coffee experience.',
    shortDescription: '200g, Arabica & Robusta blend, premium instant',
    price: 1099, originalPrice: 1299, discount: 15,
    images: [
      'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&auto=format&fit=crop&q=80',
    category: 'grocery', subcategory: 'beverages', brand: 'Nescafé', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Nescafe_logo.svg/200px-Nescafe_logo.svg.png',
    rating: 4.5, reviewCount: 8765, stock: 1000, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Instant Coffee', 'Arabica', 'Robusta', '200g'],
    specifications: { 'Weight': '200g', 'Bean Type': 'Arabica + Robusta', 'Type': 'Freeze-Dried', 'Caffeine': '~65mg/serving', 'Shelf Life': '24 months', 'Calories': '4 kcal/serving' },
    seller: 'Nestlé India', sellerId: 's15', freeShipping: false, deliveryDays: 2
  },
  {
    id: 'p18', name: 'Xiaomi Mi 11 Ultra', slug: 'xiaomi-mi-11-ultra',
    description: 'The Xiaomi Mi 11 Ultra pushes boundaries with its 50MP main camera with 120x zoom, 5000mAh battery with 67W fast charging, and Snapdragon 888.',
    shortDescription: 'Snapdragon 888, 50MP+120x, 67W fast charging',
    price: 59999, originalPrice: 69999, discount: 14,
    images: [
      'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580910051074-3eb694886505?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&auto=format&fit=crop&q=80',
    category: 'electronics', subcategory: 'smartphones', brand: 'Xiaomi', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Xiaomi_logo_%282021-%29.svg/200px-Xiaomi_logo_%282021-%29.svg.png',
    rating: 4.4, reviewCount: 2109, stock: 55, isFeatured: false, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['5G', 'Ultra Camera', '67W', 'MIUI'],
    colors: [{ label: 'Ceramic Black', value: 'black', hex: '#1a1a1a', available: true }, { label: 'Ceramic White', value: 'white', hex: '#f5f5f5', available: true }],
    specifications: { 'Display': '6.81" AMOLED 120Hz', 'Processor': 'Snapdragon 888', 'RAM': '12GB', 'Storage': '256GB', 'Camera': '50MP + 48MP + 48MP + 120x zoom', 'Battery': '5000mAh', 'Charging': '67W Wired, 67W Wireless' },
    seller: 'Xiaomi India', sellerId: 's16', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p19', name: 'Logitech MX Master 3S Mouse', slug: 'logitech-mx-master-3s',
    description: 'The MX Master 3S features a 8K DPI sensor, near-silent clicks, MagSpeed electromagnetic scrolling, and USB-C charging. Works on any surface.',
    shortDescription: '8K DPI, MagSpeed scroll, silent clicks, USB-C',
    price: 9995, originalPrice: 11995, discount: 16,
    images: [
      'https://m.media-amazon.com/images/I/614w3LuZ7AL._SL1500_.jpg',
      'https://m.media-amazon.com/images/I/61k02e1b1yL._SL1500_.jpg'
    ],
    thumbnail: 'https://m.media-amazon.com/images/I/614w3LuZ7AL._SL1500_.jpg',
    category: 'electronics', subcategory: 'accessories', brand: 'Logitech', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Logitech_logo.svg/200px-Logitech_logo.svg.png',
    rating: 4.8, reviewCount: 4567, stock: 200, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Wireless', 'MagSpeed', '8K DPI', 'Multi-device'],
    colors: [{ label: 'Graphite', value: 'graphite', hex: '#374151', available: true }, { label: 'Pale Grey', value: 'grey', hex: '#d1d5db', available: true }],
    specifications: { 'DPI': '200–8000', 'Scroll': 'MagSpeed Electromagnetic', 'Battery': '70-day charge', 'Charging': 'USB-C, 3min=8hr', 'Connectivity': 'Bolt USB + Bluetooth', 'OS': 'Windows, macOS, Linux' },
    seller: 'Logitech India', sellerId: 's17', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p20', name: 'Whirlpool 265L Double Door Refrigerator', slug: 'whirlpool-265l-refrigerator',
    description: 'Whirlpool\'s Intellifresh Pro refrigerator with 6th Sense technology intelligently adapts to your usage patterns to keep food fresher for longer.',
    shortDescription: '265L, 6th Sense, IntelliSense Inverter, 4★ Rating',
    price: 27990, originalPrice: 34990, discount: 20,
    images: [
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1571843439991-dd2b8e051966?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400&auto=format&fit=crop&q=80',
    category: 'home', subcategory: 'appliances', brand: 'Whirlpool', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Whirlpool_Corporation_logo.svg/200px-Whirlpool_Corporation_logo.svg.png',
    rating: 4.3, reviewCount: 1234, stock: 35, isFeatured: false, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['Frost Free', 'Inverter', '6th Sense', 'BEE 4 Star'],
    specifications: { 'Capacity': '265L (Gross)', 'Type': 'Frost Free', 'Energy Rating': '4 Star', 'Compressor': 'IntelliSense Inverter', 'Warranty': '1yr Product, 10yr Compressor' },
    seller: 'Whirlpool India', sellerId: 's18', freeShipping: true, deliveryDays: 5
  },
  {
    id: 'p21', name: 'The Great Gatsby', slug: 'the-great-gatsby',
    description: 'F. Scott Fitzgerald’s landmark novel, a devastating portrait of the Jazz Age, wealth, love, and the American Dream.',
    shortDescription: 'A classic of twentieth-century literature',
    price: 299, originalPrice: 399, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=400&auto=format&fit=crop&q=80',
    category: 'books', subcategory: 'fiction', brand: 'Penguin Books', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Penguin_Logo.svg/200px-Penguin_Logo.svg.png',
    rating: 4.6, reviewCount: 1543, stock: 120, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Classic', 'Fiction', 'Jazz Age', 'Fitzgerald'],
    specifications: { 'Author': 'F. Scott Fitzgerald', 'Publisher': 'Penguin Books', 'Language': 'English', 'Format': 'Paperback', 'Pages': '180' },
    seller: 'Bookstore Prime', sellerId: 's20', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p22', name: 'Sapiens: A Brief History of Humankind', slug: 'sapiens-brief-history-humankind',
    description: 'Yuval Noah Harari explores the history of humankind from the evolutionary emergence of Homo sapiens to the modern 21st century.',
    shortDescription: 'A ground-breaking narrative of humanity’s creation and evolution',
    price: 499, originalPrice: 599, discount: 16,
    images: [
      'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400&auto=format&fit=crop&q=80',
    category: 'books', subcategory: 'non-fiction', brand: 'HarperCollins', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/HarperCollins_logo.svg/200px-HarperCollins_logo.svg.png',
    rating: 4.8, reviewCount: 9482, stock: 80, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['History', 'Science', 'Evolution', 'Harari'],
    specifications: { 'Author': 'Yuval Noah Harari', 'Publisher': 'HarperCollins', 'Language': 'English', 'Format': 'Paperback', 'Pages': '512' },
    seller: 'Bookstore Prime', sellerId: 's20', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p23', name: 'Atomic Habits', slug: 'atomic-habits',
    description: 'Tiny Changes, Remarkable Results. James Clear provides a framework for improving every day by building good habits and breaking bad ones.',
    shortDescription: 'The life-changing million-copy bestseller',
    price: 349, originalPrice: 499, discount: 30,
    images: [
      'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&auto=format&fit=crop&q=80',
    category: 'books', subcategory: 'non-fiction', brand: 'Penguin Books', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/28/Penguin_Logo.svg/200px-Penguin_Logo.svg.png',
    rating: 4.9, reviewCount: 14210, stock: 250, isFeatured: true, isNew: true, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000).toISOString(),
    tags: ['Self-Help', 'Productivity', 'Habits', 'James Clear'],
    specifications: { 'Author': 'James Clear', 'Publisher': 'Penguin Business', 'Language': 'English', 'Format': 'Paperback', 'Pages': '320' },
    seller: 'BestBookSeller', sellerId: 's21', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p24', name: 'The Hobbit', slug: 'the-hobbit',
    description: 'J.R.R. Tolkien’s beloved prelude to The Lord of the Rings. Follow Bilbo Baggins as he is swept into an epic quest to reclaim the lost dwarf kingdom.',
    shortDescription: 'The epic high-fantasy masterpiece',
    price: 399, originalPrice: 499, discount: 20,
    images: [
      'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506880018603-83d5b814b5a6?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1474932430478-367dbb6832c1?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1629992101753-56d196c8aabb?w=400&auto=format&fit=crop&q=80',
    category: 'books', subcategory: 'fiction', brand: 'HarperCollins', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/HarperCollins_logo.svg/200px-HarperCollins_logo.svg.png',
    rating: 4.7, reviewCount: 4567, stock: 95, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Fantasy', 'Tolkien', 'Bilbo', 'Adventure'],
    specifications: { 'Author': 'J.R.R. Tolkien', 'Publisher': 'HarperCollins', 'Language': 'English', 'Format': 'Paperback', 'Pages': '310' },
    seller: 'Bookstore Prime', sellerId: 's20', freeShipping: false, deliveryDays: 4
  },
  {
    id: 'p25', name: 'Batman: Year One', slug: 'batman-year-one',
    description: 'Frank Miller’s legendary graphic novel detailing Bruce Wayne’s first year as Gotham’s protector and Jim Gordon’s rise in the GCPD.',
    shortDescription: 'The definitive origin story of the Dark Knight',
    price: 699, originalPrice: 899, discount: 22,
    images: [
      'https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608889175123-8ee362201f81?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1569003339405-ea396a5a8a90?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1601662528567-526cd06f6582?w=400&auto=format&fit=crop&q=80',
    category: 'books', subcategory: 'comics', brand: 'DC Comics', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/200px-DC_Comics_logo.svg.png',
    rating: 4.8, reviewCount: 2314, stock: 40, isFeatured: false, isNew: true, isBestSeller: false, isFlashSale: false,
    tags: ['Comics', 'Batman', 'DC', 'Graphic Novel'],
    specifications: { 'Author': 'Frank Miller', 'Illustrator': 'David Mazzucchelli', 'Publisher': 'DC Comics', 'Language': 'English', 'Pages': '144' },
    seller: 'ComicKingdom', sellerId: 's22', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p26', name: 'Pro Dumbbell Set 20kg', slug: 'pro-dumbbell-set-20kg',
    description: 'High-quality steel dumbbell set with comfortable rubber grip. Includes adjustable weight plates to customize your strength workout at home.',
    shortDescription: 'Adjustable steel plates with secure spinlock collars',
    price: 3499, originalPrice: 4999, discount: 30,
    images: [
      'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1638536532686-d610adfc8e5c?w=400&auto=format&fit=crop&q=80',
    category: 'sports', subcategory: 'gym', brand: 'Decathlon', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Decathlon_Logo.svg/200px-Decathlon_Logo.svg.png',
    rating: 4.5, reviewCount: 843, stock: 150, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Gym', 'Weightlifting', 'Dumbbells', 'Home Workout'],
    specifications: { 'Material': 'Cast Iron & Rubber', 'Total Weight': '20 kg', 'Grip': 'Knurled Chrome', 'Includes': '4x 2.5kg, 4x 1.25kg, 4x 0.5kg plates, 2 bars' },
    seller: 'Fitness World', sellerId: 's23', freeShipping: false, deliveryDays: 4
  },
  {
    id: 'p27', name: 'Premium Yoga Mat 6mm', slug: 'premium-yoga-mat-6mm',
    description: 'Eco-friendly TPE yoga mat with dual-layer anti-slip texture. Provides optimal cushioning and joint protection for yoga, Pilates, and floor exercises.',
    shortDescription: 'Eco-friendly non-slip texture with carrying strap',
    price: 1299, originalPrice: 1999, discount: 35,
    images: [
      'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1599447421416-3414500d18a5?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1592432678016-e910b452f9a2?w=400&auto=format&fit=crop&q=80',
    category: 'sports', subcategory: 'yoga', brand: 'Lululemon', brandLogo: 'https://logo.clearbit.com/lululemon.com',
    rating: 4.7, reviewCount: 1254, stock: 300, isFeatured: false, isNew: true, isBestSeller: true, isFlashSale: false,
    tags: ['Yoga', 'Pilates', 'Meditation', 'Eco-Friendly'],
    specifications: { 'Material': 'TPE (Eco-friendly)', 'Thickness': '6 mm', 'Dimensions': '183cm x 61cm', 'Weight': '900g', 'Washable': 'Yes' },
    seller: 'Zen Yoga Store', sellerId: 's24', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p28', name: 'Garmin Forerunner 55', slug: 'garmin-forerunner-55',
    description: 'Easy-to-use GPS running watch that tracks your heart rate, pace, distance, and delivers daily suggested workouts to help you run better.',
    shortDescription: 'GPS tracking, heart rate, up to 2 weeks battery',
    price: 17999, originalPrice: 20999, discount: 14,
    images: [
      'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=400&auto=format&fit=crop&q=80',
    category: 'sports', subcategory: 'outdoor', brand: 'Garmin', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d4/Garmin_logo.svg/200px-Garmin_logo.svg.png',
    rating: 4.6, reviewCount: 512, stock: 45, isFeatured: true, isNew: false, isBestSeller: false, isFlashSale: false,
    tags: ['Garmin', 'Running', 'Smartwatch', 'GPS', 'Fitness Tracker'],
    specifications: { 'GPS': 'Yes (GPS, GLONASS, Galileo)', 'Battery Life': 'Up to 2 weeks', 'Water Resistance': '5 ATM', 'Heart Rate Monitor': 'Yes' },
    seller: 'Garmin India', sellerId: 's25', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p29', name: 'Schwinn High Timber Mountain Bike', slug: 'schwinn-high-timber-mountain-bike',
    description: 'Steel mountain frame with suspension fork, 21-speed twist shifters, and alloy crank for premium, durable performance out on the trail.',
    shortDescription: '21-speed mountain bike with suspension fork',
    price: 24999, originalPrice: 29999, discount: 16,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544192240-4a34feb0104c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1576435728678-68d0fbf94e91?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80',
    category: 'sports', subcategory: 'cycling', brand: 'Schwinn', brandLogo: 'https://logo.clearbit.com/schwinnbikes.com',
    rating: 4.4, reviewCount: 231, stock: 20, isFeatured: true, isNew: false, isBestSeller: false, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 2).toISOString(),
    tags: ['Cycling', 'Bicycle', 'Mountain Bike', 'Outdoors'],
    specifications: { 'Frame Material': 'Steel', 'Wheel Size': '27.5 inch', 'Speeds': '21 Speed', 'Brakes': 'Linear Pull Brakes', 'Suspension': 'Front Suspension' },
    seller: 'Adventure Sports', sellerId: 's26', freeShipping: true, deliveryDays: 5
  },
  {
    id: 'p30', name: 'Waterproof Camping Tent 4-Person', slug: 'waterproof-camping-tent-4person',
    description: 'Double-layer waterproof family tent with instant popup set-up. Ideal for hiking, outdoor adventure, and backyard camping.',
    shortDescription: 'Instant setup, windproof, double layer waterproof',
    price: 4499, originalPrice: 5999, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1510312305653-8ed496efae75?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1537907690979-ee8e01276184?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1470246973918-29a93221c455?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400&auto=format&fit=crop&q=80',
    category: 'sports', subcategory: 'outdoor', brand: 'Quechua', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e6/Quechua_Decathlon_logo.svg/200px-Quechua_Decathlon_logo.svg.png',
    rating: 4.5, reviewCount: 421, stock: 65, isFeatured: false, isNew: true, isBestSeller: false, isFlashSale: false,
    tags: ['Camping', 'Hiking', 'Tent', 'Outdoor Gear'],
    specifications: { 'Capacity': '4 Persons', 'Setup Time': 'Under 2 minutes', 'Waterproof Rating': 'PU 3000mm', 'Weight': '3.8 kg' },
    seller: 'Adventure Sports', sellerId: 's26', freeShipping: true, deliveryDays: 4
  },
  {
    id: 'p31', name: 'Vitamin C Face Serum', slug: 'vitamin-c-face-serum',
    description: 'Advanced face serum containing 15% Vitamin C, Hyaluronic Acid, and Vitamin E to brighten skin, fade dark spots, and prevent aging.',
    shortDescription: 'Brightening and anti-aging daily face serum',
    price: 699, originalPrice: 999, discount: 30,
    images: [
      'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1612240498936-65f5101365d2?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80',
    category: 'beauty', subcategory: 'skincare', brand: 'The Ordinary', brandLogo: 'https://logo.clearbit.com/theordinary.com',
    rating: 4.6, reviewCount: 3421, stock: 500, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Skincare', 'Serum', 'Vitamin C', 'Brightening'],
    specifications: { 'Volume': '30 ml', 'Skin Type': 'All Skin Types', 'Ingredients': 'Vitamin C, Hyaluronic Acid, Vitamin E', 'Free from': 'Parabens, Sulfates' },
    seller: 'Beauty Emporium', sellerId: 's27', freeShipping: false, deliveryDays: 3
  },
  {
    id: 'p32', name: 'Matte Liquid Lipstick Red', slug: 'matte-liquid-lipstick-red',
    description: 'Long-lasting, smudge-proof matte liquid lipstick in a classic red shade. Delivers intense color payoff that lasts up to 16 hours.',
    shortDescription: '16hr wear smudge-proof bold matte red lipstick',
    price: 549, originalPrice: 799, discount: 31,
    images: [
      'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512496015851-a90fb38ba796?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1586495777744-4413f21062fa?w=400&auto=format&fit=crop&q=80',
    category: 'beauty', subcategory: 'makeup', brand: "L'Oréal", brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9d/L%27Oreal_logo.svg/200px-L%27Oreal_logo.svg.png',
    rating: 4.4, reviewCount: 1845, stock: 450, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Makeup', 'Lipstick', 'Matte', 'Beauty'],
    specifications: { 'Color': 'Classic Red', 'Finish': 'Matte', 'Duration': '16 Hours', 'Form': 'Liquid' },
    seller: 'Beauty Emporium', sellerId: 's27', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p33', name: 'Argan Hair Oil & Mask Combo', slug: 'argan-hair-oil-mask-combo',
    description: 'Enriched with organic Moroccan Argan Oil to deeply nourish, repair split ends, and restore natural shine to dry, damaged hair.',
    shortDescription: 'Restorative Moroccan Argan oil and deep conditioner mask',
    price: 899, originalPrice: 1299, discount: 30,
    images: [
      'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=400&auto=format&fit=crop&q=80',
    category: 'beauty', subcategory: 'haircare', brand: 'Moroccanoil', brandLogo: 'https://logo.clearbit.com/moroccanoil.com',
    rating: 4.7, reviewCount: 954, stock: 120, isFeatured: true, isNew: true, isBestSeller: false, isFlashSale: false,
    tags: ['Haircare', 'Argan Oil', 'Hair Mask', 'Dry Hair'],
    specifications: { 'Items': 'Hair Oil (50ml) + Hair Mask (200ml)', 'Main Ingredient': 'Moroccan Argan Oil', 'Hair Type': 'Damaged / Dry' },
    seller: 'Hair Care Hub', sellerId: 's28', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p34', name: 'Acqua Di Gio Eau De Parfum', slug: 'acqua-di-gio-parfum',
    description: 'A marine, fresh fragrance that opens with splash of calabrian bergamot, neroli, and green tangerine, evolving into patchouli and cedarwood.',
    shortDescription: 'Fresh marine and woody fragrance for men',
    price: 7499, originalPrice: 8499, discount: 11,
    images: [
      'https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1523293182086-7651a899d37f?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=400&auto=format&fit=crop&q=80',
    category: 'beauty', subcategory: 'fragrances', brand: 'Armani', brandLogo: 'https://logo.clearbit.com/armani.com',
    rating: 4.8, reviewCount: 654, stock: 35, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Fragrance', 'Perfume', 'Armani', 'Men Luxury'],
    specifications: { 'Volume': '100 ml', 'Type': 'Eau De Parfum', 'Scent Profile': 'Marine, Fresh, Woody', 'Origin': 'Italy' },
    seller: 'Luxury Scents', sellerId: 's29', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p35', name: 'Organic Aloe Vera Gel 500g', slug: 'organic-aloe-vera-gel',
    description: '100% pure cold-pressed aloe vera gel. Moisturizes skin, calms sunburns, and acts as a lightweight hydrator for hair and face.',
    shortDescription: 'Pure cold-pressed aloe vera for skin and hair',
    price: 299, originalPrice: 399, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1567894340315-735d7c361db0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1556229174-5e42a09e45af?w=400&auto=format&fit=crop&q=80',
    category: 'beauty', subcategory: 'skincare', brand: 'Forest Essentials', brandLogo: 'https://logo.clearbit.com/forestessentialsindia.com',
    rating: 4.5, reviewCount: 4120, stock: 600, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 1.2).toISOString(),
    tags: ['Aloe Vera', 'Organic', 'Soothing', 'Moisturizer'],
    specifications: { 'Weight': '500g', 'Extraction': 'Cold-Pressed', 'Organic': 'Yes', 'Usage': 'Face, Hair, Skin' },
    seller: 'Nature Bio Care', sellerId: 's30', freeShipping: false, deliveryDays: 4
  },
  {
    id: 'p36', name: 'Portable Digital Tire Inflator', slug: 'portable-digital-tire-inflator',
    description: '12V DC smart auto tire pump with digital pressure gauge and auto-shutoff. Perfect for cars, motorcycles, bicycles, and balls.',
    shortDescription: '12V DC smart auto pump with digital display gauge',
    price: 1899, originalPrice: 2999, discount: 36,
    images: [
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1486006920555-c77dce18193b?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-161788138017-80ad40651399?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=400&auto=format&fit=crop&q=80',
    category: 'automotive', subcategory: 'car-accessories', brand: 'Michelin', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/Michelin_logo.svg/200px-Michelin_logo.svg.png',
    rating: 4.6, reviewCount: 1543, stock: 120, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Tire Inflator', 'Car Care', 'Michelin', 'Emergency Kit'],
    specifications: { 'Power': '12V DC', 'Max Pressure': '150 PSI', 'Cable Length': '3.0 meters', 'Accuracy': '±1 PSI' },
    seller: 'Auto Gear Store', sellerId: 's31', freeShipping: true, deliveryDays: 3
  },
  {
    id: 'p37', name: 'Car Dash Cam Pro 1080P', slug: 'car-dash-cam-pro',
    description: 'Full HD 1080P car dashboard camera with night vision, G-sensor, loop recording, and a 170-degree wide-angle lens.',
    shortDescription: 'Full HD 1080P G-sensor dashboard recording camera',
    price: 2999, originalPrice: 4999, discount: 40,
    images: [
      'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1508962914676-134849a727f0?w=400&auto=format&fit=crop&q=80',
    category: 'automotive', subcategory: 'car-accessories', brand: '70mai', brandLogo: 'https://logo.clearbit.com/70mai.com',
    rating: 4.5, reviewCount: 843, stock: 85, isFeatured: true, isNew: true, isBestSeller: false, isFlashSale: false,
    tags: ['Dashcam', 'Car Gadget', 'Security', '1080P'],
    specifications: { 'Resolution': '1080P Full HD', 'Angle': '170° Wide Angle', 'Screen': '2.0 inch LCD', 'Storage': 'Supports MicroSD up to 64GB' },
    seller: 'Auto Gear Store', sellerId: 's31', freeShipping: true, deliveryDays: 2
  },
  {
    id: 'p38', name: 'Heavy Duty Car Vacuum Cleaner', slug: 'heavy-duty-car-vacuum',
    description: 'High power corded hand vacuum for car detailing. Features lightweight design, wash-free HEPA filter, and specialized nozzle attachments.',
    shortDescription: 'High power corded hand vacuum for car detailing',
    price: 1499, originalPrice: 1999, discount: 25,
    images: [
      'https://images.unsplash.com/photo-1569698205747-6a94b9ad9b30?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507136566006-cfc505b114fc?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1569698205747-6a94b9ad9b30?w=400&auto=format&fit=crop&q=80',
    category: 'automotive', subcategory: 'car-accessories', brand: 'Black & Decker', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/cf/Black_and_Decker_Logo.svg/200px-Black_and_Decker_Logo.svg.png',
    rating: 4.3, reviewCount: 1421, stock: 150, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Vacuum', 'Car Cleaning', 'Black & Decker'],
    specifications: { 'Power': '120W / 12V DC', 'Suction': '6000 Pa', 'Filter': 'Stainless Steel HEPA', 'Cord Length': '4.5 meters' },
    seller: 'Clean Car Solutions', sellerId: 's32', freeShipping: false, deliveryDays: 3
  },
  {
    id: 'p39', name: 'Universal Mobile Holder for Bike', slug: 'universal-mobile-holder-bike',
    description: 'Heavy-duty metal motorcycle and bicycle phone mount. Designed with shockproof claw grip and 360-degree rotation support.',
    shortDescription: 'Shockproof aluminum claw grip 360° bike phone mount',
    price: 499, originalPrice: 999, discount: 50,
    images: [
      'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1544192240-4a34feb0104c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1507035895480-2b3156c31fc8?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1532298229144-0ec0c57515c7?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1485965120184-e220f721d03e?w=400&auto=format&fit=crop&q=80',
    category: 'automotive', subcategory: 'bike-accessories', brand: 'Spigen', brandLogo: 'https://logo.clearbit.com/spigen.com',
    rating: 4.4, reviewCount: 4210, stock: 800, isFeatured: false, isNew: false, isBestSeller: true, isFlashSale: true, flashSaleEnd: new Date(Date.now() + 86400000 * 0.5).toISOString(),
    tags: ['Bike Mount', 'Phone Holder', 'Motorcycle', 'Spigen'],
    specifications: { 'Material': 'Aluminum Alloy', 'Rotation': '360 Degrees', 'Phone Size': '4.7 to 6.8 inches', 'Clamp Diameter': '20-30mm' },
    seller: 'Rider Depot', sellerId: 's33', freeShipping: false, deliveryDays: 4
  },
  {
    id: 'p40', name: '46-Piece Socket Wrench Set', slug: 'socket-wrench-set-46pc',
    description: 'Premium chrome vanadium steel metric socket wrench tool kit. Perfect for auto repairing, mechanical jobs, and household DIY projects.',
    shortDescription: '46-piece metric socket wrench tool kit in carrying case',
    price: 1299, originalPrice: 1999, discount: 35,
    images: [
      'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1530124560676-105586618a80?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1581092335397-9583fe92d232?w=800&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1504148455328-c376907d081c?w=800&auto=format&fit=crop&q=80'
    ],
    thumbnail: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=400&auto=format&fit=crop&q=80',
    category: 'automotive', subcategory: 'tools', brand: 'Bosch', brandLogo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/16/Bosch-Logo.svg/200px-Bosch-Logo.svg.png',
    rating: 4.7, reviewCount: 894, stock: 110, isFeatured: true, isNew: false, isBestSeller: true, isFlashSale: false,
    tags: ['Wrench Set', 'Tools', 'Bosch', 'Auto Repair'],
    specifications: { 'Material': 'Chrome Vanadium Steel', 'Metric Sockets': '4mm to 14mm', 'Drive Size': '1/4 inch', 'Case Included': 'Heavy duty blow case' },
    seller: 'Auto Tool World', sellerId: 's34', freeShipping: true, deliveryDays: 3
  },
];

// ===== CATEGORIES =====
export const categories: Category[] = [
  { id: 'c1', name: 'Electronics', slug: 'electronics', icon: 'FaMicrochip', image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&auto=format&fit=crop&q=80', productCount: 8432, gradient: 'from-blue-600 to-indigo-600', subcategories: [{ id: 'sc1', name: 'Smartphones', slug: 'smartphones' }, { id: 'sc2', name: 'Laptops', slug: 'laptops' }, { id: 'sc3', name: 'Tablets', slug: 'tablets' }, { id: 'sc4', name: 'Headphones', slug: 'headphones' }, { id: 'sc5', name: 'Televisions', slug: 'televisions' }, { id: 'sc6', name: 'Smartwatches', slug: 'smartwatches' }] },
  { id: 'c2', name: 'Fashion', slug: 'fashion', icon: 'FaTshirt', image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&auto=format&fit=crop&q=80', productCount: 12547, gradient: 'from-pink-500 to-rose-600', subcategories: [{ id: 'sc7', name: 'Men\'s Clothing', slug: 'mens-clothing' }, { id: 'sc8', name: 'Women\'s Clothing', slug: 'womens-clothing' }, { id: 'sc9', name: 'Sneakers', slug: 'sneakers' }, { id: 'sc10', name: 'Jeans', slug: 'jeans' }, { id: 'sc11', name: 'Sunglasses', slug: 'sunglasses' }] },
  { id: 'c3', name: 'Home & Kitchen', slug: 'home', icon: 'FaHome', image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=600&auto=format&fit=crop&q=80', productCount: 6782, gradient: 'from-orange-500 to-amber-500', subcategories: [{ id: 'sc12', name: 'Kitchen Appliances', slug: 'kitchen' }, { id: 'sc13', name: 'Furniture', slug: 'furniture' }, { id: 'sc14', name: 'Décor', slug: 'decor' }, { id: 'sc15', name: 'Appliances', slug: 'appliances' }, { id: 'sc16', name: 'Vacuum Cleaners', slug: 'vacuum-cleaners' }] },
  { id: 'c4', name: 'Books', slug: 'books', icon: 'FaBook', image: 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=600&auto=format&fit=crop&q=80', productCount: 23456, gradient: 'from-emerald-500 to-teal-600', subcategories: [{ id: 'sc17', name: 'Fiction', slug: 'fiction' }, { id: 'sc18', name: 'Non-Fiction', slug: 'non-fiction' }, { id: 'sc19', name: 'Educational', slug: 'educational' }, { id: 'sc20', name: 'Comics', slug: 'comics' }] },
  { id: 'c5', name: 'Sports & Fitness', slug: 'sports', icon: 'FaDumbbell', image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=600&auto=format&fit=crop&q=80', productCount: 4321, gradient: 'from-cyan-500 to-blue-600', subcategories: [{ id: 'sc21', name: 'Gym Equipment', slug: 'gym' }, { id: 'sc22', name: 'Yoga', slug: 'yoga' }, { id: 'sc23', name: 'Outdoor Sports', slug: 'outdoor' }, { id: 'sc24', name: 'Cycling', slug: 'cycling' }] },
  { id: 'c6', name: 'Beauty & Care', slug: 'beauty', icon: 'FaSpa', image: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=600&auto=format&fit=crop&q=80', productCount: 7654, gradient: 'from-purple-500 to-violet-600', subcategories: [{ id: 'sc25', name: 'Skincare', slug: 'skincare' }, { id: 'sc26', name: 'Makeup', slug: 'makeup' }, { id: 'sc27', name: 'Haircare', slug: 'haircare' }, { id: 'sc28', name: 'Fragrances', slug: 'fragrances' }] },
  { id: 'c7', name: 'Grocery', slug: 'grocery', icon: 'FaShoppingBasket', image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80', productCount: 3210, gradient: 'from-lime-500 to-green-600', subcategories: [{ id: 'sc29', name: 'Beverages', slug: 'beverages' }, { id: 'sc30', name: 'Snacks', slug: 'snacks' }, { id: 'sc31', name: 'Organic', slug: 'organic' }] },
  { id: 'c8', name: 'Automotive', slug: 'automotive', icon: 'FaCar', image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=600&auto=format&fit=crop&q=80', productCount: 2109, gradient: 'from-red-500 to-rose-600', subcategories: [{ id: 'sc32', name: 'Car Accessories', slug: 'car-accessories' }, { id: 'sc33', name: 'Bike Accessories', slug: 'bike-accessories' }, { id: 'sc34', name: 'Tools', slug: 'tools' }] },
];

// ===== BRANDS =====
export const brands: Brand[] = [
  { id: 'b1', name: 'Apple', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png', productCount: 234, description: 'Think different.' },
  { id: 'b2', name: 'Samsung', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png', productCount: 312, description: 'Do what you can\'t.' },
  { id: 'b3', name: 'Nike', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png', productCount: 456, description: 'Just do it.' },
  { id: 'b4', name: 'Adidas', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/200px-Adidas_Logo.svg.png', productCount: 398, description: 'Impossible is nothing.' },
  { id: 'b5', name: 'Sony', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/200px-Sony_logo.svg.png', productCount: 187, description: 'Make believe.' },
  { id: 'b6', name: 'LG', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bf/LG-logo.svg/200px-LG-logo.svg.png', productCount: 145, description: 'Life\'s good.' },
  { id: 'b7', name: 'Dyson', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Dyson_logo.svg/200px-Dyson_logo.svg.png', productCount: 67, description: 'Solving problems others ignore.' },
  { id: 'b8', name: 'Logitech', logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Logitech_logo.svg/200px-Logitech_logo.svg.png', productCount: 213, description: 'Design for tomorrow.' },
];

// ===== TESTIMONIALS =====
export const testimonials: Testimonial[] = [
  { id: 't1', name: 'Arjun Sharma', role: 'Tech Enthusiast', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80', rating: 5, comment: 'ShopVerse completely changed how I shop online. The product discovery is incredible, and delivery is always on time. The UI is just gorgeous.', date: '2024-01-15', location: 'Mumbai, India' },
  { id: 't2', name: 'Priya Nair', role: 'Fashion Blogger', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80', rating: 5, comment: 'I love the curated collections and how easy it is to find exactly what I want. The returns process is seamless too. 10/10 experience!', date: '2024-01-22', location: 'Bangalore, India' },
  { id: 't3', name: 'Rahul Gupta', role: 'Software Engineer', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80', rating: 5, comment: 'Best platform for electronics! Got my MacBook with a great deal and it arrived in 2 days. The AI recommendations are scary accurate.', date: '2024-02-01', location: 'Delhi, India' },
  { id: 't4', name: 'Sneha Patel', role: 'Interior Designer', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80', rating: 4, comment: 'The home decor section is phenomenal. Great quality products, detailed descriptions, and the 360° product view is super helpful for my work.', date: '2024-02-10', location: 'Ahmedabad, India' },
  { id: 't5', name: 'Karan Mehta', role: 'Startup Founder', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&fit=crop&q=80', rating: 5, comment: 'I\'ve been a seller on ShopVerse for 6 months. The seller dashboard is powerful and the customer base is amazing. My revenue tripled!', date: '2024-02-18', location: 'Pune, India' },
  { id: 't6', name: 'Deepika Rao', role: 'Doctor', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&fit=crop&q=80', rating: 5, comment: 'The health & wellness section is well-stocked with genuine products. Great customer service. Highly recommend for busy professionals.', date: '2024-02-25', location: 'Hyderabad, India' },
];

// ===== REVIEWS =====
export const reviews: Review[] = [
  { id: 'r1', userId: 'u1', userName: 'Arjun S.', userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80', productId: 'p1', rating: 5, title: 'Absolutely stunning device!', comment: 'The titanium build quality is exceptional. Camera performance blows away the competition. Battery easily lasts a full day. Worth every rupee.', date: '2024-01-20', helpful: 234, verified: true },
  { id: 'r2', userId: 'u2', userName: 'Priya N.', userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80', productId: 'p1', rating: 4, title: 'Great phone, slight overheating', comment: 'Performance is unmatched and the cameras are incredible. Slight overheating during heavy gaming but manageable. Overall highly recommended.', date: '2024-01-25', helpful: 187, verified: true },
  { id: 'r3', userId: 'u3', userName: 'Rahul G.', userAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80', productId: 'p1', rating: 5, title: 'Best iPhone ever made', comment: 'Upgraded from iPhone 13 Pro. The difference in camera quality and performance is night and day. The Dynamic Island is genuinely useful.', date: '2024-02-01', helpful: 145, verified: true },
  { id: 'r4', userId: 'u4', userName: 'Sneha P.', userAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&fit=crop&q=80', productId: 'p1', rating: 5, title: 'Premium in every way', comment: 'The build quality is superb — feels luxurious. iOS 17 features are genuinely useful. The battery life with always-on display is impressive.', date: '2024-02-05', helpful: 98, verified: false },
];

// ===== ORDERS =====
export const orders: Order[] = [
  {
    id: 'ord-001', userId: 'u1',
    items: [{ product: products[0], quantity: 1, selectedColor: 'natural' }],
    status: 'delivered', total: 134999, subtotal: 134999, shipping: 0, tax: 10350, discount: 0,
    address: { id: 'addr1', fullName: 'Arjun Sharma', phone: '9876543210', street: '12, Linking Road, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', country: 'India', isDefault: true, type: 'home' },
    paymentMethod: 'UPI', createdAt: '2024-01-15T10:00:00Z', updatedAt: '2024-01-17T14:00:00Z', estimatedDelivery: '2024-01-17', trackingNumber: 'SV123456789IN'
  },
  {
    id: 'ord-002', userId: 'u1',
    items: [{ product: products[2], quantity: 1, selectedColor: 'black' }, { product: products[4], quantity: 2, selectedColor: 'black-white', selectedSize: 'UK 9' }],
    status: 'shipped', total: 50997, subtotal: 50997, shipping: 0, tax: 3922, discount: 2000,
    couponCode: 'SAVE200',
    address: { id: 'addr1', fullName: 'Arjun Sharma', phone: '9876543210', street: '12, Linking Road, Bandra West', city: 'Mumbai', state: 'Maharashtra', pincode: '400050', country: 'India', isDefault: true, type: 'home' },
    paymentMethod: 'Credit Card', createdAt: '2024-02-10T09:30:00Z', updatedAt: '2024-02-12T11:00:00Z', estimatedDelivery: '2024-02-14', trackingNumber: 'SV987654321IN'
  },
  {
    id: 'ord-003', userId: 'u1',
    items: [{ product: products[18], quantity: 1, selectedColor: 'graphite' }],
    status: 'processing', total: 9995, subtotal: 9995, shipping: 99, tax: 769, discount: 0,
    address: { id: 'addr2', fullName: 'Arjun Sharma', phone: '9876543210', street: 'Plot 45, Sector 18', city: 'Noida', state: 'Uttar Pradesh', pincode: '201301', country: 'India', isDefault: false, type: 'work' },
    paymentMethod: 'Net Banking', createdAt: '2024-02-20T15:00:00Z', updatedAt: '2024-02-20T15:30:00Z', estimatedDelivery: '2024-02-23'
  },
];

// ===== USERS =====
export const users: User[] = [
  { id: 'u1', name: 'Arjun Sharma', email: 'arjun.sharma@email.com', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&fit=crop&q=80', phone: '9876543210', role: 'customer', joinedAt: '2023-06-15', orders: 23, totalSpent: 287500, addresses: [], status: 'active' },
  { id: 'u2', name: 'Priya Nair', email: 'priya.nair@email.com', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&fit=crop&q=80', phone: '9876543211', role: 'customer', joinedAt: '2023-07-20', orders: 15, totalSpent: 45600, addresses: [], status: 'active' },
  { id: 'u3', name: 'Rahul Gupta', email: 'rahul.gupta@email.com', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&fit=crop&q=80', phone: '9876543212', role: 'seller', joinedAt: '2023-05-10', orders: 0, totalSpent: 0, addresses: [], status: 'active' },
  { id: 'u4', name: 'Admin User', email: 'admin@shopverse.com', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&fit=crop&q=80', phone: '9876543200', role: 'admin', joinedAt: '2023-01-01', orders: 0, totalSpent: 0, addresses: [], status: 'active' },
];

// ===== SELLER DATA =====
export const sellers: Seller[] = [
  { id: 's1', name: 'Apple Official Store', email: 'apple@shopverse.com', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Apple_logo_black.svg/200px-Apple_logo_black.svg.png', storeName: 'Apple Official', storeDescription: 'Authorised Apple products', rating: 4.9, totalProducts: 48, totalOrders: 12456, totalRevenue: 12500000, joinedAt: '2023-01-15', status: 'active', verified: true },
  { id: 's2', name: 'Samsung Store', email: 'samsung@shopverse.com', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/Samsung_Logo.svg/200px-Samsung_Logo.svg.png', storeName: 'Samsung Official', storeDescription: 'Official Samsung products', rating: 4.7, totalProducts: 65, totalOrders: 9876, totalRevenue: 9800000, joinedAt: '2023-01-20', status: 'active', verified: true },
  { id: 's3', name: 'Sony Electronics', email: 'sony@shopverse.com', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Sony_logo.svg/200px-Sony_logo.svg.png', storeName: 'Sony Store', storeDescription: 'Official Sony products', rating: 4.8, totalProducts: 34, totalOrders: 6543, totalRevenue: 5600000, joinedAt: '2023-02-10', status: 'active', verified: true },
  { id: 's4', name: 'Nike Official', email: 'nike@shopverse.com', avatar: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a6/Logo_NIKE.svg/200px-Logo_NIKE.svg.png', storeName: 'Nike Store', storeDescription: 'Official Nike products', rating: 4.6, totalProducts: 120, totalOrders: 15432, totalRevenue: 7800000, joinedAt: '2023-02-15', status: 'active', verified: true },
  { id: 's19', name: 'TechGadgets Store', email: 'tech@shopverse.com', avatar: 'https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=100&fit=crop&q=80', storeName: 'TechGadgets', storeDescription: 'Premium tech gadgets', rating: 4.2, totalProducts: 78, totalOrders: 2345, totalRevenue: 1800000, joinedAt: '2023-08-01', status: 'pending', verified: false },
];

// ===== NOTIFICATIONS =====
export const notifications: Notification[] = [
  { id: 'n1', type: 'order', title: 'Order Delivered!', message: 'Your iPhone 15 Pro Max has been delivered successfully.', time: '2 hours ago', read: false },
  { id: 'n2', type: 'promo', title: 'Flash Sale Starting!', message: '50% off on select electronics — for next 24 hours only!', time: '4 hours ago', read: false },
  { id: 'n3', type: 'system', title: 'Account Verified', message: 'Your account has been successfully verified.', time: '1 day ago', read: true },
  { id: 'n4', type: 'review', title: 'New Review', message: 'Someone found your review helpful. +5 points earned!', time: '2 days ago', read: true },
  { id: 'n5', type: 'order', title: 'Order Shipped', message: 'Your Sony WH-1000XM5 is on the way! ETA: 2 days.', time: '3 days ago', read: true },
];

// ===== CHART DATA (for dashboards) =====
export const revenueChartData: ChartData[] = [
  { name: 'Jan', value: 420000, revenue: 420000, orders: 342, growth: 12 },
  { name: 'Feb', value: 380000, revenue: 380000, orders: 298, growth: -9 },
  { name: 'Mar', value: 510000, revenue: 510000, orders: 421, growth: 34 },
  { name: 'Apr', value: 490000, revenue: 490000, orders: 389, growth: -3 },
  { name: 'May', value: 620000, revenue: 620000, orders: 512, growth: 26 },
  { name: 'Jun', value: 710000, revenue: 710000, orders: 598, growth: 14 },
  { name: 'Jul', value: 680000, revenue: 680000, orders: 567, growth: -4 },
  { name: 'Aug', value: 750000, revenue: 750000, orders: 634, growth: 10 },
  { name: 'Sep', value: 820000, revenue: 820000, orders: 698, growth: 9 },
  { name: 'Oct', value: 910000, revenue: 910000, orders: 789, growth: 11 },
  { name: 'Nov', value: 1100000, revenue: 1100000, orders: 987, growth: 20 },
  { name: 'Dec', value: 1350000, revenue: 1350000, orders: 1234, growth: 22 },
];

export const categoryChartData: ChartData[] = [
  { name: 'Electronics', value: 38 },
  { name: 'Fashion', value: 24 },
  { name: 'Home & Kitchen', value: 18 },
  { name: 'Books', value: 8 },
  { name: 'Sports', value: 7 },
  { name: 'Others', value: 5 },
];

export const flashSaleProducts = products.filter(p => p.isFlashSale);
export const trendingProducts = products.filter(p => p.isFeatured);
export const bestSellers = products.filter(p => p.isBestSeller);
export const newArrivals = products.filter(p => p.isNew);
