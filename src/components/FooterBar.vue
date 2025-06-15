<template>
  <footer class="relative bg-[url('/assets/img/bg-s1.jpg')] bg-cover bg-center overflow-hidden text-gray-400 py-8">
	<div class="max-w-7xl mx-auto px-4">
		<!-- Footer Content -->
		<div class="flex flex-col items-center space-y-6">
		<!-- Text -->
		<div class="text-center">
			<p>Welcome to the official private server of Cabal Online! Join us for thrilling adventures, intense PvP battles, and endless fun!</p>
		</div>
		<!-- Social Media -->
		<div>
			<h3 class="text-lg font-bold text-white mb-4">Follow Us</h3>
			<div class="flex justify-center space-x-4">
			<a :href="globalConfig.facebook" target="_blank" class="text-gray-400 hover:text-blue-400">
				<svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.274 4.759 11.486 11 11.931v-8.438h-3v-3.493h3v-2.7c0-3.225 1.796-5.123 4.709-5.123 1.368 0 2.8.287 2.8.287v3.056h-1.576c-1.236 0-1.594.773-1.594 1.558v1.907h3.223l-.515 3.493h-2.708v8.438c6.241-.445 11-5.657 11-11.931z" />
				</svg>
			</a>
			<a :href="globalConfig.discordInvite" target="_blank" class="text-gray-400 hover:text-blue-400">
				<svg class="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
				<path d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.078.037c-.21.375-.444.864-.608 1.25a18.288 18.288 0 00-5.487 0 12.583 12.583 0 00-.617-1.25.077.077 0 00-.079-.037 19.736 19.736 0 00-4.885 1.515.069.069 0 00-.032.027C2.605 9.038 1.73 13.58 2.191 18.057a.082.082 0 00.031.056 19.9 19.9 0 005.993 3.034.077.077 0 00.084-.027c.461-.63.873-1.295 1.226-1.994a.076.076 0 00-.041-.104 13.18 13.18 0 01-1.872-.89.077.077 0 01-.008-.129c.125-.094.25-.19.37-.287a.075.075 0 01.079-.01c3.928 1.793 8.18 1.793 12.061 0a.075.075 0 01.08.009c.12.098.245.194.37.288a.077.077 0 01-.006.128 12.392 12.392 0 01-1.873.89.076.076 0 00-.04.105 13.15 13.15 0 001.225 1.993.076.076 0 00.084.028 19.876 19.876 0 005.994-3.034.076.076 0 00.03-.055c.5-5.177-.838-9.673-3.548-13.661a.061.061 0 00-.031-.03zM8.02 15.331c-1.182 0-2.153-1.085-2.153-2.419 0-1.333.955-2.418 2.153-2.418 1.21 0 2.173 1.097 2.153 2.418 0 1.334-.955 2.419-2.153 2.419zm7.974 0c-1.182 0-2.153-1.085-2.153-2.419 0-1.333.955-2.418 2.153-2.418 1.21 0 2.173 1.097 2.153 2.418 0 1.334-.943 2.419-2.153 2.419z"/>
				</svg>
			</a>
			</div>
		</div>

		<!-- Contact -->
		<div class="text-center mt-6">
			<h3 class="text-lg font-bold text-white mb-2">Contact Us</h3>
			<p class="mb-1">
			📧 Email: <a href="mailto:{{ globalConfig.cp_email }}" class="text-gray-400 hover:text-blue-400">{{ globalConfig.cp_email }}</a>
			</p>
			<p>
			📱 WhatsApp: <a href="https://wa.me/{{ globalConfig.cp_whatsapp }}" target="_blank" class="text-gray-400 hover:text-green-400">{{ globalConfig.cp_whatsapp }}</a>
			</p>
		</div>
		
		<!-- Copyright -->
		<div class="text-center">
			<p>&copy; {{ currentYear }}. {{ globalConfig.servername }}. All rights reserved.</p>
		</div>
		<!-- Terms Link -->
		<div class="text-center">
			<a href="#terms" class="text-gray-400 hover:text-blue-400">Terms of Service</a>
		</div>
		</div>
	</div>
	</footer>
</template>

<script setup>
import { onMounted } from 'vue';
import {globalConfig } from '@/js/store.js';

const currentYear = new Date().getFullYear();

onMounted(() => {
  const header = document.getElementById('mainHeader');
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  if (!header || !scrollTopBtn) return; // Hindari error jika elemen tidak ditemukan

  window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
      header.classList.remove('absolute');
      header.classList.add('fixed', 'shadow-lg');
    } else {
      header.classList.remove('fixed', 'shadow-lg');
      header.classList.add('absolute');
    }

    if (window.scrollY > 200) {
      scrollTopBtn.classList.remove("hidden");
    } else {
      scrollTopBtn.classList.add("hidden");
    }
  });

  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
});

</script>
