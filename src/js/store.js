// store.js
import { ref, reactive, toRefs  } from 'vue'
import {fetchEncrypted} from '../js/fetch.js'

// Ambil status login dari localStorage
const savedLogin = localStorage.getItem('isLoggedIn') === 'true';
export const isLoggedIn = ref(savedLogin);

const savedUser = JSON.parse(localStorage.getItem('user') || '{}');

// Buat `user` dengan masing-masing field sebagai `ref`
export const user = reactive({
  UserID: ref(savedUser.ID || ''),
  Email: ref(savedUser.Email || ''),
  cash: ref(savedUser.CashTotal || 0),
  forcegem: ref(savedUser.ForcegemHave || 0),
  authtype: ref(savedUser.AuthType || ''),
  Avatar: ref(savedUser.Avatar || ''),
  createDate: ref(savedUser.createDate || ''),
  LoginTime: ref(savedUser.LoginTime || ''),
  Position: ref(savedUser.Position || ''),
  UserNum: ref(savedUser.UserNum || ''),
  useotp: ref(savedUser.useotp || '')

});

// Ambil config dari localStorage
const savedConfig = JSON.parse(localStorage.getItem('globalConfig') || '{}');

// Buat reactive globalConfig
export const globalConfig = reactive({
  csrfToken: ref(savedConfig.csrfToken || ''),
  servername: ref(savedConfig.servername || ''),
  cloudapi: ref(savedConfig.cloudapi || ''),
  domain: ref(savedConfig.domain || ''),
  logoText: ref(savedConfig.logoText || ''),
  title: ref(savedConfig.title || ''),
  description: ref(savedConfig.description || ''),
  keywords: ref(savedConfig.keywords || ''),
  serverzone: ref(savedConfig.serverzone || ''),
  GameIp: ref(savedConfig.GameIp || ''),
  GamePort: ref(savedConfig.GamePort || ''),
  discordInvite: ref(savedConfig.discordInvite || ''),
  facebook: ref(savedConfig.facebook || ''),
  cp_email: ref(savedConfig.cp_email || ''),
  cp_whatsapp: ref(savedConfig.cp_whatsapp || '')
});

export async function checkLogin() {
	try {

		const data = await fetchEncrypted('/api/checkLogin');
		if (data.status === "success") {

			//console.log(data.data)
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

			return true;
		} else {
			isLoggedIn.value = false;
			localStorage.removeItem('isLoggedIn');
			localStorage.removeItem('user');
			return false;
		}
	} catch (error) {
		console.error('Terjadi kesalahan:', error);
		return false;
	}
}

export const isAdmin = ref(false);
export const isGm = ref(false);
// export async function checkAdmin() {

// 	if(!isLoggedIn.value){
// 		isAdmin.value = false;
// 		return;
// 	}
	

// 	try {

// 		const data = await fetchEncrypted('/api_adm/checkAdmin');
// 		if (data.status === "success") {
// 			isAdmin.value = true;
// 			return true;
// 		} else {
// 			isAdmin.value = false;
// 			return false;
// 		}
// 	} catch (error) {
// 		console.error('Terjadi kesalahan:', error);
// 		isAdmin.value = false;
// 		return false;
// 	}
// }

//export const isAdmin = checkAdmin();
