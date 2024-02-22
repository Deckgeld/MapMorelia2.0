import React, { useState } from 'react';
import { View, StyleSheet, Button, Alert, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  // Estados para controlar la ubicación, la región del mapa, la visualización del mapa y la interactividad del mismo
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [showMap, setShowMap] = useState(false);
  const [isInteractive, setIsInteractive] = useState(false);
  const windowHeight = Dimensions.get('window').height;

  // Función para obtener la ubicación actual y mostrar el mapa
  const handleYes = async () => {
    setIsInteractive(true); // Habilitar la interacción con el mapa
    try {
      // Solicitar permisos de ubicación y obtener la ubicación actual
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      // Establecer la ubicación y la región del mapa con la ubicación actual
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
      // Mostrar un mensaje de error si no se puede obtener la ubicación
      Alert.alert(
        'Error',
        'No se pudo obtener la ubicación actual. Intente de nuevo más tarde.',
      );
    }
  };

  // Función para mostrar el mapa sin ubicación actual
  const handleNo = () => {
    setIsInteractive(true);
    // Establecer la región del mapa en Morelia, México
    setMapRegion({
      latitude: 19.7027,
      longitude: -101.192,
      latitudeDelta: 0.1,
      longitudeDelta: 0.1,
    });
    setShowMap(true); // Mostrar el mapa sin ubicación actual
  };

  return (
    <View style={styles.container}>
      {!showMap && (
        // Ventana emergente con botones "Sí" y "No" para confirmar la ubicación
        <View style={styles.promptContainer}>
          <Button title="Sí" onPress={handleYes} />
          <Button title="No" onPress={handleNo} />
        </View>
      )}
      {showMap && (
        // Mapa que muestra la ubicación actual o la ubicación de Morelia
        <MapView
          style={{ ...styles.map, height: windowHeight / 2 }}
          initialRegion={mapRegion}
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
        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  promptContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    zIndex: 1,
  },
});

export default MapScreen;
