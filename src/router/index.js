import { createRouter, createWebHistory } from 'vue-router'

// Guest Pages
import Home from '../pages/guest/Home.vue'
import Download from '../pages/guest/Download.vue'
import Rank from '../pages/guest/Rank.vue'
import Login from '../pages/guest/Login.vue'
import Register from '../pages/guest/Register.vue'
import Forgot from '../pages/guest/Forgot.vue'
import News from '../pages/guest/News.vue'

// User Pages
import UserDashboard from '../pages/user/Dashboard.vue'
import Donation from '../pages/user/Donation.vue'
import Vote from '../pages/user/Vote.vue'
import Settings from '../pages/user/Settings.vue'

// Admin Pages
import AdminDashboard from '../pages/admin/Dashboard.vue'
import ANews from '../pages/admin/ANews.vue'
import ASendItem from '../pages/admin/ASendItem.vue'

import { isLoggedIn, isAdmin, isGm } from '@/js/store';

const routes = [
  {
    path: '/',
    //component: GuestLayout,
    children: [
	  { path: '', name: '', component: Home },
      { path: 'home', name: 'Home', component: Home },
      { path: 'download', name: 'Download', component: Download },
      { path: 'rank', name: 'Rank', component: Rank },
      { path: 'login', name: 'Login', component: Login },
      { path: 'register', name: 'Register', component: Register },
	  { path: 'forgot', name: 'Forgot', component: Forgot },
    ]
  },
  {
    path: '/user',
    //component: UserLayout,
    children: [
      { path: '', name: 'UserDashboard', component: UserDashboard },
	  { path: 'home', name: 'UserDashboard', component: UserDashboard },
	  { path: 'donation', name: 'Donation', component: Donation },
	  { path: 'vote', name: 'Vote', component: Vote },
	  { path: 'settings', name: 'Settings', component: Settings }
      // Tambahkan route lain seperti /user/profile, dll.
    ]
  },
  {
    path: '/admin',
    //component: AdminLayout,
    children: [
      { path: '', name: 'AdminDashboard', component: AdminDashboard },
	  { path: 'news', name: 'ANews', component: ANews },
	  { path: 'senditem', name: 'ASendItem', component: ASendItem }
      // Tambahkan route lain seperti /admin/users, dll.
    ]
  },
  {
	path: '/news',
	component: News,  // Parent component yang punya <router-view />
	children: [
		{
		path: '',   // ini default anak route, jadi URL = /news
		name: 'NewsList',
		component: News // Bisa pisah komponen list dan detail agar jelas
		},
		{
		path: ':id/:slug(.*)*',  // URL contoh: /news/123/berita-judul
		name: 'NewsDetail',
		component: News
		}
	]
	}



]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to, from, next) => {
  if (to.path.startsWith('/user') && !isLoggedIn.value) {
    next({ path: '/' });
  }else if (to.path.startsWith('/admin') && isLoggedIn.value) {
	//const isAdmin = await checkAdmin();
	//console.log(isAdmin)
	if (!(isAdmin || isGm)) {
		next({ path: '/' });
	} else {
		next();
	}

    
  } else {
    next();
  }
});


export default router
