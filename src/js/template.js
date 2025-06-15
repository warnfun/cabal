export const nav = `
  <header id="mainHeader" class="absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-[url('/assets/img/bg_navbar.png')] bg-cover bg-center bg-no-repeat h-[150px]">
      <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <!-- Logo -->
        <div class="text-2xl font-bold text-blue-400 text-left" id="logo_text"> Cabal <span class="text-white">Online</span>
        </div>
		<!-- Icon Hamburger -->
		<div class="block lg:hidden">
		<button id="hamburger" class="text-white">
			<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 6h18M3 12h18M3 18h18" />
			</svg>
		</button>
		</div>
        <!-- Middle Menu -->
        <nav class="space-x-6 text-sm flex-1 text-center">
          <a href="#home" data-page="home" class="hover:text-blue-400">Home</a>
          <a href="#download" data-page="download" class="hover:text-blue-400">Download</a>
          <a href="#rank" data-page="rank" class="hover:text-blue-400">Ranking</a>
		  <a href="#" data-page="discord" class="hover:text-blue-400">Discord</a>
        </nav>
        <!-- Right Menu -->
        <div class="space-x-4 text-sm flex items-center">
		<a href="#login" data-page="login" class="flex items-center space-x-1 hover:text-blue-400" id="login_button">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span>Login</span>
		</a>
		<a href="#register" data-page="register" class="flex items-center space-x-1 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-white" id="register_button">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
			</svg>
			<span>Register</span>
		</a>
		</div>
		  
      </div>
    </header>

	<div id="mobileMenu" class="lg:hidden fixed inset-0 bg-gray-950 bg-opacity-25 z-40 z-[9999] hidden">
		<div class="text-center p-4 mt-5">
			<button id="closeMenu" class="z-[10000] text-white">
				<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
				<path d="M6 18L18 6M6 6l12 12" />
				</svg>
			</button>
			</div>
		<div class="text-center text-white p-4">
			<!-- Navigation Links -->
			<nav class="flex flex-col items-center text-white">
				<a href="#home" data-page="home" class="hover:text-blue-400">Home</a>
				<a href="#download" data-page="download" class="hover:text-blue-400">Download</a>
				<a href="#rank" data-page="rank" class="hover:text-blue-400">Ranking</a>
				<a href="#" data-page="discord" class="hover:text-blue-400">Discord</a>
				<a href="#user" data-page="user" class="hover:text-blue-400">Member</a>
				<a href="#login" data-page="login" class="text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">Login</a>
				<a href="#register" data-page="register" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">Register</a>
			</nav>
		</div>
	</div>
 `;

