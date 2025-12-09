import { View, Text, StyleSheet } from "react-native";

export default function Header({ title }) {
  return (
    <View style={styles.header}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#6b5a49",
    padding: 16,
    borderRadius: 13,
  },
  title: {
    color: "#fcfbfaff",
    fontSize: 20,
    fontWeight: "bold",
  },
});
