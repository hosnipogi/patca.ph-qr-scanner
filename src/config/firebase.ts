import { initializeApp } from "firebase/app";
import {
  getFunctions,
  httpsCallable,
  connectFunctionsEmulator,
} from "firebase/functions";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { IMember } from "types";

const projectId = process.env.REACT_APP_PROJECT_ID;
const apiKey = process.env.REACT_APP_API_KEY;
const authDomain = process.env.REACT_APP_AUTH_DOMAIN;
const storageBucket = process.env.REACT_APP_STORAGE_BUCKER;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;

const firebaseConfig = {
  apiKey,
  projectId,
  appId,
  authDomain,
  storageBucket,
  messagingSenderId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const functions = getFunctions(app);

if (process.env.NODE_ENV === "development") {
  console.log("Development");
  connectAuthEmulator(auth, "http://localhost:9099");
  connectFunctionsEmulator(functions, "localhost", 5001);
}

const functionSearchUser = httpsCallable<string, IMember>(
  functions,
  "onSearchUser"
);

const functionUpdateAttendance = httpsCallable<
  string,
  { message: string; dayNum: number }
>(functions, "onUpdateAttendance");

const functionUpdatePaymentStatus = httpsCallable<string, string>(
  functions,
  "onUpdatePaymentStatus"
);

const functionUpdateReceivedSouvenir = httpsCallable<string, string>(
  functions,
  "onUpdateReceivedSouvenir"
);

export {
  auth,
  functionSearchUser,
  functionUpdateAttendance,
  functionUpdatePaymentStatus,
  functionUpdateReceivedSouvenir,
};
