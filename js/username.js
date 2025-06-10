// js/username.js
import { auth, db } from './firebase-config.js';
import { logout } from './auth.js';

const form = document.getElementById('username-form');
form.addEventListener('submit', async e => {
  e.preventDefault();
  const name = form.username.value.trim();
  if (!name) return alert('ユーザー名を入力してください');
  // 重複確認
  const snap = await db.ref('usernames').orderByValue().equalTo(name).once('value');
  if (snap.exists()) return alert('そのユーザー名は既に使われています');
  const uid = auth.currentUser.uid;
  // ユーザー名登録
  await db.ref(`usernames/${uid}`).set(name);
  // 逆引き用
  await db.ref(`users/${uid}`).set({ username: name, createdAt: Date.now() });
  window.location = 'home.html';
});

// 「戻る」でログアウト
document.getElementById('btn-cancel').addEventListener('click', () => {
  logout();
});
