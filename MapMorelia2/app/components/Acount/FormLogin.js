import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty } from "lodash";
import firebase from 'firebase/compat/app';

export default function FormRegistro(toast) {
    const { toastRef } = toast;

    //Mostrar contraseña
    const [mostrar, setMostrar] = useState(false);

    /*El estado datos almacenará los datos del formulario por default 
    se inicializa con los campos creados en la función valoresDefault */
    const [datos, setDatos] = useState(valoresDefault);
    //Metodo para enviar los datos
    const onSubmit = () => {
        //Verificamos que no se envíen datos vacíos
        if (isEmpty(datos.email) || isEmpty(datos.password)) {
            //console.log("No puedes dejar campos vacios");
            toastRef.current.show("No puedes dejar campos vacios");
            Alert.alert("Error", "No puedes dejar campos vacios");
        }//Validados la estructura del email
        else if (!validarEmail(datos.email)) {
            //console.log("Estructura del email incorrecta");
            toastRef.current.show("Estructura del email incorrecta");
            Alert.alert("Error", "Estructura del email incorrecta");
        }
        else {
            firebase.auth().signInWithEmailAndPassword( datos.email, datos.password)
                    .then(respuesta => {
                        Alert.alert("Bienvenido", "Has iniciado sesión correctamente");
                        navigation.navigate("cuentas");
                    })
                    .catch(err => {
                        //toastRef.current.show("Email o contraseña incorrecta")
                        Alert.alert("Error", "Email o contraseña incorrecta");
                    });
            }
    };

    //recuperar los datos de cada campo del formulario:
    const onChange = (e, type) => {
        setDatos({ ...datos, [type]: e.nativeEvent.text });
    };
    return (
        <View style={styles.formContainer}>
            <Input
                placeholder="Correo Electrónico"
                containerStyle={styles.inputForm}
                //Evento para activr la funcion e
                onChange={(e) => onChange(e, "email")}
                rightIcon={
                    <Icon
                        type="material-community-icon"
                        name="alternate-email"
                        iconStyle={styles.icono}
                    />
                }
            />
            <Input
                placeholder="Contraseña"
                containerStyle={styles.inputForm}
                password={true}

                //Si mostrar es false se oculta el texto de lo contrario se muestra
                secureTextEntry={mostrar ? false : true}
                onChange={(e) => onChange(e, "password")}
                rightIcon={
                    <Icon
                        type="material-community-icon"
                        //Si mostrar es false se muestra el icono de ocultar contraseña de lo contrario se muestra el icono de ver contraseña
                        name={mostrar ? "visibility" : "visibility-off"}
                        iconStyle={styles.icono}
                        onPress={() => setMostrar(!mostrar)}
                    />
                }
            />
            <Button
                title="Entrar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
                backgroundColor={'green'}
            />
        </View>
    )
}



function valoresDefault() {
    return {
        email: ""
        ,
        password: ""
        ,
    };
}




const styles = StyleSheet.create({
    formContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
    },
    inputForm: {
        width: "100%",
        marginTop: 20,
    },
    btnContainer: {
        marginTop: 20,
        width: "100%",
    },
    btn: {
        backgroundColor: "green",
    },
    icono: {
        color: "#c1c1c1"
    },
})

