// app/home/index.jsx
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Composants locaux
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";

// Pages à afficher
import Profile from "../home/Profile";
import Transactions from "../home/Transactions";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard"); // dashboard / profile / transactions

  // Fonction pour afficher la bonne page
  const renderPage = () => {
    switch (currentPage) {
      case "profile":
        return <Profile isDarkMode={isDarkMode} />;
      case "transactions":
        return <Transactions isDarkMode={isDarkMode} />;
      default:
        return (
          <View>
            <Text
              style={{
                fontSize: 28,
                fontWeight: "700",
                marginBottom: 10,
                color: isDarkMode ? "#f3e8d7" : "#3b322a",
              }}
            >
              Bienvenue 👋
            </Text>
            <Text
              style={{
                fontSize: 16,
                color: isDarkMode ? "#bfa98a" : "#3b322a80",
                marginBottom: 20,
              }}
            >
              Voici un aperçu de votre tableau de bord.
            </Text>

            {/* Exemple de carte */}
            <View
              style={[
                styles.card,
                { backgroundColor: isDarkMode ? "#1a2742" : "#d6c7b4" },
              ]}
            >
              <Text style={{ fontSize: 18, color: "#fff" }}>Solde Total</Text>
              <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff" }}>
                24 580 €
              </Text>
            </View>
          </View>
        );
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#141829" : "#f3e8d7" }]}>
      {/* Sidebar */}
      <Sidebar
        visible={sidebarOpen}
        isDarkMode={isDarkMode}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(page) => {
          setCurrentPage(page);
          setSidebarOpen(false);
        }}
      />

      {/* Header */}
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onMenuPress={() => setSidebarOpen(true)}
      />

      {/* Contenu principal */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderPage()}
      </ScrollView>

      {/* Navigation mobile */}
      <MobileNav currentPage={currentPage} isDarkMode={isDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
});
