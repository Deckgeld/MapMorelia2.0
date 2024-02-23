import React, { useState } from "react";
import { StyleSheet, View, ScrollView, Alert, Dimensions, Text, TextInput } from "react-native";
import { Icon, Avatar, Image, Button } from "react-native-elements";

import * as Permission from "expo-permissions";
import * as ImagePicker from "expo-image-picker";
import { map, size, filter } from "lodash";

import uuid from "random-uuid-v4";
import { firebaseApp } from "../../firebase-config";
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
const db = firebase.firestore(firebaseApp);

import { useNavigation } from "@react-navigation/native"

const WidthScreen = Dimensions.get("window").width;

export default function FormArb() {
    const [ubicacion, setUbicacion] = useState('');
    const [nombreComun, setNombreComun] = useState('');
    const [nombreCientifico, setNombreCientifico] = useState('');
    const [edad, setEdad] = useState('');
    const [altura, setAltura] = useState('');
    const [grosorTallo, setGrosorTallo] = useState('');
    const [densidadFollaje, setDensidadFollaje] = useState('');
    const [afectaciones, setAfectaciones] = useState('');
    const [relacionArbol, setRelacionArbol] = useState('');

    const [imagenes, setImagenes] = useState([]);
    const navegacion = useNavigation();

    const agregar = () => {
        if (!ubicacion || !nombreComun || !nombreCientifico || !edad || !altura || !grosorTallo || !densidadFollaje || !afectaciones || !relacionArbol) {
            Alert.alert("Todos los campos son obligatorios");
        } 
        // else if (size(imagenes) === 0) {
        //     Alert.alert("El comentario debe tener al menos 1 imagen");
        // } 
        else {
            subirImagenesStorage().then((resp) => {
                db.collection("Reportes")
                    .add({
                        ubicacion: ubicacion,
                        nombreComun: nombreComun,
                        nombreCientifico: nombreCientifico,
                        edad: edad,
                        altura: altura,
                        grosorTallo: grosorTallo,
                        densidadFollaje: densidadFollaje,
                        afectaciones: afectaciones,
                        relacionArbol: relacionArbol,
                        imagenes: resp,
                        creado: new Date(),
                        creadoPor: firebase.auth().currentUser.uid,
                    })
                    .then(() => {
                        Alert.alert("Reporte creado correctamente");
                        navegacion.navigate("Arboledo");
                    })
                    .catch(() => {
                        Alert.alert("Error al crear el reporte");
                        navegacion.navigate("Arboledo");
                    });
            });
        }
    };

    const subirImagenesStorage = async () => {
        const imagenesBlob = [];
        await Promise.all(
            map(imagenes, async (imagen) => {
                const response = await fetch(imagen);
                const blob = await response.blob();
                const ref = firebase.storage().ref("Reportes").child(uuid());
                await ref.put(blob).then(async (resultado) => {
                    await firebase.storage().ref(`Reportes/${resultado.metadata.name}`)
                        .getDownloadURL()
                        .then((urlFoto) => {
                            imagenesBlob.push(urlFoto);
                        });
                });
            })
        );
        return imagenesBlob;
    };

        return (
        <ScrollView style={styles.scroll}>
            <ImagenPrincipal imagen={imagenes[0]} />
            <Formulario
                setUbicacion={setUbicacion}
                setNombreComun={setNombreComun}
                setNombreCientifico={setNombreCientifico}
                setEdad={setEdad}
                setAltura={setAltura}
                setGrosorTallo={setGrosorTallo}
                setDensidadFollaje={setDensidadFollaje}
                setAfectaciones={setAfectaciones}
                setRelacionArbol={setRelacionArbol}
            />
            <SubirImagen
                imagenes={imagenes}
                setImagenes={setImagenes}
            />
            <Button
                title="Registrar Arbol"
                buttonStyle={styles.btn}
                onPress={agregar}
            />
        </ScrollView>
    );
}

