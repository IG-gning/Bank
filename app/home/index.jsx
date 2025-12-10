// // app/home/index.jsx
// import React, { useState } from "react";
// import { View, Text, ScrollView, StyleSheet } from "react-native";
// import Header from "../components/Header";
// import Sidebar from "../components/Sidebar"; // 🔥 Ajout obligatoire
// import MobileNav from "../components/MobileNav";

// // Icônes lucide-react-native
// import { Wallet, Send } from "lucide-react-native";

// // UI Components
// import { Card, CardContent } from "../components/ui/Card";
// import { Button } from "../components/ui/Button";

// export default function Home() {
//   const [isDarkMode, setIsDarkMode] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   // Données fictives
//   const totalBalance = 24580.45;
//   const monthlyIncome = 7200;
//   const monthlyExpenses = 4500;

//   return (
//     <View
//       style={[
//         styles.container,
//         { backgroundColor: isDarkMode ? "#141829" : "#f3e8d7" },
//       ]}
//     >
//       {/* Sidebar */}
//       {sidebarOpen && (
//         <Sidebar isDarkMode={isDarkMode} onClose={() => setSidebarOpen(false)} />
//       )}

//       {/* Header */}
//       <Header
//         isDarkMode={isDarkMode}
//         onToggleTheme={() => setIsDarkMode(!isDarkMode)}
//         onOpenSidebar={() => setSidebarOpen(true)}
//       />

//       {/* Page */}
//       <ScrollView contentContainerStyle={styles.scrollContent}>
//         {/* Welcome */}
//         <View style={styles.welcomeSection}>
//           <Text
//             style={[
//               styles.welcomeTitle,
//               { color: isDarkMode ? "#f3e8d7" : "#3b322a" },
//             ]}
//           >
//             Bienvenue, Jean 👋
//           </Text>
//           <Text
//             style={[
//               styles.welcomeSubtitle,
//               { color: isDarkMode ? "#bfa98a" : "#3b322a80" },
//             ]}
//           >
//             Voici un aperçu de votre situation financière
//           </Text>
//         </View>

//         {/* Solde total */}
//         <Card
//           style={[
//             styles.mainCard,
//             isDarkMode ? styles.mainCardDark : styles.mainCardLight,
//           ]}
//         >
//           <CardContent>
//             <View style={styles.cardTopRow}>
//               <View style={styles.cardLeft}>
//                 <View
//                   style={[
//                     styles.walletIcon,
//                     isDarkMode ? styles.walletIconDark : styles.walletIconLight,
//                   ]}
//                 >
//                   <Wallet
//                     width={32}
//                     height={32}
//                     color={isDarkMode ? "#141829" : "#fff"}
//                   />
//                 </View>
//                 <View>
//                   <Text
//                     style={[
//                       styles.cardLabel,
//                       { color: isDarkMode ? "#bfa98a" : "#fff" },
//                     ]}
//                   >
//                     Solde Total
//                   </Text>
//                   <Text
//                     style={[
//                       styles.cardAmount,
//                       { color: isDarkMode ? "#f3e8d7" : "#fff" },
//                     ]}
//                   >
//                     {totalBalance.toFixed(2)} €
//                   </Text>
//                 </View>
//               </View>

//               {/* Bouton transfert */}
//               <Button
//                 style={isDarkMode ? styles.btnDark : styles.btnLight}
//                 onPress={() => console.log("Transfert")}
//               >
//                 <Send width={20} height={20} />
//                 <Text style={{ color: "#fff", marginLeft: 4 }}>Transfert</Text>
//               </Button>
//             </View>
//           </CardContent>
//         </Card>

//         {/* Revenus + dépenses */}
//         <View style={styles.incomeExpensesRow}>
//           <Card
//             style={[
//               styles.smallCard,
//               isDarkMode ? styles.smallCardDark : styles.smallCardLight,
//             ]}
//           >
//             <CardContent>
//               <Text style={{ color: isDarkMode ? "#f3e8d7" : "#3b322a" }}>
//                 Revenus ce mois
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 24,
//                   fontWeight: "700",
//                   color: isDarkMode ? "#f3e8d7" : "#3b322a",
//                 }}
//               >
//                 {monthlyIncome.toFixed(2)} €
//               </Text>
//             </CardContent>
//           </Card>

//           <Card
//             style={[
//               styles.smallCard,
//               isDarkMode ? styles.smallCardDark : styles.smallCardLight,
//             ]}
//           >
//             <CardContent>
//               <Text style={{ color: isDarkMode ? "#f3e8d7" : "#3b322a" }}>
//                 Dépenses ce mois
//               </Text>
//               <Text
//                 style={{
//                   fontSize: 24,
//                   fontWeight: "700",
//                   color: isDarkMode ? "#f3e8d7" : "#3b322a",
//                 }}
//               >
//                 {monthlyExpenses.toFixed(2)} €
//               </Text>
//             </CardContent>
//           </Card>
//         </View>

//         <Text
//           style={{
//             color: isDarkMode ? "#f3e8d7" : "#3b322a",
//             marginTop: 32,
//             fontSize: 18,
//           }}
//         >
//           Graphiques et transactions arrivent…
//         </Text>
//       </ScrollView>

//       {/* Barre de navigation mobile */}
//       <MobileNav currentPage="dashboard" isDarkMode={isDarkMode} />
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   scrollContent: { padding: 16, paddingBottom: 120 },

//   welcomeSection: { marginBottom: 20 },
//   welcomeTitle: { fontSize: 28, fontWeight: "700" },
//   welcomeSubtitle: { fontSize: 16 },

//   mainCard: {
//     borderRadius: 16,
//     marginBottom: 16,
//     padding: 16,
//   },
//   mainCardDark: { backgroundColor: "#1a2742" },
//   mainCardLight: { backgroundColor: "#d6c7b4" },

//   cardTopRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },

//   cardLeft: { flexDirection: "row", alignItems: "center" },

//   walletIcon: {
//     width: 60,
//     height: 60,
//     borderRadius: 16,
//     justifyContent: "center",
//     alignItems: "center",
//     marginRight: 12,
//   },
//   walletIconDark: { backgroundColor: "#bfa98a" },
//   walletIconLight: { backgroundColor: "rgba(255,255,255,0.3)" },

//   cardLabel: { fontSize: 14 },
//   cardAmount: { fontSize: 28, fontWeight: "700" },

//   btnDark: {
//     backgroundColor: "#141829",
//     padding: 8,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },
//   btnLight: {
//     backgroundColor: "#3b322a",
//     padding: 8,
//     borderRadius: 12,
//     flexDirection: "row",
//     alignItems: "center",
//   },

//   // Revenus / Dépenses
//   incomeExpensesRow: {
//     flexDirection: "row",
//     gap: 12,
//   },
//   smallCard: {
//     flex: 1,
//     borderRadius: 16,
//     padding: 16,
//   },
//   smallCardDark: { backgroundColor: "#141829" },
//   smallCardLight: { backgroundColor: "#f3e8d7" },
// });
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { LinearGradient } from "expo-linear-gradient";
import { useTheme } from "../context/ThemeContext";


const screenWidth = Dimensions.get("window").width - 32; // padding 16

export default function Home() {
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showTotal, setShowTotal] = useState(true);

  // Données exemple
  const revenue = [5000, 6000, 5500, 7000, 6500, 7200];
  const expenses = [3000, 2500, 4000, 3500, 3800, 3200];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];

  const totalRevenue = revenue.reduce((a, b) => a + b, 0);
  const totalExpenses = expenses.reduce((a, b) => a + b, 0);
  const totalBalance = totalRevenue - totalExpenses;

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? "#141829" : "#f7f5f2" }]}>
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

        {/* Cartes Dépense / Revenue / Carte Bancaire */}
        <View style={styles.cardsRow}>
          <View style={[styles.smallCard, { backgroundColor: "#f87171" }]}>
            <Text style={styles.cardLabel}>Dépenses</Text>
            <Text style={styles.cardValue}>-{totalExpenses.toLocaleString()} €</Text>
          </View>
          <View style={[styles.smallCard, { backgroundColor: "#4ade80" }]}>
            <Text style={styles.cardLabel}>Revenus</Text>
            <Text style={styles.cardValue}>+{totalRevenue.toLocaleString()} €</Text>
          </View>
        </View>
                  {/* Carte Bancaire */}
<View style={{ marginTop: 16 }}>
  <Text style={[styles.chartTitle, { color: isDarkMode ? "#f3e8d7" : "#3b322a" }]}>
    Carte Bancaire
  </Text>

  <LinearGradient
    colors={isDarkMode ? ["#1e1f38", "#3b3f5c"] : ["#d6c7b4", "#a28870"]}
    start={[0, 0]}
    end={[1, 1]}
    style={styles.bankCard}
  >
    {/* Recto */}
    <View style={styles.cardRecto}>
      <Text style={styles.cardNumber}>**** **** **** 1234</Text>
      <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 20 }}>
        <View>
          <Text style={styles.cardLabel}>Titulaire</Text>
          <Text style={styles.cardHolder}>John Doe</Text>
        </View>
        <View>
          <Text style={styles.cardLabel}>Exp</Text>
          <Text style={styles.cardHolder}>12/28</Text>
        </View>
      </View>
      <Text style={[styles.cardLabel, { marginTop: 20 }]}>BankApp</Text>
    </View>

    {/* Verso */}
    <View style={styles.cardVerso}>
      <View style={styles.blackStripe}></View>
      <View style={styles.cvvContainer}>
        <Text style={styles.cardLabel}>CVV</Text>
        <Text style={styles.cardHolder}>123</Text>
      </View>
    </View>
  </LinearGradient>
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
  bankCard: {
  borderRadius: 20,
  padding: 20,
  width: "100%",
  height: 200,
  marginVertical: 10,
},
cardRecto: { flex: 1 },
cardVerso: { flex: 1, marginTop: 20 },
cardNumber: { color: "#fff", fontSize: 22, fontWeight: "700" },
cardLabel: { color: "#fff", fontSize: 12, opacity: 0.9 },
cardHolder: { color: "#fff", fontSize: 16, fontWeight: "700" },
blackStripe: {
  height: 40,
  backgroundColor: "#f0f0f0ff",
  borderRadius: 4,
  marginBottom: 10,
},
cvvContainer: { alignSelf: "flex-end", textAlign: "right" },

});
