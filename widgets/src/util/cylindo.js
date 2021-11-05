/**
 * Calculates cylindo sku and feature array, taking into account user option selections
 * and any applicable overrides
 */
export function getViewerParameters({ baseSku, attributes, selectedOptions }) {
  let productCode = baseSku;
  let productCodePriority = Infinity;
  let features = [];

  Object.entries(selectedOptions).forEach(([parameter, value]) => {
    const { values } = attributes.find(att => att.parameter === parameter);
    const selected = values.find(item => item.value === value);
    const { cylindo_override_priority: overridePriority } = attributes.find(att => att.parameter === parameter);
    if (selected.cylindo_sku_override && overridePriority) {
      if (overridePriority < productCodePriority) {
        productCode = selected.cylindo_sku_override;
        productCodePriority = overridePriority;
      }
    }
    features = features.concat(selected.cylindo_features || []);
  });

  return {
    productCode,
    features,
  };
}

export function getStaticImageUrl({ productCode, features, frame = 1 }) {
  // eslint-disable-next-line max-len
  const baseCylindoImageUrl = `https://content-v2.cylindo.com/api/v2/4931/products/${productCode}/frames/${frame}/${productCode}.jpg`;
  const cylindoFeatureKeyValues = features.map((feature, index) => {
    if (index % 2 !== 0) {
      return false;
    }
    // eslint-disable-next-line prefer-template
    return features[index] + ':' + features[index + 1];
  }).filter(Boolean);
  const cylindoFeatureQueryString = `?feature=${cylindoFeatureKeyValues.join('&feature=')}`;
  const cylindoFeatureQueryStringURI = encodeURI(cylindoFeatureQueryString);
  const cylindoImageOptions = '&background=FFFFFF&encoding=jpg&smartCrop=false';

  return baseCylindoImageUrl + cylindoFeatureQueryStringURI + cylindoImageOptions;
}

/**
 * Removes or replaces cylindo features according to override rules in filters.static_images
 */
export function applyFeatureOverrides({ features = [], overwrites = [], removals = [] }) {
  const updatedFeatures = [...features];

  removals.forEach((feature) => {
    const index = updatedFeatures.findIndex(item => item === feature);
    if (index !== -1) {
      updatedFeatures.splice(index, 2);
    }
  });

  overwrites.forEach(([feature, value]) => {
    const index = updatedFeatures.findIndex(item => item === feature);
    if (index !== -1 && index < updatedFeatures.length - 1) {
      // cylindo feature key/value pairs are just neighboring array elements
      updatedFeatures[index + 1] = value;
    }
  });

  return updatedFeatures;
}

export default {
  getViewerParameters,
  getStaticImageUrl,
  applyFeatureOverrides,
};
