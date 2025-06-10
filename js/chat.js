// js/chat.js
import { auth, db } from './firebase-config.js';
import { logout } from './auth.js';
import './ocr.js';

const url = new URL(location);
const cat = url.searchParams.get('cat');
const room = url.searchParams.get('room');
const chatPath = `chats/${cat}/room${room}`;

document.getElementById('room-name').textContent = `${cat} / 部屋${room}`;

// リアルタイム読み込み
db.ref(chatPath).on('child_added', snap => {
  const msg = snap.val();
  renderMessage(msg);
});

document.getElementById('send-btn').addEventListener('click', async () => {
  const txt = document.getElementById('msg-input').value.trim();
  if (!txt) return;
  const user = auth.currentUser;
  const userName = (await db.ref(`usernames/${user.uid}`).once('value')).val();
  const now = Date.now();
  const msgObj = {
    uid: user.uid,
    username: userName,
    text: txt,
    timestamp: now,
  };
  await db.ref(chatPath).push(msgObj);
  document.getElementById('msg-input').value = '';
});

// 画像→テキスト送信トリガー
document.getElementById('img-input').addEventListener('change', async e => {
  const file = e.target.files[0];
  if (!file) return;
  const txt = await ocrProcess(file);
  document.getElementById('msg-input').value = txt;
});

function renderMessage({ username, text, timestamp }) {
  const div = document.createElement('div');
  div.classList.add('message');
  div.innerHTML = `
    <div class="meta">${username}<span class="time">${new Date(timestamp).toLocaleString()}</span></div>
    <div class="content">${text}</div>
  `;
  document.getElementById('chat-window').appendChild(div);
}

// 戻るボタン
document.getElementById('btn-back').addEventListener('click', () => window.location='home.html');
