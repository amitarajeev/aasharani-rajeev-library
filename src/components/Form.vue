<template>
  <div class="container mt-5">
    <div class="row">
      <!-- Centered content, comfortable max width on larger screens -->
      <div class="col-12 col-md-10 col-lg-8 mx-auto">
        <h1 class="text-center mb-4">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <!-- Username + Password -->
          <div class="row g-3 mb-2">
            <!-- Two columns from sm (≥576px), stacked on xs -->
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input type="text" class="form-control" id="username" v-model="formData.username" />
            </div>
            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
            </div>
          </div>

          <!-- Australian + Gender -->
          <div class="row g-3 mb-2">
            <div class="col-12 col-sm-6 d-flex align-items-center">
              <div class="form-check">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isAustralian"
                  v-model="formData.isAustralian"
                />
                <label class="form-check-label ms-2" for="isAustralian">
                  Australian Resident?
                </label>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select class="form-select" id="gender" v-model="formData.gender">
                <option value="" disabled>Select one…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <!-- Reason -->
          <div class="row g-3 mb-4">
            <div class="col-12">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                class="form-control"
                id="reason"
                rows="3"
                v-model="formData.reason"
              ></textarea>
            </div>
          </div>

          <!-- Buttons: stack on xs, inline from sm -->
          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- Submitted cards, responsive grid -->
        <div class="mt-5" v-if="submittedCards.length">
          <h5 class="mb-3">Submitted Users</h5>
          <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-3 g-3">
            <div class="col" v-for="(card, index) in submittedCards" :key="index">
              <div class="card h-100">
                <div class="card-header">User Information</div>
                <ul class="list-group list-group-flush">
                  <li class="list-group-item">Username: {{ card.username }}</li>
                  <li class="list-group-item">Password: {{ card.password }}</li>
                  <li class="list-group-item">
                    Australian Resident: {{ card.isAustralian ? 'Yes' : 'No' }}
                  </li>
                  <li class="list-group-item">Gender: {{ card.gender }}</li>
                  <li class="list-group-item">Reason: {{ card.reason }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'

const initial = {
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
}

const formData = reactive({ ...initial })
const submittedCards = ref([])

const submitForm = () => submittedCards.value.push({ ...formData })
const clearForm = () => Object.assign(formData, initial)
</script>

<style scoped>
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
.list-group-item {
  padding: 10px;
}
</style>
