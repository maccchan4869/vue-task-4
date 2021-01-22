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
    <input type="button" class="btn btn-outline-primary btnMargin" value="新規登録" @click="clickRegister">
    <p><router-link to="/">ログインはこちら</router-link></p>
  </div>
</template>

<script>

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
    clickRegister() {
      this.$store.dispatch('registerAccount', {
        displayName : this.displayName,
        email: this.email,
        password: this.password
      });
    }
  }
}
</script>
