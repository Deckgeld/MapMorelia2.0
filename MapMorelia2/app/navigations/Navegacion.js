import React from "react";
//Importamos el contenedor de la estructura de navegación
import { NavigationContainer } from "@react-navigation/native";
//Importamos el tipo de botón en este caso TAB
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

//import Icon from 'react-native-vector-icons/MaterialIcons';
//Importamos el componente (vista) que se relacionará en el menú
import RutasArbol from '../navigations/RutasArboles';
import Estadisticas from "../screens/Estadisticas";
import Reportes from "../screens/Reportes";
import Otros from "../screens/Otros";
import RutasCuenta from "../navigations/RutasCuenta";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; // Asegúrate de importar el icono desde la biblioteca correcta

//Creamos la estructura de tabs
const Tab = createBottomTabNavigator();



export default function Navegacion() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Arbolera"
        tabBarStyle={{
          tabBarInactiveTintColor: "#52585E",
          tabBarActiveTintColor: "#00a680",
        }}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => opciones(route, color),
          tabBarActiveTintColor: 'green',
         
        })}>



        {/*Muestra un botón que se vincula a
    nuestro componente importado*/}

        <Tab.Screen name="Arbolera" component={RutasArbol} options={{ title: "Inicio", headerShown: false, }} />
        <Tab.Screen name="Estadisticas" component={Estadisticas} />
        <Tab.Screen name="Cuenta" component={RutasCuenta} options={{
          tabBarLabel: 'Cuenta',
          tabBarIcon: ({color,size}) => (
            <Icon name="account" size={30} color={'green'}/>
          ),
          headerShown: false,
        }}
        />
        <Tab.Screen name="Mis Reportes" component={Reportes} 
        options={{
          tabBarLabel: 'MisReportes',
          tabBarIcon: ({color,size}) => (
            <Icon name="book-open-outline" size={30} color={'green'}/>
          ),
          tabBarBadge:3 ,
        
        }}/>
        <Tab.Screen name="Otros" component={Otros} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}

function opciones(ruta, color) {
  let iconName;
  //De acuerdo al nombre de cada ruta se signa un icono
  switch (ruta.name) {
    case "Arbolera":
      //para buscar iconos https://materialdesignicons.com/
      iconName = "home";
      break;
    case "Estadisticas":
      iconName = "align-vertical-bottom";
      break;
    case "Reportes":
      iconName = "alien";
      break;
    case "Otros":
      iconName = "alien";
      break;
    default:
      break;
  }
  return (
    <Icon type="material-comunity" name={iconName} size={30} color={'green'} />
  )
}