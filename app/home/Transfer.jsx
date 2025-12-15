import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { makeInternalTransfer, makeExternalTransfer } from "../context";

export default function Transfer() {
  const [activeTab, setActiveTab] = useState("interne");
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    sourceAccount: "",
    destinationAccount: "",
    beneficiaryIban: "",
    amount: "",
    description: "",
  });

  const handleTransfer = async () => {
    try {
      if (!form.sourceAccount || !form.amount) {
        return Alert.alert("Erreur", "Veuillez remplir les champs obligatoires");
      }

      if (activeTab === "interne") {
        await makeInternalTransfer({
          sourceAccount: form.sourceAccount,
          destinationAccount: form.destinationAccount,
          amount: Number(form.amount),
          description: form.description,
        });
      } else {
        await makeExternalTransfer({
          sourceAccount: form.sourceAccount,
          beneficiaryIban: form.beneficiaryIban,
          amount: Number(form.amount),
          description: form.description,
        });
      }

      Alert.alert("Succès", "Transfert effectué avec succès !");
    } catch (err) {
      Alert.alert(
        "Erreur",
        err.response?.data?.message || "Impossible d'effectuer le transfert"
      );
    }
  };

  const internalFields = [
    { label: "Compte source", key: "sourceAccount", placeholder: "Compte Courant - 24 580,45 €" },
    { label: "Compte destination", key: "destinationAccount", placeholder: "Sélectionnez un compte" },
    { label: "Montant (€)", key: "amount", placeholder: "0.00", keyboard: "numeric" },
    { label: "Description (optionnel)", key: "description", placeholder: "Ex: Épargne mensuelle" },
  ];

  const externalFields = [
    { label: "Compte source", key: "sourceAccount", placeholder: "Compte Courant - 24 580,45 €" },
    { label: "IBAN", key: "beneficiaryIban", placeholder: "SN 76 XXXXXXXXXXXXXXXXXXXXXXXX" },
    { label: "Montant (€)", key: "amount", placeholder: "0.00", keyboard: "numeric" },
    { label: "Description (optionnel)", key: "description", placeholder: "Ex: Épargne mensuelle" },
  ];

  const contacts = [
    { name: "Marie Dubois", email: "marie@email.com", emoji: "🙍🏾‍♀️​", bg: "#e8dcc7" },
    { name: "Pierre Martin", email: "pierre@email.com", emoji: "🙍🏽", bg: "#e8dcc7" },
    { name: "Sophie Bernard", email: "sophie@email.com", emoji: "🙍🏾‍♀️​", bg: "#e8dcc7" },
    { name: "Luc Mercier", email: "luc@email.com", emoji: "🙍🏽", bg: "#e8dcc7" },
  ];

  const infos = [
    { title: "Les transferts internes sont instantanés.", sub: "Entre vos comptes BankApp" },
    { title: "Gérez facilement vos portefeuilles.", sub: "Toutes vos cartes BankApp" },
    { title: "Vos paiements sont sécurisés.", sub: "Protection bancaire avancée" },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#141829" : "#f1f5f9" }}>
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} isDarkMode={isDarkMode} />

      <Header
        title="Transfert"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View style={styles.header}>
          <Text style={[styles.subtitle, { color: isDarkMode ? "#f3e8d7" : "#555" }]}>
            Envoyez de l'argent à vos proches ou payez vos factures
          </Text>
        </View>

        <View style={{ gap: 20 }}>
          <View style={[styles.formCard, { backgroundColor: isDarkMode ? "#1a2742" : "white" }]}>
            <View style={[styles.tabsWrapper, { backgroundColor: "#e8dcc7" }]}>
              {["interne", "externe"].map((tab) => (
                <TouchableOpacity
                  key={tab}
                  onPress={() => setActiveTab(tab)}
                  style={[styles.tabButton, activeTab === tab && styles.activeTab]}
                >
                  <Text style={styles.tabText}>
                    {tab === "interne" ? "Transfert interne" : "Transfert externe"}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View>
              <Text style={[styles.formTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>
                {activeTab === "interne" ? "Transfert entre vos comptes" : "Transfert externe"}
              </Text>

              <Text style={[styles.formSubtitle, { color: isDarkMode ? "#bfa98a" : "#888" }]}>
                {activeTab === "interne"
                  ? "Sélectionnez les comptes"
                  : "Transférez vers un autre compte bancaire"}
              </Text>

              {(activeTab === "interne" ? internalFields : externalFields).map((field, index) => (
                <View key={index} style={styles.field}>
                  <Text style={[styles.label, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>
                    {field.label}
                  </Text>
                  <TextInput
                    style={[
                      styles.input,
                      {
                        backgroundColor: isDarkMode ? "#24305e" : "#f7f4efff",
                        color: isDarkMode ? "#fff" : "#000",
                      },
                    ]}
                    placeholder={field.placeholder}
                    placeholderTextColor={isDarkMode ? "#ccc" : "#888"}
                    keyboardType={field.keyboard || "default"}
                    value={form[field.key]}
                    onChangeText={(text) =>
                      setForm({ ...form, [field.key]: text })
                    }
                  />
                </View>
              ))}

              <TouchableOpacity style={styles.sendBtn} onPress={handleTransfer}>
                <Text style={styles.sendText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ gap: 20 }}>
            <View style={[styles.sidebarCard, { backgroundColor: isDarkMode ? "#1a2742" : "white" }]}>
              <Text style={[styles.sidebarTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>
                Contacts récents
              </Text>

              {contacts.map((c, i) => (
                <View key={i} style={styles.contactItem}>
                  <View style={[styles.contactIcon, { backgroundColor: c.bg }]}>
                    <Text style={styles.contactEmoji}>{c.emoji}</Text>
                  </View>
                  <Text style={{ color: isDarkMode ? "#f3e8d7" : "#000" }}>
                    {c.name} - {c.email}
                  </Text>
                </View>
              ))}
            </View>

            <View style={[styles.sidebarCard, { backgroundColor: isDarkMode ? "#1a2742" : "white" }]}>
              <Text style={[styles.sidebarTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>
                Informations utiles
              </Text>

              {infos.map((info, i) => (
                <View key={i} style={styles.infoItem}>
                  <View style={styles.infoBullet} />
                  <View>
                    <Text style={[styles.infoTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>
                      {info.title}
                    </Text>
                    <Text style={[styles.infoSub, { color: isDarkMode ? "#bfa98a" : "#666" }]}>
                      {info.sub}
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>

      <MobileNav currentPage="transfer" isDarkMode={isDarkMode} />
    </View>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  header: { marginBottom: 30, alignItems: "center" },
  subtitle: { fontSize: 16, marginTop: 4 },
  formCard: { padding: 20, borderRadius: 16, shadowColor: "#aaa", shadowOpacity: 0.2, shadowRadius: 6 },
  tabsWrapper: { flexDirection: "row", borderRadius: 12, padding: 4, marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10 },
  activeTab: { backgroundColor: "#fff" },
  tabText: { fontWeight: "600" },
  formTitle: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  formSubtitle: { fontSize: 12, marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: { padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" },
  sendBtn: { marginTop: 10, backgroundColor: "#e8dcc7", padding: 12, borderRadius: 10, alignItems: "center" },
  sendText: { color: "black", fontSize: 16, fontWeight: "600" },
  sidebarCard: { padding: 16, borderRadius: 14, shadowColor: "#aaa", shadowOpacity: 0.2, shadowRadius: 6 },
  sidebarTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  contactIcon: { width: 36, height: 36, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  contactEmoji: { fontSize: 18 },
  infoItem: { flexDirection: "row", gap: 12, marginBottom: 12 },
  infoBullet: { width: 10, height: 10, backgroundColor: "#6b5a49", borderRadius: 10, marginTop: 6 },
  infoTitle: { fontSize: 14, fontWeight: "600" },
  infoSub: { fontSize: 12 },
});
