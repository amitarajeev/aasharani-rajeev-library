<!-- src/views/FirebaseSigninView.vue -->
<template>
  <div class="auth">
    <h1>Library Sign in</h1>

    <p><input type="text" placeholder="Email" v-model="email" /></p>
    <p><input type="password" placeholder="Password" v-model="password" /></p>

    
    <p>
      <label>Role:&nbsp;</label>
      <select v-model="role">
        <option value="library_staff">library_staff</option>
        <option value="library_visitor">library_visitor</option>
      </select>
    </p>

    <p>
      <button @click="signin">Sign in via Firebase</button>
    </p>

    <div v-if="signedIn" class="result">
      <p>Signed in as: <b>{{ email }}</b></p>
      <p>Selected role (client-side): <b>{{ role }}</b></p>
      <small>
        Open DevTools → Console to see <code>currentUser</code> and role logs.
      </small>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth"

const auth = getAuth()                 

const email = ref("")
const password = ref("")
const role = ref("library_visitor")    // "library_staff" | "library_visitor"
const signedIn = ref(false)

onMounted(() => {
  // Expose auth for manual inspection in the Console:
  window.__auth = auth
  console.log("Auth ready. Try __auth.currentUser in the Console.")
  onAuthStateChanged(auth, (user) => {
    console.log("Auth state changed:", user) // null or _UserImpl
  })
})

const signin = async () => {
  try {
    await signInWithEmailAndPassword(auth, email.value, password.value)

    
    sessionStorage.setItem("role", role.value)
    sessionStorage.setItem("email", email.value)

    console.log("Firebase sign-in successful!")
    console.log("currentUser after sign-in:", auth.currentUser) 
    console.log("Selected role (client-side demo):", role.value)

    signedIn.value = true
  } catch (err) {
    console.log(err.code, err.message)
    signedIn.value = false
  }
}
</script>

<style scoped>
.auth { max-width: 480px; margin: 2rem auto; line-height: 1.6; }
input, select, button { padding: .5rem; }
.result { margin-top: 1rem; padding: .75rem; border: 1px solid #ddd; border-radius: 8px; }
</style>
