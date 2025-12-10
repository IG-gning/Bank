import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { useRouter } from "expo-router"; // <-- Ajouté ici

const { width, height } = Dimensions.get("window");

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const router = useRouter(); // <-- Initialisation ici

  const handleSubmit = () => {
    console.log(isSignUp ? "Sign Up" : "Login");
    router.push("/home"); // <-- Redirection vers dashboard
  };

  return (
    <View style={styles.container}>
      {/* Background bubbles */}
      <View style={styles.bubbleTop} />
      <View style={styles.bubbleBottom} />

      {/* Header space */}
      <View style={styles.headerSpace} />

      {/* Form Card */}
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

        {/* SignUp Fields */}
        {isSignUp && (
          <View style={styles.row}>
            <View style={[styles.field, { flex: 1, marginRight: 10 }]}>
              <Text style={styles.label}>Prénom</Text>
              <TextInput style={styles.input} placeholder="Jean" />
            </View>
            <View style={[styles.field, { flex: 1 }]}>
              <Text style={styles.label}>Nom</Text>
              <TextInput style={styles.input} placeholder="Dupont" />
            </View>
          </View>
        )}

        {/* Email Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="jean.dupont@exemple.fr"
            keyboardType="email-address"
          />
        </View>

        {/* Password Field */}
        <View style={styles.field}>
          <Text style={styles.label}>Mot de passe</Text>
          <View style={styles.passwordWrapper}>
            <TextInput
              style={styles.inputPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Text style={styles.showPass}>{showPassword ? "*" : "o"}</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitText}>
            {isSignUp ? "Créer mon compte" : "Se connecter"}
          </Text>
        </TouchableOpacity>

        {/* Toggle Login / SignUp */}
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

// ...styles restent identiques


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
