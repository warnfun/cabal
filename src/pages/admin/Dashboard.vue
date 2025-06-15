<template>
  <div class="rounded-lg p-6 bg-[#121212]/80 shadow-2xl overflow-x-auto">
    <!-- Tab di atas tabel -->
    <div class="flex justify-start space-x-4 mb-6">
      <button
		class="tab-button px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition"
		data-title="All Player"
		data-tab="Allplayer"
		>
		All Player
		</button>
		<button
		class="tab-button px-4 py-2 rounded-lg text-white bg-gray-600 hover:bg-gray-700 transition active"
		data-title="Player Online"
		data-tab="Online"
		>
		Online
		</button>

      <!-- Tambahkan tab baru di sini jika diperlukan -->
    </div>

    <!-- Search bar -->
    <div class="mb-4 flex items-center">
      <label for="search-input" class="text-white mr-2">Search:</label>
      <input
        id="search-input"
        type="text"
        class="px-4 py-2 border border-gray-700 rounded-md text-white bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="Search players..."
      />
    </div>

    <!-- Tabel data -->
    <table class="w-full text-left">
      <thead id="playerTableHead" class="text-blue-400">
        <!-- Header tabel dari JS -->
      </thead>
      <tbody id="playerTableBody">
        <!-- Data pemain akan di-generate oleh JavaScript -->
      </tbody>
    </table>

    <!-- Pagination -->
    <div class="mt-4 flex justify-center space-x-2" id="paginationControls"></div>
  </div>


  <!-- Inventory Modal -->
<div v-if="modalOpen" id="inventoryModal" class="fixed inset-0 z-80 flex items-center justify-center backdrop-blur-sm mt-30">
  <div class="relative w-full max-w-3xl max-h-[800px] overflow-auto rounded-xl bg-gradient-to-br from-gray-900 to-gray-800 p-6 shadow-2xl border border-gray-700">
    
    <!-- Modal Header -->
    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-white">{{ TargetName }}: {{ inventoryName }}</h2>
      <button @click="closeInventoryModal" class="text-gray-400 hover:text-red-500 text-2xl font-bold">&times;</button>
    </div>

    <!-- Table -->
    <div class="overflow-x-auto">
      <table class="min-w-full text-sm text-gray-200 border border-gray-600 rounded-lg overflow-hidden">
        <thead class="bg-gray-700 text-gray-100">
          <tr>
            <th class="px-4 py-2 border border-gray-600 text-left">Item</th>
            <th class="px-4 py-2 border border-gray-600 text-left">Option</th>
            <th class="px-4 py-2 border border-gray-600 text-left">Slot</th>
            <th v-if="isAdmin" class="px-4 py-2 border border-gray-600 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="item in inventoryData"
            :key="item.itemID"
            class="border border-gray-700 hover:bg-gray-700 transition"
          >
            <td class="px-4 py-2 border border-gray-600">
              {{ item.itemID }} -
              <span class="text-blue-300 italic">
                {{ getItemName(item.itemID) }}<span v-if="item.enchan > 0"> +{{ item.enchan }}</span>
              </span>
            </td>
            <td class="px-4 py-2 border border-gray-600">{{ item.itemOpt }}</td>
            <td class="px-4 py-2 border border-gray-600">{{ item.slotPosition }}</td>
            <td
              v-if="isAdmin"
              class="px-4 py-2 border border-gray-600"
            >
              <button
                @click="deleteItem(item.CharacterIdx, item.slotPosition, inventoryTarget)"
                class="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Hapus
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</div>




</template>


<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { style } from '@/js/global.js';
import { socketWb, key , encrypt} from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig, checkLogin, isAdmin, isGm } from '@/js/store';



onMounted(() => {
  init();
  loadItemNames();
})

onBeforeUnmount(() => {
  clearAllIntervals()
});

const router = useRouter()

function goTo(path) {
	router.push(`/${path}`);
}

let itemsPerPage = 5;
let currentPage = 1;
let currentType = 'Allplayer';
let currentData = [];
let totalItems = 0;

