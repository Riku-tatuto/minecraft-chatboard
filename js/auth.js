// js/auth.js
import { auth } from './firebase-config.js';

// ページ読み込み時
auth.onAuthStateChanged(user => {
  if (user) {
    // メール認証済み or Google
    if (!user.emailVerified && user.providerData[0].providerId === 'password') {
      // メール登録かつ未認証なら register.html に戻す
      auth.signOut();
      window.location = 'register.html';
    } else {
      // ユーザー名が DB にあるか確認
      db.ref(`usernames/${user.uid}`).once('value', snap => {
        if (snap.exists()) {
          window.location = 'home.html';
        } else {
          window.location = 'username.html';
        }
      });
    }
  }
});

// メール/パスワード 新規登録
export function registerWithEmail(email, password) {
  auth.createUserWithEmailAndPassword(email, password)
    .then(() => auth.currentUser.sendEmailVerification()
      .then(() => alert('認証メールを送信しました。')))
    .catch(e => alert(e.message));
}

// メール/パスワード ログイン
export function loginWithEmail(email, password) {
  auth.signInWithEmailAndPassword(email, password)
    .catch(e => alert(e.message));
}

// Google ログイン
export function loginWithGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth.signInWithPopup(provider)
    .catch(e => alert(e.message));
}

// ログアウト
export function logout() {
  auth.signOut().then(() => window.location = 'index.html');
}

// パスワードリセット
export function resetPassword(email) {
  auth.sendPasswordResetEmail(email)
    .then(() => alert('パスワード再設定メールを送信しました。'))
    .catch(e => alert(e.message));
}
