<template>
  <div class="login">
    <h1>ログイン画面</h1>
    <div>
      <div class="cell cellTitle">メールアドレス</div>
      <div class="cell cellInput"><input type="text" placeholder="E-mail" v-model="email"></div>
    </div>
    <div>
      <div class="cell cellTitle">パスワード</div>
      <div class="cell cellInput"><input type="password" placeholder="Password" v-model="password"></div>
    </div>
    <input type="button" class="btn btn-outline-primary btnMargin" value="ログイン" @click="clickLogin">
    <p><router-link to="/register">新規登録はこちら</router-link></p>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    // ログイン
    async clickLogin() {
      try {
        await this.$store.dispatch('login', {
          email: this.email,
          password: this.password
        });
        this.$router.push('/dashboard');
      } catch (error) {
        console.error(error);
      }
    }
  }
}
</script>