export const nav_login = `
 <header id="mainHeader" class="absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-[url('/assets/img/bg_navbar.png')] bg-cover bg-center bg-no-repeat h-[150px]">
	<div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
	  <!-- Kiri: Email dan eCoin -->
	  <div class="flex items-center space-x-6 text-sm text-white" id="user-profile">
		  <div>
		  <img src="/assets/img/pp.png" alt="eCoin" class="w-10 h-10">
		</div>	
		<div>
		  <p class="font-semibold truncate max-w-[100px]" id="user_nav" title="User">-</p>
		  <p class="text-gray-400 truncate max-w-[100px]" id="email_nav" title="Email">-</p>
		</div>
		<div class="relative">
		  <!-- eCoin 1 -->
		  <div class="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded border border-yellow-400 w-36" title="Ecoins">
			<img src="/assets/img/coin.png" alt="eCoin" class="w-5 h-5 mr-2">
			<span id="cash1">0</span>
		  </div>
		</div>
		<div class="relative">
		  <!-- eCoin 2 -->
		  <div class="flex items-center bg-gray-800 text-green-400 px-3 py-1 rounded border border-green-400 w-36" title="Force Gem">
			<img src="/assets/img/gem.png" alt="eCoin" class="w-5 h-5 mr-2">
			<span id="cash2">0</span>
		  </div>
		</div>
	  </div>
	  <!-- Icon Hamburger -->
	  <div class="block lg:hidden">
		<button id="hamburger" class="text-white">
		  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 6h18M3 12h18M3 18h18" />
		  </svg>
		</button>
	  </div>
	  <nav class="space-x-6 text-sm text-center flex items-center text-white">
		  <a href="#user" data-page="user" class="flex items-center gap-1 hover:text-blue-400">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			  <path d="M3 9.75L12 3l9 6.75V21a.75.75 0 01-.75.75H3.75A.75.75 0 013 21V9.75z" />
			</svg> Home </a>
		  <a href="#donation" data-page="donation" class="flex items-center gap-1 hover:text-blue-400">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.41 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 
				22 5.41 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
			</svg> Donation </a>
		  <a href="#redeem" data-page="redeem" class="flex items-center gap-1 hover:text-blue-400">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			  <path d="M16 17l-4-4 4-4m-8 8l4-4-4-4" />
			</svg> Redeem Code </a>
		  <a href="#vote" data-page="vote" class="flex items-center gap-1 hover:text-blue-400">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			  <path d="M5 13l4 4L19 7" />
			</svg> Vote </a>
		  <a href="#settings" data-page="settings" class="flex items-center gap-1 hover:text-blue-400">
			<svg class="w-4 h-4" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			  <path d="M12 15.5a3.5 3.5 0 100-7 3.5 3.5 0 000 7z" />
			  <path fill-rule="evenodd" d="M19.43 12.98a8.03 8.03 0 00.07-1.01c0-.34-.02-.67-.07-1l2.11-1.65a.5.5 0 00.12-.63l-2-3.46a.5.5 0 00-.6-.22l-2.49 
				1a7.96 7.96 0 00-1.74-1l-.38-2.65A.5.5 0 0014 2h-4a.5.5 0 00-.49.41l-.38 2.65c-.63.23-1.21.56-1.74 1l-2.49-1a.5.5 0 00-.6.22l-2 
				3.46a.5.5 0 00.12.63l2.11 1.65a8.1 8.1 0 000 2l-2.11 1.65a.5.5 0 00-.12.63l2 3.46a.5.5 0 00.6.22l2.49-1c.53.44 1.11.77 
				1.74 1l.38 2.65A.5.5 0 0010 22h4a.5.5 0 00.49-.41l.38-2.65c.63-.23 1.21-.56 1.74-1l2.49 1a.5.5 0 00.6-.22l2-3.46a.5.5 0 
				00-.12-.63l-2.11-1.65z" clip-rule="evenodd" />
			</svg> Settings </a>
		</nav>
	  <!-- Kanan: Logout -->
	  <div id="admin">
		
	  </div>
	  
	  <div class="text-sm" id="logout">
		<a href="#" data-page="logout" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"> Logout </a>
	  </div>
	</div>
  </header>

  <!-- Mobile Menu -->
<div id="mobileMenu" class="lg:hidden fixed inset-0 bg-gray-950 bg-opacity-25 z-40 z-[9999] hidden">
	<div class="text-center p-4 mt-5">
	<button id="closeMenu" class="z-[10000] text-white">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
	</div>
	<div class="text-center text-white p-4">
	<!-- User Info and eCoin -->
	<div class="mb-4">
		<p class="font-semibold" id="user_nav_m"></p>
		<p class="text-gray-400" id="email_nav_m"></p>
	</div>
	<div class="relative mb-4">
		<!-- eCoin 1 -->
		<div class="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded border border-yellow-400 w-36 mx-auto" title="Ecoins">
		<img src="assets/img/coin.png" alt="eCoin" class="w-5 h-5 mr-2">
		<span id="cash1_m">0</span>
		</div>
	</div>
	<div class="relative mb-4">
		<!-- eCoin 2 -->
		<div class="flex items-center bg-gray-800 text-green-400 px-3 py-1 rounded border border-green-400 w-36 mx-auto" title="Force Gem">
		<img src="assets/img/gem.png" alt="eCoin" class="w-5 h-5 mr-2">
		<span id="cash2_m">0</span>
		</div>
	</div>
	<!-- Navigation Links -->
	<nav class="flex flex-col items-center text-white">
		<a href="#user" data-page="user" class="py-2 hover:text-blue-400">Home</a>
		<a href="#donation" data-page="donation" class="py-2 hover:text-blue-400">Donation</a>
		<a href="#redeem" data-page="redeem" class="py-2 hover:text-blue-400">Redeem Code</a>
		<a href="#vote" data-page="vote" class="py-2 hover:text-blue-400">Vote</a>
		<a href="#settings" data-page="settings" class="py-2 hover:text-blue-400">Settings</a>
		<a href="#" data-page="logout" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">Logout</a>
	</nav>
	</div>
</div>

 `;
  
