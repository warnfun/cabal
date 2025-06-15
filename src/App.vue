<template>
  <div>
    <NavBar />
	<template v-if="isLoggedInComputed && isUserRoute">
		<main class="flex-grow">
		<section class="py-16 mt-40 relative min-h-[800px]">
			<div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>

		<div class="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-6">

		<!-- Sidebar -->
		<aside class="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl p-6 shadow-xl col-span-1 border border-gray-800 text-center">

		<!-- Foto Profil -->
		<div class="flex justify-center mb-4">
			<img
			:src="userData.Avatar || '/assets/img/pp.png'"
			alt="Profile"
			class="w-20 h-20 rounded-full border-2 border-blue-500 shadow-md"
			@error="event => event.target.src = '/assets/img/pp.png'"
			/>
		</div>

		<!-- Username dan Email -->
		<div class="text-gray-200 mb-6">
			<p class="text-lg font-semibold">{{ userData.UserID }}</p>
			<p class="text-sm text-gray-400 break-words">{{ userData.Email }}</p>
		</div>

		<!-- Informasi Lain -->
		<ul class="space-y-4 text-sm text-gray-300 text-left">

			<li class="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-lg border border-yellow-500 text-yellow-300">
			<div class="flex items-center">
				<img src="/assets/img/coin.png" alt="eCoin" class="w-4 h-4 mr-2">
				<span class="font-medium">eCoin</span>
			</div>
			<span>{{ userData.cash }}</span>
			</li>

			<li class="flex items-center justify-between bg-gray-800 px-3 py-2 rounded-lg border border-green-500 text-green-300">
			<div class="flex items-center">
				<img src="/assets/img/gem.png" alt="Gem" class="w-4 h-4 mr-2">
				<span class="font-medium">ForceGem</span>
			</div>
			<span>{{ userData.forcegem }}</span>
			</li>

			<li class="flex justify-between">
			<span class="font-medium">Member Since:</span>
			<span class="text-right">{{ formatDateTime(userData.createDate) }}</span>
			</li>

			<li class="flex justify-between">
			<span class="font-medium">Last Login:</span>
			<span class="text-right">{{ formatDateTime(userData.LoginTime) }}</span>
			</li>

		</ul>
		</aside>


		<!-- Main Content -->
		<div class="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl p-6 shadow-xl col-span-1 md:col-span-3 border border-gray-800">

			<!-- Tabs -->
			<nav class="flex space-x-6 border-b border-gray-700 pb-3 mb-6">
			<router-link
				to="/user/home"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/user/home' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Characters List
			</router-link>

			<router-link
				to="/user/donation"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/user/donation' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Donation
			</router-link>

			<router-link
				to="/user/vote"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/user/vote' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Vote
			</router-link>

			<router-link
				to="/user/settings"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/user/settings' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Settings
			</router-link>
			</nav>

			<!-- Konten Dinamis -->
			<router-view />

		</div>
		</div>


		</section>
		</main>
	</template>
	<template v-else-if="isLoggedInComputed && (isGmRoute || isAdminRoute) && (isAdmin || isGm)">
		<main class="flex-grow">
		<section class="py-16 mt-40 relative min-h-[800px]">
			<div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>

		<div class="relative z-10 max-w-7xl mx-auto px-4 grid grid-cols-1  gap-6">


		<!-- Main Content -->
		<div class="bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-2xl p-6 shadow-xl col-span-1 border border-gray-800">

			<!-- Tabs -->
			<nav class="flex space-x-6 border-b border-gray-700 pb-3 mb-6">
			<router-link
				to="/admin"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/admin' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Online List
			</router-link>
			
			<template v-if="isAdmin">
			<router-link
				to="/admin/senditem"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/admin/senditem' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Send Item
			</router-link>

			<router-link
				to="/admin/Donation"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/admin/Donation' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Donation
			</router-link>

			<router-link
				to="/admin/news"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/admin/news' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Create News
			</router-link>

			<router-link
				to="/admin/settings"
				class="pb-2 text-sm font-semibold transition duration-200"
				:class="$route.path === '/admin/settings' 
				? 'text-blue-400 border-b-2 border-blue-500' 
				: 'text-gray-400 hover:text-blue-400 hover:border-b-2 hover:border-blue-500'">
				Settings
			</router-link>
			</template>
			</nav>

			<!-- Konten Dinamis -->
			<router-view />

		</div>
		</div>


		</section>
		</main>
	</template>
	<template v-else>
		<router-view />
	</template>

    <FooterBar />
  </div>
