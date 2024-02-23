import React, { useRef } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import Toast from 'react-native-easy-toast';
//Componente con la estructura del formualrio de registro
import FormRegistro from "../../components/Acount/FormRegistro.js";

export default function Registrar() {
    const toastRef = useRef();
    return (
        <KeyboardAwareScrollView>
            <Image
                source={require('../../../assets/img/user.png')}
                resizeMethod="auto"
                style={styles.imagen}
            />
            <View style={styles.formulario}>
                {/*Agregamos el componente de formulario*/}
                <FormRegistro toastRef={toastRef} />
            </View>
            
            <Toast ref={toastRef} position="center" opacity={0.9} />
        </KeyboardAwareScrollView>
    );
}

const styles = StyleSheet.create({
    imagen: {
        width: "100%",
        height: 150,
        marginTop: 20,
    },
    formulario: {
        marginTop: 40,
        marginLeft: 40,
        marginRight: 40,
    },
});
