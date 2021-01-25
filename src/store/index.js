import { createStore } from 'vuex'
import firebase from 'firebase'

export default createStore({
  state: {
    loginUserName: ''
  },
  mutations: {
    commitLoginUserName(state, val) {
      state.loginUserName = val;
    }
  },
  actions: {
    // アカウントを作成
    async registerAccount({ dispatch }, {displayName, email, password}) {
      try {
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        dispatch('updateUserName', displayName);
      } catch (error) {
        console.log(error.message);
      }
    },

    // ユーザー名を更新
    async updateUserName({ commit }, displayName) {
      try {
        commit('commitLoginUserName', displayName);
        const user = firebase.auth().currentUser;
        if(user === null) return;
        await user.updateProfile({displayName: displayName});
        alert(`ユーザー名を「${displayName}」に更新しました`);
      } catch (error) {
        console.log(error.message);
      }
    },

    // ログイン
    async login({ commit }, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const user = firebase.auth().currentUser;
        if(user === null) return;
        commit('commitLoginUserName', user.displayName);
        // デバック用（後にページ遷移処理に変更）
        alert(`ユーザー名「${user.displayName}」でログインしました`);
      } catch (error) {
        console.log(error.message);
      }
    },
  },
  modules: {
  }
})
