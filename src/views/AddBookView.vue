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

    <h2>Manage Books (Update / Delete)</h2>
    <ul v-if="books.length">
      <li v-for="b in books" :key="b.id" style="margin-bottom:.5rem">
        <input v-model="b.name" placeholder="Book name" />
        <input v-model="b.isbn" placeholder="ISBN" style="width:120px;margin-left:.5rem" />
        <button @click="updateBook(b)" style="margin-left:.5rem">Update</button>
        <button @click="deleteBook(b.id)" style="margin-left:.25rem">Delete</button>
        <small style="margin-left:.5rem;opacity:.7">docId: {{ b.id }}</small>
      </li>
    </ul>
    <p v-else>No books yet.</p>
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue'
import db from '../firebase/init.js'
import {
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'

export default {
  setup() {
    const isbn = ref('')
    const name = ref('')
    const books = ref([])

    // Live list (easier to show updates/deletes in your screenshot)
    let unsubscribe = null
    onMounted(() => {
      const colRef = collection(db, 'books')
      unsubscribe = onSnapshot(colRef, snap => {
        books.value = snap.docs.map(d => ({ id: d.id, ...d.data() }))
      })
    })
    onUnmounted(() => unsubscribe && unsubscribe())

    const addBook = async () => {
      try {
        const isbnNumber = Number(isbn.value)
        if (isNaN(isbnNumber)) {
          alert('ISBN must be a valid number')
          return
        }
        await addDoc(collection(db, 'books'), {
          isbn: isbnNumber,
          name: name.value,
        })
        isbn.value = ''
        name.value = ''
        alert('Book added successfully!')
      } catch (error) {
        console.error('Error adding book: ', error)
      }
    }

    const updateBook = async (b) => {
      try {
        const docRef = doc(db, 'books', b.id)
        const nextIsbn = isNaN(Number(b.isbn)) ? b.isbn : Number(b.isbn)
        await updateDoc(docRef, { name: b.name, isbn: nextIsbn })
        alert('Book updated!')
      } catch (error) {
        console.error('Error updating book: ', error)
      }
    }

    const deleteBook = async (id) => {
      try {
        if (!confirm('Delete this book?')) return
        await deleteDoc(doc(db, 'books', id))
        alert('Book deleted.')
      } catch (error) {
        console.error('Error deleting book: ', error)
      }
    }

    return { isbn, name, books, addBook, updateBook, deleteBook }
  },
}
</script>
