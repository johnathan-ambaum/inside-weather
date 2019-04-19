<script>
export default {
  props: {
    count: { type: Number, default: 0 },
    onStart: { type: Function, default: null },
    onComplete: { type: Function, default: null },
  },

  data() {
    return {
      animatedResultCount: this.count,
    };
  },

  watch: {
    count(newCount) {
      this.animateCount(newCount);
    },
  },

  methods: {
    animateCount(end) {
      const that = this;
      window.$({ count: this.animatedResultCount }).animate({ count: end }, {
        duration: 1000,
        easing: 'swing',
        start: this.onStart,
        step() {
          that.animatedResultCount = Math.ceil(this.count);
        },
        complete: () => {
          this.animatedResultCount = end;
          if (typeof this.onComplete === 'function') {
            this.onComplete();
          }
        },
      });
    },
  },

  render() {
    return this.$scopedSlots.default({
      count: this.animatedResultCount,
    });
  },
};
</script>
