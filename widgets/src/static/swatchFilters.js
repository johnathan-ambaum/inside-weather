export const filters = [
  {
    key: 'upholstery_family',
    label: 'UPHOLSTERY FAMILY',
    isArray: true,
    options: [
      { value: 'Velvet & Chenille', display: 'Velvet & Chenille' },
      { value: 'Vegan Leather & Suede', display: 'Vegan Leather & Suede' },
      { value: 'Woven', display: 'Woven' },
      { value: 'Boucle', display: 'Bouclé' },
      { value: 'Patterns & Prints', display: 'Patterns & Prints' },
    ],
  },
  {
    key: 'features',
    label: 'MATERIAL FEATURES',
    isArray: false,
    options: [
      {
        value: 'water_resistant',
        display: 'Liquid Repellent',
        iconRight: 'https://cdn.insideweather.com/icons/water-resistant_ico@2x.png',
        description: 'Resilient fabrics with a nontoxic finish that makes them resistant to water-based liquids.',
      },
      {
        value: 'performance',
        display: 'Performance',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/performance.png',
        description: 'Stain resistant and highly durable with excellent cleanability.',
      },
      {
        value: 'pet_friendly',
        display: 'Pet Friendly',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/pet-friendly.png',
        description: 'Durable and tightly woven textures that stand strong against claws and fine hairs.',
      },
      {
        value: 'commercial',
        display: 'Commercial Grade',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/commercial.png',
        description: 'Designed for high traffic environments, these high-abrasion fabrics meet or exceed 50,000 double rubs.',
      },
      {
        value: 'trade',
        display: 'Hard Material Samples',
        description: 'We offer mini samples of our FSC-Certified woods and powder coated metals made available exclusively for our trade members.',
      },
    ],
  },
  {
    key: 'color_family',
    label: 'COLOR',
    isArray: true,
    options: [
      { value: 'Beiges | Creams | Whites', display: 'Beiges, Creams, Whites', color: '#D9CFC2' },
      { value: 'Browns | Tans', display: 'Browns, Tans', color: '#A87A4A' },
      { value: 'Light Grays', display: 'Light Grays', color: '#A5A5A5' },
      { value: 'Dark Grays | Blacks', display: 'Dark Grays, Blacks', color: '#525252' },
      { value: 'Blues', display: 'Blues', color: '#6A7E9D' },
      { value: 'Greens', display: 'Greens', color: '#627957' },
      { value: 'Yellows', display: 'Yellows', color: '#DFB52B' },
      { value: 'Pinks', display: 'Pinks', color: '#EF9B9B' },
      { value: 'Purples', display: 'Purples', color: '#684668' },
      { value: 'Reds', display: 'Reds', color: '#BE2E2E' },
      { value: 'Oranges', display: 'Oranges', color: '#D6864B' },
    ],
  },
  {
    key: 'design_style',
    label: 'DESIGN STYLE',
    isArray: true,
    options: [
      {
        value: 'Solid Colors Only',
        display: 'Solid Colors Only',
        iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/solids.png',
      },
      {
        value: 'Graphic Only',
        display: 'Graphic Only',
        iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/graphics.png',
      },
      {
        value: 'Terrazzo & Marble',
        display: 'Terrazzo & Marble',
        iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/terrazzo-marble.png',
      },
      {
        value: 'Nordic & Mid-Century',
        display: 'Nordic & Mid-Century',
        iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/nordic-mid-century.png',
      },
      {
        value: 'Art Deco & Glam',
        display: 'Art Deco & Glam',
        iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/art-deco-glam.png',
      },
      {
        value: 'Botanical',
        display: 'Botanical',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/sweet-palm.png',
      },
      {
        value: 'Watercolor & Ink',
        display: 'Watercolor & Ink',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/pacific-waters.png',
      },
      {
        value: 'Southwest',
        display: 'Southwest',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/southwest-sunset.png',
      },
      {
        value: 'Abstract',
        display: 'Abstract',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/evening-abstraction.png',
      },
      {
        value: 'Frank Lloyd Wright Usonia™',
        display: 'Frank Lloyd Wright Usonia™',
        iconLeft: 'https://cdn.insideweather.com/free-swatches/design-style/usonia.png',
      },
    ],
  },
];

export const sortOptions = [
  { value: 'upholstery', display: 'Upholstery Type' },
  { value: 'color', display: 'Color' },
  { value: 'best_selling', display: 'Best Selling' },
];

export default {
  filters,
  sortOptions,
};
