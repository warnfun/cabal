<template>
  <main class="flex-grow">
      
<section id="download" class="relative min-h-[1200px] py-20 px-4 mt-40">
	<div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
	<div class="relative z-10 max-w-6xl mx-auto text-center">
		<p class="text-gray-400 text-lg animate-fadeIn mb-10">
		Start your adventure now! Download the client and follow the guide below.
		</p>

		
		<!-- Launcher Image -->

		<div class="relative mx-auto mt-20 h-[400px] w-full max-w-[650px] overflow-hidden rounded-2xl bg-[#121212]/80 shadow-2xl">
			<!-- Background Image -->
			<img src="/assets/Resources/char.png" class="pointer-events-none absolute top-[60px] left-[189px] h-[calc(100%-47px)] w-auto object-cover" />

			<!-- Header -->
			<div class="absolute top-5 left-36">
			<h1 class="bg-gradient-to-b from-[#9B4900] to-[#D97373] bg-clip-text text-3xl font-bold text-transparent drop-shadow-md">Cabal Online</h1>
			<p class="text-sm text-gray-300">Episode 33 Plus</p>
			<p class="text-right text-xs text-gray-400">By Lizer</p>
			</div>

			<!-- Buttons -->
			<div class="absolute top-0 right-24">
			<button @click="joinDiscord()" title="Join our Discord!" class="h-[60px] w-[121px] drop-shadow-lg">
				<img src="/assets/Resources/discord.png" class="h-full w-full transition hover:opacity-60 active:opacity-40" />
			</button>
			</div>

			<div class="absolute top-0 right-[519px]">
			<button class="h-[135px] w-[121px] drop-shadow-lg">
				<img src="/assets/Resources/discord2.png" class="mt-[-7px] mb-[-14px] h-full w-full transition hover:opacity-60 active:opacity-40" />
			</button>
			</div>

			<!-- Progress Bar -->
			<div class="absolute right-[212px] bottom-3 left-[50px] h-4 overflow-hidden rounded-full bg-[#252525]/75 shadow-md">
			<div id="progress" class="h-full rounded-full bg-cover" style="width: 70%; background-image: url('/assets/Resources/bar.png');"></div>
			</div>

			<!-- Status Text -->
			<p id="statusText" class="absolute bottom-7 left-[51px] bg-gradient-to-b from-[#9B4900] to-white bg-clip-text text-xs text-transparent">
			<!-- Status message here -->
			</p>

			<!-- Download Buttons -->
			<div id="downloadList" class="absolute right-[15px] bottom-10 z-20">
				
			</div>
			

			<!-- News Panel -->
			<div class="absolute bottom-[47px] left-[50px] h-[104px] w-[388px] overflow-hidden rounded-lg shadow-lg z-10" style="background-image: url('/assets/Resources/bg3.png'); background-size: cover;">
			<div class="p-2">
				<p class="bg-gradient-to-b from-[#9B4900] to-white bg-clip-text text-sm font-bold text-transparent">📢 Select Link on right:</p>
				<div id="newsPanel" class="mt-2 h-[73px] w-[360px] overflow-y-auto text-sm text-white">

				</div>
			</div>
			</div>

			<!-- Exit Button -->
			<div class="absolute top-[10px] right-[23px] -scale-x-100 transform cursor-pointer" onclick="window.close()">
			<p class="text-sm text-white">X</p>
			</div>
		</div>


	  
	
	  	<div class="bg-head-panel mb-4">
			<h2 id="texthead" class="text-head-panel text-3xl font-bold">
			📘 Installation Guide
			</h2>
		</div>
	  <!-- Install Guide -->
	  <div class="bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-lg shadow-indigo-500/40 inset-shadow-sm inset-shadow-indigo-500/50 text-left p-8 max-w-4xl mx-auto">
		<ol class="list-decimal list-inside text-gray-300 space-y-3 text-base leading-relaxed">
		  <li>Download the <strong>Client</strong> file and extract it using <em>WinRAR</em> or <em>7-Zip</em>.</li>
		  <li>If you have client episode 33 from other cabal, you can download Full Patch and extract to client episode 33</li>
		  <li>Disable antivirus or whitelist the game folder to avoid false detection.</li>
		  <li>Run file <code class="bg-gray-800 text-sm px-2 py-1 rounded">cabal.exe</code> or <code class="bg-gray-800 text-sm px-2 py-1 rounded">cabalmain.exe</code>.</li>
		  <li>Create an account via the <strong>Register</strong> button above if you don't have one yet.</li>
		  <li>Have fun playing in the world of Cabal Private Server!</li>
		</ol>
	  </div>
	</div>

	<div class="absolute inset-0 flex justify-center items-end pointer-events-none smog z-0 overflow-x-hidden">
		<i class="num1"></i>
		<i class="num2"></i>
		<i class="num3"></i>
	</div>
  </section>

  <!-- Launcher Image -->
