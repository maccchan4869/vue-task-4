<template>
  <div class="register">
    <h1>新規登録画面</h1>
    <div>
      <div class="cell cellTitle">ユーザー名</div>
      <div class="cell cellInput"><input type="text" placeholder="UserName" v-model="displayName"></div>
    </div>
    <div>
      <div class="cell cellTitle">メールアドレス</div>
      <div class="cell cellInput"><input type="text" placeholder="E-mail" v-model="email"></div>
    </div>
    <div>
      <div class="cell cellTitle">パスワード</div>
      <div class="cell cellInput"><input type="password" placeholder="Password" v-model="password"></div>
    </div>
    <input type="button" class="btn btn-outline-primary btnMargin" value="新規登録" @click="registerAccount">
    <p><router-link to="/">ログインはこちら</router-link></p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'register',
  data () {
    return {
      displayName: '',
      email: '',
      password: ''
    }
  },
  methods: {
    // アカウントを作成
    async registerAccount() {
      await firebase.auth().createUserWithEmailAndPassword(this.email, this.password).catch(error => {
        alert(error.message);
      });
      this.registerUserInfo();
    },

    // ユーザ情報を登録
    async registerUserInfo() {
      const user = firebase.auth().currentUser;
      if (user != null) {
        await user.updateProfile({
          displayName: this.displayName
        }).catch(error => {
          alert(error.message);
        });
        // デバック用
        const ret = firebase.auth().currentUser;
        if (ret != null) {
          alert(`登録したユーザー名は${ret.displayName}`);
          alert(`登録したメールアドレスは${ret.email}`);
        }
      }
    },
  }
}
</script>
