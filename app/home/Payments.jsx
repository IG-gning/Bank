import React, { useState } from "react";
import { View, Text, TouchableOpacity, Modal, TextInput, StyleSheet, FlatList, ScrollView } from "react-native";
  

import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import FormPayments from "../components/FormPayments";

// ---------- FORMULAIRE DE PAIEMENT ----------
function PaymentForm({ type, onConfirm, onClose }) {
  const [fournisseur, setFournisseur] = useState("");
  const [montant, setMontant] = useState("");
  const [facture, setFacture] = useState("");

  return (
    <ScrollView>
      <View style={styles.formHeader}>
        <Text style={styles.formTitle}>{type}</Text>
        <Text style={styles.formSubtitle}>Paiement de facture</Text>
      </View>

      <Text style={styles.label}>Fournisseur</Text>
      <TextInput value={fournisseur} onChangeText={setFournisseur} placeholder="Nom du fournisseur" style={styles.input} />
        
      <Text style={styles.label}>Montant</Text>
      <TextInput  keyboardType="numeric" value={montant} onChangeText={setMontant} placeholder="0.00" style={styles.input}/>
       
      <Text style={styles.label}>Numéro de facture</Text>
      <TextInput value={facture} onChangeText={setFacture} placeholder="Ex: 123456789" style={styles.input} />
         
      <TouchableOpacity
        onPress={() => {
          onConfirm({
            type,
            fournisseur,
            montant,
            facture,
            date: new Date().toLocaleDateString(),
          });
        }}
        style={[
          styles.submit,
          type === "Mobile" ? { backgroundColor: "#6b5a49" } :
          type === "Internet" ? { backgroundColor: "#6b5a49" } :
          { backgroundColor: "#6b5a49" }
        ]}
      >
        <Text style={styles.submitText}>Confirmer le paiement</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={onClose} style={styles.cancelBtn}>
        <Text style={styles.cancelText}>Annuler</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

// ---------- PAGE PRINCIPALE ----------
export default function PaymentsScreen() {
  const [activeForm, setActiveForm] = useState(null); // 'Mobile', 'Internet', 'Électricité', 'Eau'
  const [historique, setHistorique] = useState([]);

  const closeForm = () => setActiveForm(null);

  const ajouterPaiement = (data) => {
    setHistorique(prev => [data, ...prev]);
    closeForm();
  };

  return (
    <View style={styles.container}>
      <Header title="Paiements" />

      {/* Grid boutons */}
      <View style={styles.grid}>
        {["Mobile", "Internet", "Électricité", "Eau"].map((type) => (
          <TouchableOpacity key={type} style={styles.cardBtn} onPress={() => setActiveForm(type)}>
            <Text style={styles.cardIcon}>
              {type === "Mobile" ? "📱" :
               type === "Internet" ? "🌐" :
               type === "Électricité" ? "⚡" : "💧"}
            </Text>
            <Text style={styles.cardLabel}>{type}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Modal form */}
      <Modal visible={!!activeForm} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <TouchableOpacity onPress={closeForm} style={styles.modalClose}>
              <Text style={styles.modalCloseText}>X</Text>
            </TouchableOpacity>
            {activeForm && (
              <PaymentForm 
                type={activeForm} 
                onConfirm={ajouterPaiement} 
                onClose={closeForm} 
              />
            )}
          </View>
        </View>
      </Modal>

      {/* Historique */}
      <View style={styles.history}>
        <Text style={styles.historyTitle}>Historique ({historique.length})</Text>

        <FlatList
          data={historique}
          keyExtractor={(_, idx) => String(idx)}
          renderItem={({item}) => (
            <View style={styles.historyItem}>
              <Text style={styles.historyItemTitle}>
                {item.type} — {item.fournisseur || "—"}
              </Text>
              <Text style={styles.historyItemSubtitle}>
                {item.montant} € · {item.facture}
              </Text>
              <Text style={styles.historyItemDate}>{item.date}</Text>
            </View>
          )}
        />
      </View>

      <FormPayments />
      <MobileNav />
    </View>
  );
}

// ---------- STYLES ----------
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f7f5f2", padding: 16 },
  pageTitle: { fontSize: 24, fontWeight: "700", color: "#6b5a49", marginBottom: 16 },

  grid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", gap: 8, marginTop: 19,},
  cardBtn: { width: "48%", backgroundColor: "#fff", borderRadius: 12, padding: 16, marginBottom: 8, alignItems: "center", shadowColor:"#000", shadowOpacity:0.06, elevation:2 },
  cardIcon: { fontSize: 28, marginBottom: 8 },
  cardLabel: { fontWeight: "700" },

  modalOverlay: { flex:1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "center", padding: 16 },
  modalBox: { backgroundColor: "#fff", borderRadius: 12, padding: 16 },
  modalClose: { alignSelf: "flex-end", marginBottom: 8 },
  modalCloseText: { color: "#ef4444", fontWeight: "700" },

  formHeader: { flexDirection: "row", gap: 8, marginBottom: 12 },
  formTitle: { fontWeight: "700", fontSize: 16 },
  formSubtitle: { color: "#666", marginLeft: 8 },

  label: { marginBottom: 6, color: "#444" },
  input: { backgroundColor: "#f3f3f3", padding: 12, borderRadius: 8, marginBottom: 8 },
  submit: { marginTop: 8, padding: 12, borderRadius: 8, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "700" },
  cancelBtn: { marginTop: 8, alignItems: "center" },
  cancelText: { color: "#666" },

  history: { marginTop: 16, flex: 1 },
  historyTitle: { fontWeight: "700", marginBottom: 8 },
  historyItem: { padding: 12, backgroundColor: "#fff", borderRadius: 10, marginBottom: 8 },
  historyItemTitle: { fontWeight: "700" },
  historyItemSubtitle: { color: "#666", marginTop: 4 },
  historyItemDate: { color: "#999", marginTop: 6 },
});