<section class="bg-[#0e0f10] py-16 text-white">
  
</section>

  
  

</main>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import {globalConfig } from '@/js/store.js';

onMounted(() => {
  list()
})

onBeforeUnmount(() => {
  clearAllIntervals()
});

function list() {

	try {
		

	
	const timestamp = new Date().getTime();
	fetch(`/json/download.json?timestamp=${timestamp}`)
		.then(response => response.json())
		.then(data => {

		const Container = document.getElementById('downloadList');
		if (!Container) return;

		Container.innerHTML = ''; // bersihkan

		data.forEach(link => {
			const html = `
				<button data-page="${link.url}" title="Play!" class="h-[60px] w-[170px] drop-shadow-lg flex items-center justify-center bg-transparent hover:opacity-60 active:opacity-40 cursor-pointer hover:scale-125 transition transform">
				<img src="/assets/img/bgButton.png" class="mt-[-7px] mb-[-14px] h-full w-full transition" />
				<span class="absolute button-e">${link.name}</span>
				</button>
			`;
			Container.innerHTML += html;
			});

			// Pasang event listener dengan event delegation:
			Container.addEventListener('click', (event) => {
				// Cari tombol yang diklik (atau element dalam tombol)
				const btn = event.target.closest('button[data-page]');
				if (!btn) return; // Klik bukan pada tombol yang diinginkan

				const page = btn.getAttribute('data-page');
				if (page) {
					// Contoh: buka di tab baru
					window.open(page, '_blank');

					// Atau jika mau navigasi SPA (Vue router), kamu bisa panggil fungsi router.push di sini
					// tapi harus punya akses ke router (biasanya di Vue component)
				}
			});

		})
		.catch(console.error);
	} catch (error) {
	console.error('Terjadi kesalahan:', error);
	return null;
	}


	const progressBar = document.getElementById("progress");
	const statusText = document.getElementById("statusText");

	const messages = [
	"Prepare yourself... a new world awaits you...",
	"A hidden power is about to rise...",
	"Only the chosen ones will survive...",
	"One click away from your destiny...",
	"This download could change everything...",
	"Enter... let the world welcome you...",
	"Don’t hesitate... your power lies within...",
	"You know you want to click it...",
	"The first step to becoming a legend...",
	"Your inner voice is guiding you to the download button..."
	];


	let progress = 0;

	function updateProgress() {
	if (progress < 100) {
		progress += Math.floor(Math.random() * 10) + 5;
		if (progress > 100) progress = 100;

		progressBar.style.width = `${progress}%`;
		statusText.textContent = messages[Math.floor(Math.random() * messages.length)];

		setTimeout(updateProgress, 1200);
	} else {
		statusText.textContent = "Ready to play!";
	}
	}

	updateProgress();

	
	
}

function joinDiscord(){
	window.open(globalConfig.discordInvite, "_blank")
}
</script>
