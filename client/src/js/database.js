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

// TODO: Agregar lógica a un método que acepte algo de contenido y lo agregue a la base de datos
export const putDb = async (content) => {
  const db = await openDB('jate',1);
  const tr = db.transaction('jate','readwrite');
  const store = tr.objectStore('jate');
  const request = store.put({id:1, jdata: content});
  const result = await request;
};

// TODO: Agregar lógica para un método que obtiene todo el contenido de la base de datos
export const getDb = async () => { 
  //console.error('getDb SI implemented') 
  const db = await openDB('jate',1);
  const tr = db.transaction('jate','readonly');
  const store = tr.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  let data = ``;
  for (let row of result){
    data += `${row.jdata}` ;
  }
  return data;  
};



initdb();
