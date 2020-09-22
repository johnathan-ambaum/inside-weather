<template>
	<div>
		<div class="hiw-section">
			<ul class="props">
				<li 
					v-for="valueProp in valueProps"
        	:key="valueProp.$id"
					class="prop"
				>
					<span class="hiw-icon">
						<img :src="valueProp.icon"/>
					</span>
					<p class="title">{{valueProp.title}}</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			valueProps: Array
		}
	} 
</script>

<style lang="scss">
	@import '../scss/mixins';
	@import '../scss/variables';

	.hiw-section {
		background: #f2f2f2;	
		padding: 18px 0;
		ul {
			display: flex;
			flex-wrap: wrap;
			justify-content: center;
			align-items: center;
			margin: 0;
			li {
				display: flex;
				align-items: baseline;
				margin-bottom: 0;
				&:not(:last-child) {
					margin-right: 86px;
				}
				.hiw-icon {					
					img {
						width: 34px;
						height: 23px;
						margin-right: 4px;
					}
				}
				.title {
					font-family: $font-stack-avalon;
					font-weight: 500;
					margin: 0;
					@include fonts(12px,#202020,1.46,0.15em);
				}
			}
		}
		@include at-query('max-width: 992px') {
			padding: 11px 32px;
			margin-bottom: 15px;
			ul {
				li {
					margin-right: 0;
					margin-right: 0;
					width: 50%;
					&:nth-child(3),					
					&:nth-child(4) {
						margin-top: 8px;
					}
					.hiw-icon {					
						img {
							width: 33px;
							height: 22px;
							margin-right: 2px;
						}
					}
					.title {
						font-size: 10px;
					}
				}
			}
		}
		@include at-query('max-width: 360px') {
			padding: 11px 20px;
			margin-bottom: 15px;
			ul {
				justify-content: flex-start;
				li {
					width: auto;
					align-items: center;
					&:nth-child(odd) {
						margin-right: 24px;
						min-width: 130.8px;
					}
				}
			}
		}
		@include at-query('max-width: 340px') {
			padding: 11px 13px;
			ul {
				li {
					&:nth-child(odd) {
						margin-right: 12px;
					}
				}
			}
		}
	}

</style>