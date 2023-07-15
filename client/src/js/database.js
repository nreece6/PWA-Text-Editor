import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// Logic for a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to db')

  const contactDb = await openDB('jate', 1)

  const newTransaction = contactDb.transaction('jate', 'readwrite')

  const store = newTransaction.objectStore('jate')

  const request = store.put({ id: 1, value: content })

  const result = await request

  console.log('Data saved to the database', result)
};

// Logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from db')

  const contactDb = await openDB('jate', 1)

  const newTransaction = contactDb.transaction('jate', 'readonly')

  const store = newTransaction.objectStore('jate')

  const request = store.getAll()

  const result = await request

  console.log('result.value', result)
  return result.value
};

initdb();
