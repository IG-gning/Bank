// app/components/Sidebar.jsx
import React, { useRef, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Animated, Image } from "react-native";
import { Wallet, CreditCard, Receipt, Settings, LogOut, HelpCircle, User } from "lucide-react-native";

const { width } = Dimensions.get("window");

export default function Sidebar({ visible, onClose, isDarkMode, onNavigate }) {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const [show, setShow] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShow(true);
      Animated.timing(slideAnim, { toValue: 0, duration: 280, useNativeDriver: false }).start();
    } else {
      Animated.timing(slideAnim, { toValue: -width, duration: 280, useNativeDriver: false }).start(() => setShow(false));
    }
  }, [visible]);

  if (!show) return null;

  const COLORS = {
    bg: isDarkMode ? "#141829" : "#eadfcf",
    text: isDarkMode ? "#f3e8d7" : "#3b322a",
    accent: isDarkMode ? "#bfa98a" : "#5b4636",
    divider: isDarkMode ? "#ffffff20" : "#00000015",
  };

  const menu = [
    { label: "Mon Profil", icon: User, page: "profile" },
    { label: "Wallet", icon: Wallet, page: "dashboard" },
    { label: "Transactions", icon: Receipt, page: "transactions" },
    { label: "Mes Cartes", icon: CreditCard, page: "cards" },
    { label: "Paramètres", icon: Settings, page: "settings" },
  ];

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={styles.background} onPress={onClose} activeOpacity={1} />

      <Animated.View style={[styles.sidebar, { backgroundColor: COLORS.bg, left: slideAnim }]}>
        <View style={styles.profileSection}>
          <Image source={{ uri: "https://i.pravatar.cc/300" }} style={styles.avatar} />
          <View>
            <Text style={[styles.profileName, { color: COLORS.text }]}>Mouhamed Ndiaye</Text>
            <Text style={[styles.profileEmail, { color: COLORS.accent }]}>mouhamed@example.com</Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: COLORS.divider }]} />

        {menu.map((item, i) => (
          <TouchableOpacity
            key={i}
            style={styles.menuItem}
            onPress={() => item.page && onNavigate(item.page)}
          >
            <item.icon color={COLORS.accent} size={20} />
            <Text style={[styles.menuText, { color: COLORS.text }]}>{item.label}</Text>
          </TouchableOpacity>
        ))}

        <View style={[styles.divider, { backgroundColor: COLORS.divider }]} />

        <TouchableOpacity style={styles.menuItem}>
          <HelpCircle color={COLORS.accent} size={20} />
          <Text style={[styles.menuText, { color: COLORS.text }]}>Support & Aide</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.menuItem, { marginTop: 30 }]}>
          <LogOut color={"#d9534f"} size={22} />
          <Text style={[styles.menuText, { color: "#d9534f" }]}>Se déconnecter</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: 999, flexDirection: "row" },
  background: { position: "absolute", top: 0, left: 0, width: "100%", height: "100%", backgroundColor: "#00000050" },
  sidebar: { width: width * 0.7, height: "100%", paddingVertical: 40, paddingHorizontal: 20, paddingTop: 40, position: "absolute", zIndex: 1000 },
  profileSection: { flexDirection: "row", alignItems: "center", marginBottom: 2, paddingTop: 70 },
  avatar: { width: 55, height: 55, borderRadius: 100, marginRight: 12 },
  profileName: { fontSize: 18, fontWeight: "700" },
  profileEmail: { fontSize: 13, marginTop: 2 },
  divider: { width: "100%", height: 1, marginVertical: 18 },
  menuItem: { flexDirection: "row", alignItems: "center", paddingVertical: 14 },
  menuText: { fontSize: 16, marginLeft: 14, fontWeight: "500" },
});
