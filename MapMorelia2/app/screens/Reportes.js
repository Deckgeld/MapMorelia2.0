import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

export default function ListaReportes() {
  const reportes = [
    {
      id: "1",
      titulo: "Reporte Arboles",
      colonia: "Salida a Charo",
      imagenUrl: "https://images.adsttc.com/media/images/5fa0/ab4c/63c0/1773/7400/0340/medium_jpg/IMG_20201028_182509376.jpg?1604365122", // Reemplaza esto con tu URL de imagen
    },
    {
      id: "2",
      titulo: "Reporte Arboles",
      colonia: "Centro",
      imagenUrl: "https://images.adsttc.com/media/images/5fa0/ab4c/63c0/1773/7400/0340/medium_jpg/IMG_20201028_182509376.jpg?1604365122", // Reemplaza esto con tu URL de imagen
    },
    {
      id: "3",
      titulo: "Reporte Arboles",
      colonia: "Salida Quiroga",
      imagenUrl: "https://images.adsttc.com/media/images/5fa0/ab4c/63c0/1773/7400/0340/medium_jpg/IMG_20201028_182509376.jpg?1604365122", // Reemplaza esto con tu URL de imagen
    },
  ];

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.itemContainer}>
      <Image
        source={{ uri: item.imagenUrl }}
        style={styles.imagen}
        resizeMode="cover"
      />
      <View style={styles.textContainer}>
        <Text style={styles.titulo}>{item.titulo}</Text>
        <Text style={styles.colonia}>{item.colonia}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={reportes}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    padding: 10,
  },
  imagen: {
    width: 80,
    height: 80,
    marginRight: 10,
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
  },
  titulo: {
    fontWeight: "bold",
    fontSize: 18,
  },
  colonia: {
    color: "grey",
  },
});
