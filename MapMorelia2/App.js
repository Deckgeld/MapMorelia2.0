import React, { useEffect } from 'react';
import Navigation from './app/navigations/Navegacion';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

export default function App() {
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      console.log(user);
    })
  }, []);
  return <Navigation />
};