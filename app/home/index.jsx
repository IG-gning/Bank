import React, { useState, useRef } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions, Animated } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";
import { FontAwesome } from "@expo/vector-icons";

const screenWidth = Dimensions.get("window").width - 32;

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [showTotal, setShowTotal] = useState(true);

  // Données Exemple
  const revenue = [5000, 6000, 5500, 7000, 6500, 7200];
  const expenses = [3000, 2500, 4000, 3500, 3800, 3200];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  // Sommes
  const totalRevenue = revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b, 0);
  const totalBalance = totalRevenue - totalExpenses;

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

        {/* CARTE SOLDE TOTAL */}
        <TouchableOpacity
          onPress={() => setShowTotal(!showTotal)}
          style={[styles.card, { backgroundColor: isDarkMode ? "#081838ff" : "#e8dcc7", borderLeft:"4px solid #5b4636",
            ...(!isDarkMode 
             ? {shadowColor: "#a8a8a8ff", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10}
             : {shadowColor: "transparent", shadowOpacity: 0, elevation: 0, borderLeftColor:"#e8dcc7",}), 
            }]}>  

       
          <Text style={{...(!isDarkMode 
                ? {fontSize: 18, color: "#5b4636",}
                : {fontSize: 18, color:"#e8dcc7"}), }}>
            Solde Total
          </Text>
          <Text style={{ ...(!isDarkMode 
                ? {fontSize: 28, fontWeight: "bold", color: "#5b4636" }
                : {fontSize: 28, fontWeight: "bold", color:"#e8dcc7"}), }}>
            {showTotal ? `${totalBalance.toLocaleString()} FCFA` : "****"}
          </Text>
        </TouchableOpacity>

        {/* PETITES CARTES */}
        <View style={styles.cardsRow}>
          <View style={[styles.smallCard, { backgroundColor: "#f87171" }]}>
            <Text style={styles.cardLabel}>Dépenses</Text>
            <Text style={styles.cardValue}>-{totalExpenses.toLocaleString()} FCFA</Text>
          </View>

          <View style={[styles.smallCard, { backgroundColor: "#4ade80" }]}>
            <Text style={styles.cardLabel}>Revenus</Text>
            <Text style={styles.cardValue}>+{totalRevenue.toLocaleString()} FCFA</Text>
          </View>
        </View>

        {/* ---------------- CARTE BANCAIRE -------------------- */}
        <View style={{ marginTop: 30 }}>
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: isDarkMode ? "#fff" : "#000" }}>
              Carte Bancaire
            </Text>

            <TouchableOpacity
              onPress={flipCard}
              style={{ backgroundColor: "#4a5568", paddingVertical: 6, paddingHorizontal: 15, borderRadius: 10 }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Voir +</Text>
            </TouchableOpacity>
          </View>

          <View style={{ height: 200, marginTop: 10 }}>

            {/* RECTO */}
            <Animated.View
              style={{
                position: isBack ? "absolute" : "relative",
                width: "100%",
                backfaceVisibility: "hidden",
                transform: [{ rotateY: frontInterpolate }],
              }}
            >
              <LinearGradient
                colors={isDarkMode ? ["#342b20", "#a28870"] : ["#432703", "#a28870"]}
                style={styles.bankCard}
              >
                {/* Numéro */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardNumber}>
                    {showCardNumber ? "1234 5678 9012 3456" : "**** **** **** 9876"}
                  </Text>
                  <TouchableOpacity onPress={() => setShowCardNumber(!showCardNumber)} style={{ marginLeft: 10 }}>
                    <FontAwesome name={showCardNumber ? "eye" : "eye-slash"} size={22} color="#fff" />
                  </TouchableOpacity>
                </View>

                {/* Titulaire + Solde */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 25 }}>
                  <View>
                    <Text style={styles.cardLabel}>Titulaire</Text>
                    <Text style={styles.cardHolder}>Mouhamed Ndiaye</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.cardHolder, { fontSize: 18, marginRight: 10 }]}>
                      {showCardSolde ? "245 000 FCFA" : "****"}
                    </Text>

                    <TouchableOpacity onPress={() => setShowCardSolde(!showCardSolde)}>
                      <FontAwesome name={showCardSolde ? "eye" : "eye-slash"} size={22} color="#fff" />
                    </TouchableOpacity>
                  </View>
                </View>

                <Text style={[styles.cardLabel, { marginTop: 20 }]}>BankApp</Text>
              </LinearGradient>
            </Animated.View>

            {/* VERSO */}
            <Animated.View
              style={{
                position: isBack ? "relative" : "absolute",
                top: 0,
                width: "100%",
                backfaceVisibility: "hidden",
                transform: [{ rotateY: backInterpolate }],
              }}
            >
              <LinearGradient
                colors={isDarkMode ? ["#342b20", "#a28870"] : ["#d6c7b4", "#a28870"]}
                style={styles.bankCard}
              >
                <View style={styles.blackStripe}></View>

                <View style={{ alignSelf: "flex-end", marginRight: 20 }}>
                  <Text style={styles.cardLabel}>CVV</Text>
                  <Text style={styles.cardHolder}>123</Text>
                </View>
              </LinearGradient>
            </Animated.View>
          </View>
        </View>

        {/* ------------------- GRAPHIQUES -------------------- */}
        <Text style={[styles.chartTitle, { color: isDarkMode ? "#fff" : "#000" }]}>
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

        <Text style={[styles.chartTitle, { color: isDarkMode ? "#fff" : "#000" }]}>
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
