import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native';

const AyudaArbol = () => {
  const descargarGuiaPDF = (url) => {
    Linking.openURL(url);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Módulo de Ayuda: Llenado del Formulario de Árboles</Text>
      <View style={styles.separador} />
      
      <View style={styles.apartado}>
        <Text style={styles.subtitulo}>Descargar Guías:</Text>
        <TouchableOpacity onPress={() => descargarGuiaPDF('https://example.com/guia.pdf')}>
          <Text style={styles.link}>Cómo llenar el formulario</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => descargarGuiaPDF('https://example.com/imagen.pdf')}>
          <Text style={styles.link}>Tomar la imagen del árbol</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => descargarGuiaPDF('https://example.com/nombre.pdf')}>
          <Text style={styles.link}>Nombres comunes y científicos</Text>
        </TouchableOpacity>
        {/* Agregar más enlaces según sea necesario */}
      </View>

      {/* Agregar más apartados con sus respectivos enlaces según sea necesario */}

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  separador: {
    height: 1,
    backgroundColor: '#ccc',
    marginBottom: 20,
  },
  apartado: {
    marginBottom: 20,
  },
  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  link: {
    fontSize: 18,
    color: 'blue',
    textDecorationLine: 'underline',
    marginBottom: 5,
  },
});

export default AyudaArbol;