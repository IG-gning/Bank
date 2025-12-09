import { View, Text, StyleSheet } from "react-native";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

export default function Home() {
  return (
    <View style={styles.container}>
      <Header title="Tableau de bord" />

      <View style={styles.content}>
        <Text style={styles.text}>Bienvenue dans votre espace Bank-Rewmi</Text>
      </View>

      <MobileNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: 18 },
});
