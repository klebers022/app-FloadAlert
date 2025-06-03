import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

export default function MapScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mapa Interativo</Text>
      <ActivityIndicator size="large" color="#005A9C" />
      <Text style={styles.message}>Carregando mapa...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {    
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingTop: 50,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,   
    fontWeight: 'bold',
    color: '#005A9C',
    marginBottom: 10,
  },
  message: {  
    fontSize: 16,
    color: '#333333',
    marginTop: 20,
    textAlign: 'center',
  },
});





// import React, { useEffect, useState } from 'react';
// import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
// import MapView, { Marker, Polygon } from 'react-native-maps';
// import { Ionicons } from '@expo/vector-icons';

// export default function MapScreen() {
//   const [shelters, setShelters] = useState([]);
//   const [dangerAreas, setDangerAreas] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const apiUrl = 'https://localhost:5149/api'; // 🔥 Troque pela sua URL da API (backend .NET)

//   // 🔗 Fetch dos abrigos e áreas de risco
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const shelterRes = await fetch(`${apiUrl}/shelters`);
//         const dangerRes = await fetch(`${apiUrl}/dangerareas`);

//         const sheltersData = await shelterRes.json();
//         const dangerData = await dangerRes.json();

//         setShelters(sheltersData);
//         setDangerAreas(dangerData);
//       } catch (error) {
//         console.error('Erro ao buscar dados do mapa:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔥 Função para converter coordenadas string para objeto
//   const parseCoordinates = (coordString) => {
//     return coordString.split(';').map((coord) => {
//       const [lat, lon] = coord.split(',').map(Number);
//       return { latitude: lat, longitude: lon };
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Mapa Interativo</Text>

//       {loading ? (
//         <ActivityIndicator size="large" color="#005A9C" />
//       ) : (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: -23.55052,
//             longitude: -46.633308,
//             latitudeDelta: 0.05,
//             longitudeDelta: 0.05,
//           }}
//         >
//           {/* 🏠 Markers dos Abrigos */}
//           {shelters.map((shelter) => {
//             const [lat, lon] = shelter.location.split(',').map(Number);
//             return (
//               <Marker
//                 key={shelter.id}
//                 coordinate={{ latitude: lat, longitude: lon }}
//                 title={shelter.name}
//                 description={`Capacidade: ${shelter.numberOccupied}/${shelter.totalCapacity}`}
//               >
//                 <Ionicons name="home" size={30} color="#005A9C" />
//               </Marker>
//             );
//           })}

//           {/* 🚩 Polygons das Áreas de Risco */}
//           {dangerAreas.map((area) => (
//             <Polygon
//               key={area.id}
//               coordinates={parseCoordinates(area.coordinates)}
//               strokeColor="#FF0000"
//               fillColor="rgba(255, 0, 0, 0.3)"
//               strokeWidth={2}
//             />
//           ))}
//         </MapView>
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFFFFF',
//     paddingTop: 50,
//     paddingHorizontal: 20,
//   },
//   title: {
//     fontSize: 26,
//     fontWeight: 'bold',
//     color: '#005A9C',
//     marginBottom: 10,
//   },
//   map: {
//     width: Dimensions.get('window').width - 40,
//     height: Dimensions.get('window').height * 0.75,
//     borderRadius: 12,
//   },
// });
