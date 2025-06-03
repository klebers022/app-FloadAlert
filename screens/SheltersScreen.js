import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

// Tela de Abrigos
function SheltersList() {
  const [abrigos, setAbrigos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbrigos();
  }, []);

  const fetchAbrigos = async () => {
    try {
      const response = await fetch('http://localhost:5149/api/Shelters');
      const data = await response.json();
      const formatados = data.map((item) => ({
        id: item.id,
        nome: item.name,
        endereco: item.location,
        capacidade: item.totalCapacity,
        ocupado: item.numberOccupied,
        status: item.status ? 'Disponível' : 'Lotado',
      }));
      setAbrigos(formatados);
    } catch (error) {
      console.error('Erro ao buscar abrigos:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005A9C" />
        <Text>Carregando abrigos...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {abrigos.map((item) => (
        <View key={item.id} style={styles.card}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.title}>{item.nome}</Text>
            <Text style={styles.distance}>{/* Distância pode ser calculada futuramente */}</Text>
          </View>
          <Text style={styles.address}>{item.endereco}</Text>
          <Text style={styles.detail}>
            Capacidade: <Text style={{ color: '#199D00' }}>{item.capacidade} vagas</Text>
          </Text>
          <Text style={styles.detail}>
            Ocupado: <Text style={{ color: '#FF0000' }}>{item.ocupado} pessoas</Text>
          </Text>
          <Text style={[styles.status, { color: item.status === 'Lotado' ? 'red' : '#199D00' }]}>
            {item.status}
          </Text>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>
              {item.status === 'Lotado' ? 'Ver no mapa' : 'Navegar até'}
            </Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}

// Tela de Rotas (estática por enquanto)
function RoutesList() {
  return (
    <View style={styles.routesContainer}>
      <Text style={styles.routesTitle}>Rotas Seguras</Text>
      <Text>• Rota 1 - Centro até Abrigo A</Text>
      <Text>• Rota 2 - Região Sul até Abrigo C</Text>
      <Text>• Rota 3 - Leste até Abrigo D</Text>
    </View>
  );
}

export default function SheltersScreen() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#005A9C',
        tabBarIndicatorStyle: { backgroundColor: '#005A9C' },
        tabBarLabelStyle: { fontWeight: 'bold' },
      }}
    >
      <Tab.Screen name="Abrigos" component={SheltersList} />
      <Tab.Screen name="Rotas" component={RoutesList} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    padding: 15,
  },
  card: {
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
  },
  distance: {
    fontSize: 14,
    color: '#333333',
  },
  address: {
    color: '#666666',
    marginTop: 2,
    marginBottom: 5,
  },
  detail: {
    color: '#333333',
    fontSize: 14,
  },
  status: {
    marginTop: 5,
    fontWeight: 'bold',
    fontSize: 14,
  },
  button: {
    marginTop: 10,
    backgroundColor: '#199D00',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  routesContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  routesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#005A9C',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
