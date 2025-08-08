<template>
  <div class="json-lab">
    <h1>🗄️ JSON Data & Vue Directives Lab</h1>

    <section class="lab-section">
      <h2>📚 Working with JSON Arrays</h2>
      <p>Our <code>authors.json</code> contains an array of author objects.</p>

      <h3>Iterating through Arrays</h3>
      <ul>
        <li
          v-for="author in authors"
          :key="author.id"
          :class="{ 'author-highlight': author.name === 'George Orwell' }"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Filtering Arrays</h3>
      <p>Authors born after 1850:</p>
      <ul>
        <li
          v-for="author in modernAuthors"
          :key="author.id"
          :class="{ 'author-highlight': author.name === 'George Orwell' }"
        >
          {{ author.name }} ({{ author.birthYear }})
        </li>
      </ul>

      <h3>Mapping Arrays</h3>
      <p>Famous works:</p>
      <ul>
        <li v-for="work in allFamousWorks" :key="work">
          {{ work }}
        </li>
      </ul>

      <h3>Finding in Arrays</h3>
      <p>Finding by property: {{ orwell?.name }}</p>

      <h3>Nested Arrays/Objects</h3>
      <p>{{ austen?.name }}'s works:</p>
      <!-- TODO: CODE TO RENDER LIST OF AUSTEN'S WORKS HERE -->
    </section>

    <section class="lab-section">
      <h2>🏢 Working with JSON Objects</h2>
      <p>Our <code>bookstores.json</code> is a JSON object.</p>
      <!-- ... -->
    </section>

    <section class="lab-section">
      <h2>v-if & v-else</h2>
      <p>Toggle visibility based on a condition.</p>
      <button @click="showMessage = !showMessage">Toggle Message</button>
      <p v-if="showMessage" class="message success">✨ You're a Vue superstar! ✨</p>
      <p v-else class="message">Click the button to see a message.</p>
    </section>

    <section class="lab-section">
      <h2>Attribute, Class and Style Binding with <code>v-bind</code></h2>
      <p>Highlighting Specific Authors:</p>
    </section>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

import authors from '../assets/json/authors.json'
import bookstores from '../assets/json/bookstores.json'

const showMessage = ref(false)

// Activity 2: Get authors born after 1850
const modernAuthors = computed(() => authors.filter((author) => author.birthYear > 1850))

// Activity 3: Get all famous works
const allFamousWorks = computed(() =>
  authors.flatMap((author) => author.famousWorks.map((work) => work.title)),
)

// Activity 4: Find author by name
const orwell = computed(() => authors.find((author) => author.name === 'George Orwell'))

// Activity 5: Find author by ID
const austen = computed(() => authors.find((author) => author.id === 1))
</script>

<style scoped>
.json-lab {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f4f4f4;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.08);
  color: #111;
}

h1 {
  text-align: center;
  font-size: 2.4rem;
  margin-top: 10px;
  margin-bottom: 30px;
  color: #222;
  font-weight: 600;
  letter-spacing: 0.01em;
}

.lab-section {
  background-color: #fff;
  color: #111;
  padding: 24px 24px 18px 24px;
  margin-bottom: 28px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.03);
}

h2 {
  color: #222;
  font-size: 1.6rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  margin-bottom: 8px;
  margin-top: 0;
}

h3 {
  color: #181818;
  font-size: 1.3rem;
  font-weight: 600;
  margin-top: 26px;
  margin-bottom: 8px;
  letter-spacing: 0.01em;
}

ul {
  list-style-type: none;
  padding: 0;
  margin-bottom: 12px;
}
li {
  background-color: #ededed;
  color: #111;
  font-size: 1.23rem;
  padding: 14px 14px 12px 14px;
  margin: 9px 0;
  border-radius: 7px;
  font-weight: 500;
  transition: background 0.18s;
}

li:not(:last-child) {
  margin-bottom: 6px;
}

/* HIGHLIGHT STYLE */
.author-highlight {
  background-color: #42b883 !important;
  color: #fff !important;
  font-weight: 700;
  border: 2px solid #368d6e;
}

p {
  color: #222;
  font-size: 1.11rem;
  margin-bottom: 6px;
}

.message {
  padding: 10px;
  border-radius: 5px;
  margin-top: 10px;
  font-size: 1.08rem;
  color: #1e321f;
  background: #ededed;
  border: 1px solid #ededed;
  font-weight: 500;
}

.success {
  background-color: #e7faf3;
  color: #42b883;
  border: 1px solid #42b883;
}

code {
  background-color: #e0e0e0;
  color: #3e3e3e;
  padding: 2px 7px;
  border-radius: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1.02rem;
}
button {
  font-size: 1.06rem;
  padding: 7px 18px;
  margin-bottom: 12px;
  border-radius: 4px;
  border: 1px solid #c3c3c3;
  background: #fff;
  cursor: pointer;
  font-family: inherit;
  font-weight: 500;
  transition: background 0.2s;
}
button:hover {
  background: #f6f6f6;
}
</style>
