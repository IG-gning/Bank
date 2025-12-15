// app/Paiement/FormPaiement.jsx
import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList, ScrollView} from "react-native";

 
const sampleBeneficiaires = [
  { nom: "EDF", type: "Mobile ****1111", emoji: "📱" },
  { nom: "Orange", type: "Internet ****2222", emoji: "📶" },
  { nom: "Free", type: "Élec ****3333", emoji: "⚡️" },
  { nom: "Veolia", type: "Eau ****4444", emoji: "💧" },
];

export default function FormPayments({ initialType = "paiement", onConfirm }) {
  const [activeForm, setActiveForm] = useState("paiement"); // paiement | beneficiaire | historique
  const [historique, setHistorique] = useState([]);
  const [beneficiaires, setBeneficiaires] = useState(sampleBeneficiaires);

  // paiement form states
  const [beneficiaireInput, setBeneficiaireInput] = useState("");
  const [montant, setMontant] = useState("");
  const [reference, setReference] = useState("");

  // modal add beneficiary local fields
  const [showAddBenef, setShowAddBenef] = useState(false);
  const [newNom, setNewNom] = useState("");
  const [newType, setNewType] = useState("");

  const handlePaiement = () => {
    if (!beneficiaireInput || !montant) return alert("Veuillez remplir les champs obligatoires.");
    const entry = {
      title: beneficiaireInput,
      montant: `-${montant}`,
      date: new Date().toLocaleDateString(),
      ref: reference || "Paiement",
    };
    setHistorique(prev => [entry, ...prev]);
    setBeneficiaireInput(""); setMontant(""); setReference("");
    if (onConfirm) onConfirm(entry); // remonte au parent si besoin
    alert("Paiement effectué");
  };

  const handleBeneficiairePay = (b) => {
    const entry = {
      title: b.nom,
      montant: "-???",
      date: new Date().toLocaleDateString(),
      ref: b.type,
    };
    setHistorique(prev => [entry, ...prev]);
    if (onConfirm) onConfirm(entry);
  };

  const handleAddBeneficiaire = () => {
    if (!newNom || !newType) return;
    setBeneficiaires(prev => [{nom:newNom, type:newType, emoji:"👤"}, ...prev]);
    setNewNom(""); setNewType(""); setShowAddBenef(false);
  };

  return (
    <View>
    <ScrollView>
      {/* menu */}
      <View style={styles.menuRow}>
        <TouchableOpacity onPress={() => setActiveForm("paiement")}><Text style={[styles.menuItem, activeForm==="paiement" && styles.menuActive]}>Paiement</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveForm("beneficiaire")}><Text style={[styles.menuItem, activeForm==="beneficiaire" && styles.menuActive]}>Bénéficiaire</Text></TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveForm("historique")}><Text style={[styles.menuItem, activeForm==="historique" && styles.menuActive]}>Historique</Text></TouchableOpacity>
      </View>

      {/* PAYMENT FORM */}
      {activeForm === "paiement" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Paiement manuel</Text>
          <TextInput placeholder="Bénéficiaire" value={beneficiaireInput} onChangeText={setBeneficiaireInput} style={styles.input}/>
          <TextInput placeholder="Montant" value={montant} onChangeText={setMontant} keyboardType="numeric" style={styles.input}/>
          <TextInput placeholder="Référence" value={reference} onChangeText={setReference} style={styles.input}/>
          <TouchableOpacity style={[styles.btn, {backgroundColor:"#d6c7b4"}]} onPress={handlePaiement}>
            <Text style={{color:"#000000ff", fontWeight:"700"}}>Effectuer le paiement</Text>
          </TouchableOpacity>
        </View>
      )}

      {/* BENEFICIAIRES */}
      {activeForm === "beneficiaire" && (
        <View style={styles.card}>
          <View style={{flexDirection:"row", justifyContent:"space-between", alignItems:"center"}}>
            <View>
              <Text style={styles.cardTitle}>Mes bénéficiaires</Text>
              <Text style={{color:"#6b7280"}}>Gérez vos contacts favoris</Text>
            </View>
            <TouchableOpacity style={[styles.btn, {backgroundColor:"#6b5a49"}]} onPress={() => setShowAddBenef(true)}>
              <Text style={{color:"#fff"}}>Nouveau</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={beneficiaires}
            keyExtractor={(_,i)=>String(i)}
            renderItem={({item}) => (
              <View style={styles.benefRow}>
                <View style={{flexDirection:"row", alignItems:"center"}}>
                  <View style={styles.emojiBox}><Text>{item.emoji}</Text></View>
                  <View>
                    <Text style={{fontWeight:"700"}}>{item.nom}</Text>
                    <Text style={{color:"#6b7280"}}>{item.type}</Text>
                  </View>
                </View>
                <TouchableOpacity style={[styles.btn, {backgroundColor:"#d6c7b4"}]} onPress={()=>handleBeneficiairePay(item)}>
                  <Text style={{color:"#000000ff"}}>Payé</Text>
                </TouchableOpacity>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{height:8}}/>}
            style={{marginTop:12}}
          />

          {/* Small add beneficiary modal (inline) */}
          {showAddBenef && (
            <View style={styles.addModal}>
              <TextInput placeholder="Nom" value={newNom} onChangeText={setNewNom} style={styles.input}/>
              <TextInput placeholder="Type (ex: Mobile ****7777)" value={newType} onChangeText={setNewType} style={styles.input}/>
              <View style={{flexDirection:"row", justifyContent:"flex-end", gap:8}}>
                <TouchableOpacity style={[styles.btn, {backgroundColor:"#d1d5db"}]} onPress={()=>setShowAddBenef(false)}><Text>Annuler</Text></TouchableOpacity>
                <TouchableOpacity style={[styles.btn,{backgroundColor:"#d6c7b4"}]} onPress={handleAddBeneficiaire}><Text style={{color:"#fff"}}>Ajouter</Text></TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      )}

      {/* HISTORIQUE */}
      {activeForm === "historique" && (
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Historique</Text>
          {historique.length === 0 && <Text style={{color:"#6b7280", marginTop:8}}>Aucune transaction pour le moment.</Text>}
          <FlatList
            data={historique}
            keyExtractor={(_,i)=>String(i)}
            renderItem={({item}) => (
              <View style={styles.historyRow}>
                <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                  <Text>{item.title}</Text>
                  <Text style={{fontWeight:"700"}}>{item.montant}</Text>
                </View>
                <Text style={{color:"#6b7280", fontSize:12}}>{item.date} • {item.ref}</Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View style={{height:8}} />}
            style={{marginTop:8}}
          />
        </View>
      )}
      
    </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  menuRow:{flexDirection:"row", justifyContent:"space-around", backgroundColor:"#d6c7b4", paddingVertical:10},
  menuItem:{paddingVertical:6, paddingHorizontal:12, fontWeight:"600"},
  menuActive:{borderBottomWidth:2, borderBottomColor:"#d6c7b4"},
  card:{backgroundColor:"#fff", marginTop:12, padding:12, borderRadius:10, elevation:2},
  cardTitle:{fontSize:16, fontWeight:"800", marginBottom:8},
  input:{borderWidth:1, borderColor:"#e5e7eb", padding:10, borderRadius:8, marginTop:8},
  btn:{paddingVertical:10, paddingHorizontal:12, borderRadius:8, alignItems:"center", marginTop:12},
  benefRow:{flexDirection:"row", justifyContent:"space-between", alignItems:"center", padding:10, borderRadius:8, borderWidth:1, borderColor:"#f3f4f6"},
  emojiBox:{width:44, height:44, borderRadius:10, backgroundColor:"#fef3c7", alignItems:"center", justifyContent:"center", marginRight:10},
  addModal:{backgroundColor:"#f8fafc", padding:10, borderRadius:8, marginTop:10},
  historyRow:{padding:10, borderRadius:8, backgroundColor:"#fffaf7", marginBottom:8}
});
