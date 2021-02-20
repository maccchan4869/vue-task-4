<template>
  <div class="dashboard">
    <div class="loginUserInfo">
      <div class="divLoginUserName">{{ loginUser.userName }}さんようこそ！！</div>
      <div class="divWallet">残高：{{ loginUser.wallet }}</div>
      <input type="button" class="btn btn-outline-primary btnLogout" value="ログアウト" @click="logout">
    </div>
    <h1 class="userListTitle">ユーザー一覧</h1>
    <div class="otherUserInfo">
      <div class="userNameTitle">ユーザー名</div>
      <ul>
        <li v-for="otherUser in otherUsers" v-bind:key="otherUser.uid">
          <div class="cell divUserName">{{ otherUser.userName }}</div>
          <div class="cell btnDispWallet"><input type="button" class="btn btn-info" value="walletを見る" @click="openWalletModal(otherUser)"></div>
          <div class="cell btnSendWallet"><input type="button" class="btn btn-info" value="送る" @click="openSendModal(otherUser)"></div>
        </li>
      </ul>
    </div>
    <transition-group  name="modal">
      <WalletModal :val="otherUser" @close="closeWalletModal" v-if="isDispWallet"></WalletModal>
      <SendModal :val="loginUser" @close="closeSendModal" @send="sendWallet" v-if="isDispSend"></SendModal>
    </transition-group >
  </div>
</template>

<script>
import firebase from 'firebase'
import WalletModal from '@/components/WalletModal.vue'
import SendModal from '@/components/SendModal.vue'
export default {
  name: 'dashboard',
  data () {
    return {
      otherUser: null,
      otherUsers: [],
      loginUser: {
        uid: '',
        userName: '',
        wallet: 0
      },
      isDispWallet: false,
      isDispSend: false
    }
  },
  created() {
    const users = this.$store.getters.getUsers;
    this.loginUser = users.loginUser;
    this.otherUsers = users.otherUsers;
  },
  components: {
    WalletModal,
    SendModal
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
    // Walletを確認する
    openWalletModal(item) {
      this.isDispWallet = true;
      this.otherUser = item;
    },
    closeWalletModal() {
      this.isDispWallet = false;
    },
    // Walletを送る
    openSendModal(item) {
      this.isDispSend = true;
      this.otherUser = item;
    },
    closeSendModal() {
      this.isDispSend = false;
    },
    sendWallet(val) {
      if(val < 1 || !Number.isInteger(val)){
        console.error('正の整数値を入力してください');
        return
      }
      this.$store.dispatch('updateWallet', {
        loginUserUid: this.loginUser.uid,
        otherUserUid: this.otherUser.uid,
        sendWallet: val
      });
      this.closeSendModal();
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

.otherUserInfo {
  font-size: 20px;
  text-align: left;
  margin: 0 20%;
}

.otherUserInfo ul{
  list-style: none;
}

.otherUserInfo .userNameTitle {
  text-align: center;
  width: 30%;
  font-weight: bold;
}

.otherUserInfo .divUserName {
  text-align: center;
  width: 15%;
}

.otherUserInfo .btnDispWallet {
  width: 60%;
  padding-left: 35%;
}

.otherUserInfo .btnSendWallet {
  width: 25%;
}

.userListTitle {
  margin: 15px 0;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-active,
.modal-leave-active {
  transition: 1s;
}

.modal-enter-active .modalWindow,
.modal-leave-active .modalWindow{
  transition: opacity 0.4s, transform 0.4s;
}

.modal-leave-active {
  transition: opacity 0.6s ease 0.4s;
}

.modal-enter-from .modalWindow,
.modal-leave-to .modalWindow {
  opacity: 0;
  transform: translateY(-20px);
}

</style>
