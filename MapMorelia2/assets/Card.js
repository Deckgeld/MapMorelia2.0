import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const Card = ({ handleYes, handleNo }) => {
  return (
    <View style={styles.card}>
      <Text>¿Su ubicación actual es donde se realiza el reporte?</Text>
      <View style={styles.buttonContainer}>
        <Button title="Sí" onPress={handleYes} />
        <Button title="No" onPress={handleNo} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
});

export default Card;
