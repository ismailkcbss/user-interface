import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAd6pLklYb2fZWv0V0eLdERrIdnXlNDpCg",
  authDomain: "user-interface-92994.firebaseapp.com",
  projectId: "user-interface-92994",
  storageBucket: "user-interface-92994.appspot.com",
  messagingSenderId: "501732311031",
  appId: "1:501732311031:web:681de878ea12c899eff8f2",
  measurementId: "G-BQG4CZSDJC"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);