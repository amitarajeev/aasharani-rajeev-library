<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-10 col-lg-8 mx-auto">
        <h1 class="text-center mb-4">User Information Form</h1>

        <form @submit.prevent="submitForm">
          <!-- Username + Password -->
          <div class="row g-3 mb-2">
            <div class="col-12 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                id="username"
                type="text"
                class="form-control"
                v-model="formData.username"
                @blur="
                  () => {
                    validateName(true)
                    validateUsernameExtras(true)
                  }
                "
                @input="
                  () => {
                    validateName(false)
                    validateUsernameExtras(false)
                  }
                "
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>

            <div class="col-12 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                id="password"
                type="password"
                class="form-control"
                v-model="formData.password"
                @blur="
                  () => {
                    validatePassword(true)
                    validatePasswordExtras(true)
                    validateReasonExtras(true)
                  }
                "
                @input="
                  () => {
                    validatePassword(false)
                    validatePasswordExtras(false)
                    validateReasonExtras(false)
                  }
                "
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <!-- Australian + Gender -->
          <div class="row g-3 mb-2">
            <div class="col-12 col-sm-6 d-flex align-items-center">
              <div class="form-check">
                <input
                  id="isAustralian"
                  type="checkbox"
                  class="form-check-input"
                  v-model="formData.isAustralian"
                  @change="() => validateResident(true)"
                />
                <label class="form-check-label ms-2" for="isAustralian">Australian Resident?</label>
                <div v-if="errors.resident" class="text-danger mt-1">{{ errors.resident }}</div>
              </div>
            </div>

            <div class="col-12 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                id="gender"
                class="form-select"
                v-model="formData.gender"
                @change="() => validateGender(true)"
              >
                <option value="">Select one…</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <div v-if="errors.gender" class="text-danger mt-1">{{ errors.gender }}</div>
            </div>
          </div>

          <!-- Reason -->
          <div class="row g-3 mb-4">
            <div class="col-12">
              <label for="reason" class="form-label">Reason for joining</label>
              <textarea
                id="reason"
                class="form-control"
                rows="3"
                v-model="formData.reason"
                @blur="
                  () => {
                    validateReason(true)
                    validateReasonExtras(true)
                  }
                "
                @input="
                  () => {
                    validateReason(false)
                    validateReasonExtras(false)
                  }
                "
              ></textarea>
              <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
            </div>
          </div>

          <div class="d-grid gap-2 d-sm-flex justify-content-sm-center">
            <button type="submit" class="btn btn-primary">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>

        <!-- PrimeVue DataTable -->
        <div class="mt-5" v-if="submittedRows.length">
          <h5 class="mb-3">Submitted Users</h5>
          <DataTable :value="submittedRows" dataKey="id" stripedRows responsiveLayout="scroll">
            <Column field="username" header="Username" />
            <Column field="password" header="Password" />
            <Column field="isAustralian" header="Australian Resident" />
            <Column field="gender" header="Gender" />
            <Column field="reason" header="Reason" />
          </DataTable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  isAustralian: false,
  reason: '',
  gender: '',
})

const submittedRows = ref([])

const errors = ref({
  username: null,
  password: null,
  resident: null,
  gender: null,
  reason: null,
})

/* Activity 3 validations (kept) */
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const p = formData.value.password
  const min = 8
  const hasU = /[A-Z]/.test(p)
  const hasL = /[a-z]/.test(p)
  const hasN = /\d/.test(p)
  const hasS = /[!@#$%^&*(),.?":{}|<>]/.test(p)

  if (p.length < min) {
    if (blur) errors.value.password = `Password must be at least ${min} characters long.`
  } else if (!hasU) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasL) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasN) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasS) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateResident = (blur) => {
  if (formData.value.isAustralian !== true) {
    if (blur) errors.value.resident = 'Please confirm if you are an Australian resident.'
  } else {
    errors.value.resident = null
  }
}

const validateGender = (blur) => {
  if (!formData.value.gender) {
    if (blur) errors.value.gender = 'Please select a gender.'
  } else {
    errors.value.gender = null
  }
}

const validateReason = (blur) => {
  const r = formData.value.reason?.trim() || ''
  if (r.length < 5) {
    if (blur) errors.value.reason = 'Please enter at least 5 characters.'
  } else if (r.length > 200) {
    if (blur) errors.value.reason = 'Please keep it under 200 characters.'
  } else {
    errors.value.reason = null
  }
}

/* ------- FIVE EXTRA VALIDATIONS (beyond Activities 1–3) ------- */

/* 1) Username pattern: start with a letter; letters/digits/_ only. Also 2) uniqueness. */
const validateUsernameExtras = (blur) => {
  const u = formData.value.username
  if (u && !/^[A-Za-z][A-Za-z0-9_]*$/.test(u)) {
    if (blur) errors.value.username = 'Start with a letter; use letters, numbers or underscore.'
    return
  }
  // uniqueness against submitted rows
  const exists = submittedRows.value.some((row) => row.username.toLowerCase() === u.toLowerCase())
  if (u && exists) {
    if (blur) errors.value.username = 'This username already exists.'
    return
  }
  // only clear if the base rule (min length) is fine too
  if (u.length >= 3) errors.value.username = null
}

/* 3) Password must not contain spaces (in addition to existing rules). */
const validatePasswordExtras = (blur) => {
  if (/\s/.test(formData.value.password)) {
    if (blur) errors.value.password = 'Password must not contain spaces.'
  } else if (!errors.value.password) {
    // leave as-is if base password validator already set an error
    errors.value.password = null
  }
}

/* 4) Reason must not contain URLs; 5) Reason cannot equal username or password. */
const validateReasonExtras = (blur) => {
  const r = (formData.value.reason || '').trim()
  const urlLike = /(https?:\/\/|www\.)/i.test(r)
  if (r && urlLike) {
    if (blur) errors.value.reason = 'Please avoid links/URLs in the reason.'
    return
  }
  if (r && (r === formData.value.username || r === formData.value.password)) {
    if (blur) errors.value.reason = 'Reason must not match your username or password.'
    return
  }
  // clear if base reason rules also satisfied
  if (r.length >= 5 && r.length <= 200) errors.value.reason = null
}

/* Submit: run ALL validators, then append to DataTable */
const submitForm = () => {
  validateName(true)
  validateUsernameExtras(true)
  validatePassword(true)
  validatePasswordExtras(true)
  validateResident(true)
  validateGender(true)
  validateReason(true)
  validateReasonExtras(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.resident &&
    !errors.value.gender &&
    !errors.value.reason
  ) {
    submittedRows.value.push({
      id: cryptoRandomId(),
      ...formData.value,
    })
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    isAustralian: false,
    reason: '',
    gender: '',
  }
  errors.value = {
    username: null,
    password: null,
    resident: null,
    gender: null,
    reason: null,
  }
}

/* Simple id helper for DataTable row keys */
const cryptoRandomId = () =>
  Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2)
</script>

<style scoped>
.text-danger {
  font-size: 0.875rem;
}
</style>
