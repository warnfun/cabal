
<template>
  <main class="flex-grow">
    <!-- Hero Header with Animation -->
    <section class="relative h-[900px] animate-on-scroll">
      <div class="absolute inset-0 mask-b-from-30% bg-[url('/assets/img/bgh_1.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>

      <div class="relative z-10 flex flex-col justify-center items-center h-full text-center text-white">
        <img src="/assets/img/logo.webp" class="w-auto h-[150px]" alt="Cabal Logo" />
        <p id="suggestions" class="text-lg md:text-xl max-w-xl text-gray-400 animate-pulse">
          Experience reborn battles, custom features, and an adventure unlike anything you've faced before.
        </p>
        <div class="mt-8 flex space-x-4">
          <div class="w-40 h-[130px] bg-button-e hover:opacity-80 flex items-center justify-center cursor-pointer" @click="goTo('download')">
            <span class="button-e text-2xl font-extrabold uppercase">Download</span>
          </div>
          <div class="w-40 h-[130px] bg-button-e hover:opacity-80 flex items-center justify-center cursor-pointer" @click="goTo('register')">
            <span class="button-e text-2xl font-extrabold uppercase">Register</span>
          </div>
        </div>
      </div>

      <!-- Sparks & Smog -->
      <div class="spark-zone left-sparks pointer-events-none">
        <div v-for="i in 15" :key="'left'+i" class="particle"></div>
      </div>

      <div class="spark-zone right-sparks pointer-events-none">
        <div v-for="i in 15" :key="'right'+i" class="particle"></div>
      </div>

      <div class="absolute inset-0 flex justify-center items-end pointer-events-none smog z-0 overflow-x-hidden">
        <i class="num1"></i>
        <i class="num2"></i>
        <i class="num3"></i>
      </div>
    </section>

    <!-- Slider + News Section with Animation -->
  <section class="relative h-[600px] mb-40">
    <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_1.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
    <div class="relative z-10">
      <div class="items-center text-center mb-10">
        <div class="bg-head-panel">
          <h2 class="text-head-panel text-3xl md:text-3xl font-extrabold uppercase animate-fadeIn"> News & Updates </h2>
        </div>
        <p class="text-gray-400 animate-fadeIn"> All information and updates are here </p>
      </div>
      <div class="max-w-6xl mx-auto px-4">
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Slider -->
          <div class="relative overflow-hidden rounded-2xl shadow-lg">
            <div class="slider relative w-full h-64">
              <img src="/assets/img/img-slider-1.png" class="w-full h-full object-cover slider-img" alt="Force Wing"/>
              <img src="/assets/img/img-slider-2.png" class="w-full h-full object-cover slider-img hidden" alt="Ingenus Prolilium"/>
              <img src="/assets/img/img-slider-3.png" class="w-full h-full object-cover slider-img hidden" alt=""/>
            </div>
            <div class="absolute top-1/2 w-full flex justify-between px-4 -translate-y-1/2">
              <button id="prevSlide" class="bg-black bg-opacity-50 p-2 rounded-full">&#10094;</button>
              <button id="nextSlide" class="bg-black bg-opacity-50 p-2 rounded-full">&#10095;</button>
            </div>
          </div>
          <!-- Latest News -->
          <div>
            <ul id="news-list" class="space-y-4 text-left">
              <!-- Nanti isinya dimuat dari JSON -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Server Stats Section -->
  <section id="server-stats" class="relative text-white pb-0">
    <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_2.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
    <div class="relative z-10">
      <div class="mb-10 items-center text-center">
        <div class="bg-head-panel">
          <h2 class="text-head-panel animate-fadeIn text-3xl font-extrabold uppercase md:text-3xl">Statistic</h2>
        </div>
        <p class="animate-fadeIn text-gray-400">Information Server, Number of players and channels</p>
      </div>
      <div class="mx-auto max-w-6xl px-4">
        <div class="grid grid-flow-col grid-rows-3 gap-4">
          <div class="row-span-3">
						<div class=" rounded-xl bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat p-5 text-sm/7 text-gray-700 dark:text-gray-300">
            <div id="channel-stats-container">
			</div>
            <hr class="my-6 w-full border-(--pattern-fg)" />
          </div>
        </div>
        <div class="col-span-2">
          <div class="rounded-xl bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat p-5 text-sm/7 text-gray-700 dark:text-gray-300">
            <div class="space-y-6">
              <ul class="space-y-3">
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Server Status <code class="font-mono font-medium text-gray-950 dark:text-red-500" id="server_status">load...</code>
                  </p>
                </li>
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Server Time <code class="font-mono font-medium text-gray-950 dark:text-amber-300" id="server_time">-</code>
                  </p>
                </li>
				<li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Tierra Gloriosa <code class="font-mono font-medium text-gray-950 text-red-400" id="tg_time">-</code>
                  </p>
                </li>
				<li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Ingens Proelium <code class="font-mono font-medium text-gray-950 text-orange-400" id="ip_time">-</code>
                  </p>
                </li>
				<li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Memoria Chrysos <code class="font-mono font-medium text-gray-950 text-red-400" id="mc_time">-</code>
                  </p>
                </li>
              </ul>
            </div>
            <hr class="my-6 w-full border-(--pattern-fg)" />
          </div>
        </div>
        <div class="col-span-2 row-span-2">
          <div class="rounded-xl bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat p-5 text-sm/7 text-gray-700 dark:text-gray-300">
            <div class="space-y-6">
              <ul class="space-y-3">
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Total Players <code class="font-mono font-medium text-gray-950 dark:text-orange-400" id="total_player">?</code>
                  </p>
                </li>
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Players Online <code class="font-mono font-medium text-gray-950 dark:text-orange-400" id="player_online">?</code>
                  </p>
                </li>
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Capella <code class="font-mono font-medium text-gray-950 dark:text-pink-600" id="player_capella">?</code>
                  </p>
                </li>
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Procyon <code class="font-mono font-medium text-gray-950 dark:text-blue-500" id="player_procyon">?</code>
                  </p>
                </li>
                <li class="flex">
                  <svg class="h-[1lh] w-5.5 shrink-0" viewBox="0 0 22 22" fill="none" stroke-linecap="square">
                    <circle cx="11" cy="11" r="11" class="fill-sky-400/25" />
                    <circle cx="11" cy="11" r="10.5" class="stroke-sky-400/25" />
                    <path d="M8 11.5L10.5 14L14 8" class="stroke-sky-800 dark:stroke-sky-300" />
                  </svg>
                  <p class="ml-3">Active Guilds <code class="font-mono font-medium text-gray-950 dark:text-green-500" id="total_guild">?</code>
                  </p>
                </li>
              </ul>
            </div>
            <hr class="my-6 w-full border-(--pattern-fg)" />
          </div>
        </div>
      </div>
    </div>
    </div>
  </section>
  <!-- Characters Section -->
  <section id="characters" class="relative pt-0 pb-16 px-4">
    <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
    <div class="relative z-10">
      <div class="mb-5 items-center text-center">
        <div class="bg-head-panel">
          <h2 class="text-head-panel animate-fadeIn text-3xl font-extrabold uppercase md:text-3xl">Characters</h2>
        </div>
        <p class="animate-fadeIn text-gray-400">Ultimate Battle with your own CHARACTER!</p>
      </div>
      <div class="mx-auto max-w-7xl flex flex-col md:flex-row items-center gap-10 px-4">
        <!-- Character Video & Info -->
        <div class="flex flex-col items-start md:w-1/2 animate-slideInLeft">
          <div class="relative w-full max-w-sm rounded-xl border-4 border-indigo-500 shadow-[0_0_30px_rgba(99,102,241,0.7)] overflow-hidden transition-transform duration-300 hover:scale-110">
            <video id="videoLoad" class="w-full h-56 object-cover" autoplay loop muted playsinline>
              <source id="mainCharVideo" src="/assets/video/hero_slide/1.mp4" type="video/mp4" /> Your browser does not support the video tag.
            </video>
            <div class="absolute inset-0 border-2 border-indigo-400 rounded-xl pointer-events-none"></div>
          </div>
          <div class="mt-6 text-left">
            <h3 id="mainCharTitle" class="text-3xl font-bold text-white drop-shadow-md">Warrior</h3>
            <p id="mainCharDesc" class="mt-2 text-gray-300 leading-relaxed text-sm sm:text-base">This class specializes in melee combat, emphasizing physical strength and heavy armor to vanquish foes. It wields a greatsword and primarily relies on Strength as its main attribute.</p>
          </div>
        </div>
        <!-- Character Image -->
        <div class="md:w-1/2 animate-slideInRight">
          <img id="mainCharImage" src="/assets/img/char/1.png" alt="Main Character" class="mx-auto h-120 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110" />
        </div>
      </div>
      <!-- Character Selection Icons: Responsive with Zigzag + Mobile Slide -->
      <div class="mt-12 max-w-6xl mx-auto px-4 overflow-x-auto lg:overflow-visible">
        <div class="flex sm:grid sm:grid-cols-5 lg:grid-cols-9">
          <!-- Warrior -->
          <div data-char="wa" id="char-wa" class="group relative cursor-pointer -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/1.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Warrior" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Warrior</div>
          </div>
          <!-- Blader -->
          <div data-char="bl" id="char-bl" class="group relative cursor-pointer translate-y-4 -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/2.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Blader" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Blader</div>
          </div>
          <!-- Wizard -->
          <div data-char="wi" id="char-wi" class="group relative cursor-pointer -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/3.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Wizard" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Wizard</div>
          </div>
          <!-- Force Archer -->
          <div data-char="fa" id="char-fa" class="group relative cursor-pointer translate-y-4 -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/4.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Force Archer" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Force Archer</div>
          </div>
          <!-- Force Shielder -->
          <div data-char="fs" id="char-fs" class="group relative cursor-pointer -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/5.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Force Shielder" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Force Shielder</div>
          </div>
          <!-- Force Blader -->
          <div data-char="fb" id="char-fb" class="group relative cursor-pointer translate-y-4 -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/6.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Force Blader" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Force Blader</div>
          </div>
          <!-- Gladiator -->
          <div data-char="gl" id="char-gl" class="group relative cursor-pointer -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/7.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Gladiator" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Gladiator</div>
          </div>
          <!-- Force Gunner -->
          <div data-char="fg" id="char-fg" class="group relative cursor-pointer translate-y-4 -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/8.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Force Gunner" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Force Gunner</div>
          </div>
          <!-- Dark Mage -->
          <div data-char="dm" id="char-dm" class="group relative cursor-pointer -mb-4 min-w-[6rem] sm:min-w-0">
            <img src="/assets/img/hero_slide/9.png" class="w-24 sm:w-28 lg:w-32 object-contain transition-transform hover:scale-110" alt="Dark Mage" />
            <div class="absolute bottom-full left-1/2 mb-1 -translate-x-1/2 rounded bg-black bg-opacity-80 px-2 py-1 text-xs text-white opacity-0 transition-opacity group-hover:opacity-100">Dark Mage</div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </main>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig } from '@/js/store';
