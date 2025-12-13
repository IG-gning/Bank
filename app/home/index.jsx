import React, { useState, useEffect, useContext } from "react";
import { useRouter } from "expo-router";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Alert } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import { BackendContext, api } from "../context";

const screenWidth = Dimensions.get("window").width - 32; // padding 16

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTotal, setShowTotal] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const router = useRouter();

  // Navigation
  const onNavigate = (page) => {
    router.push(`/home/${page}`);
  };

  // Charger les données du dashboard
  const fetchDashboard = async () => {
    try {
      const res = await api.get("/api/dashboard/summary"); // endpoint réel
      setDashboard(res.data);
    } catch (err) {
      console.error("Erreur dashboard:", err);
      Alert.alert("Erreur", err.response?.data?.message || "Impossible de charger le dashboard");
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  // Si les données ne sont pas encore chargées
  if (!dashboard) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", backgroundColor: isDarkMode ? "#141829" : "#f7f5f2" }]}>
        <Text style={{ color: isDarkMode ? "#f3e8d7" : "#3b322a" }}>Chargement...</Text>
      </View>
    );
  }

  // Extraire les données
  const { totalBalance, mainAccount, revenueThisMonth, expenseThisMonth, transactionsCount } = dashboard;

  // Exemple de graphique avec les valeurs du mois (ici on simule 6 mois pour l'affichage)
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
  const revenue = [revenueThisMonth, revenueThisMonth, revenueThisMonth, revenueThisMonth, revenueThisMonth, revenueThisMonth];
  const expenses = [expenseThisMonth, expenseThisMonth, expenseThisMonth, expenseThisMonth, expenseThisMonth, expenseThisMonth];

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#141829" : "#f7f5f2" }]}>
      <Sidebar
        visible={sidebarOpen}
        isDarkMode={isDarkMode}
        onClose={() => setSidebarOpen(false)}
        onNavigate={onNavigate}
      />

      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Titre */}
        <Text style={{ fontSize: 28, fontWeight: "700", color: isDarkMode ? "#f3e8d7" : "#3b322a" }}>
          Bienvenue
        </Text>
        <Text style={{ fontSize: 16, color: isDarkMode ? "#bfa98a" : "#3b322a80", marginBottom: 20 }}>
          Voici un aperçu de votre tableau de bord.
        </Text>

        {/* Carte Solde Total */}
        <TouchableOpacity
          onPress={() => setShowTotal(!showTotal)}
          style={[styles.card, { backgroundColor: isDarkMode ? "#1a2742" : "#d6c7b4" }]}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Solde Total</Text>
          <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff" }}>
            {showTotal ? `${totalBalance.toLocaleString()} €` : "****"}
          </Text>
        </TouchableOpacity>

        {/* Cartes Dépense / Revenue */}
        <View style={styles.cardsRow}>
          <View style={[styles.smallCard, { backgroundColor: "#f87171" }]}>
            <Text style={styles.cardLabel}>Dépenses</Text>
            <Text style={styles.cardValue}>-{expenseThisMonth.toLocaleString()} €</Text>
          </View>
          <View style={[styles.smallCard, { backgroundColor: "#4ade80" }]}>
            <Text style={styles.cardLabel}>Revenus</Text>
            <Text style={styles.cardValue}>+{revenueThisMonth.toLocaleString()} €</Text>
          </View>
        </View>

        {/* Graphiques */}
        <Text style={[styles.chartTitle, { color: isDarkMode ? "#f3e8d7" : "#3b322a" }]}>
          Revenus vs Dépenses
        </Text>
        <BarChart
          data={{
            labels: months,
            datasets: [
              { data: revenue, color: () => "#4ade80", label: "Revenus" },
              { data: expenses, color: () => "#f87171", label: "Dépenses" },
            ],
          }}
          width={screenWidth}
          height={220}
          fromZero
          showBarTops
          withInnerLines={false}
          chartConfig={{
            backgroundColor: isDarkMode ? "#1a2742" : "#f7f5f2",
            backgroundGradientFrom: isDarkMode ? "#1a2742" : "#f7f5f2",
            backgroundGradientTo: isDarkMode ? "#1a2742" : "#f7f5f2",
            decimalPlaces: 0,
            color: (opacity = 1) => isDarkMode ? `rgba(191,169,138,${opacity})` : `rgba(91,70,54,${opacity})`,
            labelColor: (opacity = 1) => isDarkMode ? `rgba(191,169,138,${opacity})` : `rgba(91,70,54,${opacity})`,
            style: { borderRadius: 16 },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

        <Text style={[styles.chartTitle, { color: isDarkMode ? "#f3e8d7" : "#3b322a" }]}>
          Évolution du solde
        </Text>
        <LineChart
          data={{
            labels: months,
            datasets: [{ data: revenue.map((r, i) => r - expenses[i]) }],
          }}
          width={screenWidth}
          height={180}
          bezier
          chartConfig={{
            backgroundColor: isDarkMode ? "#1a2742" : "#f7f5f2",
            backgroundGradientFrom: isDarkMode ? "#1a2742" : "#f7f5f2",
            backgroundGradientTo: isDarkMode ? "#1a2742" : "#f7f5f2",
            decimalPlaces: 0,
            color: (opacity = 1) => isDarkMode ? `rgba(191,169,138,${opacity})` : `rgba(91,70,54,${opacity})`,
            labelColor: (opacity = 1) => isDarkMode ? `rgba(191,169,138,${opacity})` : `rgba(91,70,54,${opacity})`,
            style: { borderRadius: 16 },
            propsForDots: { r: "4", strokeWidth: "2", stroke: isDarkMode ? "#bfa98a" : "#5b4636" },
          }}
          style={{ marginVertical: 8, borderRadius: 16 }}
        />

      </ScrollView>

      <MobileNav currentPage="dashboard" isDarkMode={isDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  card: { borderRadius: 16, padding: 20, marginTop: 20 },
  cardsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  smallCard: { flex: 1, borderRadius: 12, padding: 16, marginHorizontal: 4, alignItems: "center" },
  cardLabel: { color: "#fff", fontWeight: "700" },
  cardValue: { color: "#fff", fontSize: 16, fontWeight: "700", marginTop: 4 },
  chartTitle: { fontSize: 18, fontWeight: "700", marginTop: 20 },
});
