<template>
<div class="space-y-8 bg-[#121212]/80 p-6 rounded-2xl shadow-2xl">
			<!-- Change Password -->
			<div>
				<h3 class="text-xl font-semibold mb-2">Change Password</h3>
				<div class="grid gap-4">
					<input type="password" id="currentPassword" maxlength="16" placeholder="Current Password" class="input-setting">
					<input type="password" id="newPassword" maxlength="16" placeholder="New Password" class="input-setting">
					<input type="password" id="confirmPassword" maxlength="16" placeholder="Confirm New Password" class="input-setting">

					<button class="btn-setting" onclick="savePassword()">Update Password</button>
				</div>
			</div>


			<!-- Toggle OTP -->
			<div>
				<h3 class="text-xl font-semibold mb-2 text-white">Two-Factor Authentication (OTP)</h3>
				<div class="flex items-center justify-between bg-black/20 px-4 py-3 rounded-lg">
					<div>
					<span class="text-white text-sm block">Enable One-Time Password (OTP) for login</span>
					<p class="text-xs text-gray-400 mt-1 max-w-md">
						If you enable this, then every time you log into the game you are required to enter the OTP code sent to your discord. and you will get Buff OTP in game
					</p>
					</div>
					<label class="inline-flex items-center cursor-pointer">
					<input type="checkbox" id="otpToggle" class="sr-only peer">
					<div class="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:bg-green-500 relative after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
					</label>
				</div>
			</div>

			<!-- Discord Connect Button -->
			<div class="mt-4 bg-black/20 px-4 py-3 rounded-lg flex items-center justify-between">
			<div>
				<span class="text-white text-sm block">Connect Your Discord Account</span>
				<p class="text-xs text-gray-400 mt-1 max-w-md">
				Connecting a Discord account allows for additional identity verification and direct community integration.
				</p>
			</div>
			<button id="discordConnectBtn" onclick="connectDiscord()" class="inline-block text-white bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-sm font-medium transition duration-200">
				Connect Discord
			</button>
			</div>


			</div>
</template>

<script setup>
import { ref, onBeforeUnmount, onMounted } from 'vue'
import { addInterval, clearAllIntervals } from '@/js/intervalManager.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { style, waitForServerInit, showConfirm } from '@/js/global.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { globalConfig, checkLogin, user } from '@/js/store';
import { showFeedback, hideFeedbackModal } from '@/js/global';


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

let discordConnect = false;
let discordUrl;

async function init() {

	const isLoggedIn = await checkLogin();
	if (!isLoggedIn) return;

	//await new Promise(resolve => setTimeout(resolve, 1000));
	await waitForServerInit();
  if (user.useotp == 1) {
	document.getElementById('otpToggle').checked = true;
	}

	// Cek status akun Discord
	try {
		const discordStatus = await fetchEncrypted(`/api/getDiscordStatus?action=check&token=${globalConfig.csrfToken}`);
		if (discordStatus.status === 'success') {
			const discordButton = document.getElementById('discordConnectBtn');
			if (discordButton) {
				discordButton.innerText = `Connected as ${discordStatus.data.UserName}`;
				discordButton.classList.remove('bg-indigo-600', 'hover:bg-indigo-700');
				discordButton.classList.add('bg-green-600', 'hover:bg-green-700');
				discordButton.onclick = removeDiscord; // Nonaktifkan klik

				if(discordStatus.data.IsVerified === 1){
					discordConnect = true;
				}
				
				discordUrl = discordStatus.message;
				
			}
		}else{
			discordUrl = discordStatus.message;
			console.log(discordUrl)
		}
	} catch (e) {
		
		discordConnect = false;
	}




  document.getElementById('otpToggle')?.addEventListener('change', async (e) => {
	if(discordConnect){
		const enabled = e.target.checked ? 1 : 0;
		const data = await fetchEncrypted(`/api/setUser?action=setotp&token=${globalConfig.csrfToken}&enable=${enabled}`);
		if (data.status === 'success') {
			showFeedback("success", `OTP ${enabled ? 'enabled' : 'disabled'} successfully`);
			return;
		}
	}else{
		document.getElementById('otpToggle').checked = false;
		showFeedback("success", `Need to connect to discord`);
		return;
	}
    
    
  });
}

window.savePassword = async function () {
	const current = document.getElementById('currentPassword').value.trim();
	const newPass = document.getElementById('newPassword').value.trim();
	const confirm = document.getElementById('confirmPassword').value.trim();

	if (!current || !newPass || !confirm) {
		showFeedback('Error', 'All fields are required.');
		return;
	}

	if (newPass !== confirm) {
		showFeedback('Error', 'New password and confirmation do not match.');
		return;
	}

  	const form = new FormData();
	form.append('current', current);
	form.append('newPass', newPass);

	const res = await fetchEncrypted(
		`/api/setUser?action=changepassword&token=${globalConfig.csrfToken}`,
		'POST',
		form
	);

	if (res.status === 'success') {
		showFeedback('Success', 'Password updated successfully.');
		document.getElementById('currentPassword').value = '';
		document.getElementById('newPassword').value = '';
		document.getElementById('confirmPassword').value = '';

		setTimeout(() => {
			window.location.href = 'api/logout'
		}, 3000);
		
	} else {
		showFeedback('Error', res.message || 'Failed to update password.');
	}
};

window.connectDiscord = function () {
	window.location.href = discordUrl; // Ganti sesuai endpoint kamu
};

window.removeDiscord = function () {
	showConfirm("Are you sure you want to disconnect your Discord account?", async function (confirmed) {
		if (!confirmed) return;

		try {
			const discordStatus = await fetchEncrypted(`/api/getDiscordStatus?action=disconnect&token=${globalConfig.csrfToken}`);
			if (discordStatus.status === 'success') {
				const discordButton = document.getElementById('discordConnectBtn');
				if (discordButton) {
					discordButton.innerText = `Connect Discord`;
					discordButton.classList.remove('bg-green-600', 'hover:bg-green-700');
					discordButton.classList.add('bg-indigo-600', 'hover:bg-indigo-700');
					discordButton.onclick = connectDiscord;

					discordConnect = false;
				}
			} else {
				showFeedback('error', discordStatus.message);
			}
		} catch (e) {
			console.log(e);
			showFeedback('error', 'Unexpected error occurred.');
		}
	});
};

</script>
