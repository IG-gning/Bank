import { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

import { fetchTransactions } from "../context";

export default function Transactions() {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  const [transactions, setTransactions] = useState([]); // ✅ backend
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchTransactions(); // 🔗 backend
        setTransactions(data);
      } catch (error) {
        console.log("Erreur chargement transactions :", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const totalRevenus = transactions
    .filter((t) => t.amount > 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const totalDepenses = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => acc + t.amount, 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.transactionCard, { backgroundColor: isDarkMode ? "#1a2742" : "white" }]}
      onPress={() => navigation.navigate("TransactionDetails", { transaction: item })}
    >
      <View style={[styles.iconContainer, { backgroundColor: "#e8dcc7" }]}>
        <FontAwesome5 name={item.icon || "exchange-alt"} size={20} color="#6b5a49" />
      </View>

      <View style={styles.transactionInfo}>
        <Text style={[styles.transactionTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]} numberOfLines={1}>
          {item.title}
          <Text style={[styles.statusBadge, styles.completed]}>
            {"  "}Complété
          </Text>
        </Text>

        <Text style={[styles.transactionSubtitle, { color: isDarkMode ? "#bfa98a" : "gray" }]}>
          {item.date} • {item.category}
        </Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          { color: item.amount > 0 ? "green" : "red" },
        ]}
      >
        {item.amount > 0 ? "+" : ""}
        {item.amount.toFixed(2)} €
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#141829" : "#fff" }}>
      {/* Sidebar */}
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} isDarkMode={isDarkMode} />

      {/* Header */}
      <Header
        title="Transactions"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text style={[styles.pageSubtitle, { color: isDarkMode ? "#bfa98a" : "gray" }]}>
          Voici la liste de vos transactions récentes.
        </Text>

        {/* CARDS */}
        <View style={styles.cardsContainer}>
          <View style={[styles.card, { backgroundColor: "#e8dcc7" }]}>
            <Text style={styles.cardTitle}>
              Total Transactions : <Text style={styles.cardValue}>{transactions.length}</Text>
            </Text>
            <Text style={styles.cardSubtitle}>Ce mois</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#e8dcc7" }]}>
            <Text style={styles.cardTitle}>
              Total Revenus : <Text style={styles.revenue}>+{totalRevenus.toFixed(2)} €</Text>
            </Text>
            <Text style={styles.cardSubtitle}>Ce mois</Text>
          </View>

          <View style={[styles.card, { backgroundColor: "#e8dcc7" }]}>
            <Text style={styles.cardTitle}>
              Total Dépenses : <Text style={styles.expense}>{totalDepenses.toFixed(2)} €</Text>
            </Text>
            <Text style={styles.cardSubtitle}>Ce mois</Text>
          </View>
        </View>

        {/* LISTE */}
        {!loading && (
          <FlatList
            data={transactions.slice(0, visibleCount)}
            renderItem={renderItem}
            keyExtractor={(item) => item._id || item.id}
            scrollEnabled={false}
          />
        )}

        <TouchableOpacity
          style={styles.showMoreBtn}
          onPress={() => {
            setIsExpanded(!isExpanded);
            setVisibleCount(isExpanded ? 3 : transactions.length);
          }}
        >
          <Text style={styles.showMoreText}>{isExpanded ? "Masquer" : "Voir +"}</Text>
        </TouchableOpacity>
      </ScrollView>

      <MobileNav currentPage="transactions" isDarkMode={isDarkMode} />
    </View>
  );
}

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  pageSubtitle: { marginBottom: 20, paddingTop: 9, textAlign: "center" },
  cardsContainer: { gap: 12, marginBottom: 20 },
  card: { padding: 18, borderRadius: 14 },
  cardTitle: { fontWeight: "bold" },
  cardValue: { color: "#2b5ce7" },
  revenue: { color: "green" },
  expense: { color: "red" },
  cardSubtitle: { color: "gray" },

  transactionCard: {
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  iconContainer: { padding: 10, borderRadius: 50 },
  transactionInfo: { flex: 1, marginLeft: 12 },
  transactionTitle: { fontWeight: "bold", fontSize: 15 },
  statusBadge: { paddingHorizontal: 8, fontSize: 10 },
  completed: { backgroundColor: "#d4f8d4", color: "#2e7d32" },
  transactionSubtitle: { marginTop: 4 },
  transactionAmount: { fontWeight: "bold", fontSize: 16 },

  showMoreBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#e8dcc7",
    alignItems: "center",
    marginBottom: 100,
  },
  showMoreText: { fontWeight: "bold", color: "#6b5a49" },
});
