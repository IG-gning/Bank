import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

// Components
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";

// Theme Context
import { useTheme } from "./context/ThemeContext";

export default function ProfilePage({ onNavigate, currentPage }) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [user, setUser] = useState({
    prenom: "Mouhamed",
    nom: "Ndiaye",
    email: "mouhamed22@gmail.com",
    numero: "+221 78 182 52 22",
  });

  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#fff"}}>
      {/* SIDEBAR */}
      <Sidebar visible={sidebarOpen} 
              onClose={() => setSidebarOpen(false)}
              isDarkMode={isDarkMode}
              onNavigate={onNavigate}
      />

      {/* HEADER */} 
      <Header title="Mon Profil"
              isDarkMode={isDarkMode}
              onToggleTheme={toggleTheme}
              onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* ----------- CARD PHOTO + INFO ----------- */}
        <View style={{backgroundColor: colors.card, padding: 20, margin: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.border,     
              ...(!isDarkMode 
               ? {shadowColor: "#a8a8a8ff", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10, borderLeft:"4px solid #5b4636"}
               : {backgroundColor:"#030e25ff", shadowColor: "transparent", shadowOpacity: 0, elevation: 0, borderLeft:"4px solid #e8dcc7"}), 
           }}>

          <View style={{ alignItems: "center" }}>
            <View  style={{width: 90, height: 90, borderRadius: 50, backgroundColor: colors.primary || "#6b5a49", 
                           justifyContent: "center", alignItems: "center"}}>
             
              <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
                {user.prenom[0]}
                {user.nom[0]}
              </Text>
            </View>

            <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "600", color: colors.text }}>
              {user.prenom} {user.nom}
            </Text>

            <Text style={{ color: colors.soft, marginBottom: 10 }}>Client Premium</Text>

            {!isEditing && (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={{
                  backgroundColor: colors.primary || "#6b5a49",
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>Modifier Profil</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* ----------- CARD INFORMATIONS ----------- */}
        <View style={{ backgroundColor: colors.card, padding: 20, marginHorizontal: 15, borderRadius: 18, borderWidth: 1, borderColor: colors.border,
              ...(!isDarkMode 
               ? {shadowColor: "#a8a8a8ff", shadowOffset: { width: 10, height: 10 }, shadowOpacity: 0.5, shadowRadius: 10, elevation: 10, borderLeft:"4px solid #5b4636"}
               : {backgroundColor:"#030e25ff", shadowColor: "transparent", shadowOpacity: 0, elevation: 0, borderLeft:"4px solid #e8dcc7"}), 
            }}>

          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10, color: colors.text,}}>
            Informations personnelles
          </Text>

          {!isEditing ? (
            <>
              <InfoLine label="Prénom" value={user.prenom} colors={colors} />
              <InfoLine label="Nom" value={user.nom} colors={colors} />
              <InfoLine label="Email" value={user.email} colors={colors} />
              <InfoLine label="Téléphone" value={user.numero} colors={colors} />
            </>
          ) : (
            <>
              <EditInput value={user.prenom}
                         colors={colors}
                         onChange={(v) => handleChange("prenom", v)}
              />
              <EditInput value={user.nom}
                         colors={colors}
                         onChange={(v) => handleChange("nom", v)}
              />
              <EditInput value={user.email}               
                         colors={colors}
                         onChange={(v) => handleChange("email", v)}
              />
              <EditInput value={user.numero}             
                         colors={colors}
                         onChange={(v) => handleChange("numero", v)}
              />

              <TouchableOpacity onPress={() => setIsEditing(false)}               
                style={{backgroundColor: colors.primary || "#6b5a49", padding: 12, borderRadius: 12, marginTop: 10, }}>

                <Text style={{ textAlign: "center", color: "#fff", fontWeight: "600", }}>
                  Sauvegarder
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      {/* NAVIGATION EN BAS */}
      <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
    </View>
  );
}

/* -------------------------------------------
   UI COMPONENTS
-------------------------------------------- */

const InfoLine = ({ label, value, colors }) => (
  <View style={{ paddingVertical: 10, borderBottomWidth: 1, borderBottomColor: colors.border }}>
    <Text style={{ color: colors.soft, fontSize: 13 }}>{label}</Text>
    <Text style={{ color: colors.text, fontSize: 16, fontWeight: "500" }}>{value}</Text>
  </View>
);

const EditInput = ({ value, onChange, colors }) => (
  <TextInput
    value={value}
    onChangeText={onChange}
    style={{ backgroundColor: colors.bg, borderWidth: 1, borderColor: colors.border, padding: 12,
             borderRadius: 10, marginTop: 10, color: colors.text,}}
        
   />   

      
      
    
  
);