function Formulario(propiedades) {
    const {
        setUbicacion,
        setNombreCientifico,
        setNombreComun,
        setEdad,
        setAltura,
        setGrosorTallo,
        setDensidadFollaje,
        setRelacionArbol,
        setAfectaciones,
    } = propiedades;

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.vista}>
                <Text>Ubicación:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese la ubicación"
                    onChangeText={setUbicacion}
                    value={setUbicacion}
                />
            </View>
            <View style={styles.vista}>
                <Text>Nombre Común:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese el nombre común"
                    onChangeText={setNombreComun}
                    value={setNombreComun}
                />
            </View>
            <View style={styles.vista}>
                <Text>Nombre Científico:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese el nombre científico"
                    onChangeText={setNombreCientifico}
                    value={setNombreCientifico}
                />
            </View>
            <View style={styles.vista}>
                <Text>Edad:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese la edad"
                    onChangeText={setEdad}
                    value={setEdad}
                />
            </View>
            <View style={styles.vista}>
                <Text>Altura:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese la altura"
                    onChangeText={setAltura}
                    value={setAltura}
                />
            </View>
            <View style={styles.vista}>
                <Text>Grosor del Tallo:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese el grosor del tallo"
                    onChangeText={setGrosorTallo}
                    value={setGrosorTallo}
                />
            </View>
            <View style={styles.vista}>
                <Text>Densidad del Follaje:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese la densidad del follaje"
                    onChangeText={setDensidadFollaje}
                    value={setDensidadFollaje}
                />
            </View>
            <View style={styles.vista}>
                <Text>Afectaciones:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese las afectaciones"
                    onChangeText={setAfectaciones}
                    value={setAfectaciones}
                />
            </View>
            <View style={styles.vista}>
                <Text>Relación con el Árbol:</Text>
                <TextInput
                    style={styles.textArea}
                    placeholder="Ingrese la relación con el árbol"
                    onChangeText={setRelacionArbol}
                    value={setRelacionArbol}
                />
            </View>
        </ScrollView>
    ); 
}

function SubirImagen(propiedades) {
    const { imagenes, setImagenes } = propiedades;
   
    const seleccionar = async () => {
        const resultado = await Permission.askAsync(
            Permission.MEDIA_LIBRARY,
            Permission.CAMERA
        );
        if (resultado.status === "denied") {
            // Modificado: se usa resultado.status en lugar de resultado directamente
            toastRef.current.show("Debes permitir el acceso a la galeria", 4000);
        } else {
            const result = await ImagePicker.launchImageLibraryAsync({
                allowsEditing: true,
                aspect: [4, 3]
            });
            console.log(result);

            if (result.cancelled) {
                toastRef.current.show("Debes seleccionar una imagen", 3000);
            } else {
                setImagenes([...imagenes, result.uri]);
                console.log(imagenes);
            }
        }
    }

    const eliminarImagen = (imagen) => {
        const copiaArreglo = imagenes;
        Alert.alert(
            "Eliminar Imagen",
            "¿Estás seguro de que deseas eliminar la imagen?",
            [
                {
                    text: "Cancelar",
                    style: "cancel"
                },
                {
                    text: "Eliminar",
                    onPress: () => {
                        setImagenes(
                            filter(copiaArreglo, (url) => url !== imagen)
                        );
                    },
                },
            ],
            { cancelable: false }
        );
    };

    return (
        <View style={styles.vistaImagenes}>
            {size(imagenes) < 4 && (
                <Icon
                    type="material-community"
                    name="camera"
                    color="#7a7a7a"
                    containerStyle={styles.icono}
                    onPress={seleccionar}
                />
            )}
            {map(imagenes, (imagen, index) => (
                <Avatar
                    key={index}
                    style={styles.avatar}
                    source={{ uri: imagen }}
                    onPress={() => eliminarImagen(imagen)}
                />
            ))}
        </View>
    );
}

function ImagenPrincipal(propiedades) {
    const { imagen } = propiedades;
    return (
        <View style={styles.foto}>
            <Image
                source={
                    imagen ? { uri: imagen } : require('../../../assets/img/no-encontrada.png')
                }
                style={{ width: WidthScreen, height: 200 }}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    vista: {
        marginBottom: 16,
    },
    textArea: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 8,
        paddingHorizontal: 12,
        marginTop: 8,
    },
    btn: {
        backgroundColor: "#0A6ED3",
        marginVertical: 20,
    },
    vistaImagenes: {
        flexDirection: "row",
        marginVertical: 30,
    },
    icono: {
        alignItems: "center",
        justifyContent: "center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3",
        borderRadius: 8,
    },
    avatar: {
        width: 70,
        height: 70,
        marginRight: 10,
        borderRadius: 8,
    },
    foto: {
        marginBottom: 16,
    },
});
