import { getDB } from "./db.config.js"

const db = getDB()

export const booksCollection = db.collection('books')
export const borrowedCollection = db.collection('borrowed')