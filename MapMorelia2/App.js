import React from 'react';
//Importamos la estructura de navegación creada
import Navegacion from './app/navigations/Navegacion';
import { SafeAreaView } from 'react-native';
import MapScreen from './app/screens/mapa'; // Ajusta la ruta según sea necesario

/*const App = () => {
    return  (
        
      <SafeAreaView style={{ flex: 1 }}>
        
        <MapScreen />
        
      </SafeAreaView>
    );
  };*/
  
  export default function App() {
    {/* retornamos como vista la estructura de navegación,
    por default se abrirá la página de Sucursales ya que
    es la definida en nuestro menú*/}
    
    return <SafeAreaView style={{ flex: 1 }}>
    <Navegacion/>
    
    
  </SafeAreaView>
    
    
    
   }




