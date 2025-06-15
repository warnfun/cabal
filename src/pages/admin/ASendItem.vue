<template>
  <div class="rounded-lg p-6 bg-[#121212]/80 shadow-2xl text-white space-y-4">
    <h2 class="text-xl font-bold mb-4">Kirim Item</h2>

    <!-- Select User Type -->
    <div>
      <label class="block mb-1 font-semibold">User</label>
      <select v-model="userType" class="w-full p-2 bg-gray-800 rounded">
        <option value="userid">UserID</option>
        <option value="charname">CharName</option>
        <option value="all">All Player</option>
      </select>
    </div>

    <!-- Search User -->
    <div v-if="userType !== 'all'">
      <label class="block mb-1 font-semibold">Cari {{ userType === 'userid' ? 'UserID' : 'CharName' }}</label>
      <input
        v-model="searchInput"
        placeholder="Masukkan pencarian"
        class="w-full p-2 rounded bg-gray-800"
      />
      <ul v-if="searchResults.length" class="bg-gray-900 rounded mt-2 max-h-40 overflow-auto">
        <li
          v-for="user in searchResults"
          :key="user.id"
          @click="selectUser(user)"
          class="p-2 cursor-pointer hover:bg-gray-700"
        >
          {{ user.name }} (ID: {{ user.id }})
        </li>
      </ul>
    </div>

    <!-- Item ID Search -->
    <div>
      <label class="block mb-1 font-semibold">Item ID</label>
      <input
        v-model="searchQuery"
        @input="filterItems"
        placeholder="Search item by name or ID"
        class="w-full p-2 rounded bg-gray-800"
      />
      <ul v-if="filteredItems.length && searchQuery" class="bg-gray-900 rounded mt-2 max-h-40 overflow-auto">
        <li
          v-for="item in filteredItems"
          :key="item._id"
          @click="selectItem(item)"
          class="p-2 cursor-pointer hover:bg-gray-700"
        >
          {{ item._id }} - {{ item._cont }}
        </li>
      </ul>
      <input v-model="itemId" type="text" class="mt-2 w-full p-2 rounded bg-gray-800" placeholder="Item ID manual" />
    </div>

    <!-- Item Options -->
    <div>
      <label class="block mb-1 font-semibold">Item Opt</label>
      <input v-model.number="itemOpt" type="number" class="w-full p-2 bg-gray-800 rounded" />
    </div>

    <!-- Binding -->
    <div>
      <label class="block mb-1 font-semibold">Binding</label>
      <select v-model="binding" class="w-full p-2 bg-gray-800 rounded">
        <option value="0">None</option>
        <option value="4096">Account Bind</option>
        <option value="524288">Char Bind</option>
      </select>
    </div>

    <!-- Duration -->
	<div>
	<label class="block mb-1 font-semibold">Item Duration</label>
	<select v-model="itemDuration" class="w-full p-2 bg-gray-800 rounded">
		<option disabled value="">Select Duration</option>
		<option value="0">Permanent</option>
		<option value="1">1 Hour</option>
		<option value="2">2 Hours</option>
		<option value="3">3 Hours</option>
		<option value="4">4 Hours</option>
		<option value="5">5 Hours</option>
		<option value="6">6 Hours</option>
		<option value="7">10 Hours</option>
		<option value="8">12 Hours</option>
		<option value="9">1 Day</option>
		<option value="10">3 Days</option>
		<option value="11">5 Days</option>
		<option value="12">7 Days</option>
		<option value="13">10 Days</option>
		<option value="14">14 Days</option>
		<option value="15">15 Days</option>
		<option value="16">20 Days</option>
		<option value="17">30 Days</option>
		<option value="18">45 Days</option>
		<option value="19">60 Days</option>
		<option value="20">90 Days</option>
		<option value="21">100 Days</option>
		<option value="22">120 Days</option>
		<option value="23">180 Days</option>
		<option value="24">270 Days</option>
		<option value="25">365 Days</option>
		<option value="26">3 Minutes</option>
		<option value="27">30 Minutes</option>
		<option value="28">90 Minutes</option>
		<option value="29">10 Minutes</option>
	</select>
	</div>


    <!-- Quantity -->
    <div>
      <label class="block mb-1 font-semibold">Item Quantity</label>
      <input v-model.number="itemQty" type="number" class="w-full p-2 bg-gray-800 rounded" />
    </div>

    <!-- Submit -->
    <button @click="submitForm" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold mt-4">
      Kirim Item
    </button>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { fetchEncrypted } from '@/js/fetch.js'