import { waitForServerInit } from '@/js/global';
import { DateTime } from 'luxon';

onMounted(() => {
  initPage()
})

onBeforeUnmount(() => {
  clearAllIntervals()
});


const router = useRouter()

function goToNewsDetail(id, slug) {
	router.push({ name: 'NewsDetail', params: { id, slug } })
}

function goTo(path) {
	router.push(`/${path}`);
}

let slideIndex = 0;
let slides = [];
let channels_list = [];
let firstCheckStatistic = false;
let statisticCache = {};


async function initPage() {

	await waitForServerInit();

	loadHomeNews();
	initCharSelection();
	getListChannels();
	addInterval(() => getListChannels(), 10000);

	slides = document.querySelectorAll('.slider-img');

	if (slides.length > 0) {
	showSlide(slideIndex);
	addInterval(() => nextSlide(), 5000);

	document.getElementById("prevSlide")?.addEventListener("click", prevSlide);
	document.getElementById("nextSlide")?.addEventListener("click", nextSlide);
	}

	updateServerTime();
	updateCountdown();
	checkPortStatus();

	addInterval(updateServerTime, 1000);
	addInterval(updateCountdown, 1000);
	addInterval(checkPortStatus, 20000);

	//await new Promise(resolve => setTimeout(resolve, 1000));

	setSuggestions();
}

