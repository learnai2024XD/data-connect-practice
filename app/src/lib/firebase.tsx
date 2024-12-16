/**
 * Copyright 2024 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { initializeApp, getApps } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import {
  connectDataConnectEmulator,
  getDataConnect,
} from "firebase/data-connect";
import { connectorConfig } from '@movie/dataconnect';
import { createContext } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyC9Om-WIOuFTs8Iex6ra_wXfjpa2sVzL40",
  authDomain: "test-92fe8.firebaseapp.com",
  databaseURL: "https://test-92fe8.firebaseio.com",
  projectId: "test-92fe8",
  storageBucket: "test-92fe8.firebasestorage.app",
  messagingSenderId: "1036787337640",
  appId: "1:1036787337640:web:02b1aa38340bb57c44b59d",
  measurementId: "G-QQ0S0WCCKF"
};


const firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebaseApp);
const dataconnect = getDataConnect(firebaseApp, connectorConfig);

if (process.env.NODE_ENV === "development") {
  connectDataConnectEmulator(dataconnect, "127.0.0.1", 9401,false);
  connectAuthEmulator(auth, "http://localhost:9099");
}

const AuthContext = createContext(auth);

function AuthProvider({ children }: { children: React.ReactNode }) {
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export { AuthContext, AuthProvider };
