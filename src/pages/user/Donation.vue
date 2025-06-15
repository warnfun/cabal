<template>
<!-- donation List -->
		  <div class="space-y-8 bg-[#121212]/80 p-6 rounded-2xl shadow-2xl">
			<div id="donation">
			 
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
import { globalConfig, checkLogin, user, isAdmin } from '@/js/store';
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

let selectedPackage = null;
let selectedPayment = null;

async function init() {

	const isLoggedIn = await checkLogin();
	if (!isLoggedIn) return;

	//await new Promise(resolve => setTimeout(resolve, 1000));
	await waitForServerInit();
	
	const data = await fetchEncrypted('/api/getDonation?action=list&token=' + globalConfig.csrfToken);
	if (data.status !== 'success') {
		document.getElementById('app').innerHTML = `<div class="text-center mt-40 text-red-500 font-semibold">${data.message}</div>`;
		return;
	}

	const { list, payment } = data.data;
	

	const renderStep = async (step = 1) => {
		let content = '';
		const progress = `
		<div class="flex justify-center space-x-4 mb-8">
			<div class="step ${step >= 1 ? 'text-blue-600' : 'text-gray-400'}">1. Step 1</div>
			<div class="step ${step >= 2 ? 'text-blue-600' : 'text-gray-400'}">2. Step 2</div>
			<div class="step ${step >= 3 ? 'text-blue-600' : 'text-gray-400'}">3. Step 3</div>
			<div class="step ${step >= 4 ? 'text-blue-600' : 'text-gray-400'}">4. Step 4</div>
		</div>`;

		if (step === 1) {
			const cards = list.map((item, idx) => `
				<div onclick="window.goToPaymentStep(${idx})" class="bg-white/10 backdrop-blur-md shadow-lg rounded-2xl p-6 flex flex-col items-center text-center border border-white/20 transition hover:scale-105 duration-200">
					<img src="/assets/img/coin.png" alt="Game Icon" class="w-16 h-16 mb-4">
					<h3 class="text-xl font-semibold text-white mb-1">${item.Name}</h3>
					<p class="text-blue-300 text-sm mb-2">${item.ECoins} eCoins</p>
					<p class="text-lg font-bold text-green-400 mb-4">$${item.Price}</p>
				</div>
			`).join('');

			content = `
				${progress}
				<h2 class="text-3xl font-bold text-center text-white mb-6">Choose Your eCoins Package</h2>
				<p class="text-center text-gray-300 mb-8">Select the best package that fits your game needs.</p>
				<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">${cards}</div>
			`;
		}
		else if (step === 2 && selectedPackage) {
			const isIndonesian = window.userCountry?.toLowerCase() === 'indonesia';

			let paymentButtons = `
				<button onclick="window.selectPaymentMethod('paypal')" class="flex flex-col items-center bg-white/10 rounded-2xl shadow hover:shadow-lg transition hover:scale-105 duration-200 p-6">
					<img src="/assets/img/paypal.svg" class="w-12 mb-3" alt="PayPal">
					<span class="text-lg font-semibold text-gray-400">PayPal</span>
				</button>
			`;

			if (isIndonesian) {
				paymentButtons += `
					<button onclick="window.selectPaymentMethod('bank')" class="flex flex-col items-center bg-white/10 rounded-2xl shadow hover:shadow-lg transition hover:scale-105 duration-200 p-6">
						<img src="/assets/img/dana.svg" class="w-12 mb-3" alt="Bank Transfer">
						<span class="text-lg font-semibold text-gray-400">Bank Transfer / Dana</span>
					</button>
				`;
			}

			paymentButtons += `
				<button onclick="window.selectPaymentMethod('cripto')" class="flex flex-col items-center bg-white/10 rounded-2xl shadow hover:shadow-lg transition hover:scale-105 duration-200 p-6">
					<img src="/assets/img/btc.png" class="w-12 mb-3" alt="Crypto">
					<span class="text-lg font-semibold text-gray-400">Crypto</span>
				</button>
			`;

			content = `
				${progress}
				<h2 class="text-2xl font-bold mb-6 text-center">Select Payment Method</h2>
				<div class="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
					${paymentButtons}
				</div>
				<div class="text-center">
					<button onclick="renderStep(1)" class="text-sm text-gray-500 hover:underline">← Back</button>
				</div>
			`;
		}
		else if (step === 3 && selectedPayment) {

			let text = ``;
			let phone = ``;
			let bankSelect = ``;
			let selectPrice = `$${selectedPackage.Price}`;
			let button = `<button onclick="renderStep(4)" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400">Proceed</button>`;
			if (selectedPayment === 'paypal') {
				if (window.userCountry == 'Indonesia' && !isAdmin.value) {
					showFeedback(
						"Unavailable",
						"Tidak tersedia untuk indonesia."
					);
					return;
				}

				const data = await fetchEncrypted('/api/getDonation?action=userPaypal&token=' + globalConfig.csrfToken);
				if (data.status !== 'success') {
					text += `<p class="mb-4">Register payment information. You need verification Email Paypal, if not same, will reject</p>`;
					phone +=`
						<div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
			  			<div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

						<input type="text" id="name" placeholder="Input your paypal Name" class="w-full p-2 border rounded mb-4" />
						<input type="email" id="email" placeholder="Input your paypal email" class="w-full p-2 border rounded mb-4" />
						<input type="text" id="code" placeholder="Input code from ReqCode" class="w-full p-2 border rounded mb-4" />
					`;
					bankSelect += `
						<button onclick="reqCode()" id="reqBtn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400">ReqCode</button>
						<button onclick="savePaypal()" id="saveBtn" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400">Save</button>
					`;

					button = ``;
					
				}else{
					console.log(data.data.Name)
					text += `<p class="mb-4">Make sure this payment information same with your paypal account, if not same, will reject</p>`;
					phone +=`

						<div id="successMessage" class="hidden bg-green-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>
			  			<div id="errorMessage" class="hidden bg-red-600 text-white text-sm px-4 py-3 rounded-xl mb-4 text-left"></div>

						<input type="text" id="name" value="${data.data.Name}" class="w-full p-2 border rounded mb-4" readOnly/>
						<input type="email" id="email" value="${data.data.Email}" class="w-full p-2 border rounded mb-4" readOnly/>
					`;
					bankSelect += `
						<button onclick="removePaypal()" id="removeBtn" class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-400">Remove</button>
					`;

				}

				
			}else if (selectedPayment === 'bank') {
				if (window.userCountry !== 'Indonesia') {
					showFeedback(
						"Unavailable",
						"Bank transfer is only available for users from Indonesia."
					);
					return;
				}

				const priceUSD = parseFloat(selectedPackage.Price).toFixed(2); // misalnya 4.50
				selectPrice = `Rp. ${parseFloat(priceUSD) * 15000}`;

				phone +=`<input type="text" id="phone" placeholder="Masukkan Nomor Telepon" class="w-full p-2 border rounded mb-4" />`;
				bankSelect += `
					<select id="selectedBank" class="bg-white/10 w-full p-2 border rounded mb-4">
						<option class="bg-gray-950 text-white" value="">Select your bank</option>
						${Object.keys(payment.bank).map(bankKey => {
							const bankInfo = payment.bank[bankKey];
							return `<option class="bg-gray-950 text-white" value="${bankKey}">${bankInfo.name.toUpperCase()}</option>`;
						}).join('')}
					</select>
				`;

				button = `<button onclick="validatePhoneAndProceed()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400">Proceed</button>`;
			}else if(selectedPayment === 'cripto'){
				// if (window.userCountry == 'Indonesia' && !isAdmin.value) {
				// 	showFeedback(
				// 		"Unavailable",
				// 		"Tidak tersedia untuk indonesia."
				// 	);
				// 	return;
				// }

				button = `<button onclick="validateCripto()" class="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-400">Proceed</button>`;
			}
			content = `
				${progress}
				<h2 class="text-2xl font-bold mb-4 text-center">Confirm Your Payment</h2>
				<div class="bg-white/10 rounded-xl shadow p-6 mb-4">
					<p class="mb-2">🧾 <strong>Package:</strong> ${selectedPackage.Name} – <span class="text-orange-600">${selectPrice}</span> (<span class="text-yellow-600">${selectedPackage.ECoins} eCoins</span>)</p>
					<p class="mb-4">💳 <strong>Payment Method:</strong> ${selectedPayment}</p>
					${text}
					${phone}
					${bankSelect}
				</div>
				<div class="bg-white/10 p-4 rounded mb-6 text-sm text-gray-400">
					<h3 class="font-semibold mb-2">Terms and Conditions</h3>
					<ul class="list-disc list-inside space-y-1">
						<li>This payment is a digital donation for eCoins top-up.</li>
						<li>No refunds after successful transaction.</li>
						<li>Please verify your game account before continuing.</li>
						<li>Contact support for any issues regarding your top-up.</li>
					</ul>
				</div>
				<div class="bg-white/10 p-4 rounded mb-6 text-sm text-gray-400">
					<h3 class="font-semibold mb-2">Contact</h3>
					<ul class="list-disc list-inside space-y-1">
						<li>Email ${globalConfig.cp_email}</li>
						<li>WhatsApp ${globalConfig.cp_whatsapp}</li>
					</ul>
				</div>
				<div class="flex justify-between">
					<button onclick="renderStep(2)" class="text-sm text-gray-500 hover:underline">← Back</button>
					${button}
				</div>
			`;


		}
		else if (step === 4) {
			let paymentDetail = '';
			let tripayInstructions = '';

			if (selectedPayment === 'paypal') {
				//paymentDetail = `<p><strong>Email PayPal:</strong> ${payment.paypal?.email ?? 'N/A'}</p>`;
				//paymentDetail = ``;
			} else if (selectedPayment === 'bank') {
				if (window.tripayData) {
					const data = window.tripayData;
					const expired = new Date(data.expired_time * 1000).toLocaleString();

					paymentDetail = `
						<p><strong>Method:</strong> ${data.payment_name}</p>
						<p><strong>VA Number:</strong> <span class="text-yellow-400">${data.pay_code}</span></p>
						<p><strong>Amount:</strong> Rp ${data.amount.toLocaleString('id-ID')}</p>
						<p><strong>Expires:</strong> ${expired}</p>
					`;

					data.instructions.forEach(instr => {
						tripayInstructions += `
						<div class="bg-white/10 rounded-xl shadow p-6 mb-4 text-left text-sm text-gray-400">
							<div class="bg-white/5 p-4 rounded mb-3">
								<h4 class="font-semibold mb-2">${instr.title}</h4>
								<ol class="list-decimal list-inside text-sm text-gray-300 space-y-1">
									${instr.steps.map(step => `<li>${step}</li>`).join('')}
								</ol>
							</div>
						</div>
						`;
					});
				} else {
					// fallback jika tripayData tidak tersedia
					for (const [bank, info] of Object.entries(payment.bank)) {
						paymentDetail += `<p><strong>${bank.toUpperCase()}:</strong> ${info.rek} a/n ${info.name}</p>`;
					}
				}
			} else if (selectedPayment === 'cripto') {
				const cripto = payment.cripto ?? {};
				// paymentDetail = `
				// 	<div class="text-left space-y-2">
				// 		<p><strong>Receiver Name:</strong> ${western.name}</p>
				// 		<p><strong>City/Country:</strong> ${western.city ?? 'YourCity'}, ${western.country ?? 'Indonesia'}</p>
				// 		<p><strong>Currency:</strong> USD</p>
				// 		<p class="mt-4 font-semibold">Instructions:</p>
				// 		<ul class="list-disc list-inside text-sm text-gray-400 space-y-1">
				// 			<li>Visit your nearest Western Union office or authorized agent.</li>
				// 			<li>Provide the receiver's full name and country.</li>
				// 			<li>Send the exact amount: <strong>$${selectedPackage.Price}</strong> (include transfer fee if any).</li>
				// 			<li>Keep your MTCN (tracking number) after payment.</li>
				// 			<li>Send a screenshot of the receipt and MTCN to our admin for verification.</li>
				// 		</ul>
				// 	</div>
				// `;
			}

			content = `
				${progress}
				<h2 class="text-2xl font-bold mb-6 text-center">Complete Your Payment</h2>
				<div class="bg-white/10 rounded-xl shadow p-6 mb-4 text-center">
					<p class="mb-2">Please proceed using <strong>${selectedPayment}</strong></p>
					<p class="mb-2">Total Payment: <strong class="text-blue-600">${selectedPayment === 'bank' && window.tripayData ? `Rp ${window.tripayData.amount.toLocaleString('id-ID')}` : `$${selectedPackage.Price}`}</strong></p>
					<p class="mb-4">For package: <strong>${selectedPackage.Name}</strong></p>
					<p class="mb-4">For eCoins: <strong>${selectedPackage.ECoins}</strong></p>
				</div>
				<div class="bg-white/10 rounded-xl shadow p-6 mb-4 text-left text-sm text-gray-400">
					${paymentDetail}
				</div>
				${tripayInstructions}
				<div class="mb-6 text-center">
					<div id="paypal-button-container" class="inline-block"></div>
				</div>
				<div class="text-center">
					<button onclick="renderStep(1)" class="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">← Back to Start</button>
				</div>
			`;
		}



		document.getElementById('donation').innerHTML = `${content}`;

		// Setelah konten ditampilkan di DOM, baru panggil loader PayPal jika perlu
		if (step === 4 && selectedPayment === 'paypal') {
			loadPaypalSDK(payment.paypal.client_id);
		}

	};

	window.goToPaymentStep = function (idx) {
		selectedPackage = list[idx];
		renderStep(2);
	};

	window.selectPaymentMethod = function (method) {
		selectedPayment = method;
		renderStep(3);
	};

	window.renderStep = renderStep;

	window.validatePhoneAndProceed = function () {
		const phoneInput = document.getElementById('phone');
		const bankInput = document.getElementById('selectedBank');

		if (!phoneInput || phoneInput.value.trim() === '') {
			showFeedback("Phone Required", "Please enter your phone number before continuing.");
			return;
		}

		if (!bankInput || bankInput.value === '') {
			showFeedback("Bank Required", "Please select your bank before continuing.");
			return;
		}

		// Simpan data ke global
		window.userPhone = phoneInput.value.trim();
		window.selectedBank = bankInput.value;

		loadTripay();
		
	};

	window.reqCode = async function () {
		const emailInput = document.getElementById('email');

		if (!emailInput || emailInput.value.trim() === '') {
			showFeedback("Email Required", "Please enter your Email Paypal before continuing.");
			return;
		}

		const successDiv = document.getElementById('successMessage');
		const errorDiv = document.getElementById('errorMessage');
		const reqBtn = document.getElementById('reqBtn');

		reqBtn.textContent = 'Loading...';
		reqBtn.classList.add('opacity-50', 'pointer-events-none');
		
		const data = await fetchEncrypted('/api/mail?action=paypal&email=' + emailInput.value + "&user=" + user.UserID + "&token=" + globalConfig.csrfToken);
		if (data.status === 'success') {
			successDiv.textContent = data.message;
			successDiv.classList.remove('hidden');

			reqBtn.textContent = 'ReqCode';

			document.getElementById("email").readOnly = true;
			document.getElementById("reqBtn").setAttribute("disabled", true);


		} else {
			errorDiv.textContent = data.message;
			errorDiv.classList.remove('hidden');
			reqBtn.textContent = 'ReqCode';
			reqBtn.classList.remove('opacity-50', 'pointer-events-none');
		}

	};

	window.savePaypal = async function () {
		const nameInput = document.getElementById('name');
		const emailInput = document.getElementById('email');
		const codeInput = document.getElementById('code');

		if (!nameInput || nameInput.value.trim() === '') {
			showFeedback("Name Required", "Please enter your Name Paypal before continuing.");
			return;
		}

		if (!emailInput || emailInput.value.trim() === '') {
			showFeedback("Email Required", "Please enter your Email Paypal before continuing.");
			return;
		}

		if (!codeInput || codeInput.value.trim() === '') {
			showFeedback("Code Required", "Please enter Code from your email.");
			return;
		}

		const successDiv = document.getElementById('successMessage');
		const errorDiv = document.getElementById('errorMessage');
		const reqBtn = document.getElementById('saveBtn');

		reqBtn.textContent = 'Loading...';
		reqBtn.classList.add('opacity-50', 'pointer-events-none');
		
		const data = await fetchEncrypted('/api/getDonation?action=saveUserPaypal&email=' + emailInput.value + "&name=" + nameInput.value + "&code=" + codeInput.value + "&token=" + globalConfig.csrfToken);
		if (data.status === 'success') {
			successDiv.textContent = data.message;
			successDiv.classList.remove('hidden');

			reqBtn.textContent = 'Save';

			document.getElementById("email").readOnly = true;
			document.getElementById("saveBtn").setAttribute("disabled", true);

			renderStep(2);


		} else {
			errorDiv.textContent = data.message;
			errorDiv.classList.remove('hidden');
			reqBtn.textContent = 'Save';
			reqBtn.classList.remove('opacity-50', 'pointer-events-none');
		}

	};

	window.removePaypal = async function () {
		
		const successDiv = document.getElementById('successMessage');
		const errorDiv = document.getElementById('errorMessage');
		const reqBtn = document.getElementById('removeBtn');

		reqBtn.textContent = 'Loading...';
		reqBtn.classList.add('opacity-50', 'pointer-events-none');
		
		const data = await fetchEncrypted('/api/getDonation?action=removeUserPaypal&token=' + globalConfig.csrfToken);
		if (data.status === 'success') {
			successDiv.textContent = data.message;
			successDiv.classList.remove('hidden');

			renderStep(1);


		} else {
			errorDiv.textContent = data.message;
			errorDiv.classList.remove('hidden');
			reqBtn.textContent = 'Remove';
			reqBtn.classList.remove('opacity-50', 'pointer-events-none');
		}

	};

	window.validateCripto = function () {

		criptoPay();
		
	};

	// // 6. Feedback modal functions
	// window.showFeedback = (type, msg) => {
	// 	document.getElementById('feedbackTitle').innerText   = type === 'success' ? 'Success' : 'Error';
	// 	document.getElementById('feedbackMessage').innerText = msg;
	// 	document.getElementById('feedbackModal').classList.remove('hidden');
	// };
	// window.hideFeedbackModal = () => {
	// 	document.getElementById('feedbackModal').classList.add('hidden');
	// };


	renderStep(1); // Start from first step
}