function setSuggestions() {
	const isIndonesian = window.userCountry?.toLowerCase() === 'indonesia';
	const suggestions = isIndonesian
	? [
		"Ribuan pemain telah memasuki dunia baru ini… dan sekarang dunia ini menantimu untuk ikut bergabung.",
		"Alam ini tak akan terbuka selamanya… kesempatan seperti ini bisa hilang dalam sekejap mata.",
		"Kamu telah mencari ke mana-mana sesuatu yang bermakna—bagaimana jika game ini adalah akhir dari pencarian itu?",
		"Hanya yang berani, penasaran, dan tak kenal lelah yang berani mengeklik ini dan menemukan apa yang tersembunyi di balik permukaan.",
		"Kamu tidak hanya ditakdirkan untuk menyaksikan cerita ini—kamu memang ditakdirkan untuk membentuknya dari dalam.",
		"Ini bukan sekadar unduhan. Ini adalah awal dari transformasi yang dimulai saat kamu menekan tombol itu.",
		"Jauh di dalam dirimu, kamu sudah merasakannya—instingmu tahu bahwa inilah tempatmu, tempat kekuatanmu terbangun.",
		"Momen seperti ini tidak terjadi secara kebetulan—momen ini yang memilih *kamu*. Pertanyaannya, apakah kamu siap menjawabnya?",
		"Kamu tidak sampai di sini karena kebetulan. Setiap langkahmu telah membawamu ke saat kebenaran ini.",
		"Masuklah, selagi portal masih terbuka—dirimu di masa depan sudah menunggumu di sisi lain, lebih kuat dari sebelumnya."
		]
	: [
		"Thousands of players have already stepped into this new world… and now it's waiting just for you to join them.",
		"This realm won’t remain open forever… opportunities like this vanish in the blink of an eye.",
		"You’ve searched far and wide for something meaningful—what if this is the game that finally completes that journey?",
		"Only the bold, the curious, and the relentless dare to click this and discover what lies beyond the surface.",
		"You weren’t just meant to witness this story—you were always meant to shape it from within.",
		"This isn't just a download. It's the beginning of a transformation that starts the moment you press that button.",
		"Deep down, you already feel it—your instincts know this is where you belong, where your power awakens.",
		"Moments like this don’t happen by chance—this one chose *you*. The question is, are you ready to respond?",
		"You didn’t land here by accident. Every step you’ve taken has led you to this exact moment of truth.",
		"Step in, while the portal is still open—your future self is already waiting on the other side, stronger than ever."
		];

	addInterval(() => {
	const suggestionText = suggestions[Math.floor(Math.random() * suggestions.length)];
	const el = document.getElementById("suggestions");
	if (el) el.textContent = suggestionText;
	}, 3000);
}

