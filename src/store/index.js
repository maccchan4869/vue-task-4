import { createStore } from 'vuex'
import firebase from 'firebase'

export default createStore({
  state: {
    loginUser: {
      uid: '',
      userName: '',
      wallet: 0
    }
  },
  mutations: {
    commitLoginUser(state, val) {
      state.loginUser = val;
    }
  },
  actions: {
    // 新規登録
    async registerAccount({ commit }, {displayName, email, password}) {
      try {
        const initWallet = 2000;
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const uid = firebase.auth().currentUser.uid;
        firebase.firestore().collection('users').doc(uid).set({
          uid: uid,
          userName: displayName,
          wallet: initWallet
        })
        commit('commitLoginUser', {uid: uid, userName: displayName, wallet: initWallet});
      } catch (error) {
        throw error.message;
      }
    },

    // ログイン
    async login({ commit }, {email, password}) {
      try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const uid = firebase.auth().currentUser.uid;
        const dataDoc = await firebase.firestore().collection('users').doc(uid).get();
        commit('commitLoginUser', {uid: uid, userName: dataDoc.get('userName'), wallet: dataDoc.get('wallet')});
      } catch (error) {
        throw error.message;
      }
    },
  },
  modules: {
  },
  getters: {
    getLoginUser: state => {
      return state.loginUser;
    }
  }
})
