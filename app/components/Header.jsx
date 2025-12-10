import React, { useState } from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Animated } from "react-native";
import { Ionicons, Feather, MaterialCommunityIcons } from "@expo/vector-icons";

export default function Header({ isDarkMode, onToggleTheme, onMenuPress, user }) {
  const [search, setSearch] = useState("");
  const [scaleAnimTheme] = useState(new Animated.Value(1));
  const [scaleAnimBell] = useState(new Animated.Value(1));

  const handlePressIn = (anim) => Animated.spring(anim, { toValue: 1.1, useNativeDriver: true }).start();
  const handlePressOut = (anim) => Animated.spring(anim, { toValue: 1, useNativeDriver: true }).start();

  return (
    <View style={[styles.header, { backgroundColor: isDarkMode ? "#141829" : "#eadfcf" }]}>
      <TouchableOpacity onPress={onMenuPress}>
        <MaterialCommunityIcons name="menu" size={28} color={isDarkMode ? "#f3e8d7" : "#3b322a"} />
      </TouchableOpacity>

      <View style={styles.searchWrapper}>
        <Ionicons name="search-outline" size={20} color={isDarkMode ? "#bfa98a" : "#3b322a80"} />
        <TextInput
          placeholder="Rechercher..."
          placeholderTextColor={isDarkMode ? "#bfa98a" : "#3b322a80"}
          value={search}
          onChangeText={setSearch}
          style={[styles.searchInput, { backgroundColor: isDarkMode ? "#1a1512" : "#f3e8d7" }]}
        />
      </View>

      <View style={styles.rightButtons}>
        <Animated.View style={{ transform: [{ scale: scaleAnimTheme }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleAnimTheme)}
            onPressOut={() => handlePressOut(scaleAnimTheme)}
            onPress={onToggleTheme}
            style={styles.iconButton}
          >
            {isDarkMode ? <Ionicons name="sunny" size={24} color="#d6c7b4" /> : <Feather name="moon" size={24} color="#3b322a" />}
          </TouchableOpacity>
        </Animated.View>

        <Animated.View style={{ transform: [{ scale: scaleAnimBell }] }}>
          <TouchableOpacity
            onPressIn={() => handlePressIn(scaleAnimBell)}
            onPressOut={() => handlePressOut(scaleAnimBell)}
            style={styles.iconButton}
          >
            <Feather name="bell" size={24} color={isDarkMode ? "#f3e8d7" : "#3b322a"} />
            <View style={styles.bellDot} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    width: "100%",
    height: 90,
    paddingTop: 40,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor:"#55380dff",
    borderBottomWidth:1,
    justifyContent: "space-between",
    paddingHorizontal: 12,
    zIndex: 1000, // <-- IMPORTANT
  },
  searchWrapper: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 10,
    paddingHorizontal: 10,
    borderRadius: 14,
  },
  searchInput: {
    flex: 1,
    height: 36,
    borderRadius: 10,
    paddingHorizontal: 8,
    color: "#ffffffff",
    marginLeft: 6,
  },
  rightButtons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  iconButton: {
    padding: 8,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  bellDot: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#d6c7b4",
  },
});
