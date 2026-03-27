// ─── ALL PRODUCTS ──────────────────────────────────────────────────────────
export const INIT_PRODUCTS = [
  // Grains
  {
    id: 1,
    name: 'Organic Rice',
    emoji: '🌾',
    price: '₹80/kg',
    category: 'Grains',
    description:
      'Premium quality organic rice grown in fertile fields of Andhra Pradesh. Hand-picked and sun-dried to preserve natural nutrients. Rich in carbohydrates and essential minerals. Perfect for daily consumption.',
    weight: '5kg, 10kg, 25kg',
    origin: 'Andhra Pradesh',
    benefits: ['Chemical-free', 'Rich in nutrients', 'Long grain', 'High shelf life'],
  },
  {
    id: 7,
    name: 'Jowar (Sorghum)',
    emoji: '🌽',
    price: '₹55/kg',
    category: 'Grains',
    description:
      'Traditional jowar grown in the Deccan plateau. High in fibre and iron, gluten-free. Used for making rotis, ladoos, and porridge. Drought-resistant crop cultivated for centuries.',
    weight: '1kg, 5kg, 10kg',
    origin: 'Kurnool, AP',
    benefits: ['Gluten-free', 'High fibre', 'Iron-rich', 'Drought-hardy'],
  },
  {
    id: 8,
    name: 'Bajra (Pearl Millet)',
    emoji: '🌰',
    price: '₹48/kg',
    category: 'Grains',
    description:
      'Nutritious bajra from the dry fields of Rayalaseema. Rich in magnesium and potassium. Great for winter recipes, khichdi, and traditional flatbreads.',
    weight: '1kg, 5kg',
    origin: 'Anantapur, AP',
    benefits: ['Magnesium-rich', 'Warming grain', 'Gluten-free', 'Antioxidants'],
  },
  {
    id: 9,
    name: 'Black Rice',
    emoji: '🍚',
    price: '₹240/kg',
    category: 'Grains',
    description:
      'Rare heirloom black rice packed with anthocyanins and antioxidants. Grown in small batches in the Eastern Ghats. Nutty flavour and chewy texture, ideal for salads and desserts.',
    weight: '500g, 1kg',
    origin: 'Vizianagaram, AP',
    benefits: ['Antioxidant-rich', 'Anthocyanins', 'Heirloom variety', 'High iron'],
  },

  // Spices
  {
    id: 2,
    name: 'Red Chilli',
    emoji: '🌶️',
    price: '₹220/kg',
    category: 'Spices',
    description:
      'Authentic Guntur red chillies, the pride of Andhra Pradesh. Known worldwide for their intense heat and deep red colour. Sun-dried and cleaned to give the best flavour to your dishes.',
    weight: '250g, 500g, 1kg',
    origin: 'Guntur, AP',
    benefits: ['High capsaicin', 'Rich colour', 'Naturally dried', 'Premium grade'],
  },
  {
    id: 3,
    name: 'Turmeric',
    emoji: '🟡',
    price: '₹180/kg',
    category: 'Spices',
    description:
      'Pure Nizamabad turmeric with high curcumin content. Grown using traditional methods. Bright yellow colour and strong aroma. Prized for cooking and Ayurvedic use.',
    weight: '250g, 500g, 1kg',
    origin: 'Nizamabad, TG',
    benefits: ['High curcumin', 'Anti-inflammatory', 'Natural colour', 'Medicinal'],
  },
  {
    id: 10,
    name: 'Coriander Seeds',
    emoji: '🌿',
    price: '₹120/kg',
    category: 'Spices',
    description:
      'Aromatic coriander seeds from Krishna district. Freshly dried and cleaned. Essential for tempering dals, biryanis, and chutneys. Mild citrus note with earthy undertones.',
    weight: '250g, 500g, 1kg',
    origin: 'Krishna, AP',
    benefits: ['Digestive aid', 'Fresh aroma', 'Premium clean', 'Versatile spice'],
  },
  {
    id: 11,
    name: 'Cumin Seeds',
    emoji: '✨',
    price: '₹320/kg',
    category: 'Spices',
    description:
      'Hand-cleaned cumin seeds with a bold, earthy fragrance. Essential staple of Telugu cuisine, used in dals, rice dishes, and spice blends. Helps digestion and improves appetite.',
    weight: '250g, 500g, 1kg',
    origin: 'Prakasam, AP',
    benefits: ['Digestive', 'Bold aroma', 'Hand-cleaned', 'Zero additives'],
  },
  {
    id: 12,
    name: 'Black Pepper',
    emoji: '⚫',
    price: '₹580/kg',
    category: 'Spices',
    description:
      'Premium Malabar-grade black pepper sourced from the hilly estates of Alluri Sitharama Raju district. Strong pungent aroma and heat. Freshly dried peppercorns with natural oils intact.',
    weight: '100g, 250g, 500g',
    origin: 'Alluri Dist., AP',
    benefits: ['Piperine-rich', 'Natural oils', 'Premium grade', 'Strong aroma'],
  },

  // Oilseeds
  {
    id: 4,
    name: 'Groundnuts',
    emoji: '🥜',
    price: '₹95/kg',
    category: 'Oilseeds',
    description:
      'Fresh farm groundnuts from Anantapur region, the groundnut capital of India. Rich in healthy fats and proteins. Best for peanut oil, chutney, or roasted snacks.',
    weight: '1kg, 5kg, 10kg',
    origin: 'Anantapur, AP',
    benefits: ['High protein', 'Healthy fats', 'Farm fresh', 'Multipurpose'],
  },
  {
    id: 13,
    name: 'Sesame Seeds',
    emoji: '🤍',
    price: '₹210/kg',
    category: 'Oilseeds',
    description:
      'White hulled sesame seeds packed with calcium and healthy fats. Used in traditional sweets like tilgul and in tahini. Adds a nutty crunch to stir-fries and breads.',
    weight: '250g, 500g, 1kg',
    origin: 'Nellore, AP',
    benefits: ['Calcium-rich', 'High healthy fats', 'Versatile', 'Chemical-free'],
  },
  {
    id: 14,
    name: 'Sunflower Seeds',
    emoji: '🌻',
    price: '₹140/kg',
    category: 'Oilseeds',
    description:
      'Premium sunflower seeds from the fields of Andhra Pradesh. Rich in Vitamin E and selenium. Great for snacking, baking, and oil extraction. Naturally hulled and cleaned.',
    weight: '500g, 1kg, 5kg',
    origin: 'Prakasam, AP',
    benefits: ['Vitamin E', 'Selenium-rich', 'Heart-healthy', 'Naturally hulled'],
  },

  // Fiber Crops
  {
    id: 5,
    name: 'Cotton',
    emoji: '🌸',
    price: '₹6500/quintal',
    category: 'Fiber Crops',
    description:
      'High-grade cotton from the fertile black soil of Andhra Pradesh. Long staple variety with excellent fibre strength. Ideal for textile manufacturing and export quality.',
    weight: 'Per quintal',
    origin: 'Kurnool, AP',
    benefits: ['Long staple', 'Export quality', 'High ginning', 'Zero contamination'],
  },
  {
    id: 15,
    name: 'Jute',
    emoji: '🪢',
    price: '₹3200/quintal',
    category: 'Fiber Crops',
    description:
      'Natural golden jute grown on the coastal belt near Kakinada. Strong, biodegradable fibre used for sacks, rope, and eco-friendly packaging.',
    weight: 'Per quintal',
    origin: 'Kakinada, AP',
    benefits: ['Biodegradable', 'Eco-friendly', 'High tensile', 'Golden grade'],
  },

  // Fruits
  {
    id: 6,
    name: 'Mango',
    emoji: '🥭',
    price: '₹120/kg',
    category: 'Fruits',
    description:
      'Sweet Banganapalli and Alphonso mangoes from the mango belt of Andhra Pradesh. Tree-ripened. Juicy, sweet and aromatic. Best for direct consumption and processing.',
    weight: '5kg, 10kg boxes',
    origin: 'Srungavarapukota',
    benefits: ['Tree ripened', 'No artificial ripening', 'Vitamin A', 'Export grade'],
  },
  {
    id: 16,
    name: 'Banana',
    emoji: '🍌',
    price: '₹35/dozen',
    category: 'Fruits',
    description:
      'Yelakki and Robusta bananas grown on the rich alluvial soils of the Godavari delta. Naturally sweet, soft and fragrant.',
    weight: 'Per dozen / crate',
    origin: 'East Godavari, AP',
    benefits: ['Natural sweetness', 'Farm fresh', 'Rich in potassium', 'No chemicals'],
  },
  {
    id: 17,
    name: 'Papaya',
    emoji: '🍈',
    price: '₹28/kg',
    category: 'Fruits',
    description:
      'Fresh papayas grown in the warm climate of Nellore district. Rich in papain enzyme and Vitamin C. Sweet orange flesh with smooth texture.',
    weight: '1kg, 5kg, 10kg',
    origin: 'Nellore, AP',
    benefits: ['Digestive enzyme', 'Vitamin C', 'Farm-to-table', 'No pesticide'],
  },

  // Vegetables
  {
    id: 18,
    name: 'Brinjal (Eggplant)',
    emoji: '🍆',
    price: '₹40/kg',
    category: 'Vegetables',
    description:
      'Tender round brinjals from the farms of Anantapur. The star ingredient of Telugu\'s beloved Gutti Vankaya curry.',
    weight: '500g, 1kg, 5kg',
    origin: 'Anantapur, AP',
    benefits: ['Low calorie', 'Rich in fibre', 'Anthocyanins', 'Gutti Vankaya grade'],
  },
  {
    id: 19,
    name: 'Tomato',
    emoji: '🍅',
    price: '₹30/kg',
    category: 'Vegetables',
    description:
      'Bright red tomatoes from the highland farms of Chittoor, AP — the tomato belt of South India. High lycopene content.',
    weight: '1kg, 5kg, 10kg',
    origin: 'Chittoor, AP',
    benefits: ['High lycopene', 'Firm flesh', 'Rich Vitamin C', 'Natural red colour'],
  },
  {
    id: 20,
    name: 'Green Chilli',
    emoji: '🫑',
    price: '₹60/kg',
    category: 'Vegetables',
    description:
      'Fiery green chillies fresh from Guntur farms. Essential in every Telugu household. Used in chutneys, curries, and pickles.',
    weight: '250g, 500g, 1kg',
    origin: 'Guntur, AP',
    benefits: ['Vitamin C-rich', 'High capsaicin', 'Farm fresh', 'Signature Andhra heat'],
  },
];
