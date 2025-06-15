<template>
 <!-- Vote List -->
          <div class="space-y-8 bg-[#121212]/80 p-6 rounded-2xl shadow-2xl">
			<p class="text-center text-gray-300 mb-8">Please complete the vote so that you can help our server continue to grow.</p>
            <div id="vote"></div>
          </div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { style, waitForServerInit } from '@/js/global.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig, checkLogin, user } from '@/js/store';
import { showFeedback, hideFeedbackModal } from '@/js/global';
import { DateTime } from 'luxon';

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
	
	//await new Promise(resolve => setTimeout(resolve, 1000));
	await waitForServerInit();
  const data = await fetchEncrypted('/api/getVote?action=list&token=' + globalConfig.csrfToken);
  if (data.status !== 'success') {
    document.getElementById('vote').innerHTML = `<div class="text-center mt-40 text-red-500 font-semibold">${data.message}</div>`;
    return;
  }

  const { list, userVote } = data.data;

  let content = `<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">`;

  list.forEach((vote, index) => {
    // Cari apakah user sudah vote untuk VoteId ini
    const voteStatus = userVote.find(v => v.VoteId === vote.VoteId);
    const hasVoted = !!voteStatus;

    content += `
	<div class="flex flex-col items-center bg-white/10 rounded-2xl shadow hover:shadow-lg transition hover:scale-105 duration-200 p-6">
		<h3 class="text-xl font-semibold text-white mb-1">${vote.Name}</h3>
		<p class="text-blue-300 text-sm mb-2">${vote.ECoins} eCoins</p>
		<span class="text-md font-semibold text-gray-400" id="status-${index}">
		${hasVoted ? 'Loading...' : '✅ You can vote now!'}
		</span>
		<!-- Tombol vote, hanya tampil jika belum vote -->
		<button id="vote-btn-${index}" onclick="gotoVote(${vote.VoteId})" class="mt-3 px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Vote Now</button>
	</div>
	`;



    // Jalankan countdown jika user sudah vote
    if (hasVoted) {
      	setTimeout(() => {
			showCountdown(voteStatus, index, globalConfig.serverzone); // Sesuaikan zona waktu dengan kebutuhan
		}, 0);
    }
  });

  content += `</div>`;
  document.getElementById('vote').innerHTML = content;

  window.gotoVote = async function(voteId) {
    let button = document.querySelector(`[onclick="gotoVote(${voteId})"]`);
	const selectedvote = list.find(v => v.VoteId === voteId);

	let param = '';
	if(voteId == 1){
		param = "&postback=" + user.UserNum;
	}else if(voteId == 2){
		param = "&pingUsername=" + user.UserNum;
	}

    try {
      // Optional: Disable button selama proses vote
      if (button) {
        button.disabled = true;
        button.textContent = 'Voting...';
      }
	  
      const res = await fetchEncrypted('/api/getVote?action=vote&token=' + globalConfig.csrfToken + '&voteId=' + voteId);

      if (res.status === 'success') {
		window.open(selectedvote.Url + param, '_blank');
        //showFeedback('Success', 'Thank you for voting!');
        await init(); // refresh UI agar muncul countdown
      } else {
        showFeedback('Error', res.message);
      }
    } catch (err) {
      console.error(err);
      showFeedback('Error', 'An unexpected error occurred while voting.');
    } finally {
      if (button) {
        button.disabled = false;
        button.textContent = 'Vote Now';
      }
    }
  };
}

function showCountdown(voteStatus, index, timezone) {
    if (!voteStatus || !voteStatus.VotedAt || !voteStatus.VotedAt.date) {
        console.error("Invalid voteStatus or missing date:", voteStatus);
        return;
    }

    const voteDate = DateTime.fromSQL(voteStatus.VotedAt.date, { zone: timezone });
    const now = DateTime.now().setZone(timezone);
    const diff = voteDate.diff(now, ['hours', 'minutes', 'seconds']).toObject();
	//console.log(now)
    const el = document.getElementById(`status-${index}`);
    const buttonEl = document.getElementById(`vote-btn-${index}`); // Tombol vote

    if (!el) return;

    // Jika waktu sudah habis (user bisa vote)
    if (diff.hours <= 0 && diff.minutes <= 0 && diff.seconds <= 0) {
        el.innerHTML = `✅ You can vote now!`;

        // Pastikan tombol "Vote Now" muncul setelah teks
        if (buttonEl) {
            buttonEl.style.display = 'inline-block'; // Tampilkan tombol
        }
    } else {
        // Menampilkan countdown
        const hours = Math.floor(diff.hours);
        const minutes = Math.floor(diff.minutes);
        const seconds = Math.floor(diff.seconds);
        el.textContent = `⏳ Next vote in ${hours}h ${minutes}m ${seconds}s`;

        // Update setiap detik
        setTimeout(() => showCountdown(voteStatus, index, timezone), 1000);

        // Sembunyikan tombol vote selama countdown
        if (buttonEl) {
            buttonEl.style.display = 'none';
        }
    }
}

</script>
