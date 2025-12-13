// // app/home/accounts.jsx
// import React from "react";
// import { View, Text } from "react-native";
// import Header from "./components/Header";
// import MobileNav from "./components/MobileNav";
// import Sidebar from "./components/Sidebar";

// export default function Accounts({ onNavigate, currentPage }) {
//   const { isDarkMode } = useTheme();

//   const colors = {
//     bg: isDarkMode ? "#141829" : "#eadfcf",
//     text: isDarkMode ? "#f3e8d7" : "#3b322a",
//     card: isDarkMode ? "#1c2138" : "#fff",
//     border: isDarkMode ? "#ffffff15" : "#00000020",
//     soft: isDarkMode ? "#bfa98a" : "#5b4636",
//   };

//   const comptes = [
//     { type: "Compte courant", numero: "SN1023020201", solde: "245 000 FCFA" },
//     { type: "Compte épargne", numero: "SN2099920201", solde: "1 200 000 FCFA" },
//   ];

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.bg }}>
      
//       <Header title="Mes Comptes" isDarkMode={isDarkMode} />

//       {comptes.map((c, i) => (
//         <View
//           key={i}
//           style={{
//             backgroundColor: colors.card,
//             margin: 15,
//             padding: 20,
//             borderRadius: 16,
//             borderWidth: 1,
//             borderColor: colors.border,
//           }}
//         >
//           <Text style={{ fontSize: 17, fontWeight: "700", color: colors.text }}>{c.type}</Text>
//           <Text style={{ color: colors.soft, marginTop: 5 }}>{c.numero}</Text>
//           <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "700", color: colors.text }}>
//             {c.solde}
//           </Text>
//         </View>
//       ))}

//       <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
//     </View>
//   );
// }
