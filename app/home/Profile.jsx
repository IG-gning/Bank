import { View, Text } from "react-native";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

export default function Profile() {
  return (
    <View style={{ flex: 1 }}>
      <Header title="Mon Profil" />
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Détails du profil</Text>
      </View>
      <MobileNav />
    </View>
  );
}
