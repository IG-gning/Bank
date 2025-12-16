import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ActivityIndicator,
  Alert,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { FontAwesome, Ionicons } from "@expo/vector-icons";

import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";

import { useTheme } from "./context/ThemeContext";
import { BackendContext } from "./context"; // Contexte Axios

export default function Accounts({ onNavigate, currentPage }) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const api = useContext(BackendContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const [comptes, setComptes] = useState([]);

  const [showSoldes, setShowSoldes] = useState([]);
  const [showCardNumber, setShowCardNumber] = useState([]);
  const [showCardSolde, setShowCardSolde] = useState([]);
  const spinValue = useRef([]).current;
  const [isBack, setIsBack] = useState([]);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const res = await api.get("/api/accounts"); // Récupère les comptes
        setComptes(res.data);

        setShowSoldes(res.data.map(() => true));
        setShowCardNumber(res.data.map(() => false));
        setShowCardSolde(res.data.map(() => true));
        setIsBack(res.data.map(() => false));

        res.data.forEach(() => spinValue.push(new Animated.Value(0)));
      } catch (err) {
        console.error("Erreur fetch comptes :", err.response?.data || err);
        Alert.alert("Erreur", "Impossible de récupérer les comptes");
      } finally {
        setLoading(false);
      }
    };
    fetchAccounts();
  }, []);

  const flipCard = (index) => {
    Animated.timing(spinValue[index], {
      toValue: isBack[index] ? 0 : 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
    const newBack = [...isBack];
    newBack[index] = !newBack[index];
    setIsBack(newBack);
  };

  const toggleSolde = (index) => {
    const newState = [...showSoldes];
    newState[index] = !newState[index];
    setShowSoldes(newState);
  };

  const toggleCardNumber = (index) => {
    const newState = [...showCardNumber];
    newState[index] = !newState[index];
    setShowCardNumber(newState);
  };

  const toggleCardSolde = (index) => {
    const newState = [...showCardSolde];
    newState[index] = !newState[index];
    setShowCardSolde(newState);
  };

  if (loading) {
    return <ActivityIndicator size="large" color={colors.primary} style={{ flex: 1, justifyContent: "center" }} />;
  }

  return (
    <View style={{ flex: 1, backgroundColor: colors.bg }}>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onNavigate={onNavigate}
      />

      <Header
        title="Mes Comptes"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {comptes.map((c, i) => {
          const frontInterpolate = spinValue[i].interpolate({
            inputRange: [0, 1],
            outputRange: ["0deg", "180deg"],
          });
          const backInterpolate = spinValue[i].interpolate({
            inputRange: [0, 1],
            outputRange: ["180deg", "360deg"],
          });

          return (
            <View key={c._id} style={{ margin: 15 }}>
              {/* Carte Bancaire */}
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text }}>
                  Carte Bancaire
                </Text>
                <TouchableOpacity
                  onPress={() => flipCard(i)}
                  style={{ backgroundColor: colors.primary, paddingVertical: 6, paddingHorizontal: 15, borderRadius: 10 }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700" }}>Voir +</Text>
                </TouchableOpacity>
              </View>

              {/* Flip Card */}
              <View style={{ marginTop: 10 }}>
                <Animated.View
                  style={[styles.cardContainer, { transform: [{ rotateY: frontInterpolate }], position: isBack[i] ? "absolute" : "relative" }]}
                >
                  <LinearGradient colors={["#432703", "#a28870"]} style={styles.bankCard}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                      <Text style={styles.cardNumber}>
                        {showCardNumber[i] ? c.accountNumber : "**** **** **** ****" }
                      </Text>
                      <TouchableOpacity onPress={() => toggleCardNumber(i)}>
                        <FontAwesome name={showCardNumber[i] ? "eye" : "eye-slash"} size={20} color="#fff" />
                      </TouchableOpacity>
                    </View>

                    <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
                      <Text style={styles.cardHolder}>{c.name}</Text>
                      <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Text style={[styles.cardHolder, { fontSize: 18 }]}>
                          {showCardSolde[i] ? c.balance + " " + c.currency : "****"}
                        </Text>
                        <TouchableOpacity onPress={() => toggleCardSolde(i)}>
                          <FontAwesome name={showCardSolde[i] ? "eye" : "eye-slash"} size={20} color="#fff" />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </LinearGradient>
                </Animated.View>

                <Animated.View
                  style={[styles.cardContainer, { transform: [{ rotateY: backInterpolate }], position: isBack[i] ? "relative" : "absolute" }]}
                >
                  <LinearGradient colors={["#432703", "#a28870"]} style={styles.bankCard}>
                    <View style={styles.blackStripe} />
                    <View style={styles.cvvContainer}>
                      <Text style={styles.cardLabel}>CVV</Text>
                      <Text style={styles.cardHolder}>123</Text>
                    </View>
                  </LinearGradient>
                </Animated.View>
              </View>

              {/* Solde compte */}
              <View style={{ marginTop: 10, padding: 15, borderRadius: 16, backgroundColor: colors.card, borderWidth: 1, borderColor: colors.border }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="wallet" size={18} color={colors.primary} />
                    <Text style={{ color: colors.text, fontWeight: "bold", marginLeft: 5 }}>{c.type}</Text>
                  </View>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text style={{ color: colors.primary, marginRight: 5 }}>
                      {showSoldes[i] ? c.balance + " " + c.currency : "****"}
                    </Text>
                    <TouchableOpacity onPress={() => toggleSolde(i)}>
                      <FontAwesome name={showSoldes[i] ? "eye" : "eye-slash"} size={18} color={colors.text} />
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: { height: 200, backfaceVisibility: "hidden" },
  bankCard: { borderRadius: 18, padding: 20, height: "100%" },
  cardNumber: { color: "#fff", fontSize: 20, fontWeight: "700" },
  cardLabel: { color: "#fff", fontSize: 12 },
  cardHolder: { color: "#fff", fontSize: 16, fontWeight: "600" },
  blackStripe: { height: 40, backgroundColor: "#000", borderRadius: 5 },
  cvvContainer: { marginTop: 20, flexDirection: "row", justifyContent: "space-between" },
});
