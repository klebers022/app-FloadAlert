import { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { Ionicons, MaterialIcons, Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

export default function HomeScreen() {
  const navigation = useNavigation();

  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const apiUrl = 'http://localhost:5149/api'; // 🟢 IP da sua máquina na rede

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch(`${apiUrl}/alerts`);
        const data = await response.json();
        setAlerts(data);
      } catch (error) {
        console.error('Erro ao buscar alertas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []);

  const latestAlert = alerts.length > 0 ? alerts[0] : null;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="water" size={32} color="#005A9C" />
        <Text style={styles.title}>Flood Alert</Text>
      </View>

      <View style={styles.alertBox}>
        <MaterialIcons name="error-outline" size={32} color="#FFA500" />
        <View style={{ marginLeft: 10 }}>
          {loading ? (
            <ActivityIndicator color="#FFA500" />
          ) : latestAlert ? (
            <>
              <Text style={styles.alertTitle}>{latestAlert.type} - {latestAlert.status}</Text>
              <Text style={styles.alertDesc}>{latestAlert.description}</Text>
            </>
          ) : (
            <Text style={styles.alertDesc}>Sem alertas ativos no momento.</Text>
          )}
        </View>
      </View>

      <View style={styles.menuGrid}>
        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Mapa')}>
          <Entypo name="map" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Mapa Interativo</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Abrigos')}>
          <Ionicons name="business" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Abrigos</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButton} onPress={() => navigation.navigate('Alertas')}>
          <Ionicons name="notifications" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Alertas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuButtonAlert} onPress={() => navigation.navigate('Ocorrências')}>
          <Ionicons name="create" size={24} color="#FFFFFF" />
          <Text style={styles.menuText}>Registrar Ocorrência</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Últimos Alertas</Text>
        {loading ? (
          <ActivityIndicator color="#005A9C" />
        ) : alerts.length === 0 ? (
          <Text>Sem alertas disponíveis.</Text>
        ) : (
          alerts.slice(0, 3).map((alert) => (
            <View key={alert.idAlert} style={styles.statusRow}>
              <Text style={styles.statusMedium}>● {alert.type}</Text>
              <Text style={styles.statusText}>{new Date(alert.date).toLocaleDateString()}</Text>
            </View>
          ))
        )}
      </View>
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
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#005A9C',
    marginLeft: 8,
  },
  alertBox: {
    backgroundColor: '#FFF4E5',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    borderLeftWidth: 6,
    borderLeftColor: '#FFA500',
  },
  alertTitle: {
    color: '#FFA500',
    fontSize: 18,
    fontWeight: 'bold',
  },
  alertDesc: {
    color: '#333333',
    fontSize: 14,
    marginTop: 4,
  },
  menuGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  menuButton: {
    backgroundColor: '#005A9C',
    width: '48%',
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuButtonAlert: {
    backgroundColor: '#FFA500',
    width: '48%',
    height: 90,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  menuText: {
    color: '#FFFFFF',
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333333',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  statusMedium: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  statusText: {
    color: '#333333',
  },
});
