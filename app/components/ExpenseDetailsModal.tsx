// ExpenseDetailsModal.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo } from "react";
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

type Expense = {
  id: string;
  title?: string;
  amount?: number;
  type?: string;
  date?: string;
  location?: string;
  doctor?: string;
  stationType?: string;
  zone?: string;
  status?: "Pending" | "Approved";
  allowances?: { TA?: number; DA?: number; Conveyance?: number };
  receiptUploaded?: boolean;
};

type Props = {
  visible: boolean;
  onClose: () => void;
  expense?: Expense;
  onEdit?: (expense?: Expense) => void;
  onDelete?: (expense?: Expense) => void;
};

// LOCAL HEADER IMAGE (user-uploaded). Keep this exact path.
const HEADER_IMAGE_URI = "/mnt/data/59d778fa-2b97-4ead-8d1a-fa8de274643c.png";

export default function ExpenseDetailsModal({
  visible,
  onClose,
  expense,
  onEdit,
  onDelete,
}: Props) {
  const screenW = Dimensions.get("window").width;
  const panelWidth = Math.min(520, Math.max(320, Math.floor(screenW * 0.54)));

  // fallback sample data when not provided
  const e = expense ?? {
    id: "EXP0001",
    title: "Clinic Visit",
    amount: 1250,
    type: "TA/DA",
    date: "Nov 1, 2025",
    location: "Pune City Clinic",
    doctor: "Dr. Rajesh Kumar",
    stationType: "Local Station",
    zone: "Zone A - Metropolitan",
    status: "Approved" as const,
    allowances: { TA: 400, Conveyance: 100, DA: 750 },
    receiptUploaded: true,
  };

  const TA = e.allowances?.TA ?? 0;
  const Conveyance = e.allowances?.Conveyance ?? 0;
  const DA = e.allowances?.DA ?? 0;
  const total = useMemo(() => TA + Conveyance + DA, [TA, Conveyance, DA]);

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* backdrop */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.center}>
        <View style={[styles.panel, { width: panelWidth }]}>
          {/* header */}
          <View style={styles.header}>
            <Image source={{ uri: HEADER_IMAGE_URI }} style={styles.headerImage} resizeMode="cover" />
            <View style={styles.headerTextBlock}>
              <Text style={styles.headerTitle}>Expense Details</Text>
              <Text style={styles.headerSub}>Expense ID: {e.id}</Text>
            </View>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Ionicons name="close" size={18} color="#475569" />
            </Pressable>
          </View>

          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator>
            {/* Approved banner (only show for approved) */}
            {e.status === "Approved" && (
              <View style={styles.approvedBanner}>
                <View style={styles.approvedRow}>
                  <View style={styles.approvedIconWrap}>
                    <Ionicons name="checkmark-circle" size={20} color="#059669" />
                  </View>
                  <Text style={styles.approvedTitle}>Approved & Processed</Text>
                </View>
                <Text style={styles.approvedNote}>
                  This expense has been approved and will be processed in the next payroll cycle.
                </Text>
              </View>
            )}

            {/* Basic Information card */}
            <View style={styles.infoCard}>
              <Text style={styles.cardTitle}>Basic Information</Text>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Date:</Text>
                <Text style={styles.infoVal}>{e.date}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Category:</Text>
                <View style={styles.badge}><Text style={styles.badgeText}>{e.type}</Text></View>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Type:</Text>
                <Text style={styles.infoVal}>{e.title}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Location:</Text>
                <Text style={styles.infoVal}>{e.location}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Doctor:</Text>
                <Text style={styles.infoVal}>{e.doctor}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Station Type:</Text>
                <Text style={styles.infoVal}>{e.stationType}</Text>
              </View>

              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Zone:</Text>
                <Text style={styles.infoVal}>{e.zone}</Text>
              </View>

              <View style={[styles.infoRow, { paddingTop: 12, borderTopWidth: 1, borderTopColor: "#eef2f7" }]}>
                <Text style={styles.infoLabel}>Status:</Text>
                <View style={[styles.statusPill, e.status === "Pending" ? styles.statusPending : styles.statusApproved]}>
                  <Text style={[styles.statusText, e.status === "Pending" ? styles.statusPendingText : styles.statusApprovedText]}>
                    {e.status}
                  </Text>
                </View>
              </View>
            </View>

            {/* Expense Breakdown */}
            <View style={styles.breakdownCard}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                <Ionicons name="cash-outline" size={18} color="#2563eb" style={{ marginRight: 8 }} />
                <Text style={styles.breakTitle}>Expense Breakdown</Text>
              </View>

              <View style={styles.breakRow}>
                <Text style={styles.breakLabel}>Travel Allowance (TA):</Text>
                <Text style={styles.breakVal}>₹{TA}</Text>
              </View>
              <View style={styles.breakRow}>
                <Text style={styles.breakLabel}>Conveyance:</Text>
                <Text style={styles.breakVal}>₹{Conveyance}</Text>
              </View>
              <View style={styles.breakRow}>
                <Text style={styles.breakLabel}>Daily Allowance (DA):</Text>
                <Text style={styles.breakVal}>₹{DA}</Text>
              </View>

              <View style={styles.breakTotalRow}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalVal}>₹{total}</Text>
              </View>

              <Text style={styles.basedOn}>Based on {e.zone?.split(" - ")[0] ?? "Zone"} and {e.stationType}</Text>
            </View>

            {/* Receipt section - HIDDEN for Approved */}
            {e.status !== "Approved" && (
              <View style={styles.receiptCard}>
                <Text style={styles.receiptLabel}>Receipt</Text>

                <View style={styles.receiptBox}>
                  {e.receiptUploaded ? (
                    <>
                      <Text style={styles.receiptUploaded}>Receipt uploaded ✓</Text>
                      <Pressable style={styles.viewReceiptBtn}>
                        <Text style={styles.viewReceiptText}>View Receipt</Text>
                      </Pressable>
                    </>
                  ) : (
                    <Text style={styles.receiptEmpty}>No receipt uploaded</Text>
                  )}
                </View>
              </View>
            )}

            {/* bottom actions - HIDDEN for Approved */}
            {e.status !== "Approved" && (
              <View style={styles.actionsRow}>
                <Pressable style={[styles.actionBtn, styles.editBtn]} onPress={() => onEdit?.(e)}>
                  <Ionicons name="create-outline" size={16} color="#0b1220" style={{ marginRight: 8 }} />
                  <Text style={styles.actionText}>Edit</Text>
                </Pressable>

                <Pressable style={[styles.actionBtn, styles.deleteBtn]} onPress={() => onDelete?.(e)}>
                  <Ionicons name="trash-outline" size={16} color="#fff" style={{ marginRight: 8 }} />
                  <Text style={[styles.actionText, { color: "#fff" }]}>Delete</Text>
                </Pressable>
              </View>
            )}

            <View style={{ height: 10 }} />
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
    maxHeight: "94%",
    backgroundColor: "#fff",
    borderRadius: 8,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.12, shadowRadius: 14, shadowOffset: { width: 0, height: 6 } },
      android: { elevation: 14 },
    }),
  },

  // header
  header: { paddingTop: 12, paddingBottom: 8, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: "#eceff3", position: "relative", backgroundColor: "#fff", flexDirection: "row", alignItems: "center" },
  headerImage: { position: "absolute", left: 0, right: 0, top: 0, height: 60, opacity: 0.04 },
  headerTextBlock: { flex: 1 },
  headerTitle: { fontSize: 15, fontWeight: "800", color: "#0b1220" },
  headerSub: { fontSize: 12, color: "#6b7280", marginTop: 4 },
  closeBtn: { padding: 6 },

  body: { padding: 14, paddingBottom: 22 },

  // APPROVED banner
  approvedBanner: {
    backgroundColor: "#ecfdf5",
    borderWidth: 1,
    borderColor: "#d1fae5",
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  approvedRow: { flexDirection: "row", alignItems: "center", marginBottom: 8 },
  approvedIconWrap: { marginRight: 8 },
  approvedTitle: { fontWeight: "800", color: "#059669", fontSize: 14 },
  approvedNote: { color: "#475569", fontSize: 13, lineHeight: 18 },

  // info card
  infoCard: { backgroundColor: "#fff", borderRadius: 8, padding: 12, borderWidth: 1, borderColor: "#eef2f7", marginBottom: 12 },
  cardTitle: { fontSize: 13, fontWeight: "700", marginBottom: 8 },

  infoRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingVertical: 6 },
  infoLabel: { color: "#6b7280", fontSize: 13 },
  infoVal: { color: "#0b1220", fontWeight: "700", fontSize: 13 },

  badge: { backgroundColor: "#f3f4f6", paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { color: "#475569", fontWeight: "700", fontSize: 12 },

  statusPill: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, alignSelf: "flex-end" },
  statusPending: { backgroundColor: "#fff", borderWidth: 1, borderColor: "#eef2f7" },
  statusApproved: { backgroundColor: "#ecfdf5", borderWidth: 1, borderColor: "#d1fae5" },
  statusText: { fontWeight: "700", fontSize: 12 },
  statusPendingText: { color: "#475569" },
  statusApprovedText: { color: "#059669" },

  // breakdown card
  breakdownCard: { backgroundColor: "#eef6ff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#dbeafe", marginBottom: 12 },
  breakTitle: { fontSize: 13, fontWeight: "700", color: "#2563eb" },

  breakRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 6 },
  breakLabel: { color: "#0b1220" },
  breakVal: { color: "#0b1220", fontWeight: "700" },

  breakTotalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderTopWidth: 1, borderTopColor: "#e6efff", marginTop: 8 },
  totalLabel: { fontWeight: "700", color: "#0b1220" },
  totalVal: { fontWeight: "800", color: "#059669" },

  basedOn: { fontSize: 11, color: "#6b7280", marginTop: 8 },

  // receipt
  receiptCard: { marginBottom: 12 },
  receiptLabel: { fontSize: 13, fontWeight: "700", marginBottom: 8 },
  receiptBox: { backgroundColor: "#fff", borderRadius: 8, borderWidth: 1, borderColor: "#eef2f7", padding: 12, minHeight: 80, alignItems: "center", justifyContent: "center" },
  receiptEmpty: { color: "#9ca3af" },
  receiptUploaded: { color: "#0b1220", marginBottom: 8 },

  viewReceiptBtn: { marginTop: 6, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eef2f7", paddingVertical: 8, paddingHorizontal: 10, borderRadius: 6 },
  viewReceiptText: { color: "#0b1220", fontWeight: "700" },

  // actions
  actionsRow: { flexDirection: "row", justifyContent: "space-between", gap: 8, marginTop: 6 },
  actionBtn: { flex: 1, flexDirection: "row", alignItems: "center", justifyContent: "center", paddingVertical: 12, borderRadius: 8, borderWidth: 1, borderColor: "#eef2f7", backgroundColor: "#fff" },
  actionText: { color: "#0b1220", fontWeight: "700" },
  editBtn: { backgroundColor: "#fff" },
  deleteBtn: { backgroundColor: "#e11d48", borderColor: "#e11d48" },
});
