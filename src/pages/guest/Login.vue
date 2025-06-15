<template>
<main class="flex-grow">
      
	  <section id="login" class="relative min-h-[1200px] py-20 px-4 mt-40">
	  	  <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
		  <div class="relative z-10 max-w-md mx-auto text-center">
		  	<div class="bg-head-panel mb-4">
				<h2 class="text-head-panel text-4xl font-bold">
				🔑 Login
				</h2>
			</div>
			<p class="text-gray-400 text-lg animate-fadeIn mb-10">
			Enter your account information to continue.
			</p>
			
			  <div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
			  <div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

			<!-- Login Form -->
			<form id="loginForm" class="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat">
				<!-- Username Field -->
				<div class="flex items-center space-x-4 mb-4">
					<label for="username" class="text-sm font-medium text-gray-300 w-1/3 text-left">Username</label>
					<input type="text" id="username" name="user" placeholder="Enter Username" maxlength="16" required class="w-2/3 bg-gray-900 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
				</div>

				<!-- Password Field -->
				<div class="flex items-center space-x-4 mb-4">
					<label for="password" class="text-sm font-medium text-gray-300 w-1/3 text-left">Password</label>
					<input type="password" id="password" name="password" placeholder="Enter Password" maxlength="16" required class="w-2/3 bg-gray-900 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
				</div>

				<!--div id="data-sitekey" class="cf-turnstile" data-sitekey=""></div-->
				<div id="captcha-container"></div>
				
				<!-- Login Button -->
				<div>
					<button type="submit" id="loginbutton" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
					Login
					</button>
				</div>

				<!-- Links -->
				<div class="text-center text-gray-400">
					<a href="#" @click="goTo('forgot')" class="hover:text-blue-400">Forgot the password?</a>
				</div>
				<div class="text-center text-gray-400">
					Don't have an account yet? <a href="#" @click="goTo('register')" class="text-blue-400 hover:text-blue-500">Register Now</a>
				</div>
			</form>
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
import { style } from '@/js/global.js';
import { socketWb } from '@/js/socket.js';
import { useRouter } from 'vue-router';
import { user, globalConfig, isLoggedIn, isAdmin, isGm } from '@/js/store.js'
import { waitForServerInit } from '@/js/global';

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

	//await new Promise(resolve => setTimeout(resolve, 1000));
	await waitForServerInit();
	const sitekey = globalConfig.cloudapi; // misalnya window.cloudapi = '0x4AAAA...';

	// Pastikan Turnstile sudah siap
	if (window.turnstile) {
	window.turnstile.render('#captcha-container', {
		sitekey: sitekey,
		theme: 'dark', // atau 'dark'
	});
	} else {
		console.error('Turnstile belum tersedia.');
	}

	document.getElementById('loginForm').addEventListener('submit', async function (e) {
		e.preventDefault(); // Cegah submit default
		const form = e.target;
		const formData = new FormData(form); // langsung ambil semua input

		const successDiv = document.getElementById('successMessage');
		const errorDiv = document.getElementById('errorMessage');

		const loginbutton = document.getElementById('loginbutton');

		loginbutton.textContent = 'Loading...';
		loginbutton.classList.add('opacity-50', 'pointer-events-none');
		loginbutton.setAttribute("disabled", true);
		
		formData.append('action', 'login'); // jika perlu tambahan manual
		formData.append('token', globalConfig.csrfToken);

		
		const data = await fetchEncrypted('/api/auth', 'POST', formData);
		if (data.status === 'success') {
			//successDiv.textContent = data.message;
			//successDiv.classList.remove('hidden');
			
			isLoggedIn.value = true;

			user.UserID = data.data.ID;
			user.Email = data.data.Email;
			user.cash = data.data.CashTotal;
			user.forcegem = data.data.ForcegemHave;
			user.authtype = data.data.AuthType;
			user.Avatar = data.data.Avatar;
			user.createDate = data.data.createDate;
			user.LoginTime = data.data.LoginTime;
			user.Position = data.data.Position;
			user.UserNum = data.data.UserNum;
			user.useotp = data.data.useotp;

			// Simpan ke localStorage
			localStorage.setItem('isLoggedIn', 'true');
			localStorage.setItem('user', JSON.stringify({
				ID: data.data.ID,
				Email: data.data.Email,
				CashTotal: data.data.CashTotal,
				ForcegemHave: data.data.ForcegemHave,
				AuthType: data.data.AuthType,
				Avatar: data.data.Avatar,
				createDate: data.data.createDate,
				LoginTime: data.data.LoginTime,
				Position: data.data.Position,
				UserNum: data.data.UserNum,
				useotp: data.data.useotp
			}));

			if(data.data.Position == 1){
				isAdmin.value = true;
			}else if(data.data.Position == 2){
				isGm.value = true;
			}

			goTo('user/home');

			// setTimeout(() => {
			// 	//window.location.href = "/user/home";
			// 	goTo('user/home');
			// }, 2000);

		} else {
			errorDiv.textContent = data.message;
			errorDiv.classList.remove('hidden');
			setTimeout(() => {
				errorDiv.classList.add('hidden');

				loginbutton.textContent = 'Login';
				loginbutton.classList.remove('opacity-50', 'pointer-events-none');
				loginbutton.removeAttribute("disabled");
			}, 2000);
		}
	});

}

</script>
