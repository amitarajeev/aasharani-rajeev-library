// import './assets/main.css'
// import '@/assets/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { initializeApp } from "firebase/app";

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primevue/themes/aura'
// import DataTable from 'primevue/datatable'
// import Column from 'primevue/Column'

const app = createApp(App)
app.use(PrimeVue, { theme: { preset: Aura } })
app.use(router)
// app.component('DataTable', DataTable)
// app.component('Column', Column)

app.mount('#app')

const firebaseConfig = {
  apiKey: "AIzaSyCYsBs3Ylspn6rcAuG9apccnbuMXd1nffg",
  authDomain: "week7-amita.firebaseapp.com",
  projectId: "week7-amita",
  storageBucket: "week7-amita.firebasestorage.app",
  messagingSenderId: "957263373287",
  appId: "1:957263373287:web:88b76002da474a5a981342"
};

// Initialize Firebase
initializeApp(firebaseConfig);