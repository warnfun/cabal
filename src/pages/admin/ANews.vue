<template>
<div class="rounded-lg p-6 bg-[#121212]/80 shadow-2xl">
	<div class="flex justify-start space-x-4 mb-6">
      <button
		class="tab-button px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition active"
		data-title="Create News"
		data-tab="addNews"
		>
		Create News
		</button>
		<button
		class="tab-button px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition"
		data-title="List News"
		data-tab="ListNews"
		>
		List News
		</button>
		<button
		class="tab-button px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition"
		data-title="Message to Discord"
		data-tab="Discord"
		>
		Discord
		</button>

      <!-- Tambahkan tab baru di sini jika diperlukan -->
    </div>

	  <div id="pageContent">
      
	  </div>
    </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { style } from '@/js/global.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig, checkLogin, isAdmin } from '@/js/store';
import tinymce from 'tinymce/tinymce';


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

let currentType = 'addNews'; // untuk simpan tab aktif


async function init() {
	const isLoggedIn = await checkLogin();
	if (!isLoggedIn) return;
	//const isAdmin = await checkAdmin();
	if (!isAdmin) {
		return;
	}
	
	const tabButtons = document.querySelectorAll('.tab-button');
	tabButtons.forEach(button => {
	button.addEventListener('click', async () => {
			const target = button.dataset.tab;
			console.log(target)
			if(currentType === target){
				return;
			}

			// Hilangkan 'active' dari semua tab
			tabButtons.forEach(btn => {
				btn.classList.remove('active');
			});

			// Tambahkan 'active' ke tab yang diklik
			button.classList.add('active');

			await loadContent(target);
		});
	});

	

	await loadContent('addNews');


}

