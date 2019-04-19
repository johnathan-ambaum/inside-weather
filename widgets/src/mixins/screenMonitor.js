import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      screenWidth: null,
      screenHeight: null,
      isMobile: false,
    };
  },

  created() {
    const saveSize = () => {
      this.screenWidth = window.innerWidth
        || document.documentElement.clientWidth
        || document.body.clientWidth;
      this.screenHeight = window.innerHeight
        || document.documentElement.clientHeight
        || document.body.clientHeight;
      this.isMobile = this.screenWidth < 1024;
      this.setPerPage(this.isMobile ? 6 : 54);
    };

    window.addEventListener('resize', saveSize);
    saveSize();
  },

  methods: {
    ...mapMutations([
      'setPerPage',
    ]),
  },
};
