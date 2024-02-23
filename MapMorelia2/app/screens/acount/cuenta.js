// Cuentas.js
import React, { useState, useEffect } from "react";
import { Text } from "react-native";

import { firebaseApp } from "../../firebase-config";
import 'firebase/auth';

import Logged from "./logged";
import Loginn from "./login";

export default function Cuentas() {
  const [login, setLogin] = useState(null);

  useEffect(() => {
    // Verificar el estado de autenticación
    firebaseApp.auth().onAuthStateChanged((user) => {
      !user ? setLogin(false) : setLogin(true);
    });
  }, []);

  if (login === null) return <Text>Cargando...</Text>;

  return login ? <Logged /> : <Loginn />;
}
