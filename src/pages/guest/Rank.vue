<template>
<main class="flex-grow">
		<section id="ranking" class="relative min-h-[1200px] py-20 px-4 text-white mt-40">
			<div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
			<div class="relative z-10 max-w-4xl mx-auto text-center">
			
				<p class="text-gray-400 text-lg animate-fadeIn mb-10">
				Check out the rankings of the best players and guilds in the world 
				</p>
				
			  <!-- Tab Menu -->
			<div class="flex justify-center gap-4 mb-8 border-b border-gray-600">
			<div
				class="tab-button px-4 py-2 text-sm font-medium cursor-pointer border-b-2 transition-all duration-200"
				data-title="👤 Top Player"
				data-tab="player"
			>
				<span>👤</span>
				<span class="hidden md:inline">Top Player</span>
			</div>
			<div
				class="tab-button px-4 py-2 text-sm font-medium cursor-pointer border-b-2 transition-all duration-200 border-transparent text-gray-300 hover:text-white hover:border-blue-300"
				data-title="🏰 Top Guild"
				data-tab="guild"
			>
				<span>🏰</span>
				<span class="hidden md:inline">Top Guild</span>
			</div>
			<div
				class="tab-button px-4 py-2 text-sm font-medium cursor-pointer border-b-2 transition-all duration-200 border-transparent text-gray-300 hover:text-white hover:border-blue-300"
				data-title="🕹️ Top Discord ACT"
				data-tab="discordact"
			>
				<span>🕹️</span>
				<span class="hidden md:inline">Top Discord ACT</span>
			</div>
			</div>

		  
			  <!-- Tab Content Wrapper -->
			  <div
				id="content"
				class="tab-content relative p-6 bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl shadow-md max-w-4xl mx-auto transition-all duration-300"
				>
				<h3 class="text-2xl font-semibold mb-4" id="tableTitle" >-</h3>
				<div class="overflow-x-auto">
				<table class="min-w-full text-xs text-left table-auto">
					<thead id="playerTableHead" class="bg-gray-900/60 text-blue-300">
					<!-- Diisi JS -->
					</thead>
					<tbody id="playerTableBody" class="text-white/90 divide-y divide-gray-700">
					<!-- Diisi JS -->
					</tbody>
				</table>
				</div>



				<div class="mt-4 flex justify-center space-x-2" id="paginationControls"></div>	
			  </div>

			</div>

			<div class="absolute inset-0 flex justify-center items-end pointer-events-none smog z-0 overflow-x-hidden">
				<i class="num1"></i>
				<i class="num2"></i>
				<i class="num3"></i>
			</div>
		  </section>
		  
    </main>

</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { style, waitForServerInit } from '@/js/global.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig } from '@/js/store';



onMounted(() => {
  init()
})

onBeforeUnmount(() => {
  clearAllIntervals()
});

let itemsPerPage = 10;
let currentPage = 1;
let currentData = []; // simpan hasil dari fetchEncrypted
let currentType = 'player'; // untuk simpan tab aktif
let totalItems = 0;
let currentReward = [];