export const nav_admin = `
 <header id="mainHeader" class="absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-[url('/assets/img/bg_navbar.png')] bg-cover bg-center bg-no-repeat h-[150px]">
	<div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
	  <!-- Kiri: Email dan eCoin -->
	  <div>
		  <img src="/assets/img/pp.png" alt="eCoin" class="w-10 h-10">
		</div>	
	  <!-- Icon Hamburger -->
	  <div class="block lg:hidden">
		<button id="hamburger" class="text-white">
		  <svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path d="M3 6h18M3 12h18M3 18h18" />
		  </svg>
		</button>
	  </div>
	  <nav class="space-x-6 text-sm justify-between text-center flex items-center text-white">
		  <a href="#" data-page="admin/main" class="flex items-center gap-1 hover:text-blue-400"> Main </a>
		  <a href="#" data-page="admin/anews" class="flex items-center gap-1 hover:text-blue-400"> News </a>
		</nav>
	  <!-- Kanan: Logout -->
	  <div>
		<a href="user" class="flex items-center space-x-1 hover:text-blue-400" id="login_button">
			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
			</svg>
			<span>User</span>
		</a>
	  </div>
	  <div class="text-sm" id="logout">
		<a href="#" data-page="logout" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"> Logout </a>
	  </div>
	</div>
  </header>

  <!-- Mobile Menu -->
<div id="mobileMenu" class="lg:hidden fixed inset-0 bg-gray-950 bg-opacity-25 z-40 z-[9999] hidden">
	<div class="text-center p-4 mt-5">
	<button id="closeMenu" class="z-[10000] text-white">
		<svg class="w-6 h-6" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
		<path d="M6 18L18 6M6 6l12 12" />
		</svg>
	</button>
	</div>
	<div class="text-center text-white p-4">
	<!-- User Info and eCoin -->
	<div class="mb-4">
		<p class="font-semibold" id="user_nav_m"></p>
		<p class="text-gray-400" id="email_nav_m"></p>
	</div>
	<div class="relative mb-4">
		<!-- eCoin 1 -->
		<div class="flex items-center bg-gray-800 text-yellow-400 px-3 py-1 rounded border border-yellow-400 w-36 mx-auto" title="Total eCoin Anda">
		<img src="assets/img/cash1.png" alt="eCoin" class="w-5 h-5 mr-2">
		<span id="cash1_m">0</span>
		</div>
	</div>
	<div class="relative mb-4">
		<!-- eCoin 2 -->
		<div class="flex items-center bg-gray-800 text-green-400 px-3 py-1 rounded border border-green-400 w-36 mx-auto">
		<img src="assets/img/cash2.png" alt="eCoin" class="w-5 h-5 mr-2">
		<span id="cash2_m">0</span>
		</div>
	</div>
	<!-- Navigation Links -->
	<nav class="flex flex-col items-center text-white">
		<a href="#user" data-page="user" class="py-2 hover:text-blue-400">Home</a>
		<a href="#donation" data-page="donation" class="py-2 hover:text-blue-400">Donation</a>
		<a href="#redeem" data-page="redeem" class="py-2 hover:text-blue-400">Redeem Code</a>
		<a href="#vote" data-page="vote" class="py-2 hover:text-blue-400">Vote</a>
		<a href="#settings" data-page="settings" class="py-2 hover:text-blue-400">Settings</a>
		<a href="#" data-page="logout" class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mt-4">Logout</a>
	</nav>
	</div>
</div>

 `;

 export const footer =`
 <!-- Footer Section -->
	<footer class="relative bg-[url('/assets/img/bg-s1.jpg')] bg-cover bg-center overflow-hidden text-gray-400 py-8">
	<div class="max-w-7xl mx-auto px-4">
		<!-- Footer Content -->
		<div class="flex flex-col items-center space-y-6">
		<!-- Text -->
		<div class="text-center">
			<p>Welcome to the official private server of Cabal Online! Join us for thrilling adventures, intense PvP battles, and endless fun!</p>
		</div>
		<!-- Social Media -->
		<div>
			<h3 class="text-lg font-bold text-white mb-4">Follow Us</h3>
			<div class="flex justify-center space-x-4">
			<a href="https://www.facebook.com/cabalizer/" target="_blank" class="text-gray-400 hover:text-blue-400">
				<svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 6.274 4.759 11.486 11 11.931v-8.438h-3v-3.493h3v-2.7c0-3.225 1.796-5.123 4.709-5.123 1.368 0 2.8.287 2.8.287v3.056h-1.576c-1.236 0-1.594.773-1.594 1.558v1.907h3.223l-.515 3.493h-2.708v8.438c6.241-.445 11-5.657 11-11.931z" />
				</svg>
			</a>
			<a href="#" class="text-gray-400 hover:text-blue-400">
				<svg class="w-6 h-6" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
				<path d="M20.025 4.975c-.948 0-1.855.354-2.535 1.019l-.879-.863c-.452-.442-.983-.735-1.543-.866l.029-.159c-.04-.264-.051-.532-.057-.799-.004-.253.048-.505.125-.747l-.151-.084c-.235-.131-.508-.219-.789-.276-.336-.069-.679-.124-1.03-.18-.245-.037-.487-.065-.73-.089-.516-.073-1.031-.157-1.546-.247-.579-.095-1.16-.2-1.74-.3-.707-.129-1.418-.247-2.128-.38-.019-.171-.049-.342-.085-.511-.013-.037-.029-.075-.048-.113-.359-.873-.836-1.726-1.42-2.529-.103-.122-.213-.246-.324-.37l-.457-.538c-.181-.214-.371-.423-.581-.627-.586-.486-1.199-.971-1.877-1.438l-.075-.088c-.256-.336-.534-.666-.831-.987-.378-.409-.81-.791-1.29-1.125-.447-.364-.925-.72-1.415-1.07-.738-.529-1.54-1.04-2.363-1.547-.263-.18-.536-.36-.815-.55-.209-.156-.419-.32-.63-.487-.358-.256-.71-.526-1.084-.803-1.526-1.104-2.94-2.364-4.219-3.693-.463-.587-.98-.992-1.527-1.349-1.387-1.349-2.875-2.674-4.321-4.063-.174-.152-.365-.297-.56-.433-.046-.036-.093-.074-.139-.11l-.086-.065-.207-.156-.15-.138c-.633-.584-1.28-1.16-1.924-1.771-.456-.493-.935-.983-1.422-1.444-.578-.609-1.183-1.206-1.776-1.79-.155-.173-.307-.35-.462-.528-.278-.311-.574-.617-.88-.926-.238-.199-.482-.401-.73-.604-.226-.17-.463-.342-.699-.513-.032-.026-.066-.052-.099-.078.036-.232.071-.464.107-.697.077-.548.158-1.099.246-1.648.417-1.836.957-3.645 1.594-5.376.227-.559.429-1.125.649-1.688-.157-.226-.348-.457-.559-.686-.763-1.013-1.676-1.937-2.703-2.702l-.073-.074c-.687-.657-1.378-1.312-2.086-1.948-.271-.219-.55-.441-.827-.662-.588-.471-1.205-.933-1.826-1.394-.249-.241-.511-.482-.77-.722-.213-.221-.431-.437-.646-.654-.282-.283-.561-.574-.844-.864-.185-.178-.372-.357-.557-.537-2.447-2.505-3.577-5.26-4.341-8.106-.072-.224-.152-.443-.237-.663l-.241-.422c-.085-.148-.168-.297-.257-.444-.491-.74-.101-1.478-.107-2.287.054-.206.178-.412.25-.622z" />
				</svg>
			</a>
			</div>
		</div>
		<!-- Copyright -->
		<div class="text-center">
			<p>&copy; 2025. Cabalizer. All rights reserved.</p>
		</div>
		<!-- Terms Link -->
		<div class="text-center">
			<a href="#terms" class="text-gray-400 hover:text-blue-400">Terms of Service</a>
		</div>
		</div>
	</div>
	</footer>
 `;

 export const comming = `
	<main class="flex-grow">
      <!-- Member Area -->
      <section id="members" class="py-16 mt-40 relative min-h-[800px] bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat">
		<div class="max-w-6xl mx-auto px-4">
			<div class="bg-head-panel mb-4">
				<h2 class="text-head-panel text-4xl font-bold">
				Comming Soon
				</h2>
			</div>
		</div>
	  </section>

    </main>

 
 `;

 export function showFeedback(type, message) {
  const title = type === 'success' ? 'Success' : 'Error';
  document.getElementById('feedbackTitle').innerText   = title;
  document.getElementById('feedbackMessage').innerText = message;
  document.getElementById('feedbackModal').classList.remove('hidden');

  window.hideFeedbackModal = () => {
		document.getElementById('feedbackModal').classList.add('hidden');
	};

}

export function hideFeedbackModal() {
  document.getElementById('feedbackModal').classList.add('hidden');
}