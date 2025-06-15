<template>
<main class="flex-grow">
	  
	  <section id="forgot" class="relative py-20 px-4 mt-40">
	  	  <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
		  <div class="relative z-10 text-center  max-w-2xl mx-auto">
		  <div class="bg-head-panel mb-4">
				<h2 class="text-head-panel text-4xl font-bold">
				🔑 Reset Password
				</h2>
			</div>
			<p class="text-gray-400 text-lg animate-fadeIn mb-10">
			Enter your Email and Request Code to continue.
			</p>
			
			  <div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
			  <div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

			<!-- Forgot Form -->
			<form id="forgotForm" class="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat">
				<!-- Email Field -->
				<div class="flex items-center space-x-4 mb-4">
				  <label for="email" class="text-sm font-medium text-gray-300 w-1/3 text-left">Email</label>
				  <input type="email" id="email" name="email" placeholder="Enter Email" maxlength="50" required class="w-2/3 bg-gray-900 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
				</div>
		  
				<!-- Captcha Field -->
				<div class="flex items-center space-x-4 mb-4">
				  <label for="captcha" class="text-sm font-medium text-gray-300 w-1/3 text-left">Code</label>
				  <div class="flex items-center w-2/3 bg-gray-900 text-white p-2 rounded-xl">
					<input type="text" id="code" name="code" placeholder="Enter code from email" maxlength="20" required class="w-full bg-gray-900 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600">
					<a id="reqBtn" class="w-24 h-10 bg-blue-500 text-center flex items-center justify-center rounded-xl cursor-pointer">Request</a>
					<span id="timer" class="ml-2 text-sm text-gray-300 hidden"></span>
				  </div>
				</div>

				<!--div id="data-sitekey" class="cf-turnstile" data-sitekey=""></div-->
				<div id="captcha-container"></div>
				
				<!-- Forgot Button -->
				<div>
					<button type="submit" id="forgotbutton" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
					Reset
					</button>
				</div>

				<!-- Links -->
				<div class="text-center text-gray-400">
					<a href="#" data-page="login" class="hover:text-blue-400">Back to login?</a>
				</div>
				<div class="text-center text-gray-400">
					Don't have an account yet? <a href="#" data-page="register" class="text-blue-400 hover:text-blue-500">Register Now</a>
				</div>
			</form>
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
import { globalConfig } from '@/js/store.js'
import { waitForServerInit } from '@/js/global';

const html_2 = `
<main class="flex-grow">
	  
	  <section id="newpassword" class="relative min-h-[1200px] py-20 px-4 mt-40">
	  	  <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
		  <div class="relative z-10 text-center max-w-2xl mx-auto">
		  	<div class="bg-head-panel mb-4">
				<h2 class="text-head-panel text-4xl font-bold">
				🔑 New Password
				</h2>
			</div>
			<p class="text-gray-400 text-lg animate-fadeIn mb-10">
			Enter your New Password.
			</p>
			
			  <div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
			  <div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

			<!-- New Password Form -->
			<form id="newpassForm" class="bg-gray-900 p-8 rounded-xl shadow-lg space-y-6 bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat">
				<!-- Password Field -->
				<div class="flex items-center space-x-4 mb-4">
				  <label for="password" class="text-sm font-medium text-gray-300 w-1/3 text-left">Password</label>
				  <input type="password" id="password" name="password" placeholder="Enter Password" maxlength="16" required class="w-2/3 bg-gray-900 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
				</div>
		  
				<!-- Re-Password Field -->
				<div class="flex items-center space-x-4 mb-4">
				  <label for="re-password" class="text-sm font-medium text-gray-300 w-1/3 text-left">Re-Password</label>
				  <input type="password" id="re-password" name="re-password" placeholder="Confirm Password" maxlength="16" required class="w-2/3 bg-gray-900 text-white px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-600 transition">
				</div>

				<!--div id="data-sitekey" class="cf-turnstile" data-sitekey=""></div-->
				<div id="captcha-container"></div>
				
				<!-- New Password Button -->
				<div>
					<button type="submit" id="newpassbutton" class="w-full bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition">
					Submit
					</button>
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
`;

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

	const expireTime = sessionStorage.getItem("codeExpireTime");
	if (expireTime && Date.now() < expireTime) {
		const secondsLeft = Math.floor((expireTime - Date.now()) / 1000);
		startCountdown(secondsLeft);
		document.getElementById("email").readOnly = true;
		document.getElementById("reqBtn").setAttribute("disabled", true);
	}

	document.getElementById('forgotForm').addEventListener('submit', async function (e) {
		e.preventDefault(); // Cegah submit default
		const form = e.target;
		const formData = new FormData(form); // langsung ambil semua input

		const email = formData.get('email');
		const code = formData.get('code');

		const successDiv = document.getElementById('successMessage');
		const errorDiv = document.getElementById('errorMessage');

		const forgotbutton = document.getElementById('forgotbutton');

		forgotbutton.textContent = 'Loading...';
		forgotbutton.classList.add('opacity-50', 'pointer-events-none');
		forgotbutton.setAttribute("disabled", true);
		
		formData.append('action', 'forgot'); // jika perlu tambahan manual
		formData.append('token', globalConfig.csrfToken);

		
		const data = await fetchEncrypted('/api/auth', 'POST', formData);
		if (data.status === 'success') {
			successDiv.textContent = data.message;
			successDiv.classList.remove('hidden');
			clearAllIntervals();
			setTimeout(() => {
				initChangePass(email, code);
			}, 1000);

		} else {
			errorDiv.textContent = data.message;
			errorDiv.classList.remove('hidden');
			setTimeout(() => {
				errorDiv.classList.add('hidden');

				forgotbutton.textContent = 'Reset';
				forgotbutton.classList.remove('opacity-50', 'pointer-events-none');
				forgotbutton.removeAttribute("disabled");
			}, 2000);
		}
	});

	document.getElementById('reqBtn').addEventListener('click', function (e) {
		e.preventDefault(); // Cegah submit default

		reqCode();

	});
	
}

