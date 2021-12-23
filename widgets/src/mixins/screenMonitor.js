export default {
  data() {
    return {
      screenWidth: null,
      screenHeight: null,
      isMobile: false,
      isTablet: false,
      isLargeMobile: false,
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
      this.isMobile = this.screenWidth < 1025;
      this.isTablet = this.screenWidth < 1025 && this.screenWidth > 767;
      this.isLargeMobile = this.screenWidth <= 1145;
    };

    window.addEventListener('resize', saveSize);
    saveSize();
  },
};
