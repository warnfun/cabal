<template>
  <section v-if="view === 'list'" id="all_news" class="relative min-h-[800px] py-20 px-4 mt-40">
    <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
    <div class="relative z-10 max-w-6xl mx-auto text-center">
      <div class="bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-lg text-left p-8 max-w-4xl mx-auto">
        <h2 class="text-3xl font-bold text-blue-400 mb-8">Daftar Berita</h2>

        <div id="news-list" class="space-y-4">
          <div
            v-for="item in paginatedNews"
            :key="item.link"
            class="bg-gray-800 rounded-lg p-2 flex justify-between hover:bg-gray-700 cursor-pointer"
            @click="loadDetails(item.link)"
          >
            <span class="text-sm text-blue-400 font-semibold">{{ item.title }}</span>
            <span class="text-sm text-gray-300">{{ item.date }}</span>
          </div>
        </div>
      </div>

      <div class="mt-12 flex justify-center space-x-2">
        <button class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600" :disabled="currentPage === 1" @click="goToPage(1)">« First</button>
        <button class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600" :disabled="currentPage === 1" @click="goToPage(currentPage - 1)">← Prev</button>

        <div class="flex items-center space-x-2">
          <button
            v-for="page in visiblePages"
            :key="page"
            class="px-3 py-1 rounded mx-1"
            :class="page === currentPage ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-blue-500'"
            @click="goToPage(page)"
          >
            {{ page }}
          </button>
        </div>

        <button class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600" :disabled="currentPage === totalPages" @click="goToPage(currentPage + 1)">Next →</button>
        <button class="px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600" :disabled="currentPage === totalPages" @click="goToPage(totalPages)">Last »</button>
      </div>
    </div>
  </section>

  <section v-else id="detail_news" class="relative min-h-[800px] py-20 px-4 mt-40 antialiased">
    <div class="absolute inset-0 opacity-75 mask-t-from-30% mask-b-from-30% bg-[url('/assets/img/bg_4.webp')] bg-cover bg-center bg-no-repeat z-0 pointer-events-none"></div>
    <div class="relative z-10 max-w-4xl mx-auto">
      <div class="mb-6">
        <a href="#" @click.prevent="backToList" class="inline-flex items-center text-blue-500 hover:text-blue-700 font-semibold transition duration-300">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back To List
        </a>
      </div>

      <article 
		v-if="detailContent"
		class="prose prose-base bg-[url('/assets/img/login.png')] bg-cover bg-center bg-no-repeat rounded-xl shadow-lg text-left p-8 max-w-4xl mx-auto text-white"
		v-html="detailContent"
		></article >
		<p v-else class="text-center text-gray-500">Memuat konten berita...</p>
	  	
    </div>
  </section>
</template>

<script setup>

import { watch } from 'vue'
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter, onBeforeRouteUpdate } from 'vue-router'

const route = useRoute()
const router = useRouter()

watch(() => route.params.id, (newId) => {
  if (newId) {
    view.value = 'details'
    loadContent(newId)
  } else {
    view.value = 'list'
    detailContent.value = ''
  }
})

const view = ref('list') // 'list' atau 'details'
const detailContent = ref('')
const newsData = ref([])
const currentPage = ref(1)
const itemsPerPage = 10

// Ambil data JSON saat pertama kali dimuat
onMounted(() => {
  checkRouteParams(),
  fetch(`/json/news.json?timestamp=${Date.now()}`)
    .then((res) => res.json())
    .then((data) => {
      newsData.value = data
    })
    .catch((err) => {
      console.error('Gagal mengambil data berita:', err)
    })
})

// Kalau URL berubah saat komponen sudah ter-render
onBeforeRouteUpdate((to, from, next) => {
  checkRouteParams(to)
  next()
})

function checkRouteParams(customRoute = route) {
  const id = customRoute.params.id
  if (id) {
    loadDetails(id)
    view.value = 'details'
  } else {
    view.value = 'list'
  }
}

const paginatedNews = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage
  return newsData.value.slice(start, start + itemsPerPage)
})

const totalPages = computed(() => Math.ceil(newsData.value.length / itemsPerPage))

const visiblePages = computed(() => {
  const range = []
  const from = Math.max(1, currentPage.value - 3)
  const to = Math.min(totalPages.value, currentPage.value + 3)
  for (let i = from; i <= to; i++) {
    range.push(i)
  }
  return range
})

function goToPage(page) {
  currentPage.value = Math.min(Math.max(page, 1), totalPages.value)
}

function backToList() {
  view.value = 'list'
  detailContent.value = ''
}

function loadDetails(idNews) {
  view.value = 'details'
  detailContent.value = '<p>Loading...</p>'

  fetch(`/snews/details/${idNews}.html`)
    .then((res) => {
      if (!res.ok) throw new Error('Gagal memuat detail berita.')
      return res.text()
    })
    .then((html) => {
      detailContent.value = html
    })
    .catch((err) => {
      detailContent.value = '<p class="text-red-500">Gagal memuat berita.</p>'
      console.error(err)
    })
}

</script>