function loadPaypalSDK(clientId) {
	// Cegah load ganda
	if (document.querySelector(`script[src*="paypal.com/sdk/js"]`)) {
		renderPaypalButton(selectedPackage);
		return;
	}

	const script = document.createElement('script');
	script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD`;
	script.onload = () => renderPaypalButton(selectedPackage);
	document.head.appendChild(script);
}

function renderPaypalButton(packageData) {

	const invoiceId = `DON-${Date.now()}`;

	window.paypal.Buttons({
		createOrder: (data, actions) => {
			return actions.order.create({
			purchase_units: [{
				// ID internal untuk cross-reference
				reference_id: packageData.PackageId.toString(),

				// Deskripsi yang muncul ke user dan di dashboard PayPal
				description: `Top up eCoins: ${packageData.Name} (${packageData.ECoins} eCoins) – Digital Donation`,

				// (Optional) nomor faktur/formal
				invoice_id: invoiceId,

				amount: {
				currency_code: 'USD',
				value: packageData.Price,
				breakdown: {
					item_total: {
					currency_code: 'USD',
					value: packageData.Price
					}
				}
				},
				// Rincian item digital
				items: [{
				name: packageData.Name,
				unit_amount: {
					currency_code: 'USD',
					value: packageData.Price
				},
				quantity: '1'
				}]
			}],

			application_context: {
				shipping_preference: 'NO_SHIPPING',  // non-fisik → dianggap digital
				user_action: 'PAY_NOW'
			}
			});
		},
		onApprove: async function(data, actions) {
				const getuser = await fetchEncrypted('/api/getUser?token=' + globalConfig.csrfToken);
				if(getuser.status === "success"){
	
					const details = await actions.order.capture();
					console.log('Transaction completed by', details.payer.name.given_name);
					console.log('Sending userid =', getuser.data.UserNum);

					const form = new FormData();
					form.append('orderID', data.orderID);
					form.append('invoiceId', invoiceId);
					form.append('userid', getuser.data.UserNum);
					form.append('packageId', packageData.PackageId);

					const response = await fetchEncrypted(
						`/api/getDonation?action=paypal_donation&token=${globalConfig.csrfToken}`,
						'POST',
						form
					);

					console.log(response);
					if (response.status === 'success') {
						init();
						showFeedback('success', 'Payment successful! Please wait for confirmation.');
					} else {
						showFeedback('error', response.message || 'Payment failed.');
					}

				}else{
					showFeedback('error', getuser.message || 'User data error.');
				}
		
		},
		onError: err => {
		showFeedback('error', 'PayPal error: ' + err);
		}

	}).render('#paypal-button-container');
}

async function loadTripay(){
	const getuser = await fetchEncrypted('/api/getUser?token=' + globalConfig.csrfToken);
	if(getuser.status === "success"){

		
		console.log('Sending userid =', getuser.data.UserNum);

		const form = new FormData();
		form.append('invoiceId', `DON-${Date.now()}`);
		form.append('userid', getuser.data.UserNum);
		form.append('packageId', selectedPackage.PackageId);
		form.append('phone', window.userPhone);
		form.append('method', window.selectedBank);

		const response = await fetchEncrypted(
			`/api/getDonation?action=tripay&token=${globalConfig.csrfToken}`,
			'POST',
			form
		);

		console.log(response.data);
		if (response.status === 'success') {
			if(response.data.pay_url !== null){
				window.location.href = response.data.pay_url;
				renderStep(1);
			}else{
				window.tripayData = response.data;
				renderStep(4);
			}
			
			
		} else {
			showFeedback('error', response.message || 'Request gagal.');
		}

	}else{
		showFeedback('error', getuser.message || 'User data error.');
	}

}

async function criptoPay(){
	const getuser = await fetchEncrypted('/api/getUser?token=' + globalConfig.csrfToken);
	if(getuser.status === "success"){

		
		console.log('Sending userid =', getuser.data.UserNum);

		const form = new FormData();
		form.append('invoiceId', `DON-${Date.now()}`);
		form.append('userid', getuser.data.UserNum);
		form.append('packageId', selectedPackage.PackageId);

		const response = await fetchEncrypted(
			`/api/getDonation?action=cripto&token=${globalConfig.csrfToken}`,
			'POST',
			form
		);

		//console.log(response);
		if (response.status === 'success') {
			if (response.data.invoice_url) {
				//console.log(response.data.invoice_url);
				window.location.href = response.data.invoice_url;
				renderStep(1);
			} else {
				showFeedback('error', 'Request gagal (no invoice_url).');
			}
			
			
		} else {
			showFeedback('error', response.message || 'Request gagal.');
		}

	}else{
		showFeedback('error', getuser.message || 'User data error.');
	}

}

</script>
