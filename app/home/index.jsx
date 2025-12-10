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
// app/home/index.jsx
import React, { useState } from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";

// Composants locaux
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? "#141829" : "#ffffffff" },
      ]}
    >
      {/* SIDEBAR */}
      <Sidebar
        visible={sidebarOpen}        // ← IMPORTANT (permet l’affichage)
        isDarkMode={isDarkMode}
        onClose={() => setSidebarOpen(false)}
        onNavigate={(page) => setCurrentPage(page)} // <-- ici on linke les pages
      />

      {/* HEADER */}
      <Header
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onMenuPress={() => setSidebarOpen(true)}   // ← ouvre le sidebar
      />

      {/* CONTENU */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "700",
            marginBottom: 10,
            color: isDarkMode ? "#f3e8d7" : "#3b322a",
          }}
        >
          Bienvenue 👋
        </Text>

        <Text
          style={{
            fontSize: 16,
            color: isDarkMode ? "#bfa98a" : "#3b322a80",
            marginBottom: 20,
          }}
        >
          Voici un aperçu de votre tableau de bord.
        </Text>

        {/* Exemple de carte */}
        <View
          style={[
            styles.card,
            { backgroundColor: isDarkMode ? "#1a2742" : "#d6c7b4" },
          ]}
        >
          <Text style={{ fontSize: 18, color: "#fff" }}>Solde Total</Text>
          <Text style={{ fontSize: 28, fontWeight: "700", color: "#fff" }}>
            24 580 €
          </Text>
        </View>
      </ScrollView>

      {/* NAVIGATION MOBILE */}
      <MobileNav currentPage="dashboard" isDarkMode={isDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContent: { padding: 16, paddingBottom: 100 },
  card: {
    borderRadius: 16,
    padding: 20,
    marginTop: 20,
  },
});
