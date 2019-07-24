<template>
  <div 
    class="CategoryVideo"
    ref="CategoryVideo"
    :class="CategoryVideoClasses"
  >
    <div 
      class="--custom-container"
    >
      <div class="CategoryVideo--videoFrame">
        <iframe 
          frameborder="0" 
          allowfullscreen 
          id="categoryVideoPlayer"
          v-if="iframeSourceVideo"
          class="videoPlayer"
        >
        </iframe>
        <video 
          v-if="!iframeSourceVideo"
          class="videoPlayer"
          id="categoryVideoPlayer"
        >
          <source 
            :src="videoUrl" 
          /> 
        </video>
        <div 
          class="CategoryVideo--CustomPoster"
          v-bind:style="{ backgroundImage: 'url('+ videoPoster +')' }"
          v-on:click="playVideo"
        >
          <i>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 84.031 84.031">
              <g id="black" transform="translate(1 1)">
                <path id="Play-Store" d="M41.016,82.031A41.016,41.016,0,1,0,0,41.016,41.016,41.016,0,0,0,41.016,82.031Z" fill="none" stroke="#fff" stroke-width="2" fill-rule="evenodd"/>
                <path id="Union_1" data-name="Union 1" d="M1.374,28.125A1.384,1.384,0,0,1,0,26.732V1.393A1.384,1.384,0,0,1,1.374,0L14.521,7.3l9.934,5.512c.821.45,1.1.877,1.1,1.248,0,.745-1.1,1.26-1.1,1.26h0c-.134,0-21.312,11.822-22.976,12.751h0l-.059.033-.01.006-.033.018Z" transform="translate(31.446 26.953)" fill="none" stroke="#fff" stroke-width="2"/>
              </g>
            </svg>
          </i>
        </div>
      </div>
      <div class="CategoryVideo--content">
        <heading-with-description>
          <h2>{{sectionHeading}}</h2>
          <p>{{sectionDescription}}</p>
        </heading-with-description>
      </div>
    </div>
  </div>
</template>
<script>
import HeadingWithDescription from './HeadingWithDescription.vue'
export default {
  name: 'category-video',
  props: {
    videoUrl: String,
    videoPoster:{type: String},
    sectionHeading: String,
    sectionDescription: String,
    backCurtain: {type: Boolean, default: true},
    iframeSourceVideo: {type: Boolean, default: true}
  },
  data() {
    return {
      videoPlayStatus: 0
    }
  },
  components: {
    HeadingWithDescription,
  },
  computed: {
    CategoryVideoClasses() {
      return {
        '--curtainDesabled': !this.backCurtain
      }
    }
  },
  methods: {
    
    playVideo: function (e) {
      const player = document.getElementById('categoryVideoPlayer');
      if(this.iframeSourceVideo) {
        if(this.videoPlayStatus === 0) {
          player.src = this.videoUrl + '?autoplay=1';
          this.videoPlayStatus = 1;
          setTimeout(function() {
            e.target.classList.add('hiddenPoster');
          }, 500);
        }
        if(this.videoPlayStatus === 1) {
          this.videoPlayStatus = 0;
        }
      }else {
        if(player.paused === true) {
          e.target.classList.add('hideVideoPoster');
          player.play();
        }else {
          e.target.classList.remove('hideVideoPoster');
          player.pause();
        }
      }
    }
  },
  mounted() {
    const player = document.getElementById('categoryVideoPlayer');
    player.onended = function(e) {
      document.querySelector('.CategoryVideo--CustomPoster').classList.remove('hideVideoPoster');
    }
  }
}
</script>
<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';
.CategoryVideo {
  position: relative;
  padding-bottom: 85px;
  @include block();
  &:not(.--curtainDesabled) {
    &::before {
      content: "";
      background: #E8E6E2;
      height: calc(100% - 345px);
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      width: 100%;
      z-index: -1;
    }
  }
  .CategoryVideo--videoFrame {
    overflow: hidden;
    position: relative;
    padding-bottom: 56.25%;
    @include block(0);
    .videoPlayer {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      @include block(100%);
    } 
    .CategoryVideo--CustomPoster {
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
      cursor: pointer;
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      margin: auto;
      z-index: 4;
      transition: all 0.5s ease-in-out;
      @include block(100%);
      i {
        width: 82px;
        height: 82px;
        display: block;
        position: absolute;
        left: 0;
        right: 0;
        top: 50%;
        margin: 0 auto;
        pointer-events: none;
        transform: translateY(-50%);
        z-index: 5;
        svg {
          @include block(100%);
        }
      }
      &.hiddenPoster {
        opacity: 0;
        visibility: hidden;
        pointer-events: none;
      }
      &.hideVideoPoster {
        opacity: 0;
      }
    }
  }
  .CategoryVideo--content {
    max-width: 800px;
    margin: 32px auto 0;
    @include block();
    h2 {
      margin: 0 0 29px;
    }
  }
  @include at-query('max-width: 1199px') {
    &:not(.--curtainDesabled) {
      &::before {
        height: calc(100% - 200px);
      }
    }
  }
  @include at-query('max-width: 767px') {
    padding-bottom: 45px;
    &:not(.--curtainDesabled) {
      &::before {
        height: calc(100% - 80px);
      }
    }
    .CategoryVideo--videoFrame .CategoryVideo--CustomPoster i {
      width: 50px;
      height: 50px;
    }
    .CategoryVideo--content h2 {
      margin: 0 0 14px;
    }
  }
}
</style>


