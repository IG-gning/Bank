import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView } from "react-native";

// Components
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";

// Theme
import { useTheme } from "./context/ThemeContext";

// Backend
import { BackendContext } from "./context";

export default function ProfilePage({ onNavigate, currentPage }) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const api = useContext(BackendContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const [user, setUser] = useState(null);

  /* =============================
     FETCH PROFILE
  ============================== */
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/settings/me");

        setUser({
          prenom: res.data.prenom,
          nom: res.data.name,
          email: res.data.email,
          numero: res.data.telephone || "",
        });
      } catch (err) {
        console.log("Erreur profil :", err.response?.data || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  /* =============================
     UPDATE PROFILE
  ============================== */
  const handleSave = async () => {
    try {
      await api.put("/api/settings/update-profile", {
        prenom: user.prenom,
        name: user.nom,
        email: user.email,
        telephone: user.numero,
      });

      setIsEditing(false);
    } catch (err) {
      console.log("Erreur update :", err.response?.data || err.message);
    }
  };

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  /* =============================
     SAFE RENDER
  ============================== */
  if (loading) return <View />;
  if (!user) return <Text>Impossible de charger le profil</Text>;

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#fff" }}>
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
        {/* PHOTO + NOM */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            margin: 15,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <View style={{ alignItems: "center" }}>
            <View
              style={{
                width: 90,
                height: 90,
                borderRadius: 50,
                backgroundColor: colors.primary,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
                {user.prenom[0]}
                {user.nom[0]}
              </Text>
            </View>

            <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "600", color: colors.text }}>
              {user.prenom} {user.nom}
            </Text>

            {!isEditing && (
              <TouchableOpacity
                onPress={() => setIsEditing(true)}
                style={{
                  backgroundColor: colors.primary,
                  paddingVertical: 10,
                  paddingHorizontal: 25,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              >
                <Text style={{ color: "#fff", fontWeight: "600" }}>
                  Modifier Profil
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* INFOS */}
        <View
          style={{
            backgroundColor: colors.card,
            padding: 20,
            marginHorizontal: 15,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: colors.border,
          }}
        >
          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10, color: colors.text }}>
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
              <EditInput value={user.prenom} onChange={(v) => handleChange("prenom", v)} colors={colors} />
              <EditInput value={user.nom} onChange={(v) => handleChange("nom", v)} colors={colors} />
              <EditInput value={user.email} onChange={(v) => handleChange("email", v)} colors={colors} />
              <EditInput value={user.numero} onChange={(v) => handleChange("numero", v)} colors={colors} />

              <TouchableOpacity
                onPress={handleSave}
                style={{
                  backgroundColor: colors.primary,
                  padding: 12,
                  borderRadius: 12,
                  marginTop: 10,
                }}
              >
                <Text style={{ textAlign: "center", color: "#fff", fontWeight: "600" }}>
                  Sauvegarder
                </Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>

      <MobileNav currentPage={currentPage} onNavigate={onNavigate} isDarkMode={isDarkMode} />
    </View>
  );
}

/* UI */
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
    style={{
      backgroundColor: colors.bg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: 12,
      borderRadius: 10,
      marginTop: 10,
      color: colors.text,
    }}
  />
);
