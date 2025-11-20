// app/components/LeaveModal.tsx
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import React, { useState } from "react";
import {
    KeyboardAvoidingView,
    Modal,
    Platform,
    SafeAreaView,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit?: (payload: any) => void;
};

export default function LeaveModal({ visible, onClose, onSubmit }: Props) {
  const [leaveType, setLeaveType] = useState<string>("");
  const [fromDate, setFromDate] = useState<string>("");
  const [toDate, setToDate] = useState<string>("");
  const [reason, setReason] = useState<string>("");

  function handleSubmit() {
    const payload = { leaveType, fromDate, toDate, reason };
    onSubmit?.(payload);
    onClose();
  }

  return (
    <Modal visible={visible} animationType="fade" transparent onRequestClose={onClose}>
      <View className="flex-1 bg-black/50 justify-center items-center px-4">
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ width: "100%", alignItems: "center" }}
        >
          <SafeAreaView style={{ width: "100%", alignItems: "center" }}>
            <View
              className="w-full"
              style={{
                maxWidth: 520,
                backgroundColor: "#ffffff",
                borderRadius: 12,
                overflow: "hidden",
                // matching soft shadow like screenshot
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 10 },
                shadowOpacity: 0.08,
                shadowRadius: 30,
                elevation: 12,
              }}
            >
              {/* Header */}
              <View
                className="px-6 py-5 flex-row justify-between items-start"
                style={{ borderBottomWidth: 1, borderBottomColor: "#f1f5f9" }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontSize: 17, fontWeight: "600", color: "#0f172a" }}>
                    Apply for Leave
                  </Text>
                  <Text style={{ fontSize: 12, color: "#64748b", marginTop: 4 }}>
                    Submit leave request for manager approval
                  </Text>
                </View>

                <TouchableOpacity
                  onPress={onClose}
                  className="ml-4"
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 8,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "transparent",
                  }}
                >
                  <Ionicons name="close" size={20} color="#94a3b8" />
                </TouchableOpacity>
              </View>

              <ScrollView contentContainerStyle={{ padding: 20 }}>
                {/* Leave Type */}
                <Text style={{ color: "#475569", fontSize: 13, marginBottom: 8 }}>Leave Type *</Text>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#eef2ff" /* subtle border like screenshot */,
                    borderRadius: 8,
                    overflow: "hidden",
                    marginBottom: 16,
                    backgroundColor: "#ffffff",
                  }}
                >
                  <Picker
                    selectedValue={leaveType}
                    onValueChange={(v) => setLeaveType(v)}
                    style={{ height: 46 }}
                    itemStyle={{ color: "#0f172a" }}
                  >
                    <Picker.Item label="Select leave type" value="" />
                    <Picker.Item label="Casual Leave" value="casual" />
                    <Picker.Item label="Sick Leave" value="sick" />
                    <Picker.Item label="Earned Leave" value="earned" />
                    <Picker.Item label="Compensatory Off" value="comp" />
                    <Picker.Item label="Maternaty" value="comp" />
                    <Picker.Item label="Paternaty" value="comp" />
                  </Picker>
                </View>

                {/* Dates row */}
                <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 12, marginBottom: 16 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>From Date *</Text>
                    <TextInput
                      value={fromDate}
                      onChangeText={setFromDate}
                      placeholder="dd-mm-yyyy"
                      placeholderTextColor="#94a3b8"
                      style={{
                        borderWidth: 1,
                        borderColor: "#eef2ff",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: "#0f172a",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  </View>

                  <View style={{ width: 12 }} />

                  <View style={{ flex: 1 }}>
                    <Text style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>To Date *</Text>
                    <TextInput
                      value={toDate}
                      onChangeText={setToDate}
                      placeholder="dd-mm-yyyy"
                      placeholderTextColor="#94a3b8"
                      style={{
                        borderWidth: 1,
                        borderColor: "#eef2ff",
                        borderRadius: 8,
                        paddingHorizontal: 12,
                        paddingVertical: 10,
                        color: "#0f172a",
                        backgroundColor: "#ffffff",
                      }}
                    />
                  </View>
                </View>

                {/* Reason */}
                <Text style={{ color: "#475569", fontSize: 13, marginBottom: 6 }}>Reason *</Text>
                <TextInput
                  value={reason}
                  onChangeText={setReason}
                  placeholder="Enter detailed reason for leave…"
                  placeholderTextColor="#94a3b8"
                  multiline
                  numberOfLines={4}
                  style={{
                    borderWidth: 1,
                    borderColor: "#eef2ff",
                    borderRadius: 8,
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    marginBottom: 16,
                    minHeight: 96,
                    textAlignVertical: "top",
                    color: "#0f172a",
                    backgroundColor: "#ffffff",
                  }}
                />

                {/* Important box (amber) */}
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: "#f6e7c6",
                    backgroundColor: "#fef6ec",
                    borderRadius: 8,
                    padding: 14,
                    marginBottom: 20,
                  }}
                >
                  <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 8 }}>
                    <Ionicons name="alert-circle" size={18} color="#f59e0b" />
                    <Text style={{ marginLeft: 8, fontWeight: "600", color: "#334155" }}>Important:</Text>
                  </View>

                  <View style={{ paddingLeft: 6 }}>
                    <Text style={{ color: "#475569", fontSize: 12, marginBottom: 6 }}>
                      • Apply at least 3 days in advance for planned leaves
                    </Text>
                    <Text style={{ color: "#475569", fontSize: 12, marginBottom: 6 }}>
                      • Sick leaves require medical certificate for &gt;2 days
                    </Text>
                    <Text style={{ color: "#475569", fontSize: 12 }}>
                      • Your request will be sent to your reporting manager
                    </Text>
                  </View>
                </View>

                {/* Submit button */}
                <TouchableOpacity
                  onPress={handleSubmit}
                  activeOpacity={0.9}
                  style={{
                    borderRadius: 10,
                    paddingVertical: 14,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#09051a",
                    // full-width look
                    alignSelf: "stretch",
                    // small shadow to match screenshot button depth
                    shadowColor: "#0b1020",
                    shadowOffset: { width: 0, height: 6 },
                    shadowOpacity: 0.18,
                    shadowRadius: 16,
                    elevation: 6,
                  }}
                >
                  <Text style={{ color: "#fff", fontWeight: "700", fontSize: 15 }}>
                    Submit Leave Request
                  </Text>
                </TouchableOpacity>
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}
