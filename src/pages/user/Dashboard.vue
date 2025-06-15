<template>

      
	<!-- Character List -->
	<div class="rounded-lg p-6 overflow-hidden rounded-2xl bg-[#121212]/80 shadow-2xl">
	<div id="character-list" class="grid md:grid-cols-2 gap-4">
		<!-- Character Cards will be injected here -->
	</div>
	</div>

</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { style, waitForServerInit } from '@/js/global.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig, checkLogin } from '@/js/store';



onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  clearAllIntervals()
});

const router = useRouter()

function goTo(path) {
	router.push(`/${path}`);
}


async function init() {

	const isLoggedIn = await checkLogin();
	if (!isLoggedIn) return;
	
	requestAnimationFrame(async() => {

		await fetchCharacters();
	});
	
  }

async function fetchCharacters() {

	//await new Promise(resolve => setTimeout(resolve, 1000));
	await waitForServerInit();
	// Lakukan permintaan AJAX ke server untuk mengambil data karakter
	const data = await fetchEncrypted('/api/getCharacters?token=' + globalConfig.csrfToken);
	const characters = Array.isArray(data.data) ? data.data : [data.data];
	await renderCharacterList(characters);
	
}


// Fungsi untuk menampilkan karakter
async function renderCharacterList(characters) {
	const characterListElement = document.getElementById('character-list');
	characterListElement.innerHTML = '';

	// Pastikan daftar karakter memiliki 16 slot
	const totalSlots = 16;
	const filledSlots = characters.length;

	// Menambahkan slot kosong jika jumlah karakter kurang dari 16
	for (let i = filledSlots; i < totalSlots; i++) {
		characters.push({ Name: "", image: "/assets/img/char_banner/0.png", icon: "/assets/img/icon/0.png" });
	}



	// Pastikan characters adalah array
	if (!Array.isArray(characters)) {
		characters = [characters]; // Convert to array if it's a single object
	}

	// Render daftar karakter dan slot kosong
	characters.forEach(character => {
		// Jika nama karakter kosong, tandai sebagai slot kosong
		if (character.Name === "") {
			const emptySlotCard = `
				<div class="flex items-center bg-black/60 p-4 animate-fadeIn">
					<img src="/assets/img/icon/0.png" class="w-12 h-12 mr-4" />
					<div>
						<h4 class="text-gray-500 font-semibold">Empty Slot</h4>
						<p class="text-gray-600">Create Char in game</p>
					</div>
				</div>
			`;
			characterListElement.innerHTML += emptySlotCard;
		} else {
			// Validasi nama karakter agar maksimal 16 karakter
			const displayName = character.Name;
			
			const styleArray = style(character.Style);
			const CharacterClass = styleArray['BattleStyle'];

			const characterCard = `
				<button onclick="openCharacter('${character.Name}')" class="animate-fadeIn w-full text-left transition duration-200 rounded-lg shadow-lg shadow-blue-900/30 overflow-hidden bg-cover bg-center transform hover:scale-[1.01] hover:brightness-110 hover:shadow-lg hover:shadow-red-500/50" style="background-image: url('/assets/img/char_banner/${CharacterClass}.png');">
					<!-- Overlay with opacity -->
				
					<div class="flex items-center bg-black/60 p-4">
						<img src="/assets/img/icon/${CharacterClass}.png" class="w-12 h-12 mr-4" />
						<div>
							<h4 class="text-white font-semibold">${displayName}</h4>
							<p class="text-gray-300">Level ${character.LEV} · ${character.WorldIdx} · ${character.ChannelIdx}</p>
						</div>
					</div>
				</button>
			`;

			
			characterListElement.innerHTML += characterCard;


		}
	});
}
</script>
