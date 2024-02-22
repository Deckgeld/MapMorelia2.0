import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Dimensions, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const MapScreen = () => {
  const [location, setLocation] = useState(null);
  const [mapRegion, setMapRegion] = useState(null);
  const [selectedCoordinates, setSelectedCoordinates] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    const getCurrentDateTime = () => {
      const date = new Date();
      const formattedDateTime = date.toLocaleString();
      setCurrentDateTime(formattedDateTime);
    };

    (async () => {
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
      } catch (error) {
        console.error('Error de geolocalización:', error);
      }
    })();

    getCurrentDateTime();

    const intervalId = setInterval(() => {
      getCurrentDateTime();
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedCoordinates({ latitude, longitude });
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={mapRegion}
        onPress={handleMapPress}
      >
        {location && !selectedCoordinates && (
          <Marker
            coordinate={{
              latitude: location.latitude,
              longitude: location.longitude,
            }}
            title="Mi ubicación"
          />
        )}
        {selectedCoordinates && (
          <Marker
            coordinate={{
              latitude: selectedCoordinates.latitude,
              longitude: selectedCoordinates.longitude,
            }}
            title="Ubicación seleccionada"
          />
        )}
      </MapView>
      <View style={styles.bottomContentContainer}>
        <View style={styles.cardContainer}>
          <View style={styles.coordinatesContainer}>
            <Text style={styles.coordinatesText}>
              Latitud: {selectedCoordinates ? selectedCoordinates.latitude.toFixed(6) : (location ? location.latitude.toFixed(6) : '---')}, Longitud: {selectedCoordinates ? selectedCoordinates.longitude.toFixed(6) : (location ? location.longitude.toFixed(6) : '---')}
            </Text>
          </View>
          <View style={styles.dateTimeContainer}>
            <Text style={styles.dateTimeText}>{currentDateTime}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
  },
  map: {
    flex: 0.7,
  },
  bottomContentContainer: {
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  cardContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    padding: 10,
  },
  coordinatesContainer: {
    marginBottom: 10,
  },
  coordinatesText: {
    fontSize: 16,
  },
  dateTimeContainer: {
    marginBottom: 10,
  },
  dateTimeText: {
    fontSize: 16,
  },
});

export default MapScreen;
