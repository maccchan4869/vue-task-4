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
      await firebase.auth().createUserWithEmailAndPassword(email, password).catch(error => {
        console.log(error.message);
      });
      dispatch('updateUserName', displayName);
    },

    // ユーザー名を更新
    async updateUserName({ commit }, displayName) {
      commit('commitLoginUserName', displayName);
      const user = firebase.auth().currentUser;
      if(user === null) return;
      await user.updateProfile({
        displayName: displayName
      }).catch(error => {
        console.log(error.message);
      });

      // デバック用（後にログイン処理に変更）
      alert(`ユーザー名を「${displayName}」に更新しました`);
    }
  },
  modules: {
  }
})
