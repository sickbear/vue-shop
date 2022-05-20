<template>
	<div class="d-flex flex-column vh-100">

		<header class="header mb-5 flex-grow-0 flex-shrink-0">
			<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
				<div class="container">
					
						<div class="d-flex">
							<router-link class="navbar-brand d-flex align-items-center" :to="{ name: 'catalog' }" exact>
								<img class="logo header__logo" src="./assets/img/logo.png" alt="">
								<span class="title header__title">Shop</span>
							</router-link>
						</div>
						
						<router-link :to="{ name: 'cart' }" exact class="text-decoration-none">
							<div class="d-flex gap-2 position-relativ">
								<icon-cart class="header__icon"></icon-cart>
								<div>
									<span class="position-absolute translate-middle badge rounded-pill bg-warning text-dark">
										{{ cartCount }}
									</span>
									<div class="header__total text-warning" v-money="total"></div>
								</div>
							</div>
						</router-link>

				</div>
			</nav>
		</header>

		<main class="main mb-5 flex-grow-1 flex-shrink-0">
			<router-view v-slot="{ Component }">
				<transition name="fade" mode="out-in">
					<component :is="Component" />
				</transition>
			</router-view>
		</main>
		
		<footer class="footer flex-grow-0 flex-shrink-0 bg-dark">
			footer
		</footer>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex';

	export default {
		computed: {
      ...mapGetters('cart', { cartCount: 'cartCount', total: 'total' }),
    },
	}
</script>

<style lang="scss">
	.header{
		&__logo{
			max-width: 36px;
		}

		&__title{
			font-size: 24px;
			color: $light;
			transition-duration: .4s;

			&:hover{
				color: $warning;
			}
		}

		&__icon{
			font-size: 30px;
			color: $light;
			transition-duration: .4s;

			a:hover &{
				color: $warning;
			}
		}

		&__total{
			font-family: $f600;
			padding-top: 11px;
		}
	}

	.footer{
		height: 120px;
	}
</style>