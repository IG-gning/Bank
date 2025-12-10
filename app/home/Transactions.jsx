import { useState } from "react";

import { View, Text, StyleSheet, TouchableOpacity, FlatList, ScrollView } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import { useNavigation } from "@react-navigation/native";

export default function Transactions() {
  const navigation = useNavigation();
  const [visibleCount, setVisibleCount] = useState(3);
  const [isExpanded, setIsExpanded] = useState(false);

  // ------- DATA --------
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

  // ------- RENDER ITEM --------
  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.transactionCard} 
      onPress={() => navigation.navigate("TransactionDetails", { transaction: item })}>
    
        <View style={styles.iconContainer}> <FontAwesome5 name={item.icon} size={20} color="#6b5a49" /> </View>

        <View style={styles.transactionInfo}>
          <Text style={styles.transactionTitle} numberOfLines={1}> {item.title}  
              <Text style={[ styles.statusBadge, item.status === "Complété" ? styles.completed : styles.pending,]}>
                {"  "}{item.status} 
              </Text>
          </Text>
          <Text style={styles.transactionSubtitle}> {item.date} • {item.category} </Text>
        </View>

        <Text style={[ styles.transactionAmount, item.amount > 0 ? styles.positive : styles.negative]}>
              {item.amount > 0 ? "+" : ""}
              {item.amount.toFixed(2)} €
        </Text>

    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <Header title="Transactions" />

      <Text style={styles.pageSubtitle}>Voici la liste de vos transactions récentes.</Text>

      {/* CARDS */}
      <View style={styles.cardsContainer}>

        <View style={styles.card}>
            <Text style={styles.cardTitle}> 
              Total Transactions : <Text style={styles.cardValue}> {transactions.length} </Text>
            </Text>
            <Text style={styles.cardSubtitle}> Ce mois </Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Revenus : <Text style={styles.revenue}> +{totalRevenus.toFixed(2)} € </Text>
            </Text>
            <Text style={styles.cardSubtitle}> Ce mois </Text>
        </View>

        <View style={styles.card}>
            <Text style={styles.cardTitle}>
              Total Dépenses : <Text style={styles.expense}> {totalDepenses.toFixed(2)} € </Text>
            </Text>
            <Text style={styles.cardSubtitle}> Ce mois </Text>
        </View>

      </View>

      {/* LISTE */}
      <Text style={styles.listTitle}> </Text>
        
      

      <FlatList
        data={transactions.slice(0, visibleCount)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        scrollEnabled={false}/>
      

      <TouchableOpacity style={styles.showMoreBtn}
        onPress={() => {
          setIsExpanded(!isExpanded);
          setVisibleCount(isExpanded ? 3 : transactions.length);
        }}>
      
        <Text style={styles.showMoreText}>
          {isExpanded ? "Masquer" : "Voir +"}
        </Text>
      </TouchableOpacity>

      <MobileNav />
    </ScrollView>
  );
}

// ------- STYLES -------
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: "#fff" },

  pageSubtitle: {
    marginBottom: 20,
    color: "gray",
    paddingTop: 9,
    textAlign: "center",
  },

  cardsContainer: { gap: 12, marginBottom: 20 },
  card: {
    padding: 18,
    backgroundColor: "#e8dcc7",
    borderRadius: 14,
    elevation: 2,
  },

  cardTitle: { fontWeight: "bold" },
  cardValue: { color: "#2b5ce7" },
  revenue: { color: "green" },
  expense: { color: "red" },
  cardSubtitle: { color: "gray" },

  listTitle: { marginBottom: 12, fontWeight: "bold" },

  transactionCard: {
    padding: 12,
    backgroundColor: "white",
    borderRadius: 12,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    elevation: 2,
  },

  iconContainer: {
    padding: 10,
    backgroundColor: "#e8dcc7",
    borderRadius: 50,
  },

  transactionInfo: { flex: 1, marginLeft: 12 },

  transactionTitle: { fontWeight: "bold", fontSize: 15 },

  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    fontSize: 10,
    marginLeft: 8,
    borderRadius: 8,
  },

  completed: { backgroundColor: "#d4f8d4", color: "#2e7d32" },
  pending: { backgroundColor: "#ffe1e1", color: "#c62828" },

  transactionSubtitle: { color: "gray", marginTop: 4 },

  transactionAmount: { fontWeight: "bold", fontSize: 16 },
  positive: { color: "green" },
  negative: { color: "red" },

  showMoreBtn: {
    marginTop: 20,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#e8dcc7",
    alignItems: "center",
  },

  showMoreText: { fontWeight: "bold", color: "#6b5a49" },
});