async function init() {
	const isLoggedIn = await checkLogin();
	if (!isLoggedIn) return;
	
	if (!isAdmin && !isGm) {
		return;
	}

	await new Promise(resolve => setTimeout(resolve, 1000));

	const tabButtons = document.querySelectorAll('.tab-button');

	tabButtons.forEach(button => {
	button.addEventListener('click', async () => {
			const target = button.dataset.tab;

			if(currentType === target){
				return;
			}

			// Hilangkan 'active' dari semua tab
			tabButtons.forEach(btn => {
				btn.classList.remove('active');
			});

			// Tambahkan 'active' ke tab yang diklik
			button.classList.add('active');

			await loadPlayerList(target);
		});
	});


	await loadPlayerList('Online');

	const searchInput = document.getElementById('search-input');
	if (searchInput) {
		searchInput.addEventListener('input', function () {
			const search = searchInput.value.trim();
			if (search.length >= 2 || search.length === 0) {
				loadPlayerList(currentType, 1, 20, search);
			}
		});
	}


}

async function loadPlayerList(action, page = 1, limit = 20, search = '') {
	const tableHead = document.getElementById('playerTableHead');
	currentPage = page;
	itemsPerPage = limit;
	
	try {
		const data = await fetchEncrypted(`/api_adm/playerList?action=${action}&page=${page}&limit=${limit}&search=${search}&token=${globalConfig.csrfToken}`);
		//console.log(action)
		const result = Array.isArray(data.data.data) ? data.data.data : [data.data.data];
		currentData = result;
		totalItems = data.data.total;

		tableHead.innerHTML = `
			<tr>
				<th class="p-3">#</th>
				<th class="p-3">Name</th>
				<th class="p-3">Level</th>
				<th class="p-3">Class</th>
				<th class="p-3">Guild</th>
				<th class="p-3">Actions</th>
			</tr>
		`;

		currentType = action;
		renderTablePage(action, currentPage);
		renderPaginationControls();

	} catch (err) {
		console.error(err);
		//container.innerHTML = '<div class="text-red-500">Error fetching data.</div>';
	}
}

function renderTablePage(type, page) {
	const start = (page - 1) * itemsPerPage;
	const tbody = document.getElementById("playerTableBody");

	tbody.innerHTML = currentData.map((item, index) => {
		return `
			<tr class="border-b border-gray-950 hover:bg-gray-800">
				<td class="p-3">${start + index + 1}</td>
				${currentType === 'Allplayer' ? `
				<td class="p-3 ${item.AuthType !== 1 ? 'text-red-800' : ''}">${item.Name || '-'}</td>
				` : ''}

				${currentType === 'Online' ? `
				<td class="p-3 ${item.AuthType !== 1 ? 'text-red-800' : ''} flex items-center gap-2">
					<span>${item.Name || '-'}</span>
					<button class="copy-btn" data-copy="/_jumpto ${item.CharacterIdx}" title="Copy jump command">
						<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-500 hover:text-gray-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
							<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m2 4h-2a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2v-6a2 2 0 00-2-2z" />
						</svg>
					</button>
				</td>
				` : ''}

				<td class="p-3">${item.LEV || '-'}</td>
				<td class="p-3"><img src="/assets/img/icon/${style(item.Style).BattleStyle || '-'}.png" alt="eCoin" class="w-7 h-7"></td>
				<td class="p-3">${item.GuildName || '-'}</td>
				<td class="p-3">
					<div class="relative inline-block text-left">
						<button onclick="toggleDropdown(this)" class="inline-flex justify-center w-full px-3 py-1 bg-gray-700 hover:bg-gray-800 text-white text-sm rounded">
						Action ▼
						</button>
						<div class="dropdown-menu hidden absolute z-10 mt-1 w-36 bg-white divide-y divide-gray-200 rounded shadow-lg text-sm">
						<div class="py-1 text-black">
							${currentType === 'Online' ? `
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100" data-action="kick" data-id="${item.Name}">Kick</button>
							` : ''}
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100"
							data-action="${item.AuthType === 2 ? 'unban' : 'ban'}"
							data-id="${item.UserNum}" data-name="${item.Name}">
							${item.AuthType === 2 ? 'Unban' : 'Ban'}
							</button>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100"
							data-action="${item.AuthType === 3 ? 'TradeUnBlock' : 'TradeBlock'}"
							data-id="${item.UserNum}" data-name="${item.Name}">
							${item.AuthType === 3 ? 'TradeUnBlock' : 'TradeBlock'}
							</button>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100"
							data-action="${item.AuthType === 5 ? 'UnMute' : 'Mute'}"
							data-id="${item.UserNum}" data-name="${item.Name}">
							${item.AuthType === 5 ? 'UnMute' : 'Mute'}
							</button>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100"
							data-action="Inventory"
							data-id="${item.CharacterIdx}" data-name="${item.Name}">
							Inventory
							</button>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100"
							data-action="Warehouse"
							data-id="${item.CharacterIdx}" data-name="${item.Name}">
							Warehouse
							</button>
							<button class="w-full text-left px-4 py-2 hover:bg-gray-100"
							data-action="Equipment"
							data-id="${item.CharacterIdx}" data-name="${item.Name}">
							Equipment
							</button>
						</div>
						</div>
					</div>
				</td>

			</tr>
		`;
	}).join('');

	setTimeout(() => {
		const tbody = document.getElementById("playerTableBody");

		// Event tombol aksi
		tbody.querySelectorAll("button[data-action]").forEach(btn => {
			btn.addEventListener("click", async () => {
				const action = btn.getAttribute("data-action");
				const id = btn.getAttribute("data-id");
				const name = btn.getAttribute("data-name");

				if (action === "kick") {
					await kickPlayer(id);
				} else if (action === "ban") {
					await banPlayer(name, id);
				} else if (action === "unban") {
					await unbanPlayer(name, id);
				} else if (action === "TradeUnBlock") {
					await unbanPlayer(name, id);
				} else if (action === "TradeBlock") {
					await TradeBlock(name, id);
				} else if (action === "UnMute") {
					await unbanPlayer(name, id);
				} else if (action === "Mute") {
					await MuteBlock(name, id);
				} else if (action === "Inventory") {
					await Inventory(name, id, 'inventory');
				} else if (action === "Warehouse") {
					await Inventory(name, id, 'warehouse');
				} else if (action === "Equipment") {
					await Inventory(name, id, 'equipment');
				}
			});
		});

		// ✅ Event tombol salin — hanya 1 kali setup
		tbody.querySelectorAll(".copy-btn").forEach(btn => {
			btn.addEventListener("click", (e) => {
				e.stopPropagation(); // Jangan trigger event lainnya
				const textToCopy = btn.getAttribute("data-copy");
				navigator.clipboard.writeText(textToCopy).then(() => {
					console.log(`Copied: ${textToCopy}`);
					alert(`Copied: ${textToCopy}`);
				}).catch(err => {
					console.error("Copy failed", err);
				});
			});
		});
	}, 0);


}

