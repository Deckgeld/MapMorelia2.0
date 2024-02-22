import React from "react";
//Importamos el contenedor de la estructura de navegación
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
//Importamos el tipo de botón en este caso TAB
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
//Importamos el componente (vista) que se relacionará en el menú
import Arbolera from "../screens/Arbolera";
import MapScreen from '../screens/mapa';
import Estadisticas from "../screens/Estadisticas";
import Reportes from "../screens/Reportes";
import Otros from "../screens/Otros";
//Creamos la estructura de tabs
const Tab = createBottomTabNavigator();

export default function Navegacion(){
    return(
    <NavigationContainer>
    <Tab.Navigator>
    {/*Muestra un botón que se vincula a
    nuestro componente importado*/}
    
    <Tab.Screen name="Arbolera" component={MapScreen} />
    <Tab.Screen name="Estadisticas" component={Estadisticas} />
    <Tab.Screen name="Mis Reportes" component={Reportes} />
    <Tab.Screen name="Otros" component={Otros} />
    </Tab.Navigator>
    </NavigationContainer>
    )
   }