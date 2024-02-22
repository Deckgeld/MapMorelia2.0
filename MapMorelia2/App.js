import React from 'react';
import { SafeAreaView } from 'react-native';
import MapScreen from './assets/mapa'; // Ajusta la ruta según sea necesario

const App = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <MapScreen />
    </SafeAreaView>
  );
};

export default App;
