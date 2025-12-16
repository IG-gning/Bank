import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from "react-native";
import { FontAwesome, Ionicons, MaterialIcons } from "@expo/vector-icons";

import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import MobileNav from "./components/MobileNav";
import { createSupportTicket } from "./context";

export default function Support() {
  /* ===== UI GLOBAL ===== */
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState("Support");

  /* ===== FORM ===== */
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  /* ===== FAQ ===== */
  const [openIndex, setOpenIndex] = useState(null);
  const toggleFAQ = (i) => setOpenIndex(openIndex === i ? null : i);

  const faqs = [
    {
      question: "Comment effectuer un virement ?",
      answer:
        "Rendez-vous dans Transfert, choisissez le type de virement et validez.",
    },
    {
      question: "Comment sécuriser mon compte ?",
      answer: "Activez la double authentification (2FA).",
    },
    {
      question: "Quels sont les frais de transaction ?",
      answer: "Les transferts internes sont gratuits.",
    },
    {
      question: "Comment obtenir une carte bancaire ?",
      answer: "Dashboard → Ajouter une carte.",
    },
  ];

  /* ===== COLORS ===== */
  const COLORS = {
    bg: isDarkMode ? "#010517" : "#f3f4f6",
    card: isDarkMode ? "#0f172a" : "#ffffff",
    text: isDarkMode ? "#f8fafc" : "#111827",
    sub: isDarkMode ? "#94a3b8" : "#6b7280",
    border: isDarkMode ? "#ffffff20" : "#e5e7eb",
    primary: "#2563eb",
  };

  /* ===== SEND ===== */
  const handleSend = async () => {
    if (!email || !subject || !message) {
      Alert.alert("Erreur", "Tous les champs sont obligatoires");
      return;
    }

    try {
      setLoading(true);
      await createSupportTicket({ email, subject, message });

      Alert.alert("Succès", "Message envoyé ✅");
      setEmail("");
      setSubject("");
      setMessage("");
    } catch (err) {
      Alert.alert("Erreur", "Erreur lors de l’envoi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: COLORS.bg }}>
      {/* SIDEBAR */}
      <Sidebar
        visible={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        isDarkMode={isDarkMode}
      />

      {/* HEADER */}
      <Header
        title="Support & Aide"
        isDarkMode={isDarkMode}
        onToggleTheme={() => setIsDarkMode(!isDarkMode)}
        onMenuPress={() => setSidebarOpen(true)}
      />

      <ScrollView contentContainerStyle={styles.container}>
        {/* HEADER TEXT */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: COLORS.text }]}>
            Support & Aide
          </Text>
          <Text style={{ color: COLORS.sub }}>
            Nous sommes là pour vous aider 24/7
          </Text>
        </View>

        {/* CONTACT CARDS */}
        <View style={styles.cards}>
          <ContactCard
            icon={<FontAwesome name="phone" size={28} color="#2563eb" />}
            title="Par téléphone"
            subtitle="Disponible 24h/24"
            value="0800 XXX XXX"
            COLORS={COLORS}
          />
          <ContactCard
            icon={<Ionicons name="chatbubbles" size={28} color="#7c3aed" />}
            title="Chat en direct"
            subtitle="Réponse < 2 min"
            value="Démarrer le chat"
            COLORS={COLORS}
          />
          <ContactCard
            icon={<MaterialIcons name="email" size={28} color="#16a34a" />}
            title="Par email"
            subtitle="Réponse sous 24h"
            value="support@bankapp.com"
            COLORS={COLORS}
          />
        </View>

        {/* FAQ */}
        <View style={[styles.box, { backgroundColor: COLORS.card }]}>
          <Text style={[styles.boxTitle, { color: COLORS.text }]}>
            Questions fréquentes
          </Text>

          {faqs.map((faq, i) => (
            <TouchableOpacity
              key={i}
              onPress={() => toggleFAQ(i)}
              style={[styles.faqItem, { borderColor: COLORS.border }]}
            >
              <View style={styles.faqHeader}>
                <Text style={{ color: COLORS.text }}>{faq.question}</Text>
                <Ionicons
                  name="chevron-down"
                  size={18}
                  color={COLORS.sub}
                  style={{
                    transform: [
                      { rotate: openIndex === i ? "180deg" : "0deg" },
                    ],
                  }}
                />
              </View>

              {openIndex === i && (
                <Text style={{ color: COLORS.sub, marginTop: 6 }}>
                  {faq.answer}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        {/* FORM */}
        <View style={[styles.box, { backgroundColor: COLORS.card }]}>
          <Text style={[styles.boxTitle, { color: COLORS.text }]}>
            Nous contacter
          </Text>

          <Input label="Email" value={email} onChange={setEmail} COLORS={COLORS} />
          <Input
            label="Sujet"
            value={subject}
            onChange={setSubject}
            COLORS={COLORS}
          />
          <Input
            label="Message"
            value={message}
            onChange={setMessage}
            multiline
            COLORS={COLORS}
          />

          <TouchableOpacity
            style={[styles.button, { backgroundColor: COLORS.primary }]}
            onPress={handleSend}
            disabled={loading}
          >
            <Ionicons name="send" size={18} color="#fff" />
            <Text style={styles.buttonText}>
              {loading ? "Envoi..." : "Envoyer le message"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* MOBILE NAV */}
      <MobileNav
        currentPage={currentPage}
        onNavigate={setCurrentPage}
        isDarkMode={isDarkMode}
      />
    </View>
  );
}

/* ===== COMPONENTS ===== */

const ContactCard = ({ icon, title, subtitle, value, COLORS }) => (
  <View style={[styles.card, { backgroundColor: COLORS.card }]}>
    {icon}
    <Text style={[styles.cardTitle, { color: COLORS.text }]}>{title}</Text>
    <Text style={{ color: COLORS.sub }}>{subtitle}</Text>
    <Text style={{ color: COLORS.primary, marginTop: 4 }}>{value}</Text>
  </View>
);

const Input = ({ label, value, onChange, multiline, COLORS }) => (
  <View style={{ marginBottom: 12 }}>
    <Text style={{ fontSize: 12, color: COLORS.sub, marginBottom: 4 }}>
      {label}
    </Text>
    <TextInput
      value={value}
      onChangeText={onChange}
      multiline={multiline}
      style={[
        styles.input,
        {
          backgroundColor: COLORS.bg,
          color: COLORS.text,
          height: multiline ? 100 : undefined,
        },
      ]}
    />
  </View>
);

/* ===== STYLES ===== */

const styles = StyleSheet.create({
  container: { padding: 16 },
  header: { alignItems: "center", marginBottom: 24 },
  title: { fontSize: 24, fontWeight: "bold" },

  cards: { gap: 12, marginBottom: 24 },
  card: {
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  cardTitle: { fontWeight: "600", marginTop: 8 },

  box: { borderRadius: 16, padding: 16, marginBottom: 20 },
  boxTitle: { fontSize: 18, fontWeight: "600", marginBottom: 12 },

  faqItem: { borderBottomWidth: 1, paddingVertical: 10 },
  faqHeader: { flexDirection: "row", justifyContent: "space-between" },

  input: {
    borderRadius: 12,
    padding: 12,
  },

  button: {
    flexDirection: "row",
    padding: 14,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontWeight: "600" },
});
