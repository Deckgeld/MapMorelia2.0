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

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.card}>
          <Text style={styles.heading}>Formulario de Árbol</Text>
          <TextInput
            style={styles.input}
            placeholder="Ubicación"
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
            placeholder="Edad del árbol"
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
            placeholder="Afectaciones"
            value={afectaciones}
            onChangeText={setAfectaciones}
          />
          <TextInput
            style={styles.input}
            placeholder="Relación con el árbol"
            value={relacionArbol}
            onChangeText={setRelacionArbol}
          />
          <View style={styles.buttonContainer}>
            <Button title="Enviar" onPress={() => console.log('Formulario enviado')} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollViewContent: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 20,
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
    width: '90%',
    maxWidth: 300,
    marginBottom: 20, // Agregamos un espacio en la parte inferior
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 12,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 8,
    width: '100%',
  },
});

export default FormularioArbol;
