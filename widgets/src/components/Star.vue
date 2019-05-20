<template>
  <div class="ReviewItem__Right--Star">
    <font-awesome-icon
      v-for="i in starCount"
      :key="i"
      :icon="['fal', 'star']"
      :style="{ color: 'black' }"
    />
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core';
import { faStar, faArrowLeft } from '@fortawesome/pro-light-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faStar);

export default {
  components: {
    FontAwesomeIcon,
  },

  props: {
    starCount: { type: Number, default: 0 },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.fa-star {
  margin-right: 12px;
}
</style>
