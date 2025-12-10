import { View, Text, StyleSheet } from "react-native";

export function Card({ children, style }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function CardHeader({ children, style }) {
  return <View style={[styles.header, style]}>{children}</View>;
}

export function CardContent({ children, style }) {
  return <View style={[styles.content, style]}>{children}</View>;
}

export function CardTitle({ children, style }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 12,
    marginVertical: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    marginBottom: 8,
  },
  content: {},
  title: {
    fontSize: 16,
    fontWeight: "700",
  },
});
