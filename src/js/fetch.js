// fetch.js
import CryptoJS from 'crypto-js';

export async function fetchEncrypted(url, method = 'GET', data = null) {
  try {
    let options = { method: method.toUpperCase() };

    if (data) {
      if (data instanceof FormData) {
        options.body = data;
      } else {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
      }
    }

    const response = await fetch(url, options);
    const res = await response.json();

    const encrypted = res.encrypted;
    const key = CryptoJS.enc.Utf8.parse(res.token);
    const iv = CryptoJS.enc.Utf8.parse(res.token.slice(0, 16));

    const decrypted = CryptoJS.AES.decrypt(encrypted, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
    return JSON.parse(plaintext);
  } catch (e) {
    console.error('Decryption failed:', e);
    return false;
  }
}