import { checkLogin, isAdmin, globalConfig } from '@/js/store'
import { showFeedback, showConfirm } from '@/js/global';
// =====================
// STATE
// =====================
const userType = ref('userid')
const searchInput = ref('')
const searchResults = ref([])
const selectedUserId = ref(null) // ID user yang dipilih

const items = ref([])
const filteredItems = ref([])
const searchQuery = ref('')

const itemId = ref('')
const itemOpt = ref(0)
const binding = ref(0)
const itemDuration = ref(0)
const itemQty = ref(1)

// Watch perubahan userType
watch(userType, (newVal) => {
  searchInput.value = ''
  searchResults.value = []
})

// =====================
// USER SEARCH
// =====================
async function search(type, search = '') {
  try {
    const res = await fetchEncrypted(`/api_adm/playerList?action=${type}&search=${search}&token=${globalConfig.csrfToken}`)
    searchResults.value = Array.isArray(res.data) ? res.data : []
  } catch (err) {
    console.error('Search gagal:', err)
    searchResults.value = [] // pastikan selalu array agar tidak error
  }
}


function selectUser(user) {
  searchInput.value = user.name
  selectedUserId.value = user.id
  searchResults.value = [] // sembunyikan dropdown
}

// Trigger pencarian saat input berubah
watch(searchInput, (val) => {
  if (userType.value !== 'all' && val.length >= 2) {
    search(userType.value, val)
  }
})

// =====================
// ITEM SEARCH
// =====================
function extractNumber(str) {
  const match = str.match(/\d+/)
  return match ? match[0] : ''
}

function selectItem(item) {
  itemId.value = extractNumber(item._id)
  searchQuery.value = item._cont
  filteredItems.value = []
}

function filterItems() {
  const q = searchQuery.value.toLowerCase()
  filteredItems.value = items.value.filter(item => {
    const numericId = extractNumber(item._id)
    return item._cont.toLowerCase().includes(q) || numericId.includes(q)
  })
}

// =====================
// SUBMIT
// =====================
async function submitForm() {
  // Validasi input
  if (!userType.value) {
    showFeedback('Warning', 'Jenis user harus dipilih.')
    return
  }

  if (userType.value !== 'all' && !selectedUserId.value) {
    showFeedback('Warning', 'Silakan pilih user dari hasil pencarian.')
    return
  }

  if (!itemId.value) {
    showFeedback('Warning', 'Item ID harus diisi atau dipilih.')
    return
  }

  if (!itemOpt.value && itemOpt.value !== 0) {
    showFeedback('Warning', 'Item Option harus diisi.')
    return
  }

  if (!binding.value) {
    showFeedback('Warning', 'Binding harus dipilih.')
    return
  }

  if (!itemDuration.value || itemDuration.value < 0) {
    showFeedback('Warning', 'Durasi item harus dipilih.')
    return
  }

  if (!itemQty.value || itemQty.value <= 0) {
    showFeedback('Warning', 'Kuantitas item harus lebih dari 0.')
    return
  }

  // Payload siap dikirim
  const payload = {
	token: globalConfig.csrfToken,
	userType: userType.value,
	userId: selectedUserId.value, // biasanya string, tergantung userType
	itemId: parseInt(itemId.value),
	itemOpt: parseInt(itemOpt.value),
	binding: parseInt(binding.value),
	itemDuration: parseInt(itemDuration.value),
	itemQty: parseInt(itemQty.value)
  }

  try {
	showConfirm(`Yakin Mengirim item pada ${userType.value} : ${selectedUserId.value}`, async function (confirmed) {
		if (!confirmed) return;

		const data = await fetchEncrypted('/api_adm/sendItem', 'POST', payload);
		if (data.status === 'success') {
			showFeedback(
				"success",
				data.message
			);
		}else{
			showFeedback(
				"Failed",
				data.message
			);
		}
		
	});
	
  } catch (err) {
		showFeedback(
			"Failed",
			err
		);
  }

  //console.log('Kirim payload:', payload)
  // Kirim ke backend di sini jika diperlukan
}


// =====================
// INIT
// =====================
async function init() {
  const loggedIn = await checkLogin()
  if (!loggedIn || !isAdmin) return

  if (!isAdmin) {
		return;
	}
	
  try {
    const res = await fetch('/items.json')
    items.value = await res.json()
  } catch (e) {
    console.error('Gagal load items.json:', e)
  }
}

onMounted(() => {
  init()
})
</script>