window.toggleDropdown = function(button) {
  const dropdown = button.nextElementSibling;
  // Tutup semua dropdown lain
  document.querySelectorAll('.dropdown-menu').forEach(menu => {
    if (menu !== dropdown) menu.classList.add('hidden');
  });
  // Toggle dropdown ini
  dropdown.classList.toggle('hidden');
}

// Tutup dropdown kalau klik di luar
document.addEventListener('click', function(event) {
  const isDropdownButton = event.target.closest('[onclick="toggleDropdown(this)"]');
  if (!isDropdownButton) {
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
      menu.classList.add('hidden');
    });
  }
});

function renderPaginationControls() {
	const container = document.getElementById("paginationControls");
	container.innerHTML = '';

	const totalPages = Math.ceil(totalItems / itemsPerPage);
	if (totalPages === 0) return; // <-- Tambahkan ini

	const createButton = (text, page, disabled = false, active = false) => {
		const btn = document.createElement("button");
		btn.textContent = text;
		btn.className = `px-3 py-1 rounded mx-1 
			${active ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-500'} 
			${disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
		if (!disabled) {
			btn.addEventListener("click", () => {
				loadPlayerList(currentType, page);
			});
		}
		return btn;
	};

	container.appendChild(createButton("« First", 1, currentPage === 1));
	container.appendChild(createButton("‹ Prev", currentPage - 1, currentPage === 1));

	let startPage = Math.max(1, currentPage - 2);
	let endPage = Math.min(totalPages, currentPage + 2);

	if (currentPage <= 2) endPage = Math.min(5, totalPages);
	if (currentPage >= totalPages - 1) startPage = Math.max(1, totalPages - 4);

	for (let i = startPage; i <= endPage; i++) {
		container.appendChild(createButton(i, i, false, i === currentPage));
	}

	container.appendChild(createButton("Next ›", currentPage + 1, currentPage === totalPages));
	container.appendChild(createButton("Last »", totalPages, currentPage === totalPages));
}

async function kickPlayer(name) {
  if (!confirm(`Kick player ${name}?`)) return;
  try {
    if (socketWb && socketWb.readyState === WebSocket.OPEN) {
		const message = {
			type: 'kick_player',
			charName: name
		};

		const json = JSON.stringify(message);
		const encrypted = await encrypt(json, key);

		//console.log(encrypted)
		socketWb.send(encrypted);
		//console.log('send')

		await loadPlayerList(currentType, currentPage); // Refresh list
	} else {
		console.warn('WebSocket not connected. Message not sent.');
	}
    
  } catch (e) {
    alert('Failed to kick player.');
    console.error(e);
  }
  
}

async function banPlayer(name, UserNum) {
  if (!confirm(`Ban player ${name}?`)) return;
  try {
    const res = await fetchEncrypted(`/api_adm/playerList?action=ban&usernum=${UserNum}&type=2&token=${globalConfig.csrfToken}`);
    alert(res.message || 'Player banned.');

	await kickPlayer(name);
    //await loadPlayerList(currentType, currentPage);
  } catch (e) {
    alert('Failed to ban player.');
    console.error(e);
  }
}

async function TradeBlock(name, UserNum) {
  if (!confirm(`TradeBlock player ${name}?`)) return;
  try {
    const res = await fetchEncrypted(`/api_adm/playerList?action=ban&usernum=${UserNum}&type=3&token=${globalConfig.csrfToken}`);
    alert(res.message || 'Player TradeBlock.');
	await kickPlayer(name);
    //await loadPlayerList(currentType, currentPage);
  } catch (e) {
    alert('Failed to TradeBlock player.');
    console.error(e);
  }
}

async function MuteBlock(name, UserNum) {
  if (!confirm(`Mute player ${name}?`)) return;
  try {
    const res = await fetchEncrypted(`/api_adm/playerList?action=ban&usernum=${UserNum}&type=5&token=${globalConfig.csrfToken}`);
    alert(res.message || 'Player Mute.');
	await kickPlayer(name);
    //await loadPlayerList(currentType, currentPage);
  } catch (e) {
    alert('Failed to Mute player.');
    console.error(e);
  }
}

async function unbanPlayer(name, UserNum) {
  if(!isAdmin){
	alert('Only Administrator can use UnBanned');
	return;
  }

  if (!confirm(`Unban player ${name}?`)) return;
  try {
    const res = await fetchEncrypted(`/api_adm/playerList?action=unban&usernum=${UserNum}&token=${globalConfig.csrfToken}`);
    alert(res.message || 'Player unbanned.');
    await loadPlayerList(currentType, currentPage);
  } catch (e) {
    alert('Failed to unban player.');
    console.error(e);
  }
}

const modalOpen = ref(false);
const inventoryData = ref([]);
const inventoryName = ref('');
const inventoryTarget = ref('');
const TargetName = ref('');

// Tampilkan inventory
async function Inventory(name, id, target) {
  try {
    const json = await fetchEncrypted(`/api_adm/getInventory?action=${target}&CharacterIdx=${id}&type=5&token=${globalConfig.csrfToken}`);
    if (json.status === "success" && json.data && json.data.length > 0) {
      inventoryData.value = json.data;
      inventoryName.value = name;
	  TargetName.value = target;
	  if(target == 'inventory'){
		inventoryTarget.value = 'deleteInventoryItem';
	  }else if(target == 'warehouse'){
		inventoryTarget.value = 'deleteWarehouseItem';
	  }else if(target == 'equipment'){
		inventoryTarget.value = 'deleteEquipmentItem';
	  }
	  
      modalOpen.value = true;
    } else {
      alert("Inventory kosong atau error: " + json.message);
    }
  } catch (e) {
    console.error("Fetch atau parsing error:", e);
  }
}

function closeInventoryModal() {
  modalOpen.value = false;
}

// Fungsi hapus item berdasarkan slotPosition
async function deleteItem(CharacterIdx, slotPosition, target) {
  if (!confirm("Yakin ingin menghapus item ini?")) return;

  try {
    const response = await fetchEncrypted(`/api_adm/getInventory?action=${target}&slot=${slotPosition}&CharacterIdx=${CharacterIdx}&token=${globalConfig.csrfToken}`);
    if (response.status === "success") {
      // Hapus item dari array inventoryData agar UI update tanpa reload
      inventoryData.value = inventoryData.value.filter(item => item.slotPosition !== slotPosition);
      alert("Item berhasil dihapus.");
    } else {
      alert("Gagal menghapus item: " + (response.message || "unknown error"));
    }
  } catch (e) {
    console.error("Error hapus item:", e);
    alert("Error saat menghapus item.");
  }
}

const itemMap = ref({});

async function loadItemNames() {
  try {
    const response = await fetch('/items.json');
    const data = await response.json();
    const map = {};
    data.forEach(item => {
      map[item._id] = item._cont;
    });
    itemMap.value = map;
  } catch (error) {
    console.error('Gagal memuat item list:', error);
  }
}

function getItemName(itemID) {
  return itemMap.value[`item${itemID}`] || 'Unknown';
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

