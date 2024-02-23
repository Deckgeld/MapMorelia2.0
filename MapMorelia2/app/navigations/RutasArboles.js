import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AddArbol from '../screens/Arboles/AddArbol';
import Registros from '../screens/Arboles/mapa';

const Stack = createStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Arboledo" component={Registros} />
      <Stack.Screen name="Agregar Arbol" component={AddArbol} />
    </Stack.Navigator>
  );
};

export default StackScreen;