import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function Sucursales() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estadisticas</Text>
      <View style={styles.card}>
        <Text style={styles.cardText}>
          Estamos trabajando en esta pantalla. Estará lista próximamente.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  cardText: {
    fontSize: 16,
    textAlign: "center",
    color: "#555",
  },
});

