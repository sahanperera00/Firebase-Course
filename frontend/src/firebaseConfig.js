import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCRSI004wdLhieqfO93whI-x7brfQy4VIo",
  authDomain: "fir-frontend-c2209.firebaseapp.com",
  projectId: "fir-frontend-c2209",
  storageBucket: "fir-frontend-c2209.appspot.com",
  messagingSenderId: "1066573927401",
  appId: "1:1066573927401:web:82513b730ace238de1f178",
};

export const app = initializeApp(firebaseConfig);
export const databese = getFirestore(app);
