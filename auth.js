// ログイン状態監視
auth.onAuthStateChanged(user => {
    if (user) {
        // ユーザー名チェック
        database.ref('users/' + user.uid).once('value').then(snapshot => {
            const username = snapshot.val()?.username;
            if (!username && window.location.pathname !== '/username.html') {
                window.location.href = 'username.html';
            }
        });
        
        // メニューバーにユーザー名表示
        document.getElementById('user-name').textContent = username || '設定中';
    } else {
        document.getElementById('user-name').textContent = 'ゲスト';
    }
});

// 新規登録処理
function register() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.createUserWithEmailAndPassword(email, password)
        .then(userCredential => {
            // メール認証送信
            userCredential.user.sendEmailVerification()
                .then(() => alert('認証メールを送信しました'));
        })
        .catch(error => alert(error.message));
}

// ログイン処理
function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    auth.signInWithEmailAndPassword(email, password)
        .catch(error => alert(error.message));
}

// パスワードリセット
function resetPassword() {
    const email = document.getElementById('email').value;
    
    auth.sendPasswordResetEmail(email)
        .then(() => alert('パスワードリセットメールを送信しました'))
        .catch(error => alert(error.message));
}
