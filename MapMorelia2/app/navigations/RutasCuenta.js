import React from "react";
/*Importamos la libreria de StackNavigation, la cual
 permite definir forma para que su aplicación haga 
 la transición entre pantallas */
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//Creamos el objeto de control de nuestra pila de pantallas
const Stack = createNativeStackNavigator();
//Importamos las pantallas que deseamos agregar a la ruta
//import Login from "../screens/Account/Login";
import Cuentas from "../screens/acount/cuenta";
import Login from "../screens/acount/login";
import Registrar from "../screens/acount/registrar";


export default function RutasCuenta() {
    //Las primera pantalla que aparece eb la pila será la que se muestre
    //por default al importar nuestro archivo
    return (
        <Stack.Navigator>

            <Stack.Screen
                name="cuentas"
                component={Cuentas}
                options={{ title: "Mi Cuenta" }} />

            <Stack.Screen
                name="Login"
                component={Login}
                option={{ title: "Iniciar Sesion" }} />

            <Stack.Screen
                name="Registro"
                component={Registrar}
                option={{ title: "Registro de  la aplicacion" }} />

        </Stack.Navigator>
    );

}