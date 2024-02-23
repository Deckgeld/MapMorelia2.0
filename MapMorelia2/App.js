import React from 'react';
//Importamos la estructura de navegación creada
import Navegacion from './app/navigations/Navegacion';
import { SafeAreaView } from 'react-native';
import MapScreen from './app/screens/mapa'; // Ajusta la ruta según sea necesario

  export default function App() {
    return <SafeAreaView style={{ flex: 1 }}>
    <Navegacion/>
  </SafeAreaView>  
   }