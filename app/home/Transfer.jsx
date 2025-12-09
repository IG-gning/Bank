import { View, Text , TextInput, TouchableOpacity,StyleSheet, } from "react-native";
import Header from "../components/Header";
import MobileNav from "../components/MobileNav";

export default function Transfer() {
   const [activeTab, setActiveTab] = useState("interne");
  return (
    <View style={{ flex: 1 }}>
      <Header title="Transfert" />
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.title}>Transfert d'argent</Text>
        <Text style={styles.subtitle}>
          Envoyez de l'argent à vos proches ou payez vos factures
        </Text>
      </View>

      {/* MAIN WRAPPER */}
      <View style={styles.main}>
        
        {/* FORMULAIRE */}
        <View style={styles.formCard}>
          
          {/* TABS */}
          <View style={styles.tabsWrapper}>
            <TouchableOpacity
              onPress={() => setActiveTab("interne")}
              style={[
                styles.tabButton,
                activeTab === "interne" && styles.activeTab,
              ]}
            >
              <Text style={styles.tabText}>Transfert interne</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setActiveTab("externe")}
              style={[
                styles.tabButton,
                activeTab === "externe" && styles.activeTab,
              ]}
            >
              <Text style={styles.tabText}>Transfert externe</Text>
            </TouchableOpacity>
          </View>

          {/* FORMULAIRE INTERNE */}
          {activeTab === "interne" && (
            <View>
              <Text style={styles.formTitle}>Transfert entre vos comptes</Text>
              <Text style={styles.formSubtitle}>
                Transfert entre vos comptes
              </Text>

              <View style={styles.field}>
                <Text style={styles.label}>Compte source</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Compte Courant - 24 580,45 €"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Compte destination</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Sélectionnez un compte"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Montant (€)</Text>
                <TextInput style={styles.input} placeholder="0.00" />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Description (optionnel)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Épargne mensuelle"
                />
              </View>

              <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.sendText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* FORMULAIRE EXTERNE */}
          {activeTab === "externe" && (
            <View>
              <Text style={styles.formTitle}>Transfert externe</Text>
              <Text style={styles.formSubtitle}>
                Transférez de l'argent entre vos différents comptes
              </Text>

              <View style={styles.field}>
                <Text style={styles.label}>Compte source</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Compte Courant - 24 580,45 €"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>IBAN</Text>
                <TextInput
                  style={styles.input}
                  placeholder="SN 76 XXXXXXXXXXXXXXXXXXXXXXXX"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Montant (€)</Text>
                <TextInput style={styles.input} placeholder="0.00" />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Description (optionnel)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Ex: Épargne mensuelle"
                />
              </View>

              <TouchableOpacity style={styles.sendBtn}>
                <Text style={styles.sendText}>Envoyer</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        {/* SIDEBAR – VERSION MOBILE */}
        <View style={styles.sidebarWrapper}>

          {/* CONTACTS */}
          <View style={styles.sidebarCard}>
            <Text style={styles.sidebarTitle}>Contacts récentes</Text>

            {[
              { name: "Marie Dubois", email: "marie.d@email.com", emoji: "👩", bg: "#f472b6" },
              { name: "Pierre Martin", email: "p.martin@email.com", emoji: "👨", bg: "#60a5fa" },
              { name: "Sophie Bernard", email: "sophie.b@email.com", emoji: "👩", bg: "#a78bfa" },
              { name: "Luc Mercier", email: "luc.m@email.com", emoji: "👨", bg: "#4ade80" },
            ].map((c, i) => (
              <View key={i} style={styles.contactItem}>
                <View style={[styles.contactIcon, { backgroundColor: c.bg }]}>
                  <Text style={styles.contactEmoji}>{c.emoji}</Text>
                </View>
                <Text>{c.name} - {c.email}</Text>
              </View>
            ))}
          </View>

          {/* INFORMATIONS UTILES */}
          <View style={styles.sidebarCard}>
            <Text style={styles.sidebarTitle}>Informations utiles</Text>

            {[
              {
                title: "Les transferts internes sont instantanés.",
                sub: "Entre vos comptes BankApp",
              },
              {
                title: "Gérez facilement vos portefeuilles.",
                sub: "Toutes vos cartes BankApp",
              },
              {
                title: "Vos paiements sécurisés.",
                sub: "Cartes BankApp protégées",
              },
            ].map((info, index) => (
              <View key={index} style={styles.infoItem}>
                <View style={styles.infoBullet}></View>
                <View>
                  <Text style={styles.infoTitle}>{info.title}</Text>
                  <Text style={styles.infoSub}>{info.sub}</Text>
                </View>
              </View>
            ))}

          </View>
        </View>
      </View>
      <MobileNav />
    </View>
  );
}

// ------------------- STYLES -------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f5f9",
    padding: 20,
  },
  header: {
    marginBottom: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#222",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginTop: 4,
  },

  main: {
    gap: 20,
  },

  /* FORMULAIRE */
  formCard: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 16,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },

  tabsWrapper: {
    flexDirection: "row",
    backgroundColor: "#e5e7eb",
    borderRadius: 12,
    padding: 4,
    marginBottom: 20,
  },

  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "#d1d5db",
  },
  activeTab: {
    backgroundColor: "white",
  },
  tabText: {
    fontWeight: "600",
  },

  formTitle: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 4,
  },
  formSubtitle: {
    fontSize: 12,
    color: "#888",
    marginBottom: 20,
  },

  field: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    backgroundColor: "#fafafa",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },

  sendBtn: {
    marginTop: 10,
    backgroundColor: "#3b82f6",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
  },
  sendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },

  /* SIDEBAR */
  sidebarWrapper: {
    gap: 20,
  },

  sidebarCard: {
    backgroundColor: "white",
    padding: 16,
    borderRadius: 14,
    shadowColor: "#aaa",
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  sidebarTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },

  contactItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 8,
  },
  contactIcon: {
    width: 36,
    height: 36,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  contactEmoji: { fontSize: 18 },

  infoItem: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  infoBullet: {
    width: 10,
    height: 10,
    backgroundColor: "#3b82f6",
    borderRadius: 10,
    marginTop: 6,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
  },
  infoSub: {
    fontSize: 12,
    color: "#666",
  },
});
