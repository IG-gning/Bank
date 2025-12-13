import React, { useState } from "react";
import { View, ScrollView, TouchableOpacity, Text, Switch } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

// Components
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";

// Theme Context
import { useTheme } from "./context/ThemeContext";

export default function ProfilePage({ onNavigate, currentPage }) {
  const { isDarkMode, toggleTheme, colors } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [twoFA, setTwoFA] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#f7f5f2"  }}>
      {/* SIDEBAR */}
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
        onNavigate={onNavigate}
      />

      {/* HEADER */}
      <Header
        title="Mon Profil"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ paddingBottom: 140 }}>
        {/* ----------- SECTION PARAMÈTRES ----------- */}
        <SettingsGroup title="Sécurité" desc="Sécurisez votre compte" colors={colors}>
          <SettingSwitch
            icon="shield"
            label="Authentification à deux facteurs"
            sub="Ajoutez une sécurité supplémentaire"
            value={twoFA}
            onChange={setTwoFA}
            colors={colors}
          />
          <SettingLink
            icon="lock"
            label="Mot de passe"
            sub="Dernière modification il y a 3 mois"
            linkText="Modifier"
            colors={colors}
          />
        </SettingsGroup>

        <SettingsGroup title="Notifications" desc="Gérez vos alertes" colors={colors}>
          <SettingSwitch
            icon="envelope"
            label="Notifications email"
            sub="Recevoir des emails"
            value={emailNotif}
            onChange={setEmailNotif}
            colors={colors}
          />
        </SettingsGroup>

        <SettingsGroup title="Apparence" desc="Mode clair ou sombre" colors={colors}>
          <SettingSwitch
            icon="moon-o"
            label={isDarkMode ? "Mode sombre" : "Mode clair"}
            sub="Changer le thème de l'application"
            value={isDarkMode}
            onChange={toggleTheme}
            colors={colors}
          />
        </SettingsGroup>
      </ScrollView>

      {/* NAVIGATION EN BAS */}
      <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
    </View>
  );
}

/* -------------------------------------------
   UI COMPONENTS
-------------------------------------------- */

const SettingsGroup = ({ title, desc, colors, children }) => (
  <View
    style={{
      backgroundColor: colors.card,
      margin: 15,
      padding: 20,
      borderRadius: 18,
      borderWidth: 1,
      borderColor: colors.border,
      borderLeft:"4px solid #3b322a"
      
    }}
  >
    <Text style={{ fontSize: 18, fontWeight: "700", color: colors.text }}>{title}</Text>
    <Text style={{ color: colors.soft, marginBottom: 15 }}>{desc}</Text>
    {children}
  </View>
);

const SettingSwitch = ({ icon, label, sub, value, onChange, colors }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 12,
    }}
  >
    <FontAwesome name={icon} size={22} color={colors.text} />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <Text style={{ color: colors.text, fontSize: 16 }}>{label}</Text>
      <Text style={{ color: colors.soft, fontSize: 12 }}>{sub}</Text>
    </View>
    <Switch value={value} onValueChange={onChange} />
  </View>
);

const SettingLink = ({ icon, label, sub, linkText, colors }) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      paddingVertical: 12,
    }}
  >
    <FontAwesome name={icon} size={22} color={colors.text} />
    <View style={{ marginLeft: 12, flex: 1 }}>
      <Text style={{ color: colors.text, fontSize: 16 }}>{label}</Text>
      <Text style={{ color: colors.soft, fontSize: 12 }}>{sub}</Text>
    </View>
    <TouchableOpacity>
      <Text style={{ color: colors.primary, fontWeight: "600" }}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);
