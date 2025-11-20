// ExpenseFormModalPixelPerfect.tsx
import { Ionicons } from "@expo/vector-icons";
import React, { useMemo, useState } from "react";
import {
    Dimensions,
    Image,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from "react-native";
import ZoneRatesModal from "./ZoneRatesModal";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (payload: any) => void;
};

const HEADER_IMAGE_URI = "/mnt/data/9fe10ea2-5ebe-494e-8abb-50e2721ac695.png";

const EXPENSE_CATEGORIES = [
  { id: "tada", label: "TA/DA (Travel & Daily Allowance)" },
  { id: "other", label: "Other Expenses" },
];
const VISIT_TYPES = [
  { id: "hospital", label: "Hospital Visit - ₹150 conveyance", conveyance: 150 },
  { id: "clinic", label: "Clinic Visit - ₹100 conveyance", conveyance: 100 },
  { id: "pharmacy", label: "Pharmacy Visit - ₹100", conveyance: 100 },
  { id: "stokist", label: "Stokist Visit - ₹150", conveyance: 150 },
  { id: "chemist", label: "Chemist Visit - ₹100", conveyance: 100 },
];
const STATIONS = [
  { id: "local", label: "Local Station - ₹450 DA", da: 450 },
  { id: "out", label: "Out Station - ₹750 DA", da: 750 },
  { id: "next", label: "Next Station - ₹600 DA", da: 600 },
];
const ZONES = [
  { id: "zoneA", label: "Zone A - Metropolitan - ₹500 TA", ta: 500 },
  { id: "zoneB", label: "Zone B - Tier1 City - ₹400 TA", ta: 400 },
  { id: "zoneC", label: "Zone C - Tier2 City - ₹300 TA", ta: 300 },
  { id: "zoneD", label: "Zone D - Rural Areas - ₹250 TA", ta: 250 },
];

