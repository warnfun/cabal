<template>
  <header id="mainHeader" class="absolute top-0 left-0 right-0 z-50 transition-all duration-300 bg-[url('/assets/img/bg_navbar.png')] bg-cover bg-center bg-no-repeat h-[150px]">
    <div class="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
      <!-- Logo -->
      <div class="text-2xl font-bold text-blue-400 text-left" id="logo_text">
        Episode <span class="text-white">3x</span>
      </div>

      <!-- Tombol Hamburger -->
	<div class="lg:hidden">
		<button @click="showMobileMenu = !showMobileMenu" class="text-white">
		<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
		</svg>
		</button>
	</div>


     <!-- Middle Menu -->
	<nav class="absolute left-1/2 transform -translate-x-1/2">
	<ul class="flex items-center gap-6 text-sm text-white">
		<li><router-link to="/home" class="hover:text-blue-400">Home</router-link></li>
		<li><router-link to="/download" class="hover:text-blue-400">Download</router-link></li>
		<li><router-link to="/rank" class="hover:text-blue-400">Ranking</router-link></li>
		<li class="flex relative group">
		<a href="#" class="hover:text-blue-400">Community</a>
		<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
			<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4 4 4-4" />
		</svg>
		<ul class="absolute bg-black p-3 w-52 top-6 left-0 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top shadow-lg">
			<li class="hover:bg-gray-700 px-3 py-1"><a :href="globalConfig.facebook" target="_blank">Facebook</a></li>
			<li class="hover:bg-gray-700 px-3 py-1"><a :href="globalConfig.discordInvite" target="_blank">Discord</a></li>
		</ul>
		</li>
	</ul>
	</nav>

      <!-- Right Menu -->
      <div class="space-x-4 text-sm hidden lg:flex items-center">
        <!-- Jika belum login -->
        <template v-if="!isLoggedIn">
          <router-link to="/login" class="flex items-center space-x-1 hover:text-blue-400" id="login_button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Login</span>
          </router-link>

          <router-link to="/register" class="flex items-center space-x-1 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-white" id="register_button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            <span>Register</span>
          </router-link>
        </template>

        <!-- Jika sudah login -->
		<template v-else>
		<div class="flex items-center gap-4">

			<!-- User Menu -->
			<li class="flex relative group list-none">
			<a href="#" class="hover:text-blue-400 flex items-center gap-2">
			<!-- Foto profil -->
			<img
			:src="user.Avatar || '/assets/img/favicon-32x32.png'"
			alt="Profile"
			class="w-8 h-8 rounded-full border-2 border-blue-400 object-cover"
			@error="event => event.target.src = '/assets/img/favicon-32x32.png'"
			/>

			<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 9l4 4 4-4" />
			</svg>
			</a>


			<!-- Submenu -->
			<ul class="absolute bg-black p-3 w-56 top-10 right-0 transform scale-0 group-hover:scale-100 transition duration-150 ease-in-out origin-top-right shadow-lg rounded-md border border-gray-700 z-50">

			<!-- Info Pengguna -->
			<li class="text-white text-sm font-semibold text-center mb-1">{{ user.UserID }}</li>
			<li class="text-gray-400 text-xs text-center truncate mb-2 px-1">{{ user.Email }}</li>

			<li><hr class="border-gray-600 mb-2" /></li>

			<!-- Menu dengan ikon -->
			<li class="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0h6" />
				</svg>
				<router-link to="/user/home">Dashboard</router-link>
			</li>

			<li class="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17a4 4 0 104-4 4 4 0 00-4 4zM4 21h16" />
				</svg>
				<router-link to="/user/settings">Settings</router-link>
			</li>

			<li><hr class="border-gray-600 mb-2" /></li>

			<!-- Admin -->
			<template v-if="isGm || isAdmin">
				<li class="text-gray-400 text-xs text-center truncate mb-2 px-1">Admin</li>
				<li><hr class="border-gray-600 mb-2" /></li>

				<li class="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 3L8 21h8l-1.75-18z" />
				</svg>
				<router-link to="/admin">Dashboard</router-link>
				</li>

				<template v-if="isAdmin">
				<li class="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
					<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 20l-6-6h12l-6 6zm0-16l6 6H6l6-6z" />
				</svg>
				<router-link to="/admin/news">Create News</router-link>
				</li>
				</template>
				<li><hr class="border-gray-600 mb-2" /></li>
			</template>

			<!-- Logout -->
			<li class="hover:bg-gray-700 px-3 py-2 rounded flex items-center space-x-2 text-red-400 cursor-pointer" @click="logout">
				<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10v1" />
				</svg>
				<span>Logout</span>
			</li>
			</ul>

			</li>

		</div>
		</template>

      </div>
    </div>

	<!-- Mobile Menu -->
