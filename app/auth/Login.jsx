import { useRouter } from "expo-router";
import React, { useContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Alert,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { BackendContext } from "../context"; // <-- BackendContext pour axios

const { width, height } = Dimensions.get("window");

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Champs
  const [prenom, setPrenom] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [dateDeNaissance, setDateDeNaissance] = useState("");

  const router = useRouter();
  const api = useContext(BackendContext); // <-- axios instance
  
  const handleSubmit = async () => {
    try {
      if (isSignUp) {
        // Signup
        const res = await api.post("/api/auth/register", { // <-- corrigé ici
          name,
          prenom,
          email,
          password,
          telephone,
          dateDeNaissance,
        });
        Alert.alert("Succès", res.data.message);
        router.push("/home");
      } else {
        // Login
        const res = await api.post("/api/auth/login", { // <-- corrigé ici
          email,
          password,
        });
        await AsyncStorage.setItem("token", res.data.token);
        Alert.alert("Succès", res.data.message);
        router.push("/home");
        
      }
    } catch (err) {
      console.error(err);
      Alert.alert(
        "Erreur",
        err.response?.data?.message || "Impossible de se connecter"
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.bubbleTop} />
      <View style={styles.bubbleBottom} />
      <View style={styles.headerSpace} />

      <View style={styles.formCard}>
        {!isSignUp && (
          <>
            <Text style={styles.formTitle}>Bienvenue</Text>
            <Text style={styles.formSubtitle}>
              Connectez-vous à votre espace personnel
            </Text>
          </>
        )}
        {isSignUp && <Text style={styles.formTitle}>Créer un compte</Text>}

        {isSignUp && (
          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput
                style={styles.input}
                placeholder="Jean"
                value={prenom}
                onChangeText={setPrenom}
              />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Nom</Text>
              <TextInput
                style={styles.input}
                placeholder="Dupont"
                value={name}
                onChangeText={setName}
              />
            </View>
          </View>
        )}

        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="jean.dupont@exemple.fr"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <View style={styles.field}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.inputPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPass}>{showPassword ? "*" : "o"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {isSignUp && (
          <>
            <View style={styles.field}>
              <Text style={styles.label}>Téléphone</Text>
              <TextInput
                style={styles.input}
                placeholder="77xxxxxxx"
                value={telephone}
                onChangeText={setTelephone}
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Date de naissance</Text>
              <TextInput
                style={styles.input}
                placeholder="JJ/MM/AAAA"
                value={dateDeNaissance}
                onChangeText={setDateDeNaissance}
              />
            </View>
          </>
        )}

        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {isSignUp ? "Créer mon compte" : "Se connecter"}
          </Text>
        </TouchableOpacity>

        <View style={styles.toggleContainer}>
          <Text style={styles.toggleText}>
            {isSignUp
              ? "Vous avez déjà un compte ?"
              : "Vous n'avez pas encore de compte ?"}
          </Text>
          <TouchableOpacity onPress={() => setIsSignUp(!isSignUp)}>
            <Text style={styles.toggleBtn}>
              {isSignUp ? "Se connecter" : "S'inscrire"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

// Styles identiques à ton code existant


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0f1320", justifyContent: "center", alignItems: "center" },
  headerSpace: { height: 60 },
  bubbleTop: { position: "absolute", top: -100, right: -80, width: 250, height: 250, backgroundColor: "#d6c7b4", borderRadius: 125, opacity: 0.3 },
  bubbleBottom: { position: "absolute", bottom: -80, left: -60, width: 180, height: 180, backgroundColor: "#bfa98a", borderRadius: 90, opacity: 0.3 },
  formCard: { width: "90%", backgroundColor: "#3b322a", padding: 20, borderRadius: 20, shadowColor: "#3b322a", shadowOpacity: 0.5, shadowOffset: { width: 0, height: 10 }, shadowRadius: 20 },
  formTitle: { fontSize: 26, fontWeight: "bold", marginBottom: 6, color: "#f3e8d7", textAlign: "center" },
  formSubtitle: { fontSize: 14, color: "#f3e8d7", marginBottom: 20, textAlign: "center" },
  row: { flexDirection: "row", justifyContent: "space-between" },
  field: { marginBottom: 15 },
  label: { fontWeight: "600", marginBottom: 6, color: "#f3e8d7" },
  input: { backgroundColor: "#fdfdffff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#3b322a", color: "#3b322a" },
  passwordWrapper: { flexDirection: "row", alignItems: "center" },
  inputPassword: { flex: 1, backgroundColor: "#ffffffff", padding: 12, borderRadius: 10, borderWidth: 1, borderColor: "#3b322a", color: "#3b322a" },
  showPass: { marginLeft: 10, fontSize: 18, color: "#bfa98a" },
  submitBtn: { marginTop: 10, backgroundColor: "#d6c7b4", padding: 12, borderRadius: 12, alignItems: "center", shadowColor: "#d6c7b4", shadowOpacity: 0.5, shadowOffset: { width: 0, height: 5 }, shadowRadius: 10 },
  submitText: { color: "#141829", fontSize: 16, fontWeight: "700" },
  toggleContainer: { flexDirection: "row", justifyContent: "center", marginTop: 15, flexWrap: "wrap" },
  toggleText: { fontSize: 14, color: "#f3e8d7" },
  toggleBtn: { fontSize: 14, fontWeight: "700", color: "#bfa98a", marginLeft: 5 },
});
