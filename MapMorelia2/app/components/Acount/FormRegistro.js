import React, { useState } from 'react';
import { StyleSheet, View, Text, Alert } from "react-native";
import { Input, Icon, Button } from "react-native-elements";
import { validarEmail } from "../../utils/validaciones";
import { size, isEmpty } from "lodash";
import firebase from 'firebase/compat/app';
import {useNavigation} from "@react-navigation/native"

export default function FormRegistro(toast) {
    const { toastRef } = toast;
    const navegacion=useNavigation();

    //Mostrar contraseña
    const [mostrar, setMostrar] = useState(false);
    const [mostrarRepetir, setMostrarRepetir] = useState(false);

    /*El estado datos almacenará los datos del formulario por default 
    se inicializa con los campos creados en la función valoresDefault */
    const [datos, setDatos] = useState(valoresDefault);
    //Metodo para enviar los datos
    const onSubmit = () => {
        //Verificamos que no se envíen datos vacíos
        if (isEmpty(datos.email) || isEmpty(datos.password) || isEmpty(datos.repeatedPassword)) {
            toastRef.current.show("No puedes dejar campos vacios");
        }//Validados la estructura del email
        else if (!validarEmail(datos.email)) {
            Alert.alert("Estructura del email incorrecta");
        }//Validamos que la contraseña tenga al menos 6 carácteres
        else if (size(datos.password) < 6) {
            Alert.alert("La contraseña debe tener al menos 6 caracteres");
        }//Validamos que las contraseñas sean iguales
        else if (datos.password !== datos.repeatedPassword) {
            //console.log("Las contraseñas deben ser iguales");
            Alert.alert("Las contraseñas deben ser iguales");
        }//Si todo es correcto visualizaremos los datos
        else {
            firebase.auth().createUserWithEmailAndPassword(datos.email, datos.password)
                .then(respuesta => {
                    Alert.alert("Registro exitoso", "Se ha registrado correctamente",)
                    navegacion.navigate("Login");
                })
                .catch(err => {
                    Alert.alert("El correo electrónico ya está en uso, intente con un correo diferente")
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
            <Input
                placeholder="Repetir Contraseña"
                containerStyle={styles.inputForm}
                password={true}

                //Mostrar repetirContraeña
                secureTextEntry={mostrarRepetir ? false : true}
                onChange={(e) => onChange(e, "repeatedPassword")}
                rightIcon={
                    <Icon
                        type="material-community-icon"
                        name={mostrarRepetir ? "visibility" : "visibility-off"}
                        iconStyle={styles.icono}
                        onPress={() => setMostrarRepetir(!mostrarRepetir)}
                    />
                }
            />
            <Button
                title="Registrar"
                containerStyle={styles.btnContainer}
                buttonStyle={styles.btn}
                onPress={onSubmit}
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
        repeatedPassword: ""
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
        backgroundColor: "#0A6ED3",
    },
    icono: {
        color: "#c1c1c1"
    },
})