async function loadContent(target){

	currentType = target;
	document.getElementById("pageContent").innerHTML = '';

	if(target === 'addNews'){
		document.getElementById("pageContent").innerHTML = `
		<div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
		<div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

		<form id="form" class="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat">

			<!-- CSRF Token -->
			<input type="hidden" name="token" value="<?php echo $_SESSION['csrf_token']; ?>" />

			<!-- Title Input -->
			<input type="text" name="title" placeholder="Judul Berita" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required>

			<!-- Description Textarea -->
			<textarea name="description" placeholder="Deskripsi Singkat" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>

			<!-- Dropdown untuk memilih tipe berita -->
			<select name="type" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
				<option value="" disabled selected>Pilih Tipe Berita</option>
				<option value="update">Update</option>
				<option value="news">News</option>
				<option value="event">Event</option>
			</select>

			<!-- Date Input (Date) -->
			<div class="flex flex-col mb-4">
				<label class="text-white font-medium mb-2">Date News</label>
				<input type="datetime-local" name="date" id="dateInput" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required readonly>
			</div>

			<!-- Date Input (Start & End) -->
			<div class="flex space-x-4 mb-4">
				<!-- Start Date -->
				<div class="flex flex-col w-1/2">
					<label class="text-white font-medium mb-2">Start Event</label>
					<input type="datetime-local" name="datestart" id="dateInputstart" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
				</div>

				<!-- End Date -->
				<div class="flex flex-col w-1/2">
					<label class="text-white font-medium mb-2">End Event</label>
					<input type="datetime-local" name="dateend" id="dateInputend" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required>
				</div>
			</div>


			<!-- Content Textarea -->
			<textarea name="content" placeholder="Isi Berita Lengkap" class="w-full p-3 rounded-lg h-40 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" id="content"></textarea>

			<!-- Submit Button -->
			<button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit Berita</button>
		</form>

		`;

		tinymce.remove();

		requestAnimationFrame(() => {
			function pad(n) {
				return n < 10 ? '0' + n : n;
			}

			const now = new Date();
			const year = now.getFullYear();
			const month = pad(now.getMonth() + 1);
			const day = pad(now.getDate());
			const hours = pad(now.getHours());
			const minutes = pad(now.getMinutes());

			const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

			document.getElementById('dateInput').value = formattedDateTime;
			document.getElementById('dateInputstart').value = formattedDateTime;
			document.getElementById('dateInputend').value = formattedDateTime;

			tinymce.init({
				selector: '#content',
				plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount',
				toolbar: 'undo redo | …',
				skin_url: '/tinymce/skins/ui/oxide-dark',
				content_css: '/tinymce/skins/content/dark/content.css',
				// Atau opsi umum:
				base_url: '/tinymce',  // direktori root TinyMCE di public/
				suffix: '.min',        // kalau kamu menggunakan file *.min.js
			});

			document.getElementById('form').addEventListener('submit', async function (e) {
					e.preventDefault(); // Cegah submit default

					const form = e.target; // atau: document.getElementById('loginForm')
					const formData = new FormData(form); // langsung ambil semua input

					const successDiv = document.getElementById('successMessage');
					const errorDiv = document.getElementById('errorMessage');

					formData.append('action', 'add_news'); // jika perlu tambahan manual
					formData.append('token', globalConfig.csrfToken);

					const data = await fetchEncrypted('/api_adm/news', 'POST', formData);
					if (data.status === 'success') {
						successDiv.textContent = data.message;
						successDiv.classList.remove('hidden');

						await loadContent('ListNews');
					} else {
						errorDiv.textContent = data.message;
						errorDiv.classList.remove('hidden');
					}

			});
		});

		
	}else if(target === 'ListNews'){
		document.getElementById("pageContent").innerHTML = 	`
			<!-- List of News Items -->
			<div id="news-list" class="space-y-4">
				<!-- News items will be injected here via JavaScript -->
			</div>
			</div>
		
			<!-- Pagination -->
			<div class="mt-12 flex justify-center space-x-2">
			<button id="first-button" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600" disabled>« First</button>
			<button id="prev-button" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600" disabled>← Prev</button>
		
			<div id="page-buttons" class="flex items-center space-x-2"></div>
		
			<button id="next-button" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600">Next →</button>
			<button id="last-button" class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600">Last »</button>
			</div>
		
		`;

		requestAnimationFrame(() => {
			const itemsPerPage = 10; // Jumlah item per halaman
			let currentPage = 1;    // Halaman saat ini
			let newsData = [];      // Akan diisi dari list.json
	
			// Function untuk render berita
			function renderNewsPage(page) {
			const start = (page - 1) * itemsPerPage;
			const end = start + itemsPerPage;
			const visibleNews = newsData.slice(start, end);
	
			const newsList = document.getElementById("news-list");
			newsList.innerHTML = visibleNews.map((news) => `
				<div class="bg-gray-800 rounded-lg p-2 flex justify-between hover:bg-gray-700">
				<span class="text-sm text-blue-400 font-semibold">${news.title} (${news.date})</span>
				<a onclick="window.deleteNews(${news.link})" class="text-sm text-gray-300 cursor-pointer">Delete</a>
				</div>
			`).join('');
	

			}
	
			// Event listeners tombol-tombol pagination
			document.getElementById("prev-button").addEventListener("click", () => {
			if (currentPage > 1) {
				currentPage--;
				renderNewsPage(currentPage);
				renderPaginationControls();
			}
			});
	
			document.getElementById("next-button").addEventListener("click", () => {
			const totalPages = Math.ceil(newsData.length / itemsPerPage);
			if (currentPage < totalPages) {
				currentPage++;
				renderNewsPage(currentPage);
				renderPaginationControls();
			}
			});
	
			document.getElementById("first-button").addEventListener("click", () => {
			currentPage = 1;
			renderNewsPage(currentPage);
			renderPaginationControls();
			});
	
			document.getElementById("last-button").addEventListener("click", () => {
			const totalPages = Math.ceil(newsData.length / itemsPerPage);
			currentPage = totalPages;
			renderNewsPage(currentPage);
			renderPaginationControls();
			});
	
			// Ambil data dari list.json
			const timestamp = new Date().getTime();
			fetch(`/json/news.json?timestamp=${timestamp}`)
			.then(response => response.json())
			.then(data => {
				newsData = data;
				renderNewsPage(currentPage);
				renderPaginationControls();
			})
			.catch(error => {
				console.error('Gagal mengambil data berita:', error);
			});
	
			// Function untuk render pagination
			function renderPaginationControls() {
				const totalPages = Math.ceil(newsData.length / itemsPerPage);
				const pageButtonsContainer = document.getElementById("page-buttons");
	
				pageButtonsContainer.innerHTML = '';
	
				const createPageButton = (page) => {
					const button = document.createElement("button");
					button.textContent = page;
					button.className = `px-3 py-1 rounded mx-1 
					${page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-500'}`;
					button.addEventListener("click", () => {
					currentPage = page;
					renderNewsPage(currentPage);
					renderPaginationControls();
					});
					return button;
				};
	
				const startPage = Math.max(1, currentPage - 5);
				const endPage = Math.min(totalPages, currentPage + 4);
	
				for (let i = startPage; i <= endPage; i++) {
					pageButtonsContainer.appendChild(createPageButton(i));
				}
	
				document.getElementById("prev-button").disabled = currentPage === 1;
				document.getElementById("next-button").disabled = currentPage === totalPages;
				document.getElementById("first-button").disabled = currentPage === 1;
				document.getElementById("last-button").disabled = currentPage === totalPages;
			}
		});

		window.deleteNews = async function (link) {
			const confirmed = confirm("Apakah Anda yakin ingin menghapus berita ini?");
			if (!confirmed) return;

			try {
				const getuser = await fetchEncrypted(`/api_adm/news?action=delete&link=${link}&token=${globalConfig.csrfToken}`);
				if (getuser.status === "success") {
					await loadContent('ListNews');
				} else {
					alert(getuser.message || "Gagal menghapus berita.");
				}
			} catch (err) {
				console.error("Error saat menghapus:", err);
			}
		};


	}else if(target === 'Discord'){
		document.getElementById("pageContent").innerHTML = `
		<div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
		<div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

		<form id="formDiscord" class="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat">

			<!-- Channel Input -->
			<input type="text" name="channel" placeholder="Channel ID" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required>

			<!-- Chat Textarea -->
			<textarea name="chat" id="chat" placeholder="Chat" class="w-full p-3 rounded-lg bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>

			<!-- Submit Button -->
			<button type="submit" class="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">Submit Berita</button>
		</form>

		`;

		document.getElementById('formDiscord').addEventListener('submit', async function (e) {
			e.preventDefault(); // Cegah submit default

			const form = e.target;
			const formData = new FormData(form); // Ambil semua input

			const channel_id = formData.get('channel');
			const chat = formData.get('chat');

			if (socketWb && socketWb.readyState === WebSocket.OPEN) {
				const message = {
					type: 'send_message',
					channel_id: channel_id,
					content: chat
				};
				socketWb.send(JSON.stringify(message));
				document.getElementById('chat').value = '';
				console.log('Message sent:', message);
			} else {
				console.warn('WebSocket not connected. Message not sent.');
			}

			// const socket = new WebSocket('ws://15.235.149.51:3001');

			// socket.addEventListener('open', () => {
			// 	// Mengirim data menggunakan send() dan stringify
			// 	const message = {
			// 		type: 'send_message',
			// 		channel_id: channel_id,
			// 		content: chat
			// 	};
			// 	socket.send(JSON.stringify(message));

			// 	document.getElementById('chat').value = '';
			// });

			// socket.addEventListener('message', (event) => {
			// 	console.log('Received:', event.data);
			// });
		});
	}
}



</script>
<style scoped>
.tab-button {
  opacity: 0.6;
}
.tab-button.active {
  opacity: 1;
  background-color: #2563eb; /* biru lebih cerah */
}
</style>