<transition name="fade">
  <div
    v-if="showMobileMenu"
    class="lg:hidden fixed top-[75px] left-0 right-0 bg-black bg-opacity-90 text-white px-6 py-4 space-y-4 z-40"
  >
    <ul class="flex flex-col space-y-3 text-sm">
      <li>
        <router-link to="/home" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 9l9-7 9 7v11a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4H9v4a2 2 0 01-2 2H3a2 2 0 01-2-2V9z" />
          </svg>
          <span>Home</span>
        </router-link>
      </li>
      <li>
        <router-link to="/download" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M12 12v8m0-8l-4 4m4-4l4 4" />
          </svg>
          <span>Download</span>
        </router-link>
      </li>
      <li>
        <router-link to="/rank" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 17a1 1 0 11-2 0v-4a1 1 0 112 0v4zm-5 4a2 2 0 100-4 2 2 0 000 4zm13-6V5a2 2 0 00-2-2h-6l-2 3v4" />
          </svg>
          <span>Ranking</span>
        </router-link>
      </li>
      <li class="flex items-center space-x-2 hover:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" stroke="none">
          <path d="M22 12a10 10 0 10-11 9.95V15h-3v-3h3v-2.5a3.5 3.5 0 013.5-3.5H19v3h-2a1 1 0 00-1 1V12h3l-1 3h-2v6.95A10 10 0 0022 12z" />
        </svg>
        <a :href="globalConfig.facebook" target="_blank" class="flex-1">Facebook</a>
      </li>
      <li class="flex items-center space-x-2 hover:text-blue-400">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 3L8.12 14.88a4 4 0 01-5.06-5.06L17 3m0 0v5h5"></path>
        </svg>
        <a :href="globalConfig.discordInvite" target="_blank" class="flex-1">Discord</a>
      </li>
    </ul>

    <div class="mt-4 border-t border-gray-600 pt-4 space-y-3">
      <template v-if="!isLoggedIn">
        <router-link to="/login" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M15 12H3m0 0l4-4m-4 4l4 4m13-4a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>Login</span>
        </router-link>

        <router-link to="/register" @click="showMobileMenu = false" class="flex items-center space-x-2 bg-blue-500 px-3 py-1 rounded hover:bg-blue-600 text-white w-fit">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 4v16m8-8H4" />
          </svg>
          <span>Register</span>
        </router-link>
      </template>

      <template v-else>
        <div class="text-xs">
          <div class="mb-1">{{ user.UserID }}</div>
          <div class="text-gray-400 truncate mb-2">{{ user.Email }}</div>
        </div>

        <hr class="border-gray-600 mb-2" />

        <router-link to="/user/home" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" />
          </svg>
          <span>Dashboard</span>
        </router-link>

        <router-link to="/user/settings" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2" />
            <path d="M4.22 4.22l1.42 1.42" />
            <path d="M1 12h3" />
            <path d="M19.78 4.22l-1.42 1.42" />
            <path d="M21 12h-3" />
            <path d="M4.22 19.78l1.42-1.42" />
            <path d="M19.78 19.78l-1.42-1.42" />
            <circle cx="12" cy="12" r="3" />
          </svg>
          <span>Settings</span>
        </router-link>

        <template v-if="isAdmin">
          <hr class="border-gray-600 my-2" />
          <router-link to="/admin" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <span>Admin Dashboard</span>
          </router-link>

          <router-link to="/admin/news" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M19 21H5a2 2 0 01-2-2V7a2 2 0 012-2h4l2-2h6a2 2 0 012 2v14a2 2 0 01-2 2z" />
			</svg>
			<span>Admin News</span>
			</router-link>
			</template>

			<template v-if="isGm || isAdmin">
          <hr class="border-gray-600 my-2" />
          <router-link to="/gm" @click="showMobileMenu = false" class="flex items-center space-x-2 hover:text-blue-400">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
            <span>GM Dashboard</span>
          </router-link>
			</template>

			    <hr class="border-gray-600 my-2" />	

    <a href="/logout" class="flex items-center space-x-2 hover:text-blue-400">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M17 16l4-4m0 0l-4-4m4 4H7" />
        <path d="M7 8v8a2 2 0 002 2h4" />
      </svg>
      <span>Logout</span>
    </a>
  </template>
</div>
</div> </transition>


  </header>
  
  

</template>

<script setup>
import { user, isLoggedIn, isAdmin, isGm, globalConfig } from '@/js/store.js';
import { fetchEncrypted } from '@/js/fetch.js';
import { useRouter } from 'vue-router';
import { ref, onMounted } from 'vue';

const router = useRouter()

onMounted(() => {
  //checkAdmin(); // akan set isAdmin.value
});

async function logout() {
  isLoggedIn.value = false;
  localStorage.removeItem('isLoggedIn');
  localStorage.removeItem('user');

  await fetchEncrypted('/api/logout');
  await router.push('/');
  //window.location.href = '/api/logout';
}

const showMobileMenu = ref(false)

</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>