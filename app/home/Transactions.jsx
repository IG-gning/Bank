import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar"; // ajout
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../context/ThemeContext";

export default function Transactions() {
  const navigation = useNavigation();
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false); // sidebar

  const transactions = [
    { id: 1, title: "Supermarché Carrefour", category: "Alimentation", type: "Dépense", amount: -85.5, date: "2025-11-17 14:30", icon: "shopping-cart", status: "Complété" },
    { id: 2, title: "Salaire - Entreprise XYZ", category: "Revenus", type: "Revenu", amount: 32000, date: "2025-11-16 09:00", icon: "cash-register", status: "Complété" },
    { id: 3, title: "Netflix Abonnement", category: "Loisirs", type: "Loisir", amount: -13.99, date: "2025-11-15 08:00", icon: "film", status: "Complété" },
    { id: 4, title: "Essence Total", category: "Transport", type: "Transport", amount: -65.0, date: "2025-11-14 09:00", icon: "gas-pump", status: "Complété" },
    { id: 5, title: "Virement de Marie", category: "Transport", type: "Transport", amount: 15000, date: "2025-11-16 09:00", icon: "user", status: "Complété" },
    { id: 6, title: "Restaurant Le Gourmet", category: "Alimentation", type: "Alimentation", amount: -78.5, date: "2025-11-12 20:00", icon: "utensils", status: "Complété" },
  ];

  const totalRevenus = transactions.filter((t) => t.amount > 0).reduce((acc, t) => acc + t.amount, 0);
  const totalDepenses = transactions.filter((t) => t.amount < 0).reduce((acc, t) => acc + t.amount, 0);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={[styles.transactionCard, { backgroundColor: isDarkMode ? "#030e25ff" : "white" }]}
                      onPress={() => navigation.navigate("TransactionDetails", { transaction: item })}
    >
      <View style={[styles.iconContainer, { backgroundColor: "#e8dcc7" }]}>
        <FontAwesome5 name={item.icon} size={20} color="#6b5a49" />
      </View>

      <View style={styles.transactionInfo}>
        <Text style={[styles.transactionTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]} numberOfLines={1}>
          {item.title}
          <Text style={[ styles.statusBadge, item.status === "Complété" ? styles.completed : styles.pending,]}>
            {"  "}{item.status}
          </Text>
        </Text>
        <Text style={[styles.transactionSubtitle, { color: isDarkMode ? "#bfa98a" : "gray" }]}>
          {item.date} • {item.category}
        </Text>
      </View>

      <Text style={[ styles.transactionAmount, 
            item.amount > 0 ? styles.positive : styles.negative,
            { color: item.amount > 0 ? "green" : "red" },
        ]}
      > 
        {item.amount > 0 ? "+" : ""}
        {item.amount.toFixed(2)} €
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#fff" }}>
      {/* Sidebar */}
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} isDarkMode={isDarkMode} />

      {/* Header */}
      <Header title="Transactions"
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
{/* .................................card 1.................................... */}
          <View 
           style={[styles.card, { backgroundColor: "#e8dcc7", borderLeft:"4px solid #5b4636",
           ...(!isDarkMode 
             ? {shadowColor: "#a8a8a8ff", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10}
             : {shadowColor: "transparent", shadowOpacity: 0, elevation: 0,  borderLeftColor: "#2b5ce7",}), 
           }]}>  
            <Text style={styles.cardTitle}>
              Total Transactions : <Text style={styles.cardValue}>{transactions.length}</Text>
            </Text>
            <Text style={styles.cardSubtitle}> Ce mois </Text>
          </View>

{/* .................................card 2.................................... */}
           <View 
            style={[styles.card, { backgroundColor: "#e8dcc7", borderLeft:"4px solid #5b4636",
            ...(!isDarkMode 
             ? {shadowColor: "#a8a8a8ff", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10}
             : {shadowColor: "transparent", shadowOpacity: 0, elevation: 0, borderLeftColor:"#2e7d32"}), 
            }]}>  
            
            <Text style={styles.cardTitle}>
              Total Revenus : <Text style={styles.revenue}>+{totalRevenus.toFixed(2)} €</Text>
            </Text>
            <Text style={styles.cardSubtitle}> Ce mois </Text>
          </View>

{/* .................................card 3.................................... */}
          <View
            style={[styles.card, { backgroundColor: "#e8dcc7", borderLeft:"4px solid #5b4636",
            ...(!isDarkMode 
             ? {shadowColor: "#a8a8a8ff", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10}
             : {shadowColor: "transparent", shadowOpacity: 0, elevation: 0, borderLeftColor:"#c62828"}), 
            }]}>  
            <Text style={styles.cardTitle}>
              Total Dépenses : <Text style={styles.expense}>{totalDepenses.toFixed(2)} €</Text>
            </Text>
            <Text style={styles.cardSubtitle}> Ce mois </Text>
          </View>

        </View>

{/* ................................LISTE transaction.......................................... */}
        <FlatList data={transactions.slice(0, visibleCount)}
                  renderItem={renderItem}
                  keyExtractor={(item) => item.id.toString()}
                  scrollEnabled={false}
        />

        <TouchableOpacity style={styles.showMoreBtn}
                onPress={() => {
                  setIsExpanded(!isExpanded);
                  setVisibleCount(isExpanded ? 3 : transactions.length);
                }}
        >
          <Text style={styles.showMoreText}>{isExpanded ? "Masquer" : "Voir +"}</Text>
        </TouchableOpacity>

      </ScrollView>

      {/* Mobile Navigation */}
      <MobileNav currentPage="transactions" isDarkMode={isDarkMode} />
    </View>
  );
}

// ------- STYLES -------
const styles = StyleSheet.create({
  pageSubtitle: { marginBottom: 20, paddingTop: 9, textAlign: "center" },
  cardsContainer: { gap: 12, marginBottom: 20 },
  card: { padding: 18, borderRadius: 14, elevation: 2 },
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
    elevation: 2,
  },
  iconContainer: { padding: 10, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  transactionInfo: { flex: 1, marginLeft: 12 },
  transactionTitle: { fontWeight: "bold", fontSize: 15 },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 2, fontSize: 10, marginLeft: 8, borderRadius: 8 },
  completed: { backgroundColor: "#d4f8d4", color: "#2e7d32" },
  pending: { backgroundColor: "#ffe1e1", color: "#c62828" },
  transactionSubtitle: { marginTop: 4 },
  transactionAmount: { fontWeight: "bold", fontSize: 16 },
  positive: { color: "green" },
  negative: { color: "red" },

  showMoreBtn: { marginTop: 20, padding: 12, borderRadius: 10, backgroundColor: "#e8dcc7", alignItems: "center", marginBottom:100 },
  showMoreText: { fontWeight: "bold", color: "#6b5a49" },
  list:{boxShadow:"10px 10px 10px black"}
});
