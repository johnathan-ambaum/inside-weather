<template>
	<div>
		<div class="hiw-section">
			<ul class="props">
				<li class="prop">
					<span class="hiw-icon">
						<img src="http://cdn.insideweather.com/cat/sofa-line/vprop-small/usa-ico.png"/>
					</span>
					<p class="title">MADE IN THE USA</p>
				</li>
				<li class="prop">
					<span class="hiw-icon">
						<img src="http://cdn.insideweather.com/cat/sofa-line/vprop-small/home-trial-ico.png"/>
					</span>
					<p class="title">365 DAY HOME TRIAL</p>
				</li>
				<li class="prop">
					<span class="hiw-icon">
						<img src="http://cdn.insideweather.com/cat/sofa-line/vprop-small/free-ship-ico.png"/>
					</span>
					<p class="title">FREE SHIPPING</p>
				</li>
				<li class="prop">
					<span class="hiw-icon">
						<img src="http://cdn.insideweather.com/cat/sofa-line/vprop-small/sustainable-ico.png"/>
					</span>
					<p class="title">SUSTAINABLE</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>

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
				margin-right: 86px;
				margin-bottom: 0;
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
	}

</style>