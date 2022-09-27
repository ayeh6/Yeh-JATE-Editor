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

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
   // Create a connection to IndexDB jate database
   const jateDB = await openDB('jate', 1);

   // Create a new transaction
   // specify the database and data priviliges
   const transaction = jateDB.transaction('jate', 'readwrite');

   // Open the required object store and add content to it
   const store = transaction.objectStore('jate');
   const req = store.add({ text: content });

   const res = await req;
   console.log('Data saved to the database!', res);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
   // Create a connection to IndexDB jate database
   const jateDB = await openDB('jate', 1);

   // Create a new transaction
   // specify the database and data priviliges
   const transaction = jateDB.transaction('jate', 'readonly');

   // Open the required object store and add content to it
   const store = transaction.objectStore('jate');
   const req = store.getAll();

   const res = await req;
   console.log('Data saved to the database!', res);
};

initdb();
