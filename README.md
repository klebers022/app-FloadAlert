
# 🌊 Flood Alert - Aplicativo Mobile

Aplicativo desenvolvido como parte do projeto da **Global Solution 2025** na FIAP. O **Flood Alert** é uma plataforma mobile que permite que cidadãos e agentes da Defesa Civil acompanhem em tempo real alertas de enchentes, áreas de risco, abrigos disponíveis e possam registrar ocorrências.

## 🚀 Tecnologias Utilizadas

- React Native com Expo
- React Navigation
- Axios / Fetch API
- React Native Web (compatível para web)
- Leaflet (para mapas na web)
- API REST em .NET (backend)

## 🎯 Funcionalidades

- 🗺️ **Mapa Interativo**  
Exibe abrigos, áreas de risco e alertas em tempo real.

- 🚨 **Alertas Ativos**  
Lista dos últimos alertas emitidos pela Defesa Civil.

- 🏠 **Abrigos Disponíveis**  
Visualização dos abrigos, capacidade, ocupação e localização.

- 🛠️ **Registrar Ocorrência**  
Permite que usuários comuniquem situações de risco.

- 📍 **Rotas Seguras**  
Sugestão de rotas até os abrigos próximos.

## 🏗️ Estrutura de Pastas

```
FloodAlert-app/
├── assets/               # Imagens, ícones e outros assets
├── components/           # Componentes reutilizáveis
├── navigation/           # Configuração de navegação (BottomTabs, Stack)
├── screens/              # Telas (Home, Map, Alerts, Shelters, Report)
├── App.js                # Arquivo principal
├── package.json          # Dependências e scripts
└── README.md             # Documentação do projeto
```

## ⚙️ Como Executar

### Pré-requisitos:

- Node.js instalado
- Expo CLI instalado:
```bash
npm install -g expo-cli
```

### Executando o projeto:

1. Clone o repositório:
```bash
git clone https://github.com/klebers022/FloodAlert.git
```

2. Instale as dependências:
```bash
cd mobile
cd FloodAlert-app
npm install
```

3. Execute:
```bash
npx expo start
```

4. Abra no dispositivo:
- Pelo app **Expo Go** (Android ou iOS) escaneando o QR Code.
- Ou execute no navegador utilizando `w` (modo web).

### ✅ Observação:
Para o app funcionar, é necessário que a API .NET esteja rodando, e o IP da API esteja corretamente configurado nos arquivos que fazem requisições (ex.: `HomeScreen.js`, `MapScreen.js`, etc.).

## 🎬 Link do video
[Video solucao completa] (https://youtu.be/sAuJWkpp258)

## 👥 Contribuidores

- Kleber da Silva RM- 557887
- Nicolas Barutti RM- 554944
- Lucas Rainha RM- 558471
  
- FIAP - 2TDS - Global Solution 2025

## 📄 Licença

Este projeto é acadêmico, desenvolvido para a disciplina Global Solution da FIAP — 2025.
