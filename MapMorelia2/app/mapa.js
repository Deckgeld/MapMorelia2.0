import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons'; // Importar el icono de MaterialIcons desde Expo
import Card from './Card'; // Importar el componente Card desde su archivo

const MapScreen = () => {
  const [location, setLocation] = useState(null); // Estado para almacenar la ubicación actual
  const [mapRegion, setMapRegion] = useState(null); // Estado para la región del mapa
  const [showMap, setShowMap] = useState(false); // Estado para mostrar u ocultar el mapa
  const [isInteractive, setIsInteractive] = useState(false); // Estado para habilitar la interacción con el mapa
  const [currentDateTime, setCurrentDateTime] = useState(''); // Estado para almacenar la fecha y hora actual
  const [selectedCoordinates, setSelectedCoordinates] = useState(null); // Estado para almacenar las coordenadas seleccionadas por el usuario

  useEffect(() => {
    // Función para obtener la fecha y hora actual
    const getCurrentDateTime = () => {
      const date = new Date();
      const formattedDateTime = date.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    };

    getCurrentDateTime(); // Obtener la fecha y hora actual cuando se monta el componente que los elementos de latitud y eso esten detro de una card

    // Actualizar la fecha y hora actual cada segundo
    const intervalId = setInterval(() => {
      getCurrentDateTime();
    }, 1000);

    return () => clearInterval(intervalId); // Limpiar el intervalo al desmontar el componente
  }, []);

  const handleYes = async () => {
    setIsInteractive(true);
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });
      setMapRegion({
        latitude,
        longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      });
      setShowMap(true);
    } catch (error) {
      console.error('Error de geolocalización:', error);
    }
  };

  const handleNo = () => {
    setIsInteractive(true);
    setMapRegion({
      latitude: 19.7027,
      longitude: -101.192,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    setShowMap(true);
  };

  const handleMapPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setSelectedCoordinates(coordinate);
  };

  return (
    <View style={styles.container}>
      {/* Mostrar la tarjeta de confirmación si el mapa no está visible */}
      {!showMap && (
        <View style={styles.cardContainer}>
          <Card handleYes={handleYes} handleNo={handleNo} />
        </View>
      )}
      {/* Mostrar el mapa si está visible */}
      {showMap && (
        <View style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={mapRegion}
            onPress={handleMapPress}
            scrollEnabled={isInteractive} // Deshabilitar la interacción con el mapa si no se ha confirmado la ubicación
            zoomEnabled={isInteractive}
          >
            {location && (
              // Marcador en la ubicación actual si está disponible
              <Marker
                coordinate={{
                  latitude: location.latitude,
                  longitude: location.longitude,
                }}
                title="Mi ubicación"
              />
            )}
            {selectedCoordinates && (
              // Marcador en las coordenadas seleccionadas por el usuario
              <Marker
                coordinate={selectedCoordinates}
                title="Ubicación seleccionada"
              />
            )}
          </MapView>
          {/* Mostrar las coordenadas y la fecha y hora actual debajo del mapa */}
          <View style={styles.bottomContentContainer}>
            <View style={styles.coordinatesContainer}>
              <Text style={styles.coordinatesText}>
                {selectedCoordinates ? `Latitud: ${selectedCoordinates.latitude.toFixed(6)}, Longitud: ${selectedCoordinates.longitude.toFixed(6)}` : 'Seleccione una ubicación en el mapa'}
              </Text>
            </View>
            <View style={styles.dateTimeContainer}>
              <Text style={styles.dateTimeText}>{currentDateTime}</Text>
            </View>
            {/* Icono de "añadir" en la esquina inferior derecha */}
            <TouchableOpacity style={styles.addButton}>
              <MaterialIcons name="add" size={24} color="white" />
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, // El contenedor ocupa todo el espacio disponible en pantalla
  },
  cardContainer: {
    flex: 1, // El contenedor de la tarjeta ocupa todo el espacio disponible en pantalla
    justifyContent: 'center', // Centra los elementos hijos verticalmente
    alignItems: 'center', // Centra los elementos hijos horizontalmente
  },
  mapContainer: {
    flex: 0.7, // El contenedor del mapa ocupa todo el espacio disponible en pantalla
  },
  map: {
    flex: 0.7, // El mapa ocupa todo el espacio disponible en su contenedor
  },
  bottomContentContainer: {
    position: 'absolute', // El contenedor se posiciona de forma absoluta en relación con su contenedor primario
    bottom: 20, // Margen de 20 píxeles desde la parte inferior del contenedor primario
    left: 0, // El contenedor está pegado al borde izquierdo del contenedor primario
    right: 0, // El contenedor está pegado al borde derecho del contenedor primario
    alignItems: 'center', // Los elementos hijos se alinean horizontalmente en el centro
  },
  coordinatesContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semitransparente blanco
    padding: 5, // Relleno de 5 píxeles
    borderRadius: 5, // Bordes redondeados de 5 píxeles
    marginBottom: 10, // Margen inferior de 10 píxeles
  },
  coordinatesText: {
    fontSize: 16, // Tamaño de fuente de 16 puntos
  },
  dateTimeContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Fondo semitransparente blanco
    padding: 5, // Relleno de 5 píxeles
    borderRadius: 5, // Bordes redondeados de 5 píxeles
    marginBottom: 10, // Margen inferior de 10 píxeles
  },
  dateTimeText: {
    fontSize: 16, // Tamaño de fuente de 16 puntos
  },
  addButton: {
    position: 'absolute', // El botón se posiciona de forma absoluta
    bottom: 20, // Margen de 20 píxeles desde la parte inferior del contenedor primario
    right: 20, // Margen de 20 píxeles desde el lado derecho del contenedor primario
    backgroundColor: 'blue', // Fondo azul
    padding: 10, // Relleno de 10 píxeles
    borderRadius: 50, // Bordes redondeados de 50 (para hacer un círculo)
  },
});

export default MapScreen;
