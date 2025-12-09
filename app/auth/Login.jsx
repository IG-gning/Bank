import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Mot de passe" secureTextEntry />

      <TouchableOpacity
        style={styles.btn}
        onPress={() => router.push("/home")}
      >
        <Text style={styles.btnText}>Se connecter</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: { fontSize: 28, fontWeight: "bold", marginBottom: 20 },
  input: { borderWidth: 1, padding: 12, borderRadius: 8, marginVertical: 10 },
  btn: { backgroundColor: "#007bff", padding: 14, borderRadius: 8, marginTop: 20 },
  btnText: { color: "white", textAlign: "center", fontWeight: "bold" },
});
