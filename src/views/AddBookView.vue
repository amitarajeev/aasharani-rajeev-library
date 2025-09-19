<template>
  <div>
    <h1>Add Book</h1>

    <form @submit.prevent="addBook">
      <div>
        <label for="isbn">ISBN:</label>
        <input type="text" v-model="isbn" id="isbn" required />
      </div>
      <div>
        <label for="name">Name:</label>
        <input type="text" v-model="name" id="name" required />
      </div>
      <button type="submit">Add Book</button>
    </form>

    <hr />

    <!-- ====== SCREENSHOT SET 2: where / orderBy / limit ====== -->
    <h2>Query Books (where / orderBy / limit)</h2>

    <div style="display:flex; gap:.5rem; flex-wrap:wrap; margin-bottom:.75rem">
      <button @click="runWhere">where('isbn', '>', 1000)</button>
      <button @click="runOrderByName">orderBy('name','asc')</button>
      <button @click="runOrderByIsbnLimit">orderBy('isbn','desc') + limit(3)</button>
      <button @click="runWhereOrderByLimit">where('isbn','>=',1000) + orderBy('isbn') + limit(5)</button>
    </div>

    <p><b>Active query:</b> {{ activeQuery }}</p>

    <ul v-if="books.length">
      <li v-for="b in books" :key="b.id">
        {{ b.name }} – ISBN: {{ b.isbn }} <small style="opacity:.6">[docId: {{ b.id }}]</small>
      </li>
    </ul>
    <p v-else>No results.</p>
  </div>
</template>

<script>
import { ref } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  addDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'

export default {
  setup() {
    // add form
    const isbn = ref('')
    const name = ref('')

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,       // store as number so numeric queries work
          name: name.value,
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    // query demo state
    const books = ref([])
    const activeQuery = ref('—')

    const load = async (q, label) => {
      activeQuery.value = label
      const snap = await getDocs(q)
      books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      console.log(`[Query] ${label}`, books.value)
    }

    // 1) where
    const runWhere = async () => {
      const q1 = query(collection(db, 'books'), where('isbn', '>', 1000))
      await load(q1, `where('isbn','>',1000)`)
    }

    // 2) orderBy
    const runOrderByName = async () => {
      const q2 = query(collection(db, 'books'), orderBy('name', 'asc'))
      await load(q2, `orderBy('name','asc')`)
    }

    // 3) orderBy + limit
    const runOrderByIsbnLimit = async () => {
      const q3 = query(collection(db, 'books'), orderBy('isbn', 'desc'), limit(3))
      await load(q3, `orderBy('isbn','desc') + limit(3)`)
    }

    // 4) where + orderBy (same field) + limit (no composite index needed)
    const runWhereOrderByLimit = async () => {
      const q4 = query(
        collection(db, 'books'),
        where('isbn', '>=', 1000),
        orderBy('isbn', 'asc'),
        limit(5)
      )
      await load(q4, `where('isbn','>=',1000) + orderBy('isbn','asc') + limit(5)`)
    }

    return {
      // add form
      isbn, name, addBook,
      // queries
      books, activeQuery,
      runWhere, runOrderByName, runOrderByIsbnLimit, runWhereOrderByLimit,
    }
  },
}
</script>
