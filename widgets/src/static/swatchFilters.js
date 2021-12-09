export const filters = [
  {
    key: 'upholstery_family',
    label: 'UPHOLSTERY FAMILY',
    options: [
      { value: 'boucle', display: 'Bouclé' },
      { value: 'leather', display: 'Leather' },
      { value: 'velvet', display: 'Velvet' },
      { value: 'suede', display: 'Suede' },
      { value: 'woven', display: 'Woven' },
    ],
  },
  {
    key: 'features',
    label: 'MATERIAL FEATURES',
    options: [
      {
        value: 'pet_friendly',
        display: 'Pet & Kid Friendly',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/pet-friendly.png',
        description: 'Durable and tightly woven to resist snagging.<br>Easy to clean from shedding.',
      },
      {
        value: 'performance',
        display: 'Performance',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/performance.png',
        description: 'Durable and tightly woven to resist snagging.<br>Easy to clean from shedding.',
      },
      {
        value: 'commercial',
        display: 'Commercial',
        iconRight: '//cdn.insideweather.com/pdp/customizer/ico/commercial.png',
        description: 'Durable and tightly woven to resist snagging.<br>Easy to clean from shedding.',
      },
      {
        value: 'water_resistant',
        display: 'Water Resistant',
        iconRight: 'https://cdn.insideweather.com/icons/water-resistant_ico@2x.png',
        description: 'Durable and tightly woven to resist snagging.<br>Easy to clean from shedding.',
      },
    ],
  },
  {
    key: 'color_family',
    label: 'COLOR',
    options: [
      { value: 'beiges_creams', display: 'Beiges & Creams', color: '#D9CFC2' },
      { value: 'browns', display: 'Browns', color: '#A87A4A' },
      { value: 'light_grays', display: 'Light Grays', color: '#A5A5A5' },
      { value: 'blacks_dark_grays', display: 'Blacks / Dark Grays', color: '#525252' },
      { value: 'blues', display: 'Blues', color: '#6A7E9D' },
      { value: 'greens', display: 'Greens', color: '#627957' },
      { value: 'yellows', display: 'Yellows', color: '#DFB52B' },
      { value: 'oranges', display: 'Oranges', color: '#D6864B' },
      { value: 'pinks', display: 'Pinks', color: '#EF9B9B' },
      { value: 'reds', display: 'Reds', color: '#BE2E2E' },
      { value: 'purples', display: 'Purples', color: '#684668' },
    ],
  },
  {
    key: 'design_style',
    label: 'DESIGN STYLE',
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
