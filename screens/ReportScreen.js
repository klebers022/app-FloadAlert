import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function ReportScreen() {
  const [tipo, setTipo] = useState('');
  const [descricao, setDescricao] = useState('');
  const [localizacao, setLocalizacao] = useState('Capturando localização...');

  const handleEnviar = async () => {
    if (!tipo || !descricao) {
      Alert.alert('Atenção', 'Preencha todos os campos antes de enviar.');
      return;
    }

    try {
      const response = await fetch('https://localhost:5149/api/incidents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          description: descricao,
          type: tipo,
          coordinates: localizacao,
          date: new Date().toISOString(),
          status: 'Pendente',
        }),
      });

      if (response.ok) {
        Alert.alert('Ocorrência Enviada', 'Sua ocorrência foi registrada com sucesso!');
        setTipo('');
        setDescricao('');
        setLocalizacao('Capturando localização...');
      } else {
        Alert.alert('Erro', 'Falha ao enviar a ocorrência. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar ocorrência:', error);
      Alert.alert('Erro', 'Não foi possível conectar com o servidor.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registrar Ocorrência</Text>

      <Text style={styles.label}>Tipo de Ocorrência</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={tipo}
          onValueChange={(itemValue) => setTipo(itemValue)}
        >
          <Picker.Item label="Selecione..." value="" />
          <Picker.Item label="Alagamento" value="Alagamento" />
          <Picker.Item label="Obstrução de via" value="Obstrucao" />
          <Picker.Item label="Deslizamento" value="Deslizamento" />
          <Picker.Item label="Outros" value="Outros" />
        </Picker>
      </View>

      <Text style={styles.label}>Descrição</Text>
      <TextInput
        style={styles.input}
        multiline
        numberOfLines={4}
        placeholder="Descreva o que está acontecendo..."
        value={descricao}
        onChangeText={setDescricao}
      />

      <Text style={styles.label}>Localização</Text>
      <Text style={styles.locationText}>{localizacao}</Text>

      <TouchableOpacity style={styles.button} onPress={handleEnviar}>
        <Text style={styles.buttonText}>Enviar Ocorrência</Text>
      </TouchableOpacity>
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
  label: {
    fontSize: 14,
    color: '#333333',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 10,
    height: 100,
    textAlignVertical: 'top',
    marginBottom: 15,
  },
  locationText: {
    backgroundColor: '#F5F5F5',
    padding: 10,
    borderRadius: 8,
    color: '#333333',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#005A9C',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 16,
  },
});
