<template>
  <div class="dashboard">
    <div class="loginUserInfo">
      <div class="divLoginUserName">{{ loginUser.userName }}さんようこそ！！</div>
      <div class="divWallet">残高：{{ loginUser.wallet }}</div>
      <input type="button" class="btn btn-outline-primary btnLogout" value="ログアウト" @click="logout">
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'dashboard',
  data () {
    return {
      loginUser: {
        uid: '',
        userName: '',
        wallet: 0
      }
    }
  },
  created() {
    this.loginUser = this.$store.getters.getLoginUser;
  },
  methods: {
    // ログアウト
    async logout() {
      try {
        await firebase.auth().signOut();
        this.$store.commit('commitLoginUser', {uid: '', userName: '', wallet: 0});
        console.log('ログアウトしました');
        this.$router.push('/');
      } catch (error) {
        console.error(error.message);
      }
    },
  }
}
</script>

<style>
.divLoginUserName, .divWallet {
  display: inline-block;
  width: 40%;
  font-size: 20px;
}

.btnLogout {
  display: inline-block;
}
</style>
