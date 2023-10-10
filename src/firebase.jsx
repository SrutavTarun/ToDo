import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBt0CDGhiw5PEZc1O4lt2ud8YgWd1fjql8",
  authDomain: "todo-a34f5.firebaseapp.com",
  projectId: "todo-a34f5",
  storageBucket: "todo-a34f5.appspot.com",
  messagingSenderId: "452639214586",
  appId: "1:452639214586:web:4c07e3ce6babf041d57243"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export default firebaseConfig;
export { auth };
