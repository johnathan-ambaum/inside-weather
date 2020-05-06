<template>
  <div class="SwatchesOrderForm">
    <transition
      enter-active-class="animated fadeInLeft"
      leave-active-class="animated fadeOutLeft"
    >
      <form
        v-if="!completed"
        class="SwatchesOrderForm__Form"
        @submit.prevent="submit"
      >
        <button
          class="SwatchesOrderForm__Back"
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
            class="SwatchesOrderForm__Submit"
            type="submit"
          >SUBMIT SWATCH ORDER</button>
        </div>
      </form>
    </transition>
    <transition
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <div
        v-if="completed"
        class="SwatchesOrderForm__ThankYou"
      >
        <h2 class="SwatchesOrderForm__Heading">Thank You!</h2>
        <p>{{ thankYouMessage }}</p>
        <button
          class="btn"
          @click="$emit('exit')"
        >CONTINUE SHOPPING</button>
      </div>
    </transition>
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
    background: transparent;
    border: none;
    border-bottom: 1px solid #202020;
    color: #202020;
    line-height: 1;
    padding: 5px 2px;
  }

  &__Heading {
    margin: 40px 0 30px;
    text-align: center;
    width: 100%;
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
    }

    &--Full {
      flex-basis: 100%;
    }
  }

  &__Submit {
    background: #202020;
    color: #fff;
    margin: 20px 0;
    padding: 10px;
    text-align: center;
    width: 100%;
  }

  &__ThankYou {
    text-align: center;

    h2 {

    }

    p {

    }
  }
}
</style>
