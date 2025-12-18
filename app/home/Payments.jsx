// app/Payments/Payment.jsx
import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, Alert } from "react-native";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import axios from "axios"; // Assure-toi que axios est installé
import { BackendContext } from "../context"; // Context avec l'instance axios

// ---------- FORMULAIRE DE PAIEMENT ----------
function PaymentForm({ type, onConfirm, onClose, isDarkMode, selectedAccount }) {
  const [fournisseur, setFournisseur] = useState("");
  const [montant, setMontant] = useState("");
  const [facture, setFacture] = useState("");

  const api = useContext(BackendContext);

  const handleSubmit = async () => {
    if (!fournisseur || !montant) return Alert.alert("Erreur", "Veuillez remplir les champs obligatoires.");

    try {
      // Appel backend
      await api.post("/api/payments", {
        accountId: selectedAccount,
        service: fournisseur,
        amount: Number(montant),
        reference: facture,
      });

      const newEntry = {
        type,
        fournisseur,
        montant,
        facture,
        date: new Date().toLocaleDateString(),
      };
      onConfirm(newEntry);
      Alert.alert("Succès", "Paiement effectué !");
    } catch (err) {
      console.log(err.response?.data || err.message);
      Alert.alert("Erreur", "Impossible de traiter le paiement");
    }
  };

  return (
    <View style={{ padding: 10, backgroundColor: isDarkMode ? "#141829" : "#fff" }}>
      <View style={styles.formHeader}>
        <Text style={[styles.formTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>{type}</Text>
        <Text style={[styles.formSubtitle, { color: isDarkMode ? "#bfa98a" : "#666" }]}>Paiement de facture</Text>
      </View>

      <Text style={[styles.label, { color: isDarkMode ? "#f3e8d7" : "#444" }]}>Fournisseur</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? "#1a2742" : "#f3f3f3", color: isDarkMode ? "#f3e8d7" : "#000" }]}
        value={fournisseur}
        onChangeText={setFournisseur}
        placeholder="Nom du fournisseur"
        placeholderTextColor={isDarkMode ? "#bfa98a" : "#888"}
      />

      <Text style={[styles.label, { color: isDarkMode ? "#f3e8d7" : "#444" }]}>Montant</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? "#1a2742" : "#f3f3f3", color: isDarkMode ? "#f3e8d7" : "#000" }]}
        keyboardType="numeric"
        value={montant}
        onChangeText={setMontant}
        placeholder="0.00"
        placeholderTextColor={isDarkMode ? "#bfa98a" : "#888"}
      />

      <Text style={[styles.label, { color: isDarkMode ? "#f3e8d7" : "#444" }]}>Numéro de facture</Text>
      <TextInput
        style={[styles.input, { backgroundColor: isDarkMode ? "#1a2742" : "#f3f3f3", color: isDarkMode ? "#f3e8d7" : "#000" }]}
        value={facture}
        onChangeText={setFacture}
        placeholder="Ex: 123456789"
        placeholderTextColor={isDarkMode ? "#bfa98a" : "#888"}
      />

      <TouchableOpacity style={[styles.submit, { backgroundColor: "#6b5a49" }]} onPress={handleSubmit}>
        <Text style={styles.submitText}>Confirmer le paiement</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
        <Text style={styles.cancelText}>Annuler</Text>
      </TouchableOpacity>
    </View>
  );
}