async function init() {
	const tabButtons = document.querySelectorAll('.tab-button');

	
	tabButtons.forEach(button => {
		button.addEventListener('click', async () => {
			const target = button.dataset.tab;
			const targetTitle = button.dataset.title;

			if (currentType === target) {
				return;
			}

			tabButtons.forEach(btn => {
				btn.classList.remove('active');
				btn.classList.add('border-transparent', 'text-gray-300', 'hover:text-white', 'hover:border-blue-300');
			});

			await updateContent(target, targetTitle);

			// Aktifkan tab yang dipilih
			button.classList.add('active');
			button.classList.remove('border-transparent', 'text-gray-300', 'hover:text-white', 'hover:border-blue-300');

		});
	});


	
	//await new Promise(resolve => setTimeout(resolve, 1000));
	await waitForServerInit();
	updateContent('player', '👤 Top Player');
	
  }

  async function updateContent(action, title, page = 1) {
	
	const tableHead = document.getElementById('playerTableHead');
	const tableBody = document.getElementById('playerTableBody');
	currentPage = page;

	try {
		const data = await fetchEncrypted(`/api/getRank?action=${action}&page=${page}&limit=${itemsPerPage}&token=${globalConfig.csrfToken}`);
		const result = Array.isArray(data.data.data) ? data.data.data : [data.data.data];
		currentData = result;
		totalItems = data.data.total;
		currentReward = data.data.reward;

		document.getElementById('tableTitle').textContent = title;

		if (action === 'player') {
			tableHead.innerHTML = `
				<tr>
					<th class="p-3">#</th>
					<th class="p-3">Name</th>
					<th class="p-3">Level</th>
					<th class="p-3">Class</th>
					<th class="p-3">Power</th>
					<th class="p-3">Kill (War)</th>
					<th class="p-3">Guild</th>
				</tr>
			`;
		} else if (action === 'guild') {
			tableHead.innerHTML = `
				<tr>
					<th class="p-3">#</th>
					<th class="p-3">Name</th>
					<th class="p-3">Level</th>
					<th class="p-3">Member</th>
					<th class="p-3">Guild Master</th>
					<th class="p-3">Point</th>
					<th class="p-3">Created</th>
				</tr>
			`;
		} else if (action === 'discordact') {
			tableHead.innerHTML = `
				<tr>
					<th class="p-3">#</th>
					<th class="p-3">Name</th>
					<th class="p-3">Level</th>
					<th class="p-3">Class</th>
					<th class="p-3">Guild</th>
					<th class="p-3">Discord Play ACT</th>
					<th class="p-3">Reward</th>
				</tr>
			`;
		}

		currentType = action;
		
		renderTablePage(action, currentPage);
		renderPaginationControls();
	} catch (e) {
		console.error('Failed to fetch data:', e);
	} finally {
		
	}
}



