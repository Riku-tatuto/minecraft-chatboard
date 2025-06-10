// js/menu.js
import { logout } from './auth.js';

document.querySelector('.logo').addEventListener('click', () => {
  window.location = 'home.html';
});

// カテゴリ直接リンク
document.querySelectorAll('nav a[data-cat]').forEach(a => {
  a.addEventListener('click', () => {
    const cat = a.dataset.cat, room = a.dataset-room || '1';
    window.location = `chat.html?cat=${encodeURIComponent(cat)}&room=${room}`;
  });
});

// ユーザーメニュー
document.querySelector('.user-menu').addEventListener('click', () => {
  const sm = document.querySelector('.user-menu .submenu');
  sm.style.display = sm.style.display==='block'?'none':'block';
});

// ユーザーメニュー内操作
document.querySelector('#change-password').addEventListener('click', () => {
  const email = prompt('登録済みメールアドレスを入力');
  if (email) logout(), setTimeout(() => window.location='index.html',100), alert('再設定メールを送信しました。');
});
document.querySelector('#change-username').addEventListener('click', () => {
  window.location = 'username.html';
});
document.querySelector('#logout-menu').addEventListener('click', () => {
  logout();
});