async function checkPortStatus() {
	const el = document.getElementById("server_status");
	if (!el) return;
	await new Promise(resolve => setTimeout(resolve, 2000));
	if (socketWb && socketWb.readyState === WebSocket.OPEN) {
	el.textContent = "Online";
	el.classList.replace("dark:text-red-500", "dark:text-green-500");
	} else {
	el.textContent = "Offline";
	el.classList.replace("dark:text-green-500", "dark:text-red-500");
	}
}

async function updateServerTime() {
	//await new Promise(resolve => setTimeout(resolve, 1000));
	const options = {
	timeZone: globalConfig.serverzone,
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit",
	hour12: false,
	};
	const date = new Date().toLocaleString("en-US", options);
	const el = document.getElementById("server_time");
	if (el) el.textContent = date;
}

const warDurationMinutes = 40;

const scheduleMap = {
	tg_time: ["04:00", "10:00", "16:00", "22:00"],
	ip_time: ["01:00", "13:00"],
	mc_time: ["07:00", "19:00"]
};

async function updateCountdown() {
	if (!globalConfig.serverzone) return;

	const zone = globalConfig.serverzone;

	const nowInZone = DateTime.now().setZone(zone);

	for (const [elementId, timeList] of Object.entries(scheduleMap)) {
		const el = document.getElementById(elementId);
		if (!el) continue;

		let nextWar = null;

		for (let timeStr of timeList) {
			const [h, m] = timeStr.split(":").map(Number);
			const scheduled = nowInZone.set({ hour: h, minute: m, second: 0, millisecond: 0 });

			const warEnd = scheduled.plus({ minutes: warDurationMinutes });

			if (nowInZone >= scheduled && nowInZone <= warEnd) {
				el.textContent = "Starting";
				nextWar = null;
				break;
			}

			if (nowInZone < scheduled) {
				nextWar = scheduled;
				break;
			}
		}

		// Jika tidak ada war tersisa hari ini, ambil pertama besok
		if (!nextWar && el.textContent !== "Starting") {
			const [h, m] = timeList[0].split(":").map(Number);
			nextWar = nowInZone.plus({ days: 1 }).set({ hour: h, minute: m, second: 0, millisecond: 0 });
		}

		if (nextWar) {
			const diff = nextWar.diff(nowInZone, ["hours", "minutes", "seconds"]).toObject();
			const hh = String(Math.floor(diff.hours)).padStart(2, '0');
			const mm = String(Math.floor(diff.minutes)).padStart(2, '0');
			const ss = String(Math.floor(diff.seconds)).padStart(2, '0');
			el.textContent = `${hh}:${mm}:${ss}`;
		}
	}
}



