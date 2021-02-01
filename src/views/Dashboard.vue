<template>
  <div class="dashboard">
    <div class="loginUserInfo">
      <div class="divLoginUserName">{{ loginUser.userName }}さんようこそ！！</div>
      <div class="divWallet">残高：{{ loginUser.wallet }}</div>
    </div>
  </div>
</template>

<script>
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
  }
}
</script>

<style>
.divLoginUserName, .divWallet {
  display: inline-block;
  width: 50%;
  font-size: 20px;
}
</style>
