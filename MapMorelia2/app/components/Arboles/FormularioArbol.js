import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Text, TextInput, Button, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const FormularioArbol = () => {
  const [ubicacion, setUbicacion] = useState('');
  const [nombreComun, setNombreComun] = useState('');
  const [nombreCientifico, setNombreCientifico] = useState('');
  const [edad, setEdad] = useState('');
  const [altura, setAltura] = useState('');
  const [grosorTallo, setGrosorTallo] = useState('');
  const [densidadFollaje, setDensidadFollaje] = useState('');
  const [afectaciones, setAfectaciones] = useState('');
  const [relacionArbol, setRelacionArbol] = useState('');
  const [imagen, setImagen] = useState(null);

  const handleSelectImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImagen(result.uri);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Formulario de Árbol</Text>
        <TextInput
          style={styles.input}
          placeholder="Ingresar ubicación"
          value={ubicacion}
          onChangeText={setUbicacion}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre común"
          value={nombreComun}
          onChangeText={setNombreComun}
        />
        <TextInput
          style={styles.input}
          placeholder="Nombre científico"
          value={nombreCientifico}
          onChangeText={setNombreCientifico}
        />
        <TextInput
          style={styles.input}
          placeholder="Estimación de la edad del árbol"
          value={edad}
          onChangeText={setEdad}
        />
        <TextInput
          style={styles.input}
          placeholder="Altura del árbol"
          value={altura}
          onChangeText={setAltura}
        />
        <TextInput
          style={styles.input}
          placeholder="Grosor del tallo"
          value={grosorTallo}
          onChangeText={setGrosorTallo}
        />
        <TextInput
          style={styles.input}
          placeholder="Densidad del follaje"
          value={densidadFollaje}
          onChangeText={setDensidadFollaje}
        />
        <TextInput
          style={styles.input}
          placeholder="Afectaciones a la infraestructura urbana"
          value={afectaciones}
          onChangeText={setAfectaciones}
        />
        <TextInput
          style={styles.input}
          placeholder="Identidad y relación con el árbol"
          value={relacionArbol}
          onChangeText={setRelacionArbol}
        />
        <View style={styles.imageContainer}>
          {imagen && <Image source={{ uri: imagen }} style={styles.image} />}
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Subir imagen" onPress={handleSelectImage} />
        </View>
        <View style={styles.buttonContainer}>
          <Button title="Enviar" onPress={() => console.log('Formulario enviado')} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    width: '100%',
    maxWidth: 400,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
  },
  buttonContainer: {
    marginTop: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    borderRadius: 8,
  },
});

export default FormularioArbol;