import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";


export default function Transfer() {
  const [activeTab, setActiveTab] = useState("interne");

  const internalFields = [
    { label: "Compte source", placeholder: "Compte Courant - 24 580,45 €" },
    { label: "Compte destination", placeholder: "Sélectionnez un compte" },
    { label: "Montant (€)", placeholder: "0.00" },
    { label: "Description (optionnel)", placeholder: "Ex: Épargne mensuelle" },
  ];

  const externalFields = [
    { label: "Compte source", placeholder: "Compte Courant - 24 580,45 €" },
    { label: "IBAN", placeholder: "SN 76 XXXXXXXXXXXXXXXXXXXXXXXX" },
    { label: "Montant (€)", placeholder: "0.00" },
    { label: "Description (optionnel)", placeholder: "Ex: Épargne mensuelle" },
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
    <ScrollView style={styles.container}>
      <Header title="Transfert" />

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          Envoyez de l'argent à vos proches ou payez vos factures
        </Text>
      </View>

      {/* MAIN WRAPPER */}
      <View style={{ gap: 20 }}>

        {/* FORMULAIRE */}
        <View style={styles.formCard}>

          {/* TABS */}
          <View style={styles.tabsWrapper}>
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

          {/* FORMULAIRE DYNAMIQUE */}
          <View>
            <Text style={styles.formTitle}>
              {activeTab === "interne" ? "Transfert entre vos comptes" : "Transfert externe"}
            </Text>

            <Text style={styles.formSubtitle}>
              {activeTab === "interne"
                ? "Sélectionnez les comptes"
                : "Transférez vers un autre compte bancaire"}
            </Text>

            {(activeTab === "interne" ? internalFields : externalFields).map((field, index) => (
              <View key={index} style={styles.field}>
                <Text style={styles.label}>{field.label}</Text>
                <TextInput style={styles.input} placeholder={field.placeholder} />
              </View>
            ))}

            <TouchableOpacity style={styles.sendBtn}>
              <Text style={styles.sendText}>Envoyer</Text>
            </TouchableOpacity>
          </View>

        </View>

        {/* SIDEBAR */}
        <View style={{ gap: 20 }}>

          {/* CONTACTS */}
          <View style={styles.sidebarCard}>
            <Text style={styles.sidebarTitle}>Contacts récents</Text>

            {contacts.map((c, i) => (
              <View key={i} style={styles.contactItem}>
                <View style={[styles.contactIcon, { backgroundColor: c.bg }]}>
                  <Text style={styles.contactEmoji}>{c.emoji}</Text>
                </View>
                <Text>{c.name} - {c.email}</Text>
              </View>
            ))}
          </View>

          {/* INFORMATIONS UTILES */}
          <View style={styles.sidebarCard}>
            <Text style={styles.sidebarTitle}>Informations utiles</Text>

            {infos.map((info, i) => (
              <View key={i} style={styles.infoItem}>
                <View style={styles.infoBullet}></View>
                <View>
                  <Text style={styles.infoTitle}>{info.title}</Text>
                  <Text style={styles.infoSub}>{info.sub}</Text>
                </View>
              </View>
            ))}
          </View>

        </View>
      </View>

      <MobileNav />
    </ScrollView>
  );
}

/* ==================== STYLES ==================== */
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f1f5f9", padding: 20 },
  header: { marginBottom: 30, alignItems: "center" },
  title: { fontSize: 28, fontWeight: "bold" },
  subtitle: { fontSize: 16, color: "#555", marginTop: 4 },
  formCard: { backgroundColor: "white", padding: 20, borderRadius: 16, shadowColor: "#aaa", shadowOpacity: 0.2, shadowRadius: 6 },
  tabsWrapper: { flexDirection: "row", backgroundColor: "#e8dcc7", borderRadius: 12, padding: 4, marginBottom: 20 },
  tabButton: { flex: 1, paddingVertical: 10, alignItems: "center", borderRadius: 10, backgroundColor: "#e8dcc7" },
  activeTab: { backgroundColor: "#fff" },
  tabText: { fontWeight: "600"},
  formTitle: { fontSize: 20, fontWeight: "700", marginBottom: 4 },
  formSubtitle: { fontSize: 12, color: "#888", marginBottom: 20 },
  field: { marginBottom: 15 },
  label: { fontWeight: "600", marginBottom: 6 },
  input: { backgroundColor: "#f7f4efff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#ccc" },
  sendBtn: { marginTop: 10, backgroundColor: "#e8dcc7", padding: 12, borderRadius: 10, alignItems: "center" },
  sendText: {  color:"black", fontSize: 16, fontWeight: "600" },
  sidebarCard: { backgroundColor: "white", padding: 16,  borderRadius: 14, shadowColor: "#aaa", shadowOpacity: 0.2, shadowRadius: 6 },
  sidebarTitle: { fontSize: 18, fontWeight: "700", marginBottom: 10 },
  contactItem: { flexDirection: "row", alignItems: "center", gap: 10, marginBottom: 8 },
  contactIcon: { width: 36, height: 36, borderRadius: 50, alignItems: "center", justifyContent: "center" },
  contactEmoji: { fontSize: 18 },
  infoItem: { flexDirection: "row", gap: 12, marginBottom: 12 },
  infoBullet: { width: 10, height: 10, backgroundColor: "#6b5a49", borderRadius: 10, marginTop: 6},
  infoTitle: { fontSize: 14, fontWeight: "600" },
  infoSub: { fontSize: 12, color: "#666" },
});
