import { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
  TextInput,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";
import { BackendContext } from "../context";

import { fetchTransactions } from "../context";

export default function Transactions() {
  const navigation = useNavigation();
  const api = useContext(BackendContext);
  const { isDarkMode, toggleTheme } = useTheme();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [stats, setStats] = useState({
    revenueThisMonth: 0,
    expenseThisMonth: 0,
    totalTransactionsThisMonth: 0,
  });

  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  // 🔍 Search & Filters
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    const res = await api.get("/api/transactions");
    setTransactions(res.data.transactions);
    setStats({
      revenueThisMonth: res.data.revenueThisMonth,
      expenseThisMonth: res.data.expenseThisMonth,
      totalTransactionsThisMonth: res.data.totalTransactionsThisMonth,
    });
  };

  const mapTransaction = (t) => {
    const isPositive = t.type === "depot" || t.type === "external_transfer";

    return {
      id: t._id,
      rawType: t.type,
      title:
        t.type === "depot"
          ? "Dépôt"
          : t.type === "retrait"
          ? "Retrait"
          : t.type === "internal_transfer"
          ? "Transfert interne"
          : "Virement externe",
      category: t.type.replace("_", " "),
      amount: isPositive ? t.amount : -t.amount,
      date: new Date(t.createdAt).toLocaleString(),
      icon:
        t.type === "depot"
          ? "cash-register"
          : t.type === "retrait"
          ? "money-bill-wave"
          : t.type === "internal_transfer"
          ? "exchange-alt"
          : "university",
      status: "Complété",
    };
  };

  // 🎯 FILTER LOGIC
  const filteredTransactions = transactions
    .map(mapTransaction)
    .filter((t) => {
      const matchSearch =
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.category.toLowerCase().includes(search.toLowerCase());

      const matchType =
        filterType === "all" ? true : t.rawType === filterType;

      return matchSearch && matchType;
    });

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.transactionCard,
        { backgroundColor: isDarkMode ? "#030e25ff" : "white" },
      ]}
      onPress={() =>
        navigation.navigate("TransactionDetails", { transaction: item })
      }
    >
      <View style={[styles.iconContainer, { backgroundColor: "#e8dcc7" }]}>
        <FontAwesome5 name={item.icon || "exchange-alt"} size={20} color="#6b5a49" />
      </View>

      <View style={styles.transactionInfo}>
        <Text
          style={[
            styles.transactionTitle,
            { color: isDarkMode ? "#f3e8d7" : "#000" },
          ]}
        >
          {item.title}
          <Text style={[styles.statusBadge, styles.completed]}>
            {"  "}Complété
          </Text>
        </Text>
        <Text
          style={[
            styles.transactionSubtitle,
            { color: isDarkMode ? "#bfa98a" : "gray" },
          ]}
        >
          {item.date} • {item.category}
        </Text>
      </View>

      <Text
        style={[
          styles.transactionAmount,
          item.amount > 0 ? styles.positive : styles.negative,
        ]}
      >
        {item.amount > 0 ? "+" : ""}
        {item.amount.toFixed(2)} Fcfa
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#fff" }}>
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
      />

      <Header
        title="Transactions"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        <Text
          style={[
            styles.pageSubtitle,
            { color: isDarkMode ? "#bfa98a" : "gray" },
          ]}
        >
          Voici la liste de vos transactions récentes.
        </Text>

        {/* 🔍 SEARCH */}
        <TextInput
          placeholder="Rechercher une transaction..."
          placeholderTextColor="#999"
          value={search}
          onChangeText={setSearch}
          style={[
            styles.searchInput,
            { backgroundColor: isDarkMode ? "#030e25ff" : "#f3f3f3" },
          ]}
        />
        {/* STATS CARDS */}
        <View style={styles.cardsContainer}>
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Transactions :{" "}
              <Text style={styles.cardValue}>{stats.totalTransactionsThisMonth}</Text>
            </Text>
            <Text style={styles.cardSubtitle}>Ce mois</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Revenus :{" "}
              <Text style={styles.revenue}>+{stats.revenueThisMonth.toFixed(2)} Fcfa</Text>
            </Text>
            <Text style={styles.cardSubtitle}>Ce mois</Text>
          </View>

          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Dépenses :{" "}
              <Text style={styles.expense}>-{stats.expenseThisMonth.toFixed(2)} Fcfa</Text>
            </Text>
            <Text style={styles.cardSubtitle}>Ce mois</Text>
          </View>
        </View>


        {/* 🎛️ FILTER BUTTONS */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {[
            { label: "Tous", value: "all" },
            { label: "Dépôt", value: "depot" },
            { label: "Retrait", value: "retrait" },
            { label: "Interne", value: "internal_transfer" },
            { label: "Externe", value: "external_transfer" },
          ].map((f) => (
            <TouchableOpacity
              key={f.value}
              style={[
                styles.filterBtn,
                filterType === f.value && styles.filterActive,
              ]}
              onPress={() => setFilterType(f.value)}
            >
              <Text style={styles.filterText}>{f.label}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* LIST */}
        <FlatList
          data={filteredTransactions.slice(0, visibleCount)}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
        />

        <TouchableOpacity
          style={styles.showMoreBtn}
          onPress={() => {
            setIsExpanded(!isExpanded);
            setVisibleCount(
              isExpanded ? 3 : filteredTransactions.length
            );
          }}
        >
          <Text style={styles.showMoreText}>
            {isExpanded ? "Masquer" : "Voir +"}
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <MobileNav currentPage="transactions" isDarkMode={isDarkMode} />
    </View>
  );
}

/* -------- STYLES -------- */
const styles = StyleSheet.create({
  pageSubtitle: { marginBottom: 20, paddingTop: 9, textAlign: "center" },
  cardsContainer: { gap: 8, marginBottom: 20 },
  card: { padding: 15, borderRadius: 14, elevation: 2,borderColor:"#ffffffff",borderWidth:2, backgroundColor: "#e8dcc7",borderRadius: 12},
  cardTitle: { fontWeight: "bold" },
  cardValue: { color: "#2b5ce7" },
  revenue: { color: "green" },
  expense: { color: "red" },
  cardSubtitle: { color: "gray" },
  pageSubtitle: { marginBottom: 16, textAlign: "center" },

  searchInput: {
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },

  filterBtn: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    backgroundColor: "#e8dcc7",
    borderRadius: 20,
    marginRight: 8,
  },
  filterActive: {
    backgroundColor: "#6b5a49",
  },
  filterText: {
    fontWeight: "bold",
    color: "#fff",
  },

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
  statusBadge: { fontSize: 10, marginLeft: 8 },
  completed: { color: "#2e7d32" },
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
