import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

createApp(App).use(store).use(router).mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyCpbJvsN9lG9I-H5TOV4WjC9ZqIXmclwh4",
  authDomain: "vuetask4.firebaseapp.com",
  projectId: "vuetask4",
  storageBucket: "vuetask4.appspot.com",
  messagingSenderId: "954760057751",
  appId: "1:954760057751:web:86e8c9d363f3ba750daad2"
};

firebase.initializeApp(firebaseConfig);