// ---------- PAGE PRINCIPALE ----------
export default function PaymentsScreen() {
  const [activeForm, setActiveForm] = useState(null);
  const [historique, setHistorique] = useState([]);
  const { isDarkMode, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const api = useContext(BackendContext);

  // Récupérer l'historique depuis le backend
  useEffect(() => {
    if (!selectedAccount) return;
    fetchHistorique();
  }, [selectedAccount]);

  const fetchHistorique = async () => {
    try {
      const res = await api.get(`/api/payments/${selectedAccount}`);
      const data = res.data.map(p => ({
        type: p.service,
        fournisseur: p.service,
        montant: p.amount,
        facture: p.reference || "—",
        date: new Date(p.date).toLocaleDateString(),
      }));
      setHistorique(data);
    } catch (err) {
      console.log(err);
      Alert.alert("Erreur", "Impossible de charger l'historique");
    }
  };

  const closeForm = () => setActiveForm(null);
  const ajouterPaiement = (data) => {
    setHistorique(prev => [data, ...prev]);
    closeForm();
  };

  const renderHeader = () => (
    <View>
      {/* Grid boutons */}
      <View style={styles.grid}>
        {["Mobile", "Internet", "Électricité", "Eau"].map((type) => (
          <TouchableOpacity
            style={[styles.cardBtn, { backgroundColor: isDarkMode ? "#030e25ff" : "#fff" }]}
            key={type}
            onPress={() => setActiveForm(type)}
          >
            <Text style={styles.cardIcon}>
              {type === "Mobile" ? "📱" :
               type === "Internet" ? "🌐" :
               type === "Électricité" ? "⚡" : "💧"}
            </Text>
            <Text style={[styles.cardLabel, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Historique titre */}
      <Text style={[styles.historyTitle, { color: isDarkMode ? "#f3e8d7" : "#000", marginTop: 16 }]}>
        Historique ({historique.length})
      </Text>
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517ff" : "#f7f5f2" }}>
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} isDarkMode={isDarkMode} />
      <Header title="Paiements" isDarkMode={isDarkMode} onToggleTheme={toggleTheme} onMenuPress={() => setSidebarOpen(true)} />

      <FlatList
        data={historique}
        keyExtractor={(_, idx) => String(idx)}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <View style={[styles.historyItem, { backgroundColor: isDarkMode ? "#1a2742" : "#fff" }]}>
            <Text style={[styles.historyItemTitle, { color: isDarkMode ? "#f3e8d7" : "#000" }]}>
              {item.type} — {item.fournisseur || "—"}
            </Text>
            <Text style={[styles.historyItemSubtitle, { color: isDarkMode ? "#bfa98a" : "#666" }]}>
              {item.montant} € · {item.facture}
            </Text>
            <Text style={[styles.historyItemDate, { color: isDarkMode ? "#888" : "#999" }]}>{item.date}</Text>
          </View>
        )}
        contentContainerStyle={{ padding: 16 }}
      />

      {/* Modal form */}
      <Modal visible={!!activeForm} animationType="slide" transparent>
        <View style={[styles.modalOverlay, { backgroundColor: "rgba(0,0,0,0.45)" }]}>
          <View style={[styles.modalBox, { backgroundColor: isDarkMode ? "#030e25ff" : "#fff" }]}>
            <TouchableOpacity onPress={closeForm} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
            {activeForm && (
              <PaymentForm
                type={activeForm}
                onConfirm={ajouterPaiement}
                onClose={closeForm}
                isDarkMode={isDarkMode}
                selectedAccount={selectedAccount}
              />
            )}
          </View>
        </View>
      </Modal>

      <MobileNav currentPage="payments" isDarkMode={isDarkMode} />
    </View>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 8, marginTop: 19 },
  cardBtn: { width: "48%", borderRadius: 12, padding: 16, marginBottom: 8, alignItems: "center", shadowColor:"#000", shadowOpacity:0.06, elevation:2 },
  cardIcon: { fontSize: 28, marginBottom: 8 },
  cardLabel: { fontWeight: "700" },

  modalOverlay: { flex:1, justifyContent: "center", padding: 16 },
  modalBox: { borderRadius: 12, padding: 16 },
  modalClose: { alignSelf: "flex-end", marginBottom: 8 },
  modalCloseText: { color: "#ef4444", fontWeight: "700" },

  formHeader: { flexDirection: "row", gap: 8, marginBottom: 12 },
  formTitle: { fontWeight: "700", fontSize: 16 },
  formSubtitle: { marginLeft: 8 },

  label: { marginBottom: 6 },
  input: { padding: 12, borderRadius: 8, marginBottom: 8 },
  submit: { marginTop: 8, padding: 12, borderRadius: 8, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700" },
  cancelBtn: { marginTop: 8, alignItems: "center" },
  cancelText: { color: "#666" },

  historyTitle: { fontWeight: "700", marginBottom: 8 },
  historyItem: { padding: 12, borderRadius: 10, marginBottom: 8 },
  historyItemTitle: { fontWeight: "700" },
  historyItemSubtitle: { marginTop: 4 },
  historyItemDate: { marginTop: 6 },
});
