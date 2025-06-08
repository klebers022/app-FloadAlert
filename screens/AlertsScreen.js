import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AlertsScreen() {
  const [alertas, setAlertas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAlertas();
  }, []);

  const fetchAlertas = async () => {
    try {
      const response = await fetch('http://localhost:5149/api/alerts'); // 
      const data = await response.json();
      const formatados = data.map((item) => ({
        id: item.idAlert,
        nivel: item.type,
        descricao: item.description,
        regiao: item.title,
        tempo: new Date(item.date).toLocaleString(),
        cor: definirCor(item.type),
      }));
      setAlertas(formatados);
    } catch (error) {
      console.error('Erro ao buscar alertas:', error);
    } finally {
      setLoading(false);
    }
  };

  const definirCor = (nivel) => {
    switch (nivel.toLowerCase()) {
      case 'emergência':
        return '#FF0000';
      case 'perigo':
      case 'atenção':
        return '#FFA500';
      case 'informativo':
        return '#005A9C';
      default:
        return '#005A9C';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#005A9C" />
        <Text>Carregando alertas...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Alertas Ativos</Text>

      {alertas.map((alerta) => (
        <View key={alerta.id} style={[styles.alertCard, { borderLeftColor: alerta.cor }]}>
          <Ionicons name="alert-circle" size={30} color={alerta.cor} />
          <View style={styles.alertContent}>
            <Text style={[styles.alertLevel, { color: alerta.cor }]} numberOfLines={1}>
              {alerta.nivel} - {alerta.regiao}
            </Text>
            <Text style={styles.alertTime}>{alerta.tempo}</Text>
            <Text style={styles.alertDesc} numberOfLines={3}>
              {alerta.descricao}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#005A9C',
    marginBottom: 20,
  },
  alertCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F5F5F5',
    padding: 15,
    borderRadius: 12,
    borderLeftWidth: 6,
    marginBottom: 15,
    gap: 10,
  },
  alertContent: {
    flex: 1,
  },
  alertLevel: {
    fontSize: 16,
    fontWeight: 'bold',
    maxWidth: '100%',
    flexShrink: 1,
  },
  alertTime: {
    fontSize: 13,
    color: '#333333',
    marginTop: 4,
    maxWidth: '100%',
    flexShrink: 1,
  },
  alertDesc: {
    fontSize: 13,
    color: '#333333',
    marginTop: 4,
    maxWidth: '100%',
    flexShrink: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
