<template>
  <div class="SwatchesOrderForm">
    <transition-group
      enter-active-class="animated fadeInRight"
      leave-active-class="animated fadeOutRight"
    >
      <form
        v-if="!completed"
        key="form"
        class="SwatchesOrderForm__Form"
        @submit.prevent="submit"
      >
        <div class="SwatchesOrderForm__Wrapper">
          <div
            v-if="!isMobile"
            class="SwatchesOrderForm__Back"
          >
            <arrow-button @click.native.prevent.stop="$emit('close')" />
            <button
              class="SwatchBrowser__Button"
              @click.prevent.stop="$emit('close')"
            >BACK TO SWATCHES</button>
          </div>
          <h2 class="SwatchesOrderForm__Heading">
            Your Information
            <close-button
              v-if="isMobile"
              :size="20"
              @click.native.prevent.stop="$emit('close')"
            />
          </h2>
          <p
            v-if="hasErrors"
            class="SwatchesOrderForm__Error"
          >Please correct the errors below and resubmit.</p>
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
              <select
                v-if="field.type == 'state'"
                v-model="address[field.name]"
                :name="field.name"
                :class="{ 'has-error': hasError(field.name) }"
                @focus="e => $bus.$emit('swatch-browser:focus-field', e)"
              >
                <option
                  v-for="state in states"
                  :key="state.abbreviation"
                  :value="state.abbreviation"
                >{{ state.name }}</option>
              </select>
              <input
                v-else
                v-model="address[field.name]"
                :name="field.name"
                :class="{ 'has-error': hasError(field.name) }"
                :type="field.type"
                @focus="e => $bus.$emit('swatch-browser:focus-field', e)"
              >
              <p
                v-if="hasError(field.name)"
                class="SwatchesOrderForm__Error"
              >{{ errorFor(field.name) }}</p>
            </div>
            <button
              v-if="!isMobile"
              :class="{ 'btn--loading': isSubmitting }"
              :disabled="isSubmitting"
              class="SwatchesOrderForm__Submit SwatchBrowser__Button SwatchBrowser__Button--Black"
              type="submit"
            >SUBMIT SWATCH ORDER</button>
          </div>
        </div>
      </form>
      <div
        v-else
        key="thank-you"
        class="SwatchesOrderForm__ThankYou"
      >
        <div class="SwatchesOrderForm__Wrapper">
          <h2 class="SwatchesOrderForm__Heading">Thank You!</h2>
          <p class="SwatchesOrderForm__Body">{{ thankYouMessage }}</p>
          <button
            class="SwatchBrowser__Button SwatchBrowser__Button--Black"
            @click="$emit('exit')"
          >CONTINUE SHOPPING</button>
        </div>
      </div>
    </transition-group>
  </div>
</template>

<script>
import states from '../static/STATE';
import ApiClient from '../util/ApiClient';
import ArrowButton from './ArrowButton.vue';
import CloseButton from './CloseButton.vue';

const apiClient = new ApiClient();

export default {
  components: {
    ArrowButton,
    CloseButton,
  },

  props: {
    cart: { type: Array, default: () => ([]) },
    isMobile: { type: Boolean, default: false },
    isSubmitting: { type: Boolean, default: false },
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
      errors: [],
      thankYouMessage: '',
    };
  },

  computed: {
    hasErrors() {
      return this.errors.length > 0;
    },

    hasError() {
      return field => this.errors.some(error => error.key === field);
    },

    errorFor() {
      return field => (this.errors.find(error => error.key === field) || {}).message || '';
    },

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
          type: 'number',
          required: true,
          fullWidth: false,
        },
        {
          name: 'phone',
          label: 'PHONE',
          type: 'number',
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
    this.$bus.$on('swatch-browser:submit-order', () => {
      this.submit();
    });
  },

  methods: {
    validate() {
      this.errors = [];
      this.fields.forEach(({ name, required }) => {
        if (required && this.address[name].trim() === '') {
          this.errors.push({ key: name, message: 'Required' });
        }
      });
      return this.errors.length < 1;
    },

    submit() {
      if (this.isSubmitting) {
        return;
      }

      if (!this.validate()) {
        return;
      }

      this.$bus.$emit('swatch-browser:submission-in-progress', true);
      const { email, ...address } = this.address;
      // send order to API for creation
      apiClient.submitSwatchOrder({
        items: this.cart.map(swatch => swatch.variant_id),
        email,
        address,
      }).then((response) => {
        // show thank you page
        this.completed = true;
      }).catch(({ errors = [] }) => {
        this.errors = errors;
      }).finally(() => {
        this.$bus.$emit('swatch-browser:submission-in-progress', false);
      });
    },
  },
};
</script>

<style lang="scss">
@import '../scss/variables';
@import '../scss/mixins';

.SwatchesOrderForm {
  &__Wrapper {
    max-width: 600px;
    margin: 0 auto;
    padding: 40px 30px;
    width: 100%;

    @include at-query($breakpoint-small) {
      padding-bottom: 100px;
      padding-top: 0;
    }
  }

  &__Back {
    display: flex;
    align-items: center;

    @media (min-width: 1400px) {
      justify-content: flex-end;
      transform: translateX(-100%);

      button {
        display: inline-block;
      }
    }

    .ArrowButton {
      height: 48px;
      overflow: hidden;
      padding: 0;
      width: 40px;

      svg.ArrowButton__Icon {
        transform: translate(-18px, -11px) rotate(180deg);
      }
    }

    .SwatchBrowser__Button {
      font-size: 13px;
      width: auto;

      @include at-query($breakpoint-large) {
        font-size: 16px;
      }
    }
  }

  &__Form,
  &__ThankYou {
    bottom: 0;
    left: 0;
    position: absolute;
    right: 0;
    top: 0;
  }

  &__Heading {
    font-size: 18px;
    font-weight: 600;
    margin: 20px 0 30px;
    width: 100%;

    @include at-query($breakpoint-large) {
      font-size: 28px;
      margin-top: 30px;
      text-align: center;
    }

    .CloseButton {
      right: 15px;
      position: absolute;
      top: 15px;
    }
  }

  &__Error {
    color: #df1818;
    margin: 5px 0;
  }

  &__Fields {
    align-items: flex-start;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    margin-top: 30px;
  }

  &__Field {
    display: flex;
    flex: 1 0 100%;
    flex-direction: column;
    margin-bottom: 25px;

    @include at-query($breakpoint-large) {
      flex: 0 0 calc(50% - 15px);
    }

    label {
      display: block;
      font-family: $font-stack-avalon;
      font-size: 14px;
      font-weight: 500;
      letter-spacing: .12em;
      line-height: 30px;
    }

    input[type="number"] {
      -moz-appearance:textfield;
      width: 100%;

      &::-webkit-outer-spin-button,
      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }

    .has-error {
      border-color: #df1818;
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

    .SwatchesOrderForm__Wrapper {
      max-width: 480px;
    }

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

      .SwatchBrowser__Button {
        margin: 40px auto;
        max-width: 425px;
      }
    }
  }
}
</style>