</template>

<script>
import NavBar from './components/NavBar.vue'
import FooterBar from './components/FooterBar.vue'

import { fetchEncrypted } from '@/js/fetch.js'
import { connectWebSocket } from '@/js/socket.js'
import { globalConfig, isLoggedIn, user, isAdmin, isGm } from '@/js/store.js'
import { isServerInitial } from '@/js/global.js'

export default {
  components: { NavBar, FooterBar },
  computed: {
    isLoggedInComputed() {
      return isLoggedIn.value;
    },
	userData() {
		return user;
	},
	isUserRoute(){
		return this.$route.path.startsWith('/user');
	},
	isAdminRoute(){
		return this.$route.path.startsWith('/admin');
	},
	isGmRoute(){
		return this.$route.path.startsWith('/gm');
	},
	isAdmin(){
		return isAdmin.value;
	},
	isGm(){
		return isGm.value;
	}
  },
  mounted() {
    this.init();
  },
  methods: {
	async init() {
		try {
			const data = await fetchEncrypted('/api/getServer');

			// Set isi dengan .value karena semuanya ref()
			globalConfig.csrfToken = data.message;
			globalConfig.servername = data.data.ServerName;
			globalConfig.cloudapi = data.data.cloudapi;
			globalConfig.domain = data.data.domain;
			globalConfig.logoText = data.data.logoText;
			globalConfig.title = data.data.title;
			globalConfig.description = data.data.description;
			globalConfig.keywords = data.data.keywords;
			globalConfig.serverzone = data.data.serverzone;
			globalConfig.GameIp = data.data.GameIp;
			globalConfig.GamePort = data.data.GamePort;
			globalConfig.discordInvite = data.data.discordInvite;
			globalConfig.facebook = data.data.facebook;
			globalConfig.cp_email = data.data.cp_email;
			globalConfig.cp_whatsapp = data.data.cp_whatsapp;

			// Simpan ke localStorage
			localStorage.setItem('globalConfig', JSON.stringify({
				csrfToken: globalConfig.csrfToken.value,
				servername: globalConfig.servername.value,
				cloudapi: globalConfig.cloudapi.value,
				domain: globalConfig.domain.value,
				logoText: globalConfig.logoText.value,
				title: globalConfig.title.value,
				description: globalConfig.description.value,
				keywords: globalConfig.keywords.value,
				serverzone: globalConfig.serverzone.value,
				GameIp: globalConfig.GameIp.value,
				GamePort: globalConfig.GamePort.value,
				discordInvite: globalConfig.discordInvite.value,
				facebook: globalConfig.facebook.value,
				cp_email: globalConfig.facebook.cp_email,
				cp_whatsapp: globalConfig.facebook.cp_whatsapp
			}));

			await this.checkLogin();

			this.detectUserCountry();

			await connectWebSocket();

			isServerInitial.value = true;

		} catch (error) {
		console.error('Terjadi kesalahan:', error);
		}

		
	},

	async checkLogin(){
		try {
			const data = await fetchEncrypted('/api/checkLogin');
			if(data.status === "error"){
				isLoggedIn.value = false;
				localStorage.removeItem('isLoggedIn');
				localStorage.removeItem('user');
			}


		} catch (error) {
		console.error('Terjadi kesalahan:', error);
		}
	},

	async detectUserCountry() {
		if (!window.userCountryFetched) {
			try {
				const res = await fetch('https://ipapi.co/json');
				const data = await res.json();
				window.userCountry = data.country_name;
				window.userCountryFetched = true;
				console.log("Detected country:", window.userCountry);
			} catch (err) {
				console.warn("Failed to detect country", err);
				window.userCountry = null;
			}
		}
	},

	formatDateTime(datetimeObj) {
		if (!datetimeObj || !datetimeObj.date) return '';
		return datetimeObj.date.substring(0, 16);
	}
  }
}
</script>

<style>
/* bisa isi styling global khusus di sini jika mau */
</style>
