<template>
	<div>
		<div class="customizable-category-wrapper">
			<heading-with-description>
        <h2>
          {{sectionHeading}}
        </h2>
        <p>
          {{sectionDescription}}
        </p>
      </heading-with-description>
			<div class="image-wrapper --show-in-desktop">
				<a :href="destinationUrl">
					<figure>
						<img :src="desktopImage"/>
					</figure>
				</a>
			</div>
			<div class="image-wrapper --show-in-mobile">
				<slider 
					class="_category-lists --clearfix" 
					:items="sliderProps.items"
					:margin="sliderProps.margin"
					:loop="sliderProps.loop"
					:nav="sliderProps.nav"
					:autoplay="sliderProps.autoplay"
					:dots="sliderProps.dots"
					:smartSpeed="sliderProps.smartSpeed"
					:navText="sliderProps.navText"
					:responsive="sliderProps.responsive"
					>
					<div 
						class="category-list-item"
						v-for="item in categoryListItems"
						:key="item.id"
					>
						<a :href="destinationUrl">
							<figure>
								<img :src="item.image "/>
							</figure>
						</a>
					</div>
				</slider>
			</div>
		</div>
	</div>
</template>

<script>
	import HeadingWithDescription from './HeadingWithDescription.vue'
	import slider from './Slider.vue'

export default {
  components: {
		HeadingWithDescription,
		slider,
  },
  props: {
    sectionHeading: String,
		sectionDescription: String,
		desktopImage: String,
		listItems: Array,
		destinationUrl: String
	},
	data() {
    return {
      categoryListItems: this.listItems,
      sliderProps: {
        items: 2,
        margin: 0,
        loop: false,
        nav: false,
        autoplay: false,
        dots: false,
        smartSpeed: 1200,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
        responsive: {0:{loop: true, mouseDrag: true, touchDrag: true, pullDrag: true, items: 1, dots: true}}
      }
    }
  }
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

	.--show-in-desktop {
		display: block;
		@include at-query('max-width: 768px') {
			display: none;
		}
		&.image-wrapper {
			display: flex;
			justify-content: center;
		}
	}
	
	.--show-in-mobile {
		display: none;
		@include at-query('max-width: 768px') {
			display: block;
		}
	}
	.customizable-wrapper {
		padding: 68px 0;
		@include at-query('max-width: 768px') {
			padding: 36px 0;
		}
		.owl-theme .owl-nav.disabled+.owl-dots {
			margin-top: 18px !important;
		}
	}
</style>