import { createStore } from 'vuex'
import firebase from 'firebase'

export default createStore({
  state: {
    loginUser: {
      uid: '',
      userName: '',
      wallet: 0
    },
    otherUsers: [],
  },
  mutations: {
    commitLoginUser(state, val) {
      state.loginUser = val;
    },
    commitOtherUsers(state, val) {
      state.otherUsers = val;
    },
    commitLoginUserWallet(state, val) {
      state.loginUser.wallet = val;
    },
    commitOtherUserWallet(state, val) {
      state.otherUsers.find(user => {
        if(user.uid === val.uid) {
          user.wallet = val.wallet;
        }
      });
    }
  },
  actions: {
    // 新規登録
    async registerAccount({ commit }, {displayName, email, password}) {
      try {
        const initWallet = 2000;
        const otherUsers = [];
        await firebase.auth().createUserWithEmailAndPassword(email, password);
        const users = await firebase.firestore().collection('users').get();
        users.forEach((userDoc) => {
          otherUsers.push({uid: userDoc.get('uid'), userName: userDoc.get('userName'), wallet: userDoc.get('wallet')})
        });
        commit('commitOtherUsers', otherUsers);
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
        const otherUsers = [];
        await firebase.auth().signInWithEmailAndPassword(email, password);
        const uid = firebase.auth().currentUser.uid;
        const users = await firebase.firestore().collection('users').get();
        users.forEach((userDoc) => {
          if(userDoc.id === uid) {
            commit('commitLoginUser', {uid: userDoc.get('uid'), userName: userDoc.get('userName'), wallet: userDoc.get('wallet')});
          } else {
            otherUsers.push({uid: userDoc.get('uid'), userName: userDoc.get('userName'), wallet: userDoc.get('wallet')});
          }
        });
        commit('commitOtherUsers', otherUsers);
      } catch (error) {
        throw error.message;
      }
    },

    // Walletを上書き
    updateWallet({ commit }, {loginUser, otherUser}){
      firebase.firestore().collection('users').doc(loginUser.uid).set({
        wallet: loginUser.wallet
      }, {merge: true});
      firebase.firestore().collection('users').doc(otherUser.uid).set({
        wallet: otherUser.wallet
      }, {merge: true});
      commit('commitLoginUserWallet', loginUser.wallet);
      commit('commitOtherUserWallet', otherUser);
    }
  },
  modules: {
  },
  getters: {
    getLoginUser: state => {
      return state.loginUser;
    },
    getUsers: state => {
      return {
        loginUser: state.loginUser,
        otherUsers: state.otherUsers
      };
    },
  }
})
