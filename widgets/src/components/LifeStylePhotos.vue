<template>
  <div 
    class="LifeStylePhotos"
    ref="LifeStylePhotos"
  >
    <div 
      class="--custom-container"
    >
      <heading-with-description>
        <h2>{{sectionHeading}}</h2>
        <p>{{sectionDescription}}</p>
      </heading-with-description> 
      <div 
        class="LifeStylePhotos--gridContainer grid--container"
      >
        <div 
          v-for="(item, index) in lifeStyleItems"
          :key="item.$id"
          v-bind:class="['LifeStylePhotos--column column LifeStylePhotos--column-'+ (index + 1)]"
        >
          <figure>
            <img 
              :src="item"
            >
          </figure>
          <div 
            class="more-info"
            v-on:click="showPopUp"
          >
            <i class="more-info-trigger-icons info-icon-plus">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <g id="Group_318" data-name="Group 318" transform="translate(-343 -3113)">
                  <circle id="Ellipse_9" data-name="Ellipse 9" cx="12" cy="12" r="12" transform="translate(343 3113)" fill="#efedea"/>
                  <g id="Group_57" data-name="Group 57" transform="translate(349 3119)">
                    <line id="Line_7" data-name="Line 7" y2="12" transform="translate(6)" fill="none" stroke="#7b7974" stroke-width="0.5"/>
                    <line id="Line_8" data-name="Line 8" y1="12" transform="translate(12 6) rotate(90)" fill="none" stroke="#7b7974" stroke-width="0.5"/>
                  </g>
                </g>
              </svg>
            </i>
          </div>
        </div>
      </div>
    </div>
    <pop-up
      :PopUpImageSource="popUpMainImage"
      popUpId="LifeStylePopUp"
      :popUpHeading="popUpHeading"
      :PopUpContentList="popUpList"
    >
    </pop-up>
  </div>
</template>

<script>
import HeadingWithDescription from './HeadingWithDescription.vue'
import PopUp from './PopUp.vue'

export default {
  components: {
    HeadingWithDescription,
    PopUp,
  },
  props: {
    sectionHeading: String,
    lifeStyleItems: Array,
    sectionDescription: String,
    popUpHeading: String,
    popUpList: Array
  } ,
  data() {
    return {
      popUpMainImage: ''
    }
  },
  methods: {
    showPopUp: function(e) {
      const currentParent = e.target.parentElement;
      const findTarget = currentParent.querySelector('figure img');
      this.popUpMainImage = findTarget.src;
      const detectPopUp = document.getElementById('LifeStylePopUp');
      const html = document.querySelector('html');
      detectPopUp.classList.add('fade');
      setTimeout(function() {
        detectPopUp.classList.add('in');
        html.classList.add('lock');
      }, 300);
    }
  }

}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

.LifeStylePhotos {
  .HeadingWithDescription {
    max-width: 655px;
    margin: 0 auto;
    h2 {
      margin: 0 0 33px;
    }
    p {
      line-height: 1.6;
    }
  }
  .more-info {
    cursor: pointer;
    height: 29px;
    position: absolute;
    bottom: 32px;
    right: 28px;
    width: 29px;
    z-index: 9;
    i {
      pointer-events: none;
      @include block(100%);
      svg {
        @include block(100%);
      }
    }
  }
}
.LifeStylePhotos--gridContainer {
  &.grid--container {
    width: auto;
    margin: 66px -8px 0;
    .LifeStylePhotos--column {
      position: relative;
    }  
  }
  .LifeStylePhotos--column {
    figure {
      padding: 0 8px 16px;
      @include block(100%);
      img {
        object-fit: cover;
        @include block(100%);
      }
    }
    &.LifeStylePhotos--column-1 {
      grid-column-start: 1;
      grid-column-end: span 13;
      grid-row: 1 / auto;

    }
    &.LifeStylePhotos--column-2 {
      grid-column-start: 14;
      grid-column-end: -1;
      grid-row: 1 / auto;
    }
    &.LifeStylePhotos--column-3 {
      grid-column-start: 1;
      grid-column-end: span 27;
      grid-row: 2/span 2;
    }
    &.LifeStylePhotos--column-4, &.LifeStylePhotos--column-5{
      grid-column-start: 28;
      grid-column-end: -1;
    }
    &.LifeStylePhotos--column-6 {
      grid-column-start: 1;
      grid-column-end: span 27;
    }
    &.LifeStylePhotos--column-7 {
      grid-column-start: 28;
      grid-column-end: -1;
    }
    &.LifeStylePhotos--column-8, &.LifeStylePhotos--column-9{
      grid-column-start: 1;
      grid-column-end: span 13;
    }
    &.LifeStylePhotos--column-10 {
      grid-column-start: 14;
      grid-column-end: -1;
      grid-row: 5/span 2;
    }
  }
}
@include at-query('max-width: 767px') {
  .LifeStylePhotos {
    .--custom-container {
      padding: 0;
    }
    .more-info {
      width: 21px;
      height: 21px;
      bottom: 9px;
      right: 7.5px;
    }
    .HeadingWithDescription {
      max-width: 75%;
      h2 {
        margin: 0 0 15px;
      }
    }
  }
  .LifeStylePhotos--gridContainer {
    &.grid--container {
      margin: 32px -3px 0;
    }
    .LifeStylePhotos--column figure {
      padding: 0 1.5px 3px;
    }
  }
}
@include at-query('max-width: 640px') {
  .LifeStylePhotos {
    .HeadingWithDescription {
      max-width: 100%;
    }
  }
}
</style>