function showSlide(index) {
	slides.forEach((slide, i) => {
	slide.classList.add('hidden');
	if (i === index) slide.classList.remove('hidden');
	});
}

function nextSlide() {
	slideIndex = (slideIndex + 1) % slides.length;
	showSlide(slideIndex);
}

function prevSlide() {
	slideIndex = (slideIndex - 1 + slides.length) % slides.length;
	showSlide(slideIndex);
}

function loadHomeNews() {
	const timestamp = new Date().getTime();
	fetch(`/json/news.json?timestamp=${timestamp}`)
	.then(response => response.json())
	.then(newsList => {
		const newsContainer = document.getElementById('news-list');
		if (!newsContainer) return;

		newsContainer.innerHTML = '';
		const latestNews = newsList.slice(0, 3);

	//   latestNews.forEach(news => {
	//     const li = document.createElement('li');
	//     li.className = "border-b border-gray-700 pb-2";
	//     li.innerHTML = `
	//       <a href="news/${news.link}/${news.title}" class="block hover:bg-[var(--bg-ct)] transition rounded-lg p-2 flex justify-between items-center">
	//         <div>
	//           <h3 class="text-lg font-semibold">${news.title}</h3>
	//           <p class="text-sm text-gray-400">${news.description}</p>
	//         </div>
	//         <p class="text-xs text-gray-500 ml-4">${news.date}</p>
	//       </a>
	//     `;
	//     newsContainer.appendChild(li);
	//   });.

	latestNews.forEach(news => {
	const li = document.createElement('li');
	li.className = "border-b border-gray-700 pb-2";

	const div = document.createElement('div');
	div.className = "block hover:bg-[var(--bg-ct)] transition rounded-lg p-2 flex justify-between items-center cursor-pointer";
	div.innerHTML = `
		<div>
		<h3 class="text-lg font-semibold">${news.title}</h3>
		<p class="text-sm text-gray-400">${news.description}</p>
		</div>
		<p class="text-xs text-gray-500 ml-4">${news.date}</p>
	`;

	div.addEventListener('click', () => {
		goToNewsDetail(news.link, news.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') );
		// router.push({ 
		// name: 'NewsDetail', 
		// params: { 
		// 	id: news.link, 
		// 	slug: news.title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '') 
		// } 
		// })
	});

	li.appendChild(div);
	newsContainer.appendChild(li);
	});




	})
	.catch(console.error);
}

// Dummy methods placeholder
function initCharSelection() {
	document.addEventListener('click', (e) => {
	const el = e.target.closest('[data-char]');
	if (el) {
		const charKey = el.getAttribute('data-char');
		selectChar(charKey);
	}
	});
}

async function getListChannels() {
	const container = document.getElementById('channel-stats-container');
	//container.innerHTML = ''; // Kosongkan kontainer

	//await new Promise(resolve => setTimeout(resolve, 1000));

	try {
		const data = await fetchEncrypted('/api/getListChannels?token=' + globalConfig.csrfToken);
		const raw = data.data.channels;
		const statistic = data.data.stats;
		//console.log(statistic)
		const grouped = {};

		document.getElementById('total_player').textContent = statistic.total_characters;
		document.getElementById('player_online').textContent = statistic.total_login + 50;
		document.getElementById('player_capella').textContent = statistic.nation_capella;
		document.getElementById('player_procyon').textContent = statistic.nation_procyon;
		document.getElementById('total_guild').textContent = statistic.total_guild;

		// Grouping berdasarkan ServerID dan Channel
		raw.forEach(item => {
			const serverId = item.Server;
			const ch = item.Channel;

			if (!grouped[serverId]) {
				grouped[serverId] = {};
			}
			if (!grouped[serverId][ch]) {
				grouped[serverId][ch] = {};
			}
			
			grouped[serverId][ch][item.Key] = item.Value;
			grouped[serverId][ch]['OnlineCount'] = item.OnlineCount;
		});

		// Render per Server
		for (const serverId in grouped) {
			for (const ch in grouped[serverId]) {
				const channelData = grouped[serverId][ch];

				const max = parseInt(channelData['ChannelMaxUserNum']) || 1;
				let online = parseInt(channelData['OnlineCount']) || 0;
				if (online !== 0) {
					online += 5;
				}

				let percentage = 0;
				if (online !== undefined) {
					percentage = Math.min(100, Math.round((online / max) * 100));
				}

				const channelDataValue = channelData['ChannelData'];
				const channelEntryLimitValue = channelData['ChannelEntryLimitLevel'];

				let ChanneName = `Channel ${ch}`;
				let ChannelLevel = '';
				let ClassStyleColor = 'text-green-400';

				if (channelDataValue) {
					const splitValues = channelDataValue.split(':');
					const firstValue = parseInt(splitValues[0], 0);
					const secondValue = parseInt(splitValues[1], 10);

					if (firstValue === 524288) {
						ChanneName = `Channel ${ch} (Boss)`;
					} else if (firstValue === 524289) {
						ChanneName = `Channel ${ch} (Boss)`;
						ClassStyleColor = 'text-white-400';
					} else if (firstValue === 131072) {
						ChanneName = `PVP Server`;
						ClassStyleColor = 'text-yellow-400';
					}else if (firstValue === 8192) {
						ChanneName = `PVP Server`;
						ClassStyleColor = 'text-orange-400';
					} else if (firstValue === 4720) {
						if(secondValue === 8){
							ChanneName = `Memoria Chrysos`;
							ClassStyleColor = 'text-red-400';
						}else{
							ChanneName = `Tierra Gloriosa`;
							ClassStyleColor = 'text-red-400';
						}
						
					}else if (firstValue === 4208) {
						ChanneName = `Ingens Proelium`;
						ClassStyleColor = 'text-orange-400';
					} else if (firstValue === 1024) {
						ChanneName = `Channel ${ch} (Trade)`;
						ClassStyleColor = 'text-green-400';
					} else if (firstValue === 9) {
						ClassStyleColor = 'text-red-400';
						ChanneName = `Channel ${ch} (War)`;
					} else if (firstValue === 4 || firstValue === 5) {
						ClassStyleColor = 'text-blue-400';
						ChanneName = `Channel ${ch} (Premium)`;
					} else if (firstValue === 1) {
						ClassStyleColor = 'text-white-400';
					}
				}

				if (channelEntryLimitValue) {
					const splitChannelEntryLimit = channelEntryLimitValue.split(':');
					const firstValueChannelEntryLimit = parseInt(splitChannelEntryLimit[0], 10);
					const secondValueChannelEntryLimit = parseInt(splitChannelEntryLimit[1], 10);
					const sum = firstValueChannelEntryLimit + secondValueChannelEntryLimit;
					ChannelLevel = `(${firstValueChannelEntryLimit} - ${sum})`;
				}

				channels_list.push({
					channelId: parseInt(ch),
					serverId: parseInt(serverId),
					maxUserNum: max,
					onlineUsers: online,
					percentage: percentage
				});

				const wrapperId = `channel-wrapper-${serverId}-${ch}`;
				const barId = `channel-bar-${serverId}-${ch}`;
				const existingWrapper = document.getElementById(wrapperId);

				if (existingWrapper) {
					// Update bar progress dan nama channel
					existingWrapper.querySelector(`#${barId}`).style.width = `${percentage}%`;
					existingWrapper.querySelector('.channel-name').innerText = `${ChanneName} ${ChannelLevel}`;
				} else {
					// Buat baru jika belum ada
					const channelHTML = `
						<div id="${wrapperId}" class="flex justify-between p-1 bg-[url('/assets/img/bg-s1.png')] bg-cover bg-center bg-no-repeat rounded-lg ">
							<span class="text-xs ${ClassStyleColor} channel-name">${ChanneName} ${ChannelLevel}</span>
							<div class="w-1/3 bg-[url('/assets/img/Channel_n.png')] bg-cover bg-center overflow-hidden h-3">
								<div id="${barId}" class="bg-[url('/assets/img/Channel_p.png')] bg-cover bg-center overflow-hidden h-3" style="width: ${percentage}%"></div>
							</div>
						</div>
					`;
					container.insertAdjacentHTML('beforeend', channelHTML);
				}

			}
		}
	} catch (error) {
		console.error('Error fetching Channel List:', error);
	}
}

function selectChar(key) {
	const data = charData[key];
	const image = document.getElementById('mainCharImage');
	const title = document.getElementById('mainCharTitle');
	const desc = document.getElementById('mainCharDesc');
	const video = document.getElementById('videoLoad');
	const source = document.getElementById('mainCharVideo');

	image.src = data.img;
	title.innerText = data.title;
	desc.innerText = data.desc;
	
	source.src = data.video;  // ganti src di <source>
	video.load();             // reload video baru

	// Animation refresh
	image.classList.remove('animate-fadeIn');
	title.classList.remove('animate-fadeIn');
	desc.classList.remove('animate-fadeIn');
	video.classList.remove('animate-fadeIn');

	setTimeout(() => {
		image.classList.add('animate-fadeIn');
		title.classList.add('animate-fadeIn');
		desc.classList.add('animate-fadeIn');
		video.classList.add('animate-fadeIn');
	}, 50);

	// Highlight selected icon
	document.querySelectorAll('[data-char]').forEach(el => el.removeAttribute('data-selected'));
	document.getElementById(`char-${key}`).setAttribute('data-selected', 'true');

}

const charData = {
	wa: {
		title: 'Warrior',
		desc: 'This class specializes in melee combat, emphasizing physical strength and heavy armor to vanquish foes. It wields a greatsword and primarily relies on Strength as its main attribute.',
		img: '/assets/img/char/1.png',
		video: '/assets/video/hero_slide/1.mp4'
	},
	bl: {
		title: 'Blader',
		desc: 'A class that uses its signature dual swords to render enemies helpless. By using speed and agility, this melee class is a high damage option. The Blader wears light armor and benefits greatly from STR and DEX.',
		img: '/assets/img/char/2.png',
		video: '/assets/video/hero_slide/2.mp4'
	},
	wi: {
		title: 'Wizard',
		desc: 'It is a ranged class that uses magic to attack and defend itself, focusing on dealing massive damage from a distance. Wizards can manifest powerful single target and Area of Effect skills to wreak havoc before they can be harmed. They wear light armor and benefit greatly from their INT stat.',
		img: '/assets/img/char/3.png',
		video: '/assets/video/hero_slide/3.mp4'
	},
	fa: {
		title: 'Force Archer',
		desc: 'A class enhanced with the power of magic to deal damage to single targets, especially from a distance. Force Archers strike a delicate balance between physical and magical damage and can help allies through any danger. They wear medium armor and benefit from both INT and DEX.',
		img: '/assets/img/char/4.png',
		video: '/assets/video/hero_slide/4.mp4'
	},
	fs: {
		title: 'Force Shielder',
		desc: 'It is a Strong armored class that uses force to make itself highly resistant to damage. Capable of creating powerful Astral Shields, the Force Shielder excels on the front line of war, protecting both themselves and their allies from danger. They benefit greatly from a balanced combination of STR, INT, and DEX.',
		img: '/assets/img/char/5.png',
		video: '/assets/video/hero_slide/5.mp4'
	},
	fb: {
		title: 'Force Blader',
		desc: 'Experts in using both swords and magic to deeply attack enemies, this class focuses on speed and precision to overcome obstacles. Considered master swordsmen, they wield both a katana and a sharp blade. In its highest form, the Force Blader wears medium armor and benefits heavily from STR and DEX.',
		img: '/assets/img/char/6.png',
		video: '/assets/video/hero_slide/7.mp4'
	},
	gl: {
		title: 'Gladiator',
		desc: 'It is a powerful melee class that deals damage at both close and ranged distances. Anger accumulates through continuous use of skills, sending Gladiators into a frenzy. Gladiators excel at Area of Effect damage and use unique chakra weapons. They wear heavy armor and benefit greatly from their STR stat.',
		img: '/assets/img/char/7.png',
		video: '/assets/video/hero_slide/7.mp4'
	},
	fg: {
		title: 'Force Gunner',
		desc: 'Mastering long-range sniping skills and powerful Area of Effect damage, the Force Gunner focuses on higher attack speed and critical hits. They create physical and magical attacks to destroy enemies from a distance. The Force Gunner wears medium armor and benefits from INT and DEX stats.',
		img: '/assets/img/char/8.png',
		video: '/assets/video/hero_slide/8.mp4'
	},
	dm: {
		title: 'Dark Mage',
		desc: 'A Wizard group that deals with dark magic, driven by a desire for power beyond ordinary magic. After decades of research, they can melt the souls of the dead with their power, creating magic that can summon both the darkness and light of creatures. This class uses Orbs and its primary stat is INT.',
		img: '/assets/img/char/9.png',
		video: '/assets/video/hero_slide/3.mp4'
	}
};

</script>

<style scoped>
/* tambahkan gaya tambahan jika perlu */
.slider-img.hidden {
  display: none;
}
</style>