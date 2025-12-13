// // app/home/profile-simple.jsx
// import React from "react";
// import { View, Text } from "react-native";
// import Header from "./components/Header";
// import MobileNav from "./components/MobileNav";
// import Sidebar from "./components/Sidebar";
// import { useTheme } from "./context/ThemeContext";


// export default function ProfileSimple({ onNavigate, currentPage }) {
//   const { colors } = useTheme();

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.bg }}>
//       <Header title="Profil" isDarkMode={isDarkMode} />

//       <View style={{ padding: 20 }}>
//         <Text style={{ fontSize: 20, fontWeight: "700", color: colors.text }}>
//           Mouhamed Ndiaye
//         </Text>
//         <Text style={{ color: colors.soft, marginTop: 5 }}>mouhamed@example.com</Text>
//         <Text style={{ color: colors.soft, marginTop: 5 }}>+221 78 182 52 22</Text>
//       </View>

//       <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
//     </View>
//   );
// }