function renderTablePage(type, page) {
  const start = (page - 1) * itemsPerPage;
  const tbody = document.getElementById("playerTableBody");
  let rewards = [];
  if (type === 'discordact'){
	rewards = JSON.parse(currentReward[0].Reward);
	//const NextDistribute = JSON.parse(currentReward[0].NextDistribute);
	//console.log(currentReward[0].NextDistribute)
  }
  

  tbody.innerHTML = currentData.map((item, index) => {
    const rank = start + index + 1;
    let specialClass = '';
    let rankDisplay = rank;

    // Beri class spesial dan ganti tampilannya untuk peringkat 1, 2, 3
    if (rank === 1) {
      specialClass = 'rank-1 font-bold text-orange-400';
      rankDisplay = '🥇';
    } else if (rank === 2) {
      specialClass = 'rank-2 font-semibold text-purple-400';
      rankDisplay = '🥈';
    } else if (rank === 3) {
      specialClass = 'rank-3 font-semibold text-red-700';
      rankDisplay = '🥉';
    }

    if (type === 'player') {
      return `
        <tr class="hover:bg-white/10 transition-colors ${specialClass}">
          <td class="p-3">${rankDisplay}</td>
          <td class="p-3">${item.Name || '-'}</td>
          <td class="p-3">
			${
				typeof item.LEV === 'number' && item.LEV >= 200 &&
				typeof item.Level === 'number' && item.Level !== 100
				? `Olv. ${item.Level}`
				: (typeof item.LEV === 'number' ? `${item.LEV}`: '-')
			}
		  </td>
          <td class="p-3"><img src="/assets/img/icon/${style(item.Style).BattleStyle || '-'}.png" alt="eCoin" class="w-7 h-7"></td>
		  <td class="p-3">${shortNumber((Number(item.AttackPoint) || 0) + (Number(item.DefencePoint) || 0))}</td>
		  <td class="p-3">${item.KillCount || 0}</td>
          <td class="p-3">${item.GuildName || '-'}</td>
        </tr>
      `;
    } else if (type === 'guild') {
      return `
        <tr class="hover:bg-white/10 transition-colors ${specialClass}">
          <td class="p-3">${rankDisplay}</td>
          <td class="p-3">${item.GuildName || '-'}</td>
		  <td class="p-3">${item.Level || '-'}</td>
          <td class="p-3">${item.MemberCount || '-'}</td>
		  <td class="p-3"><img src="/assets/img/icon/${style(item.Style).BattleStyle || '-'}.png" class="w-5 h-5 inline align-middle ml-1"> ${item.GuildMasterName || '-'}</td>
          <td class="p-3">${shortNumber(Number(item.Point)) || '-'}</td>
		  <td class="p-3">${formatDateTime(item.RegDate) || '-'}</td>
        </tr>
      `;
    } else if (type === 'discordact') {
		const rewardByRank = rewards.find(r => r.rank === rank);
		
		let rewardLabel = '<i class="text-red-400">Min have 24 hours for rewards</i>';

		if(item.DiscordAct > 1440){

			rewardLabel = 'PlatinumBuff (Master)(7d)';

			if (rewardByRank && typeof rewardByRank.PlatinumBuffGrade === 'number') {
			let fg = '';
			if(rewardByRank.itemopt > 0){
				fg = `+ FG (${rewardByRank.itemopt})`;;
			}
			switch (rewardByRank.PlatinumBuffGrade) {
				case 6:
				rewardLabel = `PlatinumBuff (Legend)(${rewardByRank.ExpiredDate}d) ${fg}`;
				break;
				case 5:
				rewardLabel = `PlatinumBuff (Epic)(${rewardByRank.ExpiredDate}d) ${fg}`;
				break;
				case 4:
				rewardLabel = `PlatinumBuff (Master)(${rewardByRank.ExpiredDate}d) ${fg}`;
				break;
				default:
				rewardLabel = `Grade ${rewardByRank.PlatinumBuffGrade}`;
			}
		}
		}
		

		return `
			<tr class="hover:bg-white/10 transition-colors ${specialClass}">
			<td class="p-3">${rankDisplay}</td>
			<td class="p-3">${item.Name || '-'}</td>
			<td class="p-3">${item.LEV || '-'}</td>
			<td class="p-3"><img src="/assets/img/icon/${style(item.Style).BattleStyle || '-'}.png" alt="eCoin" class="w-7 h-7"></td>
			<td class="p-3">${item.GuildName || '-'}</td>
			<td class="p-3">${formatMinutes(item.DiscordAct)}</td>
			<td class="p-3">${rewardLabel}</td>
			</tr>
		`;
	}
    return '';
  }).join('');
}

function shortNumber(num) {
  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'b';
  if (num >= 1_000_000)     return (num / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'm';
  if (num >= 1_000)         return (num / 1_000).toFixed(1).replace(/\.0$/, '') + 'k';
  return num.toString();
}

function formatDateTime(regDateStr) {
  if (!regDateStr || regDateStr.length !== 14) return '-';

  const year = regDateStr.slice(0, 4);
  const month = regDateStr.slice(4, 6);
  const day = regDateStr.slice(6, 8);
  const hour = regDateStr.slice(8, 10);
  const minute = regDateStr.slice(10, 12);
  const second = regDateStr.slice(12, 14);

  return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}


function formatMinutes(minutes) {
  minutes = parseInt(minutes) || 0;
  const days = Math.floor(minutes / 1440);
  const hours = Math.floor((minutes % 1440) / 60);
  const mins = minutes % 60;

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${mins}m`;
  return `${mins}m`;
}



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
				updateContent(currentType, document.querySelector(`.tab-button[data-tab="${currentType}"]`).dataset.title, page);
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

</script>
<style scoped>
.rank-1 {
  background: linear-gradient(90deg, #FFD700, #FFEA85);
  box-shadow: 0 0 10px #FFD700;
}

.rank-2 {
  background: linear-gradient(90deg, #C0C0C0, #E0E0E0);
}

.rank-3 {
  background: linear-gradient(90deg, #CD7F32, #D2A679);
}

</style>
