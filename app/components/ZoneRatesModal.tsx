// ZoneRatesModal.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableWithoutFeedback,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
};

const HEADER_IMAGE_URI = "/mnt/data/557f8785-4cd0-4e99-a4ac-29c63b4450eb.png";

const ZONES = [
  {
    id: "A",
    title: "Zone A - Metropolitan",
    taLabel: "₹500 TA",
    desc: "Mumbai, Delhi, Bangalore, Chennai - Major metro cities",
    tagLabel: "Zone A",
    tagColor: "#f3e8ff", // pale purple bg
    tagText: "#7c3aed",
  },
  {
    id: "B",
    title: "Zone B - Tier 1 Cities",
    taLabel: "₹400 TA",
    desc: "Pune, Hyderabad, Kolkata, Ahmedabad",
    tagLabel: "Zone B",
    tagColor: "#eef2ff", // pale blue
    tagText: "#2563eb",
  },
  {
    id: "C",
    title: "Zone C - Tier 2 Cities",
    taLabel: "₹300 TA",
    desc: "Nagpur, Indore, Lucknow, Jaipur",
    tagLabel: "Zone C",
    tagColor: "#eefcf3", // pale green
    tagText: "#059669",
  },
  {
    id: "D",
    title: "Zone D - Rural Areas",
    taLabel: "₹250 TA",
    desc: "Rural and semi-urban territories",
    tagLabel: "Zone D",
    tagColor: "#fff7ed", // pale amber
    tagText: "#c2410c",
  },
];

export default function ZoneRatesModal({ visible, onClose }: Props) {
  const screenW = Dimensions.get("window").width;
  const panelWidth = Math.min(600, Math.max(320, Math.floor(screenW * 0.86)));

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.center}>
        <View style={[styles.panel, { width: panelWidth }]}>
          {/* header */}
          <View style={styles.header}>
            <Image source={{ uri: HEADER_IMAGE_URI }} style={styles.headerImage} resizeMode="cover" />
            <Text style={styles.headerTitle}>Geographical Zones & TA Rates</Text>
            <Text style={styles.headerSub}>Backend TA ranges based on territory classification</Text>
            <Pressable onPress={onClose} style={styles.headerClose}>
              <Ionicons name="close" size={18} color="#475569" />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator>
            {/* zone cards */}
            {ZONES.map((z) => (
              <View key={z.id} style={styles.zoneCard}>
                <View style={styles.zoneTopRow}>
                  <Text style={styles.zoneTitle}>{z.title}</Text>
                  <View style={styles.taBadge}>
                    <Text style={styles.taBadgeText}>{z.taLabel}</Text>
                  </View>
                </View>

                <Text style={styles.zoneDesc}>{z.desc}</Text>

                <View style={styles.zoneFooter}>
                  <View style={[styles.zoneTag, { backgroundColor: z.tagColor }]}>
                    <Text style={[styles.zoneTagText, { color: z.tagText }]}>{z.tagLabel}</Text>
                  </View>
                </View>
              </View>
            ))}

            {/* DA Rates card */}
            <View style={styles.daCard}>
              <Text style={styles.daTitle}>DA Rates by Station Type</Text>
              <View style={styles.daRow}><Text style={styles.daLabel}>Local Station:</Text><Text style={styles.daValue}>₹450</Text></View>
              <View style={styles.daRow}><Text style={styles.daLabel}>Outstation:</Text><Text style={styles.daValue}>₹750</Text></View>
              <View style={styles.daRow}><Text style={styles.daLabel}>Next Station:</Text><Text style={styles.daValue}>₹600</Text></View>
            </View>

            <View style={{ height: 12 }} />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" },
  center: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 12 },
  panel: {
    maxHeight: "92%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 18, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 16 },
    }),
  },

  // header
  header: { paddingTop: 14, paddingBottom: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#eef2f7", position: "relative", backgroundColor: "#fff" },
  headerImage: { position: "absolute", left: 0, right: 0, top: 0, height: 60, opacity: 0.04 },
  headerTitle: { fontSize: 16, fontWeight: "800", color: "#0b1220", marginBottom: 6 },
  headerSub: { fontSize: 12, color: "#6b7280" },
  headerClose: { position: "absolute", right: 12, top: 12, padding: 6 },

  // body
  body: { padding: 14, paddingBottom: 20 },

  // zone card
  zoneCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    borderWidth: 1,
    borderColor: "#eef6ff",
    marginBottom: 12,
    // subtle shadow for card lift
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.04, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } },
      android: { elevation: 2 },
    }),
  },
  zoneTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 8 },
  zoneTitle: { fontSize: 14, fontWeight: "700", color: "#0b1220" },
  taBadge: { backgroundColor: "#2563eb", paddingVertical: 6, paddingHorizontal: 10, borderRadius: 16 },
  taBadgeText: { color: "#fff", fontWeight: "700", fontSize: 12 },

  zoneDesc: { fontSize: 12, color: "#6b7280", marginBottom: 10 },

  zoneFooter: { flexDirection: "row", alignItems: "center" },
  zoneTag: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: "flex-start" },
  zoneTagText: { fontSize: 12, fontWeight: "700" },

  // DA card
  daCard: {
    marginTop: 6,
    backgroundColor: "#eef6ff",
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#dbeafe",
  },
  daTitle: { fontSize: 13, fontWeight: "700", color: "#2563eb", marginBottom: 8 },
  daRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6, alignItems: "center" },
  daLabel: { color: "#0b1220" },
  daValue: { color: "#0b1220", fontWeight: "700" },
});
