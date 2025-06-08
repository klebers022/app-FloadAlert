import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const apiUrl = "http://localhost:5149/api"; 

export default function AdminAlertsScreen() {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    type: "",
    status: "Ativo",
  });

  const fetchAlerts = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${apiUrl}/alerts`);
      const data = await res.json();
      setAlerts(data);
    } catch (error) {
      console.error("Erro ao buscar alertas:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  const handleSubmit = async () => {
    if (!form.title || !form.description || !form.type) {
      Alert.alert("Preencha todos os campos");
      return;
    }

    const body = {
      title: form.title,
      description: form.description,
      type: form.type,
      status: form.status,
      date: new Date().toISOString(),
    };

    try {
      const method = form.id ? "PUT" : "POST";
      const url = form.id ? `${apiUrl}/alerts/${form.id}` : `${apiUrl}/alerts`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (res.ok) {
        Alert.alert(form.id ? "Alerta atualizado" : "Alerta criado");
        setForm({
          id: null,
          title: "",
          description: "",
          type: "",
          status: "Ativo",
        });
        fetchAlerts();
      } else {
        Alert.alert("Erro", "Não foi possível salvar");
      }
    } catch (error) {
      console.error("Erro:", error);
    }
  };

  const handleEdit = (alert) => {
    setForm({
      id: alert.idAlert,
      title: alert.title,
      description: alert.description,
      type: alert.type,
      status: alert.status,
    });
  };

  const handleDelete = async (id) => {
    Alert.alert("Confirmar", "Deseja deletar este alerta?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Deletar",
        style: "destructive",
        onPress: async () => {
          try {
            const res = await fetch(`${apiUrl}/alerts/${id}`, {
              method: "DELETE",
            });

            if (res.ok) {
              Alert.alert("Alerta deletado com sucesso");
              fetchAlerts();
            } else {
              Alert.alert("Erro", "Não foi possível deletar");
            }
          } catch (error) {
            console.error("Erro ao deletar:", error);
            Alert.alert("Erro", "Falha na conexão");
          }
        },
      },
    ]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gerenciar Alertas</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Título</Text>
        <TextInput
          style={styles.input}
          value={form.title}
          onChangeText={(text) => setForm({ ...form, title: text })}
          placeholder="Ex: Alerta de enchente"
        />

        <Text style={styles.label}>Descrição</Text>
        <TextInput
          style={[styles.input, { height: 80 }]}
          value={form.description}
          onChangeText={(text) => setForm({ ...form, description: text })}
          placeholder="Detalhes do alerta"
          multiline
        />

        <Text style={styles.label}>Tipo</Text>
        <Picker
          selectedValue={form.type}
          onValueChange={(value) => setForm({ ...form, type: value })}
          style={styles.picker}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Emergência" value="Emergência" />
          <Picker.Item label="Perigo" value="Perigo" />
          <Picker.Item label="Atenção" value="Atenção" />
          <Picker.Item label="Informativo" value="Informativo" />
        </Picker>

        <Text style={styles.label}>Status</Text>
        <Picker
          selectedValue={form.status}
          onValueChange={(value) => setForm({ ...form, status: value })}
          style={styles.picker}
        >
          <Picker.Item label="Ativo" value="Ativo" />
          <Picker.Item label="Encerrado" value="Encerrado" />
        </Picker>

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>
            {form.id ? "Atualizar" : "Criar"} Alerta
          </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Alertas Publicados</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#005A9C" />
      ) : (
        alerts.map((a) => (
          <View key={a.idAlert} style={styles.alertCard}>
            <View style={{ flex: 1 }}>
              <Text
                style={styles.alertTitle}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {a.title}
              </Text>
              <Text
                style={styles.alertDesc}
                numberOfLines={2}
                ellipsizeMode="tail"
              >
                {a.description}
              </Text>
              <Text style={styles.alertInfo}>
                Tipo: {a.type} | Status: {a.status}
              </Text>
            </View>
            <View style={styles.actions}>
              <TouchableOpacity onPress={() => handleEdit(a)}>
                <MaterialIcons name="edit" size={24} color="#FFA500" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => handleDelete(a.idAlert)}>
                <Ionicons name="trash" size={24} color="#FF0000" />
              </TouchableOpacity>
            </View>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", padding: 20, paddingTop: 50 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#005A9C",
    marginBottom: 10,
  },
  subtitle: { fontSize: 18, fontWeight: "bold", marginVertical: 10 },
  form: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  label: { fontSize: 14, fontWeight: "bold", color: "#333" },
  input: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    borderColor: "#CCC",
    borderWidth: 1,
  },
  picker: { backgroundColor: "#FFF", marginBottom: 10, borderRadius: 8 },
  button: {
    backgroundColor: "#005A9C",
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: { color: "#FFF", fontWeight: "bold" },
  alertCard: {
    backgroundColor: "#F5F5F5",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
  },
  alertTitle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
    flexShrink: 1,
    maxWidth: "90%",
  },
  alertDesc: {
    color: "#666",
    marginTop: 2,
    flexShrink: 1,
    maxWidth: "90%",
  },
  alertInfo: { fontSize: 12, color: "#333", marginTop: 4 },
  actions: { flexDirection: "row", gap: 10 },
});
