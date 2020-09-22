<template>
	<div>
		<div class="custom-comfort-category-wrapper">
			<heading-with-description>
        <h2>
          {{sectionHeading}}
        </h2>
        <p>
          {{sectionDescription}}
        </p>
      </heading-with-description>
			<div class="--show-in-desktop">
				<div class="options">
					<div 
						v-for="(option, index) in options"
						:key="index"
						class="option"
						:class="[
							(index == 0) ? 'one' : ' ',
							(index == 1) ? 'two' : ' ',
						]" 
					>
						<figure
							v-if="isBigScreen"
						>
							<img :src="option.dImage">
						</figure>
						<figure
							v-if="!isBigScreen"
						>
							<img :src="option.mImage">
						</figure>
						<h2 class="title">
							{{option.heading}}
						</h2>
						<p class="desc">
							{{option.desc}}
						</p>
						<div class="comfort-icon">
							<img :src="option.icon">
						</div>	
						<p class="description">
							{{option.description}}
						</p>
					</div>
				</div>
			</div>
			<div class="image-wrapper options --show-in-mobile">
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
						v-for="(option, index) in options"
						:key="index"
						class="option"
					>
						<figure
							v-if="isBigScreen"
						>
							<img :src="option.dImage">
						</figure>
						<figure
							v-if="!isBigScreen"
						>
							<img :src="option.mImage">
						</figure>
						<span class="option-index --caps">
							option #{{option.index}}
						</span>
						<h2 class="title">
							{{option.heading}}
						</h2>
						<p class="desc">
							{{option.desc}}
						</p>
						<div class="comfort-icon">
							<img :src="option.icon">
						</div>	
						<p class="description">
							{{option.description}}
						</p>
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
		options: Array
	},
	data() {
    return {
      categoryListItems: this.options,
      sliderProps: {
        loop: false,
        nav: false,
        autoplay: false,
        smartSpeed: 1200,
        navText: ['<span class="prev"></span> <span class="prev-hidden"></span>', '<span class="next"></span> <span class="next-hidden"></span>'],
				responsive: {0:{loop: true, margin: 20, mouseDrag: true, touchDrag: true, pullDrag: true, items: 1, dots: true},
				769:{items: 2, margin: 0, loop: false, mouseDrag: false, touchDrag: false, pullDrag: false, dots: false}}
			},
			isBigScreen: Boolean,
    }
	},
	created: function () {
    if(window.innerWidth > 767) {
      this.isBigScreen = true
    }else {
      this.isBigScreen = false
    }
  },
}
</script>

<style lang="scss">
@import '../scss/mixins';
@import '../scss/variables';

	.--show-in-desktop {
		display: block;
		@include at-query('max-width: 768px') {
			display: none !important;
		}
	}
	
	.image-wrapper.options.--show-in-mobile {
		display: none;
		@include at-query('max-width: 768px') {
			display: block;
		}
	}

	.custom-comfort-category-wrapper {
		background: #f2f2f2;
		padding: 68px 0;
		.options {
			display: flex;
			justify-content: center;
			margin-top: 28px;
			.option {
				display: flex;
				flex-direction: column;
				align-items: center;
				&.one {
					margin-right: 10px;
				}
				&.two {
					margin-left: 10px;
				}
				figure {
					margin: 0;
				}
				.title {
					margin-top: 28px;
					font-family: $font-stack-avalon;
					font-weight: 500;
					font-size: 26px;
					letter-spacing: 0.12em;
					color: #202020;
					text-align: left;
				}
				.desc {
					font-weight: 500;
					font-family: $font-stack-avalon;
					font-size: 15px;
					letter-spacing: 0.05em;
					color: #202020;
					text-align: left;
					margin: 0;
				}
				.comfort-icon {
					img {
						margin: 20px 0;
						width: 115px;
						max-width: 115px;
					}
				}
				.description {
					max-width: 285px;
					font-family: $font-stack-avalon;
					font-weight: 500;
					font-size: 14px;
					letter-spacing: 0.04em;
					line-height: 22px;
					text-align: center;
					color: #202020;
				}
			}
		}
		.owl-theme .owl-nav.disabled+.owl-dots {
			margin-top: 18px !important;
		}

		@include at-query('max-width: 768px') {
			padding: 36px 0;
			.options {
				margin-top: 18px;
				.option {
					.title {
						margin-top: 10px;
						font-size: 18px;
						letter-spacing: 0.12em;
						margin-bottom: 0;
					}
					.desc {
						font-size: 13px;
						letter-spacing: 0.05em;
						margin-top: 8px;
					}
					.comfort-icon {
						img {
							margin: 20px 0 24px;
							width: 100px;
							max-width: 100px;
						}
					}
					.option-index {
						margin-top: 24px;
						font-family: $font-stack-avalon;
						font-weight: 500;
						font-size: 12px;
						letter-spacing: 0.12em;
						color: #202020;
					}
					.description {
						max-width: 100%;
						font-family: $font-stack-avalon;
						font-weight: 500;
						font-size: 14px;
						letter-spacing: 0.04em;
						line-height: 22px;
						text-align: center;
						color: #202020;
						margin-bottom: 0;
						padding: 0 24px;
					}
				}
			}
		}
	}
</style>