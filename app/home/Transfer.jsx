import React, { useEffect, useState, useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";
import Sidebar from "../components/Sidebar";
import { useTheme } from "../context/ThemeContext";
import { BackendContext } from "../context";

export default function Transfer() {
  const { isDarkMode, toggleTheme } = useTheme();
  const api = useContext(BackendContext);

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("interne");

  const [accounts, setAccounts] = useState([]);
  const [sourceAccount, setSourceAccount] = useState(null);
  const [destinationAccount, setDestinationAccount] = useState(null);
  const [beneficiaryIban, setBeneficiaryIban] = useState("");
  const [amount, setAmount] = useState("");

  const [openSourceDropdown, setOpenSourceDropdown] = useState(false);
  const [openDestDropdown, setOpenDestDropdown] = useState(false);

  useEffect(() => {
    loadAccounts();
  }, []);

  const loadAccounts = async () => {
    try {
      const res = await api.get("/api/accounts");
      setAccounts(res.data);
    } catch (e) {
      Alert.alert("Erreur", "Impossible de charger les comptes");
    }
  };

  const handleTransfer = async () => {
    try {
      if (!sourceAccount || !amount) {
        return Alert.alert("Erreur", "Tous les champs sont requis");
      }

      if (tab === "interne") {
        if (!destinationAccount) {
          return Alert.alert("Erreur", "Compte destination requis");
        }

        await api.post("/api/transfer/internal", {
          sourceAccount,
          destinationAccount,
          amount: Number(amount),
        });
      } else {
        if (!beneficiaryIban) {
          return Alert.alert("Erreur", "IBAN requis");
        }

        await api.post("/api/transfer/external", {
          sourceAccount,
          beneficiaryIban,
          amount: Number(amount),
        });
      }

      Alert.alert("Succès", "Transfert effectué avec succès");
      setAmount("");
      setDestinationAccount(null);
      setBeneficiaryIban("");
    } catch (err) {
      console.log("TRANSFER ERROR", err.response?.data || err.message);
      Alert.alert(
        "Erreur",
        err.response?.data?.message || "Échec du transfert"
      );
    }
  };

  const renderAccountDropdown = (selected, setSelected, open, setOpen) => (
    <View style={{ marginTop: 10, zIndex: 10 }}>
      <TouchableOpacity
        style={[styles.input, { justifyContent: "center" }]}
        onPress={() => setOpen(!open)}
      >
        <Text style={{ color: selected ? (isDarkMode ? "#fff" : "#000") : "#888" }}>
          {selected
            ? accounts.find((a) => a._id === selected)?.type.toUpperCase() +
              " • " +
              accounts.find((a) => a._id === selected)?.balance +
              " €"
            : "Sélectionner un compte"}
        </Text>
      </TouchableOpacity>

      {open && (
        <View style={[styles.dropdown, { backgroundColor: isDarkMode ? "#030e25" : "#fff" }]}>
          {accounts.map((item) => (
            <TouchableOpacity
              key={item._id}
              style={styles.item}
              onPress={() => {
                setSelected(item._id);
                setOpen(false);
              }}
            >
              <Text style={{ color: isDarkMode ? "#fff" : "#000" }}>
                {item.type.toUpperCase()} • {item.balance} €
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );

  return (
    <View style={{ flex: 1, backgroundColor: isDarkMode ? "#010517" : "#f1f5f9" }}>
      <Sidebar visible={sidebarOpen} onClose={() => setSidebarOpen(false)} isDarkMode={isDarkMode} />

      <Header
        title="Transfert"
        isDarkMode={isDarkMode}
        onToggleTheme={toggleTheme}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "interne" && styles.activeTab]}
            onPress={() => setTab("interne")}
          >
            <Text style={styles.tabText}>Interne</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabBtn, tab === "externe" && styles.activeTab]}
            onPress={() => setTab("externe")}
          >
            <Text style={styles.tabText}>Externe</Text>
          </TouchableOpacity>
        </View>

        {/* Card */}
        <View style={[styles.card, { backgroundColor: isDarkMode ? "#030e25" : "#ffffff" }]}>
          <Text style={styles.label}>Compte source</Text>
          {renderAccountDropdown(sourceAccount, setSourceAccount, openSourceDropdown, setOpenSourceDropdown)}

          {tab === "interne" ? (
            <>
              <Text style={styles.label}>Compte destination</Text>
              {renderAccountDropdown(destinationAccount, setDestinationAccount, openDestDropdown, setOpenDestDropdown)}
            </>
          ) : (
            <>
              <Text style={styles.label}>IBAN bénéficiaire</Text>
              <TextInput
                value={beneficiaryIban}
                onChangeText={setBeneficiaryIban}
                placeholder="IBANXXXXXXXX"
                style={styles.input}
              />
            </>
          )}

          <Text style={styles.label}>Montant</Text>
          <TextInput
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0"
            style={styles.input}
          />

          <TouchableOpacity style={styles.submitBtn} onPress={handleTransfer}>
            <Text style={styles.submitText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <MobileNav currentPage="transfer" isDarkMode={isDarkMode} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  tabs: { flexDirection: "row", marginBottom: 20 },
  tabBtn: {
    flex: 1,
    padding: 14,
    backgroundColor: "#e8dcc7",
    alignItems: "center",
    borderRadius: 10,
    marginHorizontal: 4,
  },
  activeTab: { backgroundColor: "#ffffff" },
  tabText: { fontWeight: "700" },
  card: { padding: 18, borderRadius: 16 },
  label: { marginTop: 14, fontWeight: "600" },
  input: {
    backgroundColor: "#f7f4ef",
    borderRadius: 10,
    padding: 14,
    marginTop: 6,
  },
  submitBtn: {
    marginTop: 24,
    backgroundColor: "#e8dcc7",
    padding: 16,
    borderRadius: 14,
    alignItems: "center",
  },
  submitText: { fontWeight: "800", fontSize: 16 },
  dropdown: {
    marginTop: 4,
    borderRadius: 10,
    maxHeight: 200,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  item: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
});
