import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function MobileNav() {
  const router = useRouter();

  return (
    <View style={styles.nav}>
      <TouchableOpacity onPress={() => router.push("/home")}>
        <Text style={{color:"#fff", fontWeight:"bold"}}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/home/Transactions")}>
        <Text style={{color:"#fff", fontWeight:"bold"}}>Transactions</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/home/Transfer")}>
        <Text style={{color:"#fff", fontWeight:"bold"}}>Transfert</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => router.push("/home/Payments")}>
        <Text style={{color:"#fff", fontWeight:"bold"}}>Paiement</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/home/Profile")}>
        <Text style={{color:"#fff", fontWeight:"bold"}}>Profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 14,
    backgroundColor: "#6b5a49",
    marginTop: 16,
  
  },
});
