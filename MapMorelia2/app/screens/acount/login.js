import React, { useRef } from "react";
import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-easy-toast';
//Componente con la estructura del formualrio de registro
import FormLogin from "../../components/Acount/FormLogin.js";


export default function Login() {
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require("../../../assets/img/user.png")}
                resizeMethod="auto"
                style={styles.usuario}
            />
            <View style={styles.contenedor}>
                <FormLogin toastRef={toastRef} />

                <CrearCuenta />
            </View>
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

function CrearCuenta() {
    const Navegacion = useNavigation();
    return (
        <Text style={styles.textRegistrar}>
            ¿Aún no tienes una cuenta?{" "}
            <Text
            color="green"
                style={styles.link}
                //onPress={() => console.log("Registrar")}
                //onPress={() => Navegacion.navigate("Registro")}
                onPress={() => Navegacion.navigate("Registro")}>
                Regístrate!
                
            </Text>
        </Text>
    );
}

const styles = StyleSheet.create({
    usuario: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    contenedor: {
        marginRight: 40,
        marginLeft: 40,
    },
    textRegistrar: {
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
    },
    link: {
        color: "#0A6ED3",
        fontWeight: "bold",
    },
    divider: {
        backgroundColor: "#0A6ED3",
        margin: 40,
    },
})