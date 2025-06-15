import { ref } from 'vue'
import {fetchEncrypted} from '../js/fetch.js'

export const isServerInitial = ref(false);

export async function waitForServerInit() {
  while (!isServerInitial.value) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

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


export async function discord() {
	try {
		
		const data = await fetchEncrypted('/api/getLang?value1=site_config&value2=discordInvite');
		if(data.status === "success" ){
			window.open(data.message, '_blank');
		}
	  } catch (error) {
		console.error('Terjadi kesalahan:', error);
		return null;
	  }
}

export function showConfirm(message, callback) {
	const modal = document.getElementById('confirmModal');
	document.getElementById('confirmModalMessage').innerText = message;

	modal.classList.remove('hidden');

	document.getElementById('confirmYesBtn').onclick = () => {
		modal.classList.add('hidden');
		callback(true);
	};

	document.getElementById('confirmNoBtn').onclick = () => {
		modal.classList.add('hidden');
		callback(false);
	};
}


export function getStyleBit(style, shift, size) {
    return (style >> shift) & ((1 << size) - 1);
}

export function style(style) {
    // BattleStyle (3 bit pertama)
    const battleStyle = style & 7;

    // ExtendedBattleStyle (bit ke-23)
    const extendedBattleStyle = (style >> 23) & 1;

    // Gabungkan BattleStyle + Extended (jika bit 23 aktif, tambahkan 8)
    let combinedBattleStyle = battleStyle;
    if (extendedBattleStyle > 0) {
        combinedBattleStyle += 8;
    }

    return {
        'BattleStyle': combinedBattleStyle,
        'Gender': getStyleBit(style, 26, 1),
        'Aura': getStyleBit(style, 22, 4),
        'Hair': getStyleBit(style, 17, 5),
        'Color': getStyleBit(style, 13, 4),
        'Face': getStyleBit(style, 8, 5),
        'Rank': getStyleBit(style, 3, 5),
        'BattleStyleLow': getStyleBit(style, 0, 3),
        'BattleStyleHigh': extendedBattleStyle
    };
}
