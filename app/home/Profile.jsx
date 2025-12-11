import { useState } from "react";
import { View, Text, TextInput, Switch, TouchableOpacity, StyleSheet, ScrollView, } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

export default function ProfilePage() {
 
  //  Données utilisateur
 
  const [user, setUser] = useState({
    prenom: "Mouhamed",
    nom: "Ndiaye",
    email: "mouhamed22@gmail.com",
    numero: "+221 78 182 52 22",
  });

  const [isEditing, setIsEditing] = useState(false);

  //  Paramètres
  const [twoFA, setTwoFA] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);
  const [lightMode, setLightMode] = useState(true);

  //  Gestion modifications

  const handleChange = (key, value) => {
    setUser({ ...user, [key]: value });
  };

  const handleSubmit = () => setIsEditing(false);

  return (
    <ScrollView style={styles.container}>
      <Header title="Mon Profil" />

      <Text style={styles.subtitle}>Mettez à jour vos informations.</Text>

      {/*  SECTION PROFIL & INFOS */}
   
      <View style={styles.sectionWrapper}>
        
        {/* -------- PROFIL -------- */}
        <View style={styles.leftBox}>
          <Text style={styles.boxTitle}>Profil</Text>

          <View style={styles.photo}>
            <Text style={styles.photoText}>MHD</Text>
          </View>

          <Text style={styles.name}>
            {user.prenom} {user.nom}
          </Text>

          <Text style={styles.badge}>Client Premium</Text>

          <TouchableOpacity style={styles.editBtn} onPress={() => setIsEditing(true)}>
            <Text style={styles.editText}>Modifier Profil</Text>
          </TouchableOpacity>
        </View>

        {/* -------- INFORMATION -------- */}
        <View style={styles.rightBox}>
          {!isEditing ? (
            <View>
              <Text style={styles.boxTitle}>Information générale</Text>

              <InfoRow value={user.prenom} />
              <InfoRow value={user.nom} />
              <InfoRow value={user.email} />
              <InfoRow value={user.numero} />
            </View>
          ) : (
            <View>
              <Text style={styles.boxTitle}>Modifier les informations</Text>

              <TextInput
                style={styles.input}
                value={user.prenom}
                onChangeText={(v) => handleChange("prenom", v)}
              />

              <TextInput
                style={styles.input}
                value={user.nom}
                onChangeText={(v) => handleChange("nom", v)}
              />

              <TextInput
                style={styles.input}
                value={user.email}
                onChangeText={(v) => handleChange("email", v)}
                keyboardType="email-address"
              />

              <TextInput
                style={styles.input}
                value={user.numero}
                onChangeText={(v) => handleChange("numero", v)}
              />

              <TouchableOpacity style={styles.saveBtn} onPress={handleSubmit}>
                <Text style={styles.saveText}>Sauvegarder</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>

      {/* ============================ */}
      {/* 🔐 SÉCURITÉ */}
      {/* ============================ */}
      <SettingsSection
        title="Sécurité"
        desc="Gérez vos paramètres de sécurité"
      >
        <SettingSwitch
          icon="shield"
          label="Authentification à deux facteurs"
          sub="Sécurisez votre compte avec 2FA"
          value={twoFA}
          onChange={setTwoFA}
        />

        <SettingLink
          icon="lock"
          label="Mot de passe"
          sub="Dernière modification il y a 3 mois"
          linkText="Modifier"
        />
      </SettingsSection>

      {/* ============================ */}
      {/* 🔔 NOTIFICATIONS */}
      {/* ============================ */}
      <SettingsSection
        title="Notifications"
        desc="Choisissez comment être notifié"
      >
        <SettingSwitch
          icon="envelope"
          label="Notifications email"
          sub="Recevoir des emails"
          value={emailNotif}
          onChange={setEmailNotif}
        />
      </SettingsSection>

      {/* ============================ */}
      {/* 🎨 APPARENCE */}
      {/* ============================ */}
      <SettingsSection
        title="Apparence"
        desc="Personnalisez l'apparence"
      >
        <SettingSwitch
          icon="moon-o"
          label="Mode clair"
          sub="Interface lumineuse"
          value={lightMode}
          onChange={setLightMode}
        />
      </SettingsSection>

      <MobileNav />
    </ScrollView>
  );
}

/* ======================================================
   🔧 COMPONENTS INTERNES POUR RENDRE LE CODE PLUS PROPRE
   ====================================================== */

const InfoRow = ({ label, value }) => (
  <View style={styles.row}>
    <Text>{label}</Text>
    <Text>{value}</Text>
  </View>
);

const SettingsSection = ({ title, desc, children }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    <Text style={styles.sectionDesc}>{desc}</Text>
    {children}
  </View>
);

const SettingSwitch = ({ icon, label, sub, value, onChange }) => (
  <View style={styles.settingRow}>
    <FontAwesome name={icon} size={22} />
    <View style={styles.settingText}>
      <Text>{label}</Text>
      <Text style={styles.settingSub}>{sub}</Text>
    </View>
    <Switch value={value} onValueChange={onChange} />
  </View>
);

const SettingLink = ({ icon, label, sub, linkText }) => (
  <View style={styles.settingRow}>
    <FontAwesome name={icon} size={22} />
    <View style={styles.settingText}>
      <Text>{label}</Text>
      <Text style={styles.settingSub}>{sub}</Text>
    </View>
    <TouchableOpacity>
      <Text style={{ color: "blue" }}>{linkText}</Text>
    </TouchableOpacity>
  </View>
);

/* ======================================================
   🎨 STYLE
   ====================================================== */

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: "#faf7f2" },

  subtitle: { color: "#808080", marginBottom: 15 },

  sectionWrapper: { flexDirection: "row", gap: 10, flexWrap: "wrap" },

  leftBox: {
    flex: 1,
    backgroundColor: "#e8dcc7",
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },

  rightBox: {
    flex: 1,
    backgroundColor: "#e8dcc7",
    padding: 20,
    borderRadius: 10,
    elevation: 3,
  },

  boxTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },

  photo: {
    width: 80,
    height: 80,
    backgroundColor: "#c6b39c",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  photoText: { color: "white", fontWeight: "bold", fontSize: 22 },

  name: { fontSize: 13, marginTop: 10, textAlign:"center",  },

  badge: { color: "#777", marginBottom: 10 },

  editBtn: {
    backgroundColor: "#d3c0a6",
    padding: 10,
    marginTop: 10,
    borderRadius: 8,
  },

  editText: { fontWeight: "bold" },

  row: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "black",
  },

  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 8,
  },

  saveBtn: {
    backgroundColor: "#d3c0a6",
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },

  saveText: { textAlign: "center", fontWeight: "bold",},

  section: { marginTop: 25 },

  sectionTitle: { fontSize: 18, fontWeight: "bold" },

  sectionDesc: { color: "#808080", marginBottom: 10 },

  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e1d5c4",
  },

  settingText: { flex: 1, marginLeft: 10 },

  settingSub: { color: "#6b6b6b" },
});
