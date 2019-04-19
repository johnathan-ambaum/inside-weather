/**
 * Find all of the filters which match the currently selected options, for
 * use in pre-populating filters to already be narrowed down to criteria
 * matching active product on PDP or query string on category page
 * @param {Object} state Vuex state
 */
export function parsePreselectedFilters(state) {
  if (!state.filters || !state.filters.filterGroups) {
    return [];
  }

  // pre-select all the filters matching current options so it's already narrowed down
  const selectedFilters = [];
  state.selectedOptions.forEach((option) => {
    const group = state.filters.filterGroups.find(filterGroup => filterGroup.parameter === option.group);
    const optionParams = group.options.find(item => option.values.includes(item.value)).parameters;
    Object.entries(optionParams).forEach(([filter, values]) => {
      if (!values.length) {
        return;
      }

      const currentFilter = group.filters.find(item => item.parameter === filter);

      if (currentFilter.ignoreOnPDP) {
        return;
      }

      selectedFilters.push({
        group: group.parameter,
        parameter: filter,
        values,
      });
    });
  });
  return selectedFilters;
}

export default {
  parsePreselectedFilters,
};