export default function ExpenseFormModalPixelPerfect({ visible, onClose, onSubmit }: Props) {
  // form state
  const [category, setCategory] = useState(EXPENSE_CATEGORIES[0].id);
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [visitType, setVisitType] = useState(VISIT_TYPES[0].id);
  const [station, setStation] = useState(STATIONS[0].id);
  const [zone, setZone] = useState(ZONES[0].id);
  const [doctorName, setDoctorName] = useState("");

  // dropdown flags
  const [catOpen, setCatOpen] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [stationOpen, setStationOpen] = useState(false);
  const [zoneOpen, setZoneOpen] = useState(false);
  const [zonesOpen, setZonesOpen] = useState(false);

  const selectedZone = ZONES.find((z) => z.id === zone)!;
  const selectedStation = STATIONS.find((s) => s.id === station)!;
  const selectedVisit = VISIT_TYPES.find((v) => v.id === visitType)!;

  const TA = selectedZone.ta;
  const DA = selectedStation.da;
  const Conveyance = selectedVisit.conveyance;
  const total = useMemo(() => TA + DA + Conveyance, [TA, DA, Conveyance]);

  function handleSubmit() {
    const payload = {
      category: EXPENSE_CATEGORIES.find((c) => c.id === category)?.label,
      date,
      location,
      visitType: selectedVisit.label,
      station: selectedStation.label,
      zone: selectedZone.label,
      doctorName,
      allowances: { TA, DA, Conveyance, total },
    };
    onSubmit?.(payload);
    onClose();
  }

  // width like screenshot — narrow, tall
  const screenW = Dimensions.get("window").width;
  const panelWidth = screenW < 560 ? Math.floor(screenW * 0.9) : 480;

  function closeAllDropdowns() {
    setCatOpen(false);
    setVisitOpen(false);
    setStationOpen(false);
    setZoneOpen(false);
  }

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      {/* backdrop */}
      <TouchableWithoutFeedback
        onPress={() => {
          // if any dropdown is open close them, otherwise close modal
          if (catOpen || visitOpen || stationOpen || zoneOpen) closeAllDropdowns();
          else onClose();
        }}
      >
        <View style={styles.backdrop} />
      </TouchableWithoutFeedback>

      <View style={styles.container}>
        <View style={[styles.panel, { width: panelWidth }]}>
          {/* Header: title + subtitle LEFT, close icon FAR RIGHT (per your screenshot) */}
          <View style={styles.header}>
            <Image source={{ uri: HEADER_IMAGE_URI }} style={styles.headerImage} resizeMode="cover" />

            {/* left block: title + subtitle */}
            <View style={styles.headerTextWrap}>
              <Text style={styles.title}>Add New Expense</Text>
              <Text style={styles.subtitle}>Select expense category and fill details</Text>
            </View>

            {/* far-right close icon */}
            <Pressable onPress={onClose} style={styles.closeBtnRight}>
              <Ionicons name="close" size={18} color="#475569" />
            </Pressable>
          </View>

          {/* Body - scrollable */}
          <ScrollView contentContainerStyle={styles.body} showsVerticalScrollIndicator>
            {/* Expense Category */}
            <Text style={[styles.label, catOpen ? styles.labelFocused : null]}>Expense Category *</Text>
            <Pressable
              style={[styles.field, styles.greyBg, catOpen ? styles.fieldFocused : null]}
              onPress={() => {
                setCatOpen((s) => !s);
                setVisitOpen(false);
                setStationOpen(false);
                setZoneOpen(false);
              }}
            >
              <Text style={styles.fieldText}>{EXPENSE_CATEGORIES.find((c) => c.id === category)?.label}</Text>
              <Ionicons name="chevron-down" size={18} color="#6b7280" />
            </Pressable>

            {catOpen && (
              <View style={styles.dropdown}>
                {EXPENSE_CATEGORIES.map((opt) => {
                  const isSel = opt.id === category;
                  return (
                    <Pressable
                      key={opt.id}
                      style={[styles.dropdownItem, isSel ? styles.dropdownItemSel : null]}
                      onPress={() => {
                        setCategory(opt.id);
                        setCatOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{opt.label}</Text>
                      {isSel && <Ionicons name="checkmark" size={16} color="#2563eb" />}
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* Date */}
            <Text style={styles.label}>Date *</Text>
            <TextInput
              placeholder="dd-mm-yyyy"
              placeholderTextColor="#9ca3af"
              value={date}
              onChangeText={setDate}
              style={[styles.input, styles.greyBg]}
            />

            {/* Location */}
            <Text style={styles.label}>Location *</Text>
            <TextInput
              placeholder="Visit location/City"
              placeholderTextColor="#9ca3af"
              value={location}
              onChangeText={setLocation}
              style={[styles.input, styles.greyBg]}
            />

            {/* Visit Type */}
            <Text style={[styles.label, visitOpen ? styles.labelFocused : null]}>Visit Type *</Text>
            <Pressable
              style={[styles.field, styles.greyBg, visitOpen ? styles.fieldFocused : null]}
              onPress={() => {
                setVisitOpen((s) => !s);
                setCatOpen(false);
                setStationOpen(false);
                setZoneOpen(false);
              }}
            >
              <Text style={styles.fieldText}>{selectedVisit.label}</Text>
              <Ionicons name="chevron-down" size={18} color="#6b7280" />
            </Pressable>
            {visitOpen && (
              <View style={styles.dropdown}>
                {VISIT_TYPES.map((v) => {
                  const isSel = v.id === visitType;
                  return (
                    <Pressable
                      key={v.id}
                      style={[styles.dropdownItem, isSel ? styles.dropdownItemSel : null]}
                      onPress={() => {
                        setVisitType(v.id);
                        setVisitOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{v.label}</Text>
                      {isSel && <Ionicons name="checkmark" size={16} color="#2563eb" />}
                    </Pressable>
                  );
                })}
              </View>
            )}
            <Text style={styles.smallNote}>Major hospitals & medical colleges</Text>

            {/* Station Type */}
            <Text style={[styles.label, stationOpen ? styles.labelFocused : null]}>Station Type *</Text>
            <Pressable
              style={[styles.field, styles.greyBg, stationOpen ? styles.fieldFocused : null]}
              onPress={() => {
                setStationOpen((s) => !s);
                setCatOpen(false);
                setVisitOpen(false);
                setZoneOpen(false);
              }}
            >
              <Text style={styles.fieldText}>{selectedStation.label}</Text>
              <Ionicons name="chevron-down" size={18} color="#6b7280" />
            </Pressable>
            {stationOpen && (
              <View style={styles.dropdown}>
                {STATIONS.map((s) => {
                  const isSel = s.id === station;
                  return (
                    <Pressable
                      key={s.id}
                      style={[styles.dropdownItem, isSel ? styles.dropdownItemSel : null]}
                      onPress={() => {
                        setStation(s.id);
                        setStationOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{s.label}</Text>
                      {isSel && <Ionicons name="checkmark" size={16} color="#2563eb" />}
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* Zone label + aligned View Zones */}
            <View style={styles.zoneLabelRow}>
              <Text style={[styles.label, zoneOpen ? styles.labelFocused : null]}>Geographical Zone *</Text>
              <Pressable onPress={() => setZonesOpen(true)} style={styles.viewZonesRow}>
                <Ionicons name="document-text-outline" size={16} color="#2563eb" style={{ marginRight: 6 }} />
                <Text style={styles.viewZonesText}>View Zones</Text>
              </Pressable>
            </View>

            {/* Zone field */}
            <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
              <Pressable
                style={[styles.field, styles.greyBg, { flex: 1 }, zoneOpen ? styles.fieldFocused : null]}
                onPress={() => {
                  setZoneOpen((s) => !s);
                  setCatOpen(false);
                  setVisitOpen(false);
                  setStationOpen(false);
                }}
              >
                <Text style={styles.fieldText}>{selectedZone.label}</Text>
                <Ionicons name="chevron-down" size={18} color="#6b7280" />
              </Pressable>
            </View>

            <Text style={styles.smallNote}>Mumbai, Delhi, Bangalore, Chennai - Major metro cities</Text>
            {zoneOpen && (
              <View style={styles.dropdown}>
                {ZONES.map((z) => {
                  const isSel = z.id === zone;
                  return (
                    <Pressable
                      key={z.id}
                      style={[styles.dropdownItem, isSel ? styles.dropdownItemSel : null]}
                      onPress={() => {
                        setZone(z.id);
                        setZoneOpen(false);
                      }}
                    >
                      <Text style={styles.dropdownText}>{z.label}</Text>
                      {isSel && <Ionicons name="checkmark" size={16} color="#2563eb" />}
                    </Pressable>
                  );
                })}
              </View>
            )}

            {/* Doctor Name */}
            <Text style={styles.label}>Doctor Name *</Text>
            <TextInput
              placeholder="Name of doctor covered"
              placeholderTextColor="#9ca3af"
              value={doctorName}
              onChangeText={setDoctorName}
              style={[styles.input, styles.greyBg]}
            />

            {/* allowance card */}
            <View style={styles.allowCard}>
              <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 6 }}>
                <Ionicons name="cash-outline" size={18} color="#2563eb" style={{ marginRight: 8 }} />
                <Text style={styles.allowTitle}>Auto-Calculated Allowances</Text>
              </View>

              <View style={styles.allowRow}>
                <Text style={styles.allowLabel}>Travel Allowance (TA):</Text>
                <Text style={styles.allowVal}>₹{TA}</Text>
              </View>
              <View style={styles.allowRow}>
                <Text style={styles.allowLabel}>Conveyance:</Text>
                <Text style={styles.allowVal}>₹{Conveyance}</Text>
              </View>
              <View style={styles.allowRow}>
                <Text style={styles.allowLabel}>Daily Allowance (DA):</Text>
                <Text style={styles.allowVal}>₹{DA}</Text>
              </View>
              <View style={styles.totalRow}>
                <Text style={styles.totalLabel}>Total Amount:</Text>
                <Text style={styles.totalVal}>₹{total}</Text>
              </View>
              <Text style={styles.basedOn}>Based on {selectedZone.label.split(" - ")[0]} and {selectedStation.label.split(" - ")[0]}</Text>
            </View>

            <Text style={[styles.label, { marginTop: 8 }]}>Upload Receipt</Text>
            <Pressable style={styles.upload}>
              <Ionicons name="cloud-upload-outline" size={22} color="#9ca3af" style={{ marginBottom: 8 }} />
              <Text style={styles.uploadText}>Click to upload receipt</Text>
            </Pressable>

            <Pressable style={styles.submit} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit Expense</Text>
            </Pressable>

            <View style={{ height: 20 }} />
          </ScrollView>
        </View>
      </View>
      <ZoneRatesModal visible={zonesOpen} onClose={() => setZonesOpen(false)} />;
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { position: "absolute", left: 0, right: 0, top: 0, bottom: 0, backgroundColor: "rgba(0,0,0,0.45)" },
  container: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 8 },
  panel: {
    maxHeight: "96%",
    backgroundColor: "#ffffff",
    borderRadius: 6,
    overflow: "hidden",
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOpacity: 0.16, shadowRadius: 20, shadowOffset: { width: 0, height: 8 } },
      android: { elevation: 16 },
    }),
  },

  // header: title left, subtitle left, close icon on far right
  header: {
    paddingTop: 14,
    paddingBottom: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#eceff3",
    position: "relative",
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerImage: { position: "absolute", left: 0, right: 0, top: 0, height: 60, opacity: 0.06 },

  // left text block
  headerTextWrap: {
    paddingRight: 12,
    flex: 1,
  },
  title: { fontSize: 16, fontWeight: "800", color: "#0b1220", marginBottom: 4 },
  subtitle: { fontSize: 12, color: "#6b7280" },

  // right close button
  closeBtnRight: { padding: 6 },

  // body
  body: { padding: 16, paddingBottom: 22 },

  label: { marginTop: 12, color: "#374151", fontWeight: "700", fontSize: 13 },
  labelFocused: { backgroundColor: "transparent", color: "#2563eb" },

  // NEW: zone label row - aligns label left and view zones right in same line
  zoneLabelRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },

  // input / field
  field: { marginTop: 8, backgroundColor: "#f3f4f6", paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#e6e9ef", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  fieldFocused: { borderColor: "#dbeafe" },
  fieldText: { color: "#0b1220", fontSize: 14 },
  chev: { color: "#6b7280", fontSize: 14 },
  input: { marginTop: 8, backgroundColor: "#f3f4f6", paddingVertical: 12, paddingHorizontal: 12, borderRadius: 8, borderWidth: 1, borderColor: "#e6e9ef", color: "#0b1220" },
  greyBg: { backgroundColor: "#f7f8f9" },

  smallNote: { fontSize: 11, color: "#9ca3af", marginTop: 6 },

  // view zones row (aligned, small, icon + text)
  viewZonesRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  viewZonesText: { color: "#2563eb", fontSize: 12 },

  // dropdown list
  dropdown: { marginTop: 6, borderRadius: 8, backgroundColor: "#fff", borderWidth: 1, borderColor: "#eef2f7", overflow: "hidden", ...Platform.select({ ios: { shadowColor: "#000", shadowOpacity: 0.06, shadowRadius: 6, shadowOffset: { width: 0, height: 3 } }, android: { elevation: 3 } }) },
  dropdownItem: { paddingVertical: 12, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: "#f3f4f6", flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  dropdownItemSel: { backgroundColor: "#fbfdff" },
  dropdownText: { color: "#0b1220", fontSize: 14 },
  check: { color: "#2563eb", fontWeight: "700" },

  // allowances card
  allowCard: { marginTop: 14, backgroundColor: "#eef6ff", padding: 12, borderRadius: 8, borderWidth: 1, borderColor: "#dbeafe" },
  allowTitle: { color: "#2563eb", fontWeight: "700", marginBottom: 8 },
  allowRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 4 },
  allowLabel: { color: "#0b1220" },
  allowVal: { color: "#0b1220", fontWeight: "700" },
  totalRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 8, borderTopWidth: 1, borderTopColor: "#e6efff", marginTop: 8 },
  totalLabel: { fontWeight: "700", color: "#0b1220" },
  totalVal: { fontWeight: "800", color: "rgba(0, 0, 255, 1.00)" },
  basedOn: { fontSize: 11, color: "#6b7280", marginTop: 6 },

  // upload
  upload: { marginTop: 8, height: 96, borderRadius: 8, borderWidth: 1, borderStyle: "dashed", borderColor: "#e6e6e6", alignItems: "center", justifyContent: "center", backgroundColor: "#fff" },
  uploadText: { color: "#6b7280" },

  // submit
  submit: { marginTop: 16, backgroundColor: "#0b1220", paddingVertical: 12, borderRadius: 8, alignItems: "center" },
  submitText: { color: "#fff", fontWeight: "800" },
});
