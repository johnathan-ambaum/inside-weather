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
        value: 'pet_friendly',
        display: 'Pet & Kid Friendly',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/pet-friendly.png',
        description: 'Durable and tightly woven textures that stand strong against claws and fine hairs.',
      },
      {
        value: 'performance',
        display: 'Performance',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/performance.png',
        description: 'Stain resistant and highly durable with excellent cleanability.',
      },
      {
        value: 'commercial',
        display: 'Commercial',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/commercial.png',
        description: 'Designed for high traffic environments, these high-abrasion fabrics meet or exceed 50,000 double rubs.',
      },
      {
        value: 'water_resistant',
        display: 'Liquid Repellent',
        iconRight: 'https://cdn.insideweather.com/icons/water-resistant_ico@2x.png',
        description: 'Resilient fabrics with a nontoxic finish that makes them resistant to water-based liquids.',
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
        value: 'botanical',
        display: 'Botanical',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/sweet-palm.png',
      },
      {
        value: 'gemoetric',
        display: 'Geometric',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/glamorous-geometry.png',
      },
      {
        value: 'southwest',
        display: 'Southwest',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/southwest-sunset.png',
      },
      {
        value: 'watercolor',
        display: 'Watercolor',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/pacific-waters.png',
      },
      {
        value: 'abstract',
        display: 'Abstract',
        iconLeft: 'https://inside-weather-assets.s3.amazonaws.com/pdp/customizer/upholstery-surface-design/evening-abstraction.png',
      },
    ],
  },
];

export const sortOptions = [
  { value: 'color', display: 'Color' },
  { value: 'upholstery', display: 'Upholstery Type' },
  { value: 'best_selling', display: 'Best Selling' },
];

export default {
  filters,
  sortOptions,
};
