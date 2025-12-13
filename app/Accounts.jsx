import React, { useState, useRef } from "react";
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Animated } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";

import { useTheme } from "./context/ThemeContext";

export default function Accounts({ onNavigate, currentPage }) {

  /* ✅ THEME (COMME PROFILE PAGE) */
  const { colors, isDarkMode, toggleTheme } = useTheme();

  /* ✅ SIDEBAR */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /* CARD STATES */
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showCardSolde, setShowCardSolde] = useState(true);

  /* FLIP CARD */
  const spinValue = useRef(new Animated.Value(0)).current;
  const [isBack, setIsBack] = useState(false);

  const flipCard = () => {
    Animated.timing(spinValue, {
      toValue: isBack ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    setIsBack(!isBack);
  };

  const frontInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "180deg"],
  });

  const backInterpolate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["180deg", "360deg"],
  });

  /* COMPTES */
  const comptes = [
    { type: "Courant", solde: "245 000 FCFA", icon: "wallet" },
    { type: "Epargne", solde: "200 000 FCFA", icon: "cash" },
    { type: "Business", solde: "1 200 000 FCFA", icon: "briefcase" },
  ];

  const [showSoldes, setShowSoldes] = useState(comptes.map(() => true));

  const toggleSolde = (index) => {
    const newState = [...showSoldes];
    newState[index] = !newState[index];
    setShowSoldes(newState);
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>

      {/* SIDEBAR */}
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onNavigate={onNavigate}
      />

      {/* HEADER ✅ (MAINTENANT 100% FONCTIONNEL) */}
      <Header
        title="Mes Comptes"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>

        {/* -------- CARTE BANCAIRE -------- */}
        <View style={{ margin: 15 }}>

          <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text }}>
              Carte Bancaire
            </Text>

            <TouchableOpacity
              onPress={flipCard}
              style={{
                backgroundColor: colors.primary,
                paddingVertical: 6,
                paddingHorizontal: 15,
                borderRadius: 10,
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "700" }}>Voir +</Text>
            </TouchableOpacity>
          </View>

          {/* FLIP */}
          <View style={{ marginTop: 10 }}>

            {/* RECTO */}
            <Animated.View
              style={[
                styles.cardContainer,
                { transform: [{ rotateY: frontInterpolate }],
                  position: isBack ? "absolute" : "relative" },
              ]}
            >
              <LinearGradient
                colors={["#432703", "#a28870"]}
                style={styles.bankCard}
              >
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={styles.cardNumber}>
                    {showCardNumber ? "1234 5678 9012 3456" : "**** **** **** 987"}
                  </Text>
                  <TouchableOpacity onPress={() => setShowCardNumber(!showCardNumber)}>
                    <FontAwesome
                      name={showCardNumber ? "eye" : "eye-slash"}
                      size={20}
                      color="#fff"
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                  <View>
                    <Text style={styles.cardLabel}>Titulaire</Text>
                    <Text style={styles.cardHolder}>Mouhamed Ndiaye</Text>
                  </View>

                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={[styles.cardHolder, { fontSize: 18 }]}>
                      {showCardSolde ? "245 000 FCFA" : "****"}
                    </Text>
                    <TouchableOpacity onPress={() => setShowCardSolde(!showCardSolde)}>
                      <FontAwesome
                        name={showCardSolde ? "eye" : "eye-slash"}
                        size={20}
                        color="#fff"
                      />
                    </TouchableOpacity>
                  </View>
                </View>
              </LinearGradient>
            </Animated.View>

            {/* VERSO */}
            <Animated.View
              style={[
                styles.cardContainer,
                { transform: [{ rotateY: backInterpolate }],
                  position: isBack ? "relative" : "absolute" },
              ]}
            >
              <LinearGradient
                colors={["#432703", "#a28870"]}
                style={styles.bankCard}
              >
                <View style={styles.blackStripe} />
                <View style={styles.cvvContainer}>
                  <Text style={styles.cardLabel}>CVV</Text>
                  <Text style={styles.cardHolder}>123</Text>
                </View>
              </LinearGradient>
            </Animated.View>

          </View>
        </View>

        {/* -------- COMPTES -------- */}
        <View style={{ margin: 15 }}>
          {comptes.map((c, i) => (
            <View key={i} style={{
              backgroundColor: colors.card,
              padding: 15,
              borderRadius: 16,
              marginBottom: 10,
              borderWidth: 1,
              borderColor: colors.border,
            }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <View>
                  <Ionicons name={c.icon} size={18} color={colors.primary} />
                  <Text style={{ color: colors.text, fontWeight: "bold" }}>{c.type}</Text>
                </View>

                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <Text style={{ color: colors.primary, marginRight: 5 }}>
                    {showSoldes[i] ? c.solde : "****"}
                  </Text>
                  <TouchableOpacity onPress={() => toggleSolde(i)}>
                    <FontAwesome
                      name={showSoldes[i] ? "eye" : "eye-slash"}
                      size={18}
                      color={colors.text}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>

      </ScrollView>

      <MobileNav
        currentPage={currentPage}
        onNavigate={onNavigate}
        isDarkMode={isDarkMode}
      />
    </View>
  );
}

/* STYLES */
const styles = StyleSheet.create({
  cardContainer: { height: 200, backfaceVisibility: "hidden" },
  bankCard: { borderRadius: 18, padding: 20, height: "100%" },
  cardNumber: { color: "#fff", fontSize: 20, fontWeight: "700" },
  cardLabel: { color: "#fff", fontSize: 12 },
  cardHolder: { color: "#fff", fontSize: 16, fontWeight: "600" },
  blackStripe: { height: 40, backgroundColor: "#000", borderRadius: 5 },
  cvvContainer: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
});
