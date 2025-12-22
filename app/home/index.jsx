import React, { useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { BackendContext } from "../context";
import AsyncStorage from "@react-native-async-storage/async-storage";

const screenWidth = Dimensions.get("window").width - 32;

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showTotal, setShowTotal] = useState(true);
  const [dashboard, setDashboard] = useState(null);
  const router = useRouter();
  const api = useContext(BackendContext);

  // Vérifier token au montage
  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        router.replace("/login"); // redirection si pas connecté
      }
    };
    checkToken();
  }, []);

  // Charger les données du dashboard
  const fetchDashboard = async () => {
    if (!api) return;
    try {
      const res = await api.get("/api/dashboard/summary");
      setDashboard(res.data);
    } catch (err) {
      console.error("Erreur dashboard:", err);

      if (err.response?.status === 401) {
        // Token expiré ou invalide → redirection login
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("user");
        Alert.alert("Session expirée", "Veuillez vous reconnecter.");
        router.replace("/login");
      } else {
        Alert.alert("Erreur", err.response?.data?.message || "Impossible de charger le dashboard");
      }
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, [api]);

  if (!dashboard) {
    return (
      <View style={[styles.container, { justifyContent: "center", alignItems: "center", backgroundColor: isDarkMode ? "#141829" : "#f7f5f2" }]}>
        <Text style={{ color: isDarkMode ? "#f3e8d7" : "#3b322a" }}>Chargement...</Text>
      </View>
    );
  }

  const { totalBalance, mainAccount, revenueThisMonth, expenseThisMonth, transactionsCount } = dashboard;
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Sommes
  const totalRevenue = revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b, 0);
  // const totalBalance = totalRevenue - totalExpenses;

  // ----------- États Carte Bancaire ---------------
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCardSolde, setShowCardSolde] = useState(false);

  // Flip animation
  const animatedValue = useRef(new Animated.Value(0)).current;
  let currentValue = 0;

  animatedValue.addListener(({ value }) => (currentValue = value));

  const flipCard = () => {
    Animated.spring(animatedValue, {
      toValue: currentValue >= 90 ? 0 : 180,
      tension: 8,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const frontInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = animatedValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const isBack = currentValue >= 90;

  const onNavigate = (page) => router.push(`/home/${page}`);

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#010517ff" : "#f7f5f2" }]}>
      <Sidebar
        visible={sidebarOpen}
        isDarkMode={isDarkMode}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(page) => console.log("Naviguer vers", page)}
      />

      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: isDarkMode ? "#f3e8d7" : "#3b322a" }}>
          Bienvenue
        </Text>
        <Text style={{ fontSize: 16, color: isDarkMode ? "#bfa98a" : "#3b322a80", marginBottom: 20 }}>
          Voici un aperçu de votre tableau de bord.
        </Text>

        <TouchableOpacity
          onPress={() => setShowTotal(!showTotal)}
          style={[styles.card, { backgroundColor: isDarkMode ? "#1a2742" : "#d6c7b4" }]}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Solde Total</Text>
          <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff" }}>
            {showTotal ? `${totalBalance.toLocaleString()} Fcfa` : "****"}
          </Text>
        </TouchableOpacity>

        <View style={styles.cardsRow}>
          <View style={[styles.smallCard, { backgroundColor: "#f87171" }]}>
            <Text style={styles.cardLabel}>Dépenses</Text>
            <Text style={styles.cardValue}>-{expenseThisMonth.toLocaleString()} Fcfa</Text>
          </View>

          <View style={[styles.smallCard, { backgroundColor: "#4ade80" }]}>
            <Text style={styles.cardLabel}>Revenus</Text>
            <Text style={styles.cardValue}>+{revenueThisMonth.toLocaleString()} Fcfa</Text>
          </View>
        </View>

        <Text style={[styles.chartTitle, { color: isDarkMode ? "#f3e8d7" : "#3b322a" }]}>Revenus vs Dépenses</Text>
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
          withInnerLines={false}
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            decimalPlaces: 0,
            color: () => (isDarkMode ? "#d6c7b4" : "#4a4136"),
            labelColor: () => (isDarkMode ? "#d6c7b4" : "#4a4136"),
          }}
          style={{ marginVertical: 10, borderRadius: 16 }}
        />

        <Text style={[styles.chartTitle, { color: isDarkMode ? "#f3e8d7" : "#3b322a" }]}>Évolution du solde</Text>
        <LineChart
          data={{
            labels: months,
            datasets: [{ data: revenue.map((r, i) => r - expenses[i]) }],
          }}
          width={screenWidth}
          height={180}
          bezier
          chartConfig={{
            backgroundColor: "transparent",
            backgroundGradientFrom: "transparent",
            backgroundGradientTo: "transparent",
            decimalPlaces: 0,
            color: () => (isDarkMode ? "#d6c7b4" : "#4a4136"),
            labelColor: () => (isDarkMode ? "#d6c7b4" : "#4a4136"),
          }}
          style={{ marginVertical: 10, borderRadius: 16 }}
        />
      </ScrollView>

      <MobileNav currentPage="dashboard" isDarkMode={isDarkMode} />
    </View>
  );
}

// ---------------------- STYLES -----------------------

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 120 },

  card: { borderRadius: 16, padding: 20, marginTop: 20 },
  cardsRow: { flexDirection: "row", justifyContent: "space-between", marginTop: 16 },
  smallCard: { flex: 1, borderRadius: 12, padding: 16, marginHorizontal: 6, alignItems: "center" },

  cardLabel: { color: "#fff", fontSize: 12, fontWeight: "600" },
  cardValue: { color: "#fff", fontSize: 16, fontWeight: "700" },

  chartTitle: { fontSize: 18, fontWeight: "700", marginTop: 20 },

  bankCard: { borderRadius: 20, padding: 20, width: "100%", height: 200 },
  cardNumber: { color: "#fff", fontSize: 22, fontWeight: "700", letterSpacing: 2 },
  cardHolder: { color: "#fff", fontSize: 16, fontWeight: "700" },

  blackStripe: {
    height: 40,
    backgroundColor: "#000",
    borderRadius: 4,
    marginBottom: 20,
    marginTop: 20,
  },
});
