import { io } from 'socket.io-client';
import { globalConfig, user } from './store';

export const key = "12345678901234567890123456789012";
// crypto.js
export async function encrypt(plaintext, keyStr) {
  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyStr);

  if (![16, 24, 32].includes(keyBytes.length)) {
    throw new Error("Key length must be 16, 24, or 32 bytes");
  }

  const iv = crypto.getRandomValues(new Uint8Array(12));
  const data = encoder.encode(plaintext);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["encrypt"]
  );

  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv: iv },
    cryptoKey,
    data
  );

  // Gabungkan IV dan ciphertext
  const encrypted = new Uint8Array(iv.length + ciphertext.byteLength);
  encrypted.set(iv);
  encrypted.set(new Uint8Array(ciphertext), iv.length);

  return btoa(String.fromCharCode(...encrypted)); // Base64 encode
}

export async function decrypt(encryptedB64, keyStr) {
  const encryptedBytes = Uint8Array.from(atob(encryptedB64), c => c.charCodeAt(0));
  const iv = encryptedBytes.slice(0, 12);
  const ciphertext = encryptedBytes.slice(12);

  const encoder = new TextEncoder();
  const keyBytes = encoder.encode(keyStr);

  if (![16, 24, 32].includes(keyBytes.length)) {
    throw new Error("Key length must be 16, 24, or 32 bytes");
  }

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-GCM" },
    false,
    ["decrypt"]
  );

  const decrypted = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: iv },
    cryptoKey,
    ciphertext
  );

  const decoder = new TextDecoder();
  return decoder.decode(decrypted);
}


export let socketWb;
export async function connectWebSocket() {
	socketWb = new WebSocket(`wss://${globalConfig.GameIp}:${globalConfig.GamePort}`);

	socketWb.addEventListener('open', () => {
		console.log('WebSocket connected');
	});

	socketWb.addEventListener('message', async (event) => {
		console.log('Received (encrypted):', event.data);

		try {
			const decrypted = await decrypt(event.data, key);
			//console.log('Decrypted string:', decrypted);

			const json = JSON.parse(decrypted); // parsing JSON string
			// console.log('Parsed JSON:', json);

			// // Akses nilai-nilainya
			// console.log('Type:', json.type);
			// console.log('Content:', json.content);

			if(json.type == 'mega_to_discord' || json.type == 'discord_to_mega' || json.type == 'shout_to_discord' || json.type == 'discord_to_shout'){
				showFloatingChat(json.content, json.charName);
				
			}else if(json.type == 'payment'){
				//console.log(user.UserID)
				//console.log(json.user)
				if(user.UserID === json.user){
					window.location.reload();
				}
				
			}
			
		} catch (err) {
			console.error('Failed to decrypt or parse JSON:', err);
		}
	});


	socketWb.addEventListener('close', () => {
		console.warn('WebSocket closed. Reconnecting in 3s...');
		setTimeout(connectWebSocket, 3000); // Reconnect setelah 3 detik
	});

	socketWb.addEventListener('error', (error) => {
		console.error('WebSocket error:', error);
		socketWb.close(); // Tutup untuk memicu reconnect
	});
}

function showFloatingChat(message, username) {
  const container = document.getElementById('floating-chat-container');

  const msgBox = document.createElement('div');
  msgBox.className = 'bg-white/90 backdrop-blur-md text-black px-4 py-2 rounded shadow-md animate-fade-slide pointer-events-auto';
  msgBox.innerHTML = `${username} : ${message}`;

  container.appendChild(msgBox);

  // Hapus setelah 4 detik
  setTimeout(() => {
    msgBox.remove();
  }, 4000);
}

