import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert, Image } from "react-native";
import * as ImagePicker from "expo-image-picker";

// Components
import Header from "./components/Header";
import MobileNav from "./components/MobileNav";
import Sidebar from "./components/Sidebar";

// Theme Context
import { useTheme } from "./context/ThemeContext";
import { BackendContext } from "./context";

export default function ProfilePage({ onNavigate, currentPage }) {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const api = useContext(BackendContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState({
    prenom: "",
    name: "",
    email: "",
    telephone: "",
    avatar: null,
  });
  const [isEditing, setIsEditing] = useState(false);

  // --------- Récupérer le profil depuis le backend ---------
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/settings/me");
        setUser(res.data);
      } catch (err) {
        console.log("Erreur profil :", err.response?.data || err.message);
        Alert.alert("Erreur", "Impossible de récupérer le profil");
      }
    };

    fetchProfile();
  }, []);

  // --------- Modification des champs ---------
  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  // --------- Sauvegarder les modifications ---------
  const handleSave = async () => {
    try {
      const { prenom, name, email, telephone } = user;
      const res = await api.put("/api/settings/update-profile", {
        prenom,
        name,
        email,
        telephone,
      });
      Alert.alert("Succès", "Profil mis à jour !");
      setIsEditing(false);
    } catch (err) {
      console.log("Erreur update :", err.response?.data || err.message);
      Alert.alert("Erreur", "Impossible de mettre à jour le profil");
    }
  };

  // --------- Changer l'avatar ---------
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Permission refusée", "Vous devez autoriser l'accès à la galerie.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.7,
    });

    if (!result.canceled) {
      const uri = result.assets[0].uri;
      uploadAvatar(uri);
    }
  };

  const uploadAvatar = async (uri) => {
    try {
      const formData = new FormData();
      formData.append("avatar", {
        uri,
        name: "avatar.jpg",
        type: "image/jpeg",
      });

      const res = await api.put("/api/settings/update-avatar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Alert.alert("Succès", "Avatar mis à jour !");
      setUser({ ...user, avatar: res.data.avatar }); // mettre à jour l'état local
    } catch (err) {
      console.log("Erreur avatar :", err.response?.data || err.message);
      Alert.alert("Erreur", "Impossible de mettre à jour l'avatar");
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#fff" }}>
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
            <TouchableOpacity onPress={pickImage}>
              <View  style={{width: 90, height: 90, borderRadius: 50, backgroundColor: colors.primary || "#6b5a49", 
                           justifyContent: "center", alignItems: "center", overflow:"hidden"}}>
                {user.avatar ? (
                  <Image source={{ uri: user.avatar }} style={{ width: 90, height: 90 }} />
                ) : (
                  <Text style={{ fontSize: 30, color: "#fff", fontWeight: "bold" }}>
                    {user.prenom[0]}{user.name[0]}
                  </Text>
                )}
              </View>
            </TouchableOpacity>

            <Text style={{ marginTop: 12, fontSize: 18, fontWeight: "600", color: colors.text }}>
              {user.prenom} {user.name}
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

          <Text style={{ fontSize: 18, fontWeight: "700", marginBottom: 10, color: colors.text }}>
            Informations personnelles
          </Text>

          {!isEditing ? (
            <>
              <InfoLine label="Prénom" value={user.prenom} colors={colors} />
              <InfoLine label="Nom" value={user.name} colors={colors} />
              <InfoLine label="Email" value={user.email} colors={colors} />
              <InfoLine label="Téléphone" value={user.telephone} colors={colors} />
            </>
          ) : (
            <>
              <EditInput value={user.prenom} colors={colors} onChange={(v) => handleChange("prenom", v)} />
              <EditInput value={user.name} colors={colors} onChange={(v) => handleChange("nom", v)} />
              <EditInput value={user.email} colors={colors} onChange={(v) => handleChange("email", v)} />
              <EditInput value={user.telephone} colors={colors} onChange={(v) => handleChange("numero", v)} />

              <TouchableOpacity onPress={handleSave} style={{backgroundColor: colors.primary || "#6b5a49", padding: 12, borderRadius: 12, marginTop: 10 }}>
                <Text style={{ textAlign: "center", color: "#fff", fontWeight: "600" }}>Sauvegarder</Text>
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
             borderRadius: 10, marginTop: 10, color: colors.text }}
  />
);
