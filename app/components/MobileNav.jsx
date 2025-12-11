import React, { useState } from "react";
import { View, TouchableOpacity, Text, StyleSheet, Dimensions, Animated } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Ionicons, MaterialCommunityIcons, FontAwesome5, Feather } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

export default function MobileNav({ isDarkMode }) {
  const router = useRouter();
  const pathname = usePathname(); // Expo Router permet de récupérer le chemin actuel

  const navItems = [
    { id: "home", label: "Home", icon: <Ionicons name="home-outline" size={24} /> , path: "/home"},
    // { id: "transactions", label: "Transactions", icon: <FontAwesome5 name="file-invoice-dollar" size={24} />, path: "/home/Transactions"},
    { id: "transfer", label: "Transfert", icon: <MaterialCommunityIcons name="swap-horizontal-bold" size={24} />, path: "/home/Transfer"},
    { id: "payments", label: "Paiement", icon: <MaterialCommunityIcons name="credit-card-outline" size={24} />, path: "/home/Payments"},
    // { id: "profile", label: "Profil", icon: <Feather name="user" size={24} />, path: "/home/Profile"},
  ];

  const renderButton = (item) => {
    const isActive = pathname === item.path; // comparer le chemin actuel
    const scaleAnim = new Animated.Value(1);

    const handlePressIn = () => {
      Animated.spring(scaleAnim, { toValue: 1.1, useNativeDriver: true }).start();
    };
    const handlePressOut = () => {
      Animated.spring(scaleAnim, { toValue: 1, useNativeDriver: true }).start();
    };

    const handlePress = () => {
      router.push(item.path);
    };

    return (
      <Animated.View key={item.id} style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          onPress={handlePress}
          style={[
            styles.navButton,
            isActive && { 
              backgroundColor: "#d6c7b4",
              shadowColor: "#d6c7b4",
              shadowOpacity: 0.5,
              shadowOffset: { width: 0, height: 5 },
              shadowRadius: 10,
            }
          ]}
        >
          {React.cloneElement(item.icon, { color: isActive ? "#141829" : "#f3e8d7" })}
          <Text style={[styles.navLabel, isActive && { color: "#141829", fontWeight: "700" }]}>{item.label}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <View style={[styles.nav, { backgroundColor: isDarkMode ? "#3b322a" : "#6b5a49" }]}>
      {navItems.map(renderButton)}
    </View>
  );
}

const styles = StyleSheet.create({
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingVertical: 12,
    width: width,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    position: "absolute",
    bottom: 0,
    left: 0,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: -3 },
    shadowRadius: 5,
  },
  navButton: {
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  navLabel: {
    marginTop: 4,
    fontSize: 12,
    color: "#f3e8d7",
  },
});
