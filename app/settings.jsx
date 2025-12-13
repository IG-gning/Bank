// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   Switch,
//   TouchableOpacity,
//   ScrollView,
// } from "react-native";
// import { FontAwesome } from "@expo/vector-icons";

// // Components
// import Header from "./components/Header";
// import MobileNav from "./components/MobileNav";
// import Sidebar from "./components/Sidebar";

// // Theme Context
// import { useTheme } from "./context/ThemeContext";

// export default function ProfilePage({ onNavigate, currentPage }) {
//   const { isDarkMode, toggleTheme } = useTheme();
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const [user, setUser] = useState({
//     prenom: "Mouhamed",
//     nom: "Ndiaye",
//     email: "mouhamed22@gmail.com",
//     numero: "+221 78 182 52 22",
//   });

//   const [isEditing, setIsEditing] = useState(false);
//   const [twoFA, setTwoFA] = useState(false);
//   const [emailNotif, setEmailNotif] = useState(true);

//   // Définir les couleurs en fonction du mode
//  const { colors } = useTheme();

//   const handleChange = (key, value) => {
//     setUser({ ...user, [key]: value });
//   };

//   return (
//     <View style={{ flex: 1, backgroundColor: colors.bg }}>
//       {/* SIDEBAR */}
//       <Sidebar
//         visible={sidebarOpen}
//         onClose={() => setSidebarOpen(false)}
//         isDarkMode={isDarkMode}
//         onNavigate={onNavigate}
//       />

//       {/* HEADER */}
//       <Header
//         title="Mon Profil"
//         isDarkMode={isDarkMode}
//         onToggleTheme={toggleTheme}
//         onMenuPress={() => setSidebarOpen(true)}
//       />

//       <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
//         {/* ----------- CARD PHOTO + INFO ----------- */}
//         <View
//           style={{
//             backgroundColor: colors.card,
//             padding: 20,
//             margin: 15,
//             borderRadius: 18,
//             borderWidth: 1,
//             borderColor: colors.border,
//           }}
//         >
//           <View style={{ alignItems: "center" }}>
//             <View
//               style={{
//                 width: 90,
//                 height: 90,
//                 borderRadius: 50,
//                 backgroundColor: colors.primary,
//                 justifyContent: "center",
//                 alignItems: "center",
//               }}
//             >
//               <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
//                 {user.prenom[0]}
//                 {user.nom[0]}
//               </Text>
//             </View>

//             <Text
//               style={{
//                 marginTop: 12,
//                 fontSize: 18,
//                 fontWeight: "600",
//                 color: colors.text,
//               }}
//             >
//               {user.prenom} {user.nom}
//             </Text>

//             <Text style={{ color: colors.soft, marginBottom: 10 }}>
//               Client Premium
//             </Text>

//             <TouchableOpacity
//               onPress={() => setIsEditing(true)}
//               style={{
//                 backgroundColor: colors.primary,
//                 paddingVertical: 10,
//                 paddingHorizontal: 25,
//                 borderRadius: 12,
//                 marginTop: 10,
//               }}
//             >
//               <Text style={{ color: "#fff", fontWeight: "600" }}>
//                 Modifier Profil
//               </Text>
//             </TouchableOpacity>
//           </View>
//         </View>

//         {/* ----------- CARD INFORMATIONS ----------- */}
//         <View
//           style={{
//             backgroundColor: colors.card,
//             padding: 20,
//             marginHorizontal: 15,
//             borderRadius: 18,
//             borderWidth: 1,
//             borderColor: colors.border,
//           }}
//         >
//           <Text
//             style={{
//               fontSize: 18,
//               fontWeight: "700",
//               marginBottom: 10,
//               color: colors.text,
//             }}
//           >
//             Informations personnelles
//           </Text>

//           {!isEditing ? (
//             <>
//               <InfoLine label="Prénom" value={user.prenom} colors={colors} />
//               <InfoLine label="Nom" value={user.nom} colors={colors} />
//               <InfoLine label="Email" value={user.email} colors={colors} />
//               <InfoLine label="Téléphone" value={user.numero} colors={colors} />
//             </>
//           ) : (
//             <>
//               <EditInput
//                 value={user.prenom}
//                 colors={colors}
//                 onChange={(v) => handleChange("prenom", v)}
//               />
//               <EditInput
//                 value={user.nom}
//                 colors={colors}
//                 onChange={(v) => handleChange("nom", v)}
//               />
//               <EditInput
//                 value={user.email}
//                 colors={colors}
//                 onChange={(v) => handleChange("email", v)}
//               />
//               <EditInput
//                 value={user.numero}
//                 colors={colors}
//                 onChange={(v) => handleChange("numero", v)}
//               />

//               <TouchableOpacity
//                 onPress={() => setIsEditing(false)}
//                 style={{
//                   backgroundColor: colors.primary,
//                   padding: 12,
//                   borderRadius: 12,
//                   marginTop: 10,
//                 }}
//               >
//                 <Text
//                   style={{
//                     textAlign: "center",
//                     color: "#fff",
//                     fontWeight: "600",
//                   }}
//                 >
//                   Sauvegarder
//                 </Text>
//               </TouchableOpacity>
//             </>
//           )}
//         </View>

//         {/* ----------- SECTION PARAMÈTRES ----------- */}
//         <SettingsGroup title="Sécurité" desc="Sécurisez votre compte" colors={colors}>
//           <SettingSwitch
//             icon="shield"
//             label="Authentification à deux facteurs"
//             sub="Ajoutez une sécurité supplémentaire"
//             value={twoFA}
//             onChange={setTwoFA}
//             colors={colors}
//           />

//           <SettingLink
//             icon="lock"
//             label="Mot de passe"
//             sub="Dernière modification il y a 3 mois"
//             linkText="Modifier"
//             colors={colors}
//           />
//         </SettingsGroup>

//         <SettingsGroup title="Notifications" desc="Gérez vos alertes" colors={colors}>
//           <SettingSwitch
//             icon="envelope"
//             label="Notifications email"
//             sub="Recevoir des emails"
//             value={emailNotif}
//             onChange={setEmailNotif}
//             colors={colors}
//           />
//         </SettingsGroup>

//         <SettingsGroup title="Apparence" desc="Mode clair ou sombre" colors={colors}>
//           <SettingSwitch
//             icon="moon-o"
//             label={isDarkMode ? "Mode sombre" : "Mode clair"}
//             sub="Changer le thème de l'application"
//             value={isDarkMode}
//             onChange={toggleTheme}
//             colors={colors}
//           />
//         </SettingsGroup>
//       </ScrollView>

//       {/* NAVIGATION EN BAS */}
//       <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
//     </View>
//   );
// }

// /* -------------------------------------------
//    UI COMPONENTS
// -------------------------------------------- */

// const InfoLine = ({ label, value, colors }) => (
//   <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }}>
//     <Text style={{ color: colors.soft, fontSize: 13 }}>{label}</Text>
//     <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>{value}</Text>
//   </View>
// );

// const EditInput = ({ value, onChange, colors }) => (
//   <TextInput
//     value={value}
//     onChangeText={onChange}
//     style={{
//       backgroundColor: colors.bg,
//       borderWidth: 1,
//       borderColor: colors.border,
//       padding: 12,
//       borderRadius: 10,
//       marginTop: 10,
//       color: colors.text,
//     }}
//   />
// );

// const SettingsGroup = ({ title, desc, colors, children }) => (
//   <View
//     style={{
//       backgroundColor: colors.card,
//       margin: 15,
//       padding: 20,
//       borderRadius: 18,
//       borderWidth: 1,
//       borderColor: colors.border,
//     }}
//   >
//     <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text }}>{title}</Text>
//     <Text style={{ color: colors.soft, marginBottom: 15 }}>{desc}</Text>
//     {children}
//   </View>
// );

// const SettingSwitch = ({ icon, label, sub, value, onChange, colors }) => (
//   <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 12 }}>
//     <FontAwesome name={icon} size={22} color={colors.text} />
//     <View style={{ marginLeft: 12, flex: 1 }}>
//       <Text style={{ color: colors.text, fontSize: 16 }}>{label}</Text>
//       <Text style={{ color: colors.soft, fontSize: 12 }}>{sub}</Text>
//     </View>
//     <Switch value={value} onValueChange={onChange} />
//   </View>
// );

// const SettingLink = ({ icon, label, sub, linkText, colors }) => (
//   <View style={{ flexDirection: "row", alignItems: "center", borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 12 }}>
//     <FontAwesome name={icon} size={22} color={colors.text} />
//     <View style={{ marginLeft: 12, flex: 1 }}>
//       <Text style={{ color: colors.text, fontSize: 16 }}>{label}</Text>
//       <Text style={{ color: colors.soft, fontSize: 12 }}>{sub}</Text>
//     </View>
//     <TouchableOpacity>
//       <Text style={{ color: colors.primary, fontWeight: "600" }}>{linkText}</Text>
//     </TouchableOpacity>
//   </View>
// );