async function initChangePass(email, code) {
	document.getElementById('app').innerHTML = "";
	document.getElementById('app').innerHTML = html_2;

	console.log(email)
	requestAnimationFrame(() => {
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

		document.getElementById('newpassForm').addEventListener('submit', async function (e) {
			e.preventDefault(); // Cegah submit default
			const form = e.target;
			const formData = new FormData(form); // langsung ambil semua input

			const successDiv = document.getElementById('successMessage');
			const errorDiv = document.getElementById('errorMessage');
	
			const newpassbutton = document.getElementById('newpassbutton');
	
			newpassbutton.textContent = 'Loading...';
			newpassbutton.classList.add('opacity-50', 'pointer-events-none');
			newpassbutton.setAttribute("disabled", true);
			
			formData.append('action', 'newpass'); // jika perlu tambahan manual
			formData.append('token', globalConfig.csrfToken);
			formData.append('email', email);
			formData.append('code', code);

			
			const data = await fetchEncrypted('/api/auth', 'POST', formData);
			if (data.status === 'success') {
				successDiv.textContent = data.message;
				successDiv.classList.remove('hidden');

				setTimeout(() => {
					//window.location.href = "/login";
					goTo('login');
				}, 2000);

			} else {
				errorDiv.textContent = data.message;
				errorDiv.classList.remove('hidden');
				setTimeout(() => {
					errorDiv.classList.add('hidden');

					newpassbutton.textContent = 'Submit';
					newpassbutton.classList.remove('opacity-50', 'pointer-events-none');
					newpassbutton.removeAttribute("disabled");
				}, 2000);
			}
		});

	});
	
  }

  function startCountdown(seconds) {
	const timer = document.getElementById("timer");
	timer.classList.remove('hidden');
	const emailCode = sessionStorage.getItem("emailCode");
	addInterval(() => {
		if (seconds <= 0) {
			clearAllIntervals();
			sessionStorage.removeItem("codeExpireTime");
			document.getElementById("email").readOnly = false;
			document.getElementById("reqBtn").removeAttribute("disabled");
			timer.classList.add('hidden');
		} else {
			document.getElementById("email").value = emailCode;
			document.getElementById("email").readOnly = true;
			document.getElementById("reqBtn").setAttribute("disabled", true);
			timer.textContent = `wait ${seconds--} sec...`;
		}
	}, 1000);
}

async function reqCode() {
	const emailValue = document.getElementById("email").value;
	const successDiv = document.getElementById('successMessage');
	const errorDiv = document.getElementById('errorMessage');
	const reqBtn = document.getElementById('reqBtn');
	const timer = document.getElementById('timer');

	successDiv.classList.add('hidden');
	errorDiv.classList.add('hidden');

	if (emailValue === '') {
		errorDiv.textContent = 'Please Input Email !!';
		errorDiv.classList.remove('hidden');
		return;
	}

	reqBtn.textContent = 'Loading...';
	reqBtn.classList.add('opacity-50', 'pointer-events-none');

	const data = await fetchEncrypted('/api/mail?action=forgot&email=' + emailValue + "&token=" + globalConfig.csrfToken);
	if (data.status === 'success') {
		successDiv.textContent = data.message;
		successDiv.classList.remove('hidden');

		reqBtn.textContent = 'req';

		sessionStorage.setItem("codeExpireTime", Date.now() + 180000);
		sessionStorage.setItem("emailCode", emailValue);
		startCountdown(180);
		document.getElementById("email").readOnly = true;
		document.getElementById("reqBtn").setAttribute("disabled", true);


	} else {
		errorDiv.textContent = data.message;
		errorDiv.classList.remove('hidden');
		reqBtn.textContent = 'req';
		reqBtn.classList.remove('opacity-50', 'pointer-events-none');
	}
}
</script>
