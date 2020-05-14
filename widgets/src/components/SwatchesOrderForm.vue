<template>
  <div class="SwatchesOrderForm">
    <transition-group
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <form
        v-if="!completed"
        key="form"
        class="SwatchesOrderForm__Form"
        @submit.prevent="submit"
      >
        <button
          class="SwatchesOrderForm__Back SwatchBrowser__Button"
          @click.prevent.stop="$emit('close')"
        >BACK TO SWATCHES</button>
        <h2 class="SwatchesOrderForm__Heading">Your Information</h2>
        <div class="SwatchesOrderForm__Fields">
          <div
            v-for="field in fields"
            :key="field.name"
            :class="{ 'SwatchesOrderForm__Field--Full': field.fullWidth }"
            class="SwatchesOrderForm__Field"
          >
            <label>
              {{ field.label }}:
              <span v-if="!field.required">(OPTIONAL)</span>
            </label>
            <input
              v-if="field.type == 'text'"
              v-model="address[field.name]"
              :name="field.name"
              :required="field.required"
              type="text">
            <select
              v-if="field.type == 'state'"
              v-model="address[field.name]"
              :name="field.name"
              :required="field.required"
            >
              <option
                v-for="state in states"
                :key="state.abbreviation"
                :value="state.abbreviation"
              >{{ state.name }}</option>
            </select>
          </div>
          <button
            class="SwatchesOrderForm__Submit SwatchBrowser__Button SwatchBrowser__Button--Black"
            type="submit"
          >SUBMIT SWATCH ORDER</button>
        </div>
      </form>
      <div
        v-else
        key="thank-you"
        class="SwatchesOrderForm__ThankYou"
      >
        <h2 class="SwatchesOrderForm__Heading">Thank You!</h2>
        <p class="SwatchesOrderForm__Body">{{ thankYouMessage }}</p>
        <button
          class="SwatchBrowser__Button SwatchBrowser__Button--Black"
          @click="$emit('exit')"
        >CONTINUE SHOPPING</button>
      </div>
    </transition-group>
  </div>
</template>

<script>
import states from '../static/STATE';
import ApiClient from '../util/ApiClient';

const apiClient = new ApiClient();

export default {
  props: {
    cart: { type: Array, default: () => ([]) },
  },

  data() {
    return {
      address: {
        first_name: '',
        last_name: '',
        address1: '',
        address2: '',
        phone: '',
        city: '',
        province: '',
        country: 'US',
        zip: '',
        email: '',
      },
      completed: false,
      error: null,
      thankYouMessage: '',
    };
  },

  computed: {
    fields() {
      return [
        {
          name: 'first_name',
          label: 'FIRST NAME',
          type: 'text',
          required: true,
          fullWidth: false,
        },
        {
          name: 'last_name',
          label: 'LAST NAME',
          type: 'text',
          required: true,
          fullWidth: false,
        },
        {
          name: 'email',
          label: 'EMAIL ADDRESS',
          type: 'text',
          required: true,
          fullWidth: true,
        },
        {
          name: 'address1',
          label: 'Address',
          type: 'text',
          required: true,
          fullWidth: true,
        },
        {
          name: 'address2',
          label: 'APT/SUITE #',
          type: 'text',
          required: false,
          fullWidth: true,
        },
        {
          name: 'city',
          label: 'CITY',
          type: 'text',
          required: true,
          fullWidth: true,
        },
        {
          name: 'province',
          label: 'STATE',
          type: 'state',
          required: true,
          fullWidth: false,
        },
        {
          name: 'zip',
          label: 'ZIP',
          type: 'text',
          required: true,
          fullWidth: false,
        },
        {
          name: 'phone',
          label: 'PHONE',
          type: 'text',
          required: true,
          fullWidth: true,
        },
      ];
    },

    states() {
      return states;
    },
  },

  created() {
    this.thankYouMessage = window.theme.settings.swatchBrowser.thankYouMessage || '';
  },

  methods: {
    submit() {
      const { email, ...address } = this.address;
      // send order to API for creation
      apiClient.submitSwatchOrder({
        items: this.cart.map(swatch => swatch.variant_id),
        email,
        address,
      }).then(() => {
        // show thank you page
        this.completed = true;
      }).catch((err) => {
        this.error = err;
        console.log({ err });
      });
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchesOrderForm {
  &__Back {

  }

  &__Heading {
    font-size: 18px;
    font-weight: 600;
    margin: 40px 0 30px;
    text-align: center;
    width: 100%;

    @include at-query($breakpoint-large) {
      font-size: 28px;
    }
  }

  &__Fields {
    align-items: flex-end;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    max-width: 600px;
    margin: 0 auto;
    padding: 0 30px;
    width: 100%;
  }

  &__Field {
    display: flex;
    flex: 0 0 calc(50% - 15px);
    flex-direction: column;
    margin-bottom: 25px;

    label {
      display: block;
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .12em;
      line-height: 30px;
    }

    &--Full {
      flex-basis: 100%;
    }
  }

  &__Submit {
    margin: 20px 0;
    width: 100%;
  }

  &__ThankYou {
    text-align: center;

    h2 {
      font-size: 41px;
      font-weight: 600;
      line-height: 44px;
    }

    p {
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .035em;
      line-height: 20px;
    }

    @include at-query($breakpoint-large) {
      h2 {
        font-size: 28px;
        line-height: 30px;
      }
    }
  }
}
</style>
