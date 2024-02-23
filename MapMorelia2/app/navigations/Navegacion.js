import React from "react";
//Importamos el contenedor de la estructura de navegación
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from '@react-navigation/stack';
//Importamos el tipo de botón en este caso TAB
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs"
import { Icon } from "react-native-elements";
//import Icon from 'react-native-vector-icons/MaterialIcons';
//Importamos el componente (vista) que se relacionará en el menú
import Arbolera from "../screens/Arbolera";
import MapScreen from '../screens/mapa';
import Estadisticas from "../screens/Estadisticas";
import Reportes from "../screens/Reportes";
import Otros from "../screens/Otros";
import Login from "../screens/login";
//Creamos la estructura de tabs
const Tab = createBottomTabNavigator();

export default function Navegacion(){
    return(
    <NavigationContainer>
    <Tab.Navigator
    initialRouteName="Arbolera"
    tabBarStyle={{
      tabBarInactiveTintColor: "#52585E",
      tabBarActiveTintColor: "#00a680",
    }}
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color }) => opciones(route, color),
    })}>
        


    {/*Muestra un botón que se vincula a
    nuestro componente importado*/}
    
    <Tab.Screen name="Arbolera" component={MapScreen}  options={{title:"Inicio"}}/>
    <Tab.Screen name="Estadisticas" component={Estadisticas}  />
    <Tab.Screen name="Login" component={Login} />
    <Tab.Screen name="Mis Reportes" component={Reportes} />
    <Tab.Screen name="Otros" component={Otros} />
    </Tab.Navigator>
    </NavigationContainer>
    )
   }

   function opciones(ruta, color){
    let iconName;
    //De acuerdo al nombre de cada ruta se signa un icono
    switch (ruta.name) {
    case "Arbolera":
    //para buscar iconos https://materialdesignicons.com/
    iconName="home";
    break;
    case "Estadisticas":
    iconName="report-arc";
    break;
    case "Reportes":
    iconName="report-bar";
    break;
    case "Otros":
    iconName="favorite";
    break;
    default:
    break;
    }
    return(
    <Icon type="material-comunity" name={iconName} size={22} color={color} />
    )
   }