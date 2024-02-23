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
      titulo: "Reporte 1",
      colonia: "Colonia A",
      imagenUrl: "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-800x419.jpg", // Reemplaza esto con tu URL de imagen
    },
    {
      id: "2",
      titulo: "Reporte 2",
      colonia: "Colonia B",
      imagenUrl: "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-800x419.jpg", // Reemplaza esto con tu URL de imagen
    },
    {
      id: "3",
      titulo: "Reporte 3",
      colonia: "Colonia C",
      imagenUrl: "https://www.adslzone.net/app/uploads-adslzone.net/2019/04/borrar-fondo-imagen-800x419.jpg", // Reemplaza esto con tu URL de imagen
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
