import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Button, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permiso de ubicación no otorgado');
        return;
      }
      const currentLocation = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = currentLocation.coords;
      setLocation({ latitude, longitude });

      const region = {
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };
      setMapRegion(region);
      setShowMap(true);
    } catch (error) {
      console.error('Error de geolocalización:', error);
      Alert.alert(
        'Error',
        'No se pudo obtener la ubicación actual. ¿Desea cargar el mapa en su ubicación actual?',
        [
          {
            text: 'Sí',
            onPress: () => setShowMap(true),
          },
          {
            text: 'No',
            onPress: () => setShowMap(false),
          },
        ]
      );
    }
  };

  const handleMarkerPress = (event) => {
    // Aquí maneja la lógica cuando se presiona un marcador en el mapa
  };

  return (
    <View style={styles.container}>
      {showMap && mapRegion && (
        <MapView
          style={styles.map}
          initialRegion={mapRegion}
          onPress={handleMarkerPress}
        >
          {location && (
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
});

export default MapScreen;
