// App.tsx
import LeaveDetailsModal, { LeaveDetail } from "@/app/components/LeaveDetailModal";
import LeaveModal from "@/app/components/LeaveModal";
import { Ionicons } from "@expo/vector-icons";
import React, { JSX, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

/* ---------- Types & Data ---------- */
type Leave = {
  id: string;
  type: string;
  date: string;
  days: string;
  status: "Pending" | "Approved";
};

const LEAVES: Leave[] = [
  { id: "1", type: "Casual Leave", date: "Nov 10, 2025", days: "1 day", status: "Pending" },
  { id: "2", type: "Sick Leave", date: "Oct 28 - Oct 29, 2025", days: "2 days", status: "Approved" },
  { id: "3", type: "Earned Leave", date: "Oct 15 - Oct 16, 2025", days: "2 days", status: "Approved" },
  { id: "4", type: "Compensatory Off", date: "Sept 25, 2025", days: "1 day", status: "Approved" },
];

/* ---------- Helpers ---------- */
function useResponsiveWidths() {
  const { width } = useWindowDimensions();
  const PHONE_MAX = 1000;
  const TABLET_MAX = 1400;
  const DESKTOP_MAX = 1800;

  const isTablet = width >= 768 && width < 1200;
  const isLaptop = width >= 1200;

  let container = Math.min(width - 32, PHONE_MAX);
  if (isTablet) container = Math.min(width - 64, TABLET_MAX);
  if (isLaptop) container = Math.min(width - 160, DESKTOP_MAX);

  return { width, container, isTablet, isLaptop };
}

/* ---------- App ---------- */
export default function LeaveAttendance(): JSX.Element {
  const { width, container, isTablet, isLaptop } = useResponsiveWidths();

  const checkIn = "08:45 AM";
  const leaveBalance = {
    casual: { used: 3, available: 12, total: 15 },
    sick: { used: 2, available: 8, total: 10 },
    earned: { used: 5, available: 15, total: 20 },
    comp: { used: 3, available: 2, total: 5 },
  };

  const twoColumnStats = isTablet || isLaptop;
  const twoColumnAttendance = isTablet || isLaptop;

  const [leaveModal, setLeaveModal] = useState(false);
  const [detailsModalVisible, setDetailsModalVisible] = useState(false);
  const [selectedLeave, setSelectedLeave] = useState<LeaveDetail | null>(null);

  // active tab
  const [tab, setTab] = useState<"Pending" | "Approved" | "All">("Pending");

  function openDetails(l: Leave) {
    // create LeaveDetail to match LeaveDetailsModal shape.
    const detail: LeaveDetail = {
      id: l.id,
      type: l.type,
      // when date is a range we pass from / to accordingly
      fromDate: l.date.includes("-") ? l.date.split("-")[0].trim() : l.date,
      toDate: l.date.includes("-") ? l.date.split("-")[1].trim() : l.date,
      totalDays: l.days.includes("day") ? Number(l.days.replace(/\D/g, "")) || 1 : 1,
      appliedOn: "Oct 27, 2025",
      reason: "Medical emergency - Fever and body ache",
      status: l.status === "Pending" ? "Pending" : "Approved",
      // include an approvedOn for approved leaves so modal displays it
      approvedOn: l.status === "Approved" ? "Oct 27, 2025" : undefined,
    };
    setSelectedLeave(detail);
    setDetailsModalVisible(true);
  }

  const visibleLeaves = LEAVES.filter((x) => (tab === "All" ? true : x.status === tab));

  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
        <View style={{ width: container, alignSelf: "center" }} className="px-2">
          <View className="flex-row justify-between items-center mb-4 px-1">
            <Text className="text-2xl font-extrabold text-slate-900">Leave & Attendance</Text>
            <Pressable onPress={() => setLeaveModal(true)} className="bg-slate-900 px-3 py-2 rounded-md flex-row items-center gap-2">
              <Text className="text-white font-semibold">+ Apply Leave</Text>
            </Pressable>
          </View>

          {/* Attendance card (kept same) */}
          <View className="bg-emerald-50 border border-emerald-100 rounded-xl p-4 mb-6 relative">
            <View className="mb-2">
              <Text className="font-semibold text-slate-800">Today's Attendance</Text>
              <Text className="text-slate-500 text-sm">Friday, November 7, 2025</Text>
            </View>

            <View style={{ flexDirection: twoColumnAttendance ? "row" : "column", gap: 16 }}>
              <View style={{ flex: 1 }} className="bg-white rounded-md p-3 border border-slate-100">
                <Text className="text-slate-500 text-xs">Check-in</Text>
                <Text className="text-lg font-extrabold text-emerald-600 mt-2">{checkIn}</Text>
              </View>

              <View style={{ width: twoColumnAttendance ? 160 : "100%" }} className="bg-white rounded-md p-3 border border-slate-100">
                <Text className="text-slate-500 text-xs">Status</Text>
                <View className="mt-2">
                  <View className="bg-emerald-600 px-2 py-1 rounded-full self-start">
                    <Text className="text-white font-semibold text-xs">On Time</Text>
                  </View>
                </View>
              </View>
            </View>

            <Pressable className="bg-white mt-4 rounded-md p-3 border border-slate-100 items-center">
              <Text className="font-semibold text-slate-700">Check Out</Text>
            </Pressable>

            <Text className="absolute right-4 top-4 text-2xl text-emerald-600">🗓️</Text>
          </View>

          {/* Leave Balance (kept same visuals) */}
          <View className="bg-white rounded-xl border border-slate-100 p-4 mb-6">
            <Text className="font-semibold mb-4">Leave Balance</Text>
            <LeaveBar label="Casual Leave" used={leaveBalance.casual.used} total={leaveBalance.casual.total} rightLabel={`${leaveBalance.casual.available} of ${leaveBalance.casual.total} available`} note={`${leaveBalance.casual.used} days used this year`} />
            <LeaveBar label="Sick Leave" used={leaveBalance.sick.used} total={leaveBalance.sick.total} rightLabel={`${leaveBalance.sick.available} of ${leaveBalance.sick.total} available`} note={`${leaveBalance.sick.used} days used this year`} />
            <LeaveBar label="Earned Leave" used={leaveBalance.earned.used} total={leaveBalance.earned.total} rightLabel={`${leaveBalance.earned.available} of ${leaveBalance.earned.total} available`} note={`${leaveBalance.earned.used} days used this year`} />
            <LeaveBar label="Compensatory Off" used={leaveBalance.comp.used} total={leaveBalance.comp.total} rightLabel={`${leaveBalance.comp.available} of ${leaveBalance.comp.total} available`} note={`${leaveBalance.comp.used} days used this year`} />
          </View>

          {/* Tabs: exact pill + selected state */}
          <View className="flex-row bg-slate-100 rounded-full p-1 mb-6">
            <Pressable
              onPress={() => setTab("Pending")}
              className={`flex-1 py-2 items-center rounded-full ${tab === "Pending" ? "bg-white" : ""}`}
              style={tab === "Pending" ? { elevation: 1 } : undefined}
            >
              <Text className={`${tab === "Pending" ? "font-semibold text-slate-900" : "text-slate-600"}`}>Pending (1)</Text>
            </Pressable>

            <Pressable
              onPress={() => setTab("Approved")}
              className={`flex-1 py-2 items-center rounded-full ${tab === "Approved" ? "bg-white" : ""}`}
              style={tab === "Approved" ? { elevation: 1 } : undefined}
            >
              <Text className={`${tab === "Approved" ? "font-semibold text-slate-900" : "text-slate-600"}`}>Approved (3)</Text>
            </Pressable>

            <Pressable
              onPress={() => setTab("All")}
              className={`flex-1 py-2 items-center rounded-full ${tab === "All" ? "bg-white" : ""}`}
              style={tab === "All" ? { elevation: 1 } : undefined}
            >
              <Text className={`${tab === "All" ? "font-semibold text-slate-900" : "text-slate-600"}`}>All (4)</Text>
            </Pressable>
          </View>

          {/* Leave list cards: Approved badge top-right matches screenshot */}
          <View className="space-y-4 mb-6">
            {visibleLeaves.map((l) => (
              <View key={l.id} className="bg-white rounded-xl border border-slate-100 p-4">
                {/* Approved badge top-right */}
                {l.status === "Approved" && (
                  <View style={{ position: "absolute", right: 12, top: 12 }}>
                    <View style={{ flexDirection: "row", alignItems: "center", backgroundColor: "#059669", paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, borderWidth: 1, borderColor: "#059669" }}>
                      <Ionicons name="checkmark-circle" size={16} color="#ffffff" />
                      <Text style={{ color: "#ffffff", fontWeight: "700", fontSize: 12, marginLeft: 8 }}>Approved</Text>
                    </View>
                  </View>
                )}

                <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start" }}>
                  <View>
                    <Text className="font-semibold">{l.type}</Text>
                    <Text className="text-slate-500 text-sm mt-2">{l.date}</Text>
                    <Text className="text-slate-500 text-sm mt-1">{l.days}</Text>
                  </View>

                  <View style={{ alignItems: "flex-end" }}>
                    {l.status === "Pending" && (
                      <View style={{ backgroundColor: "#f5f3ff", borderColor: "#efe9ff", borderWidth: 1, paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 }}>
                        <Text style={{ color: "#6b21a8", fontWeight: "700", fontSize: 12 }}>{l.status}</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View className="mt-4">
                  <View className="h-2 bg-slate-100 rounded-md" />
                  <Pressable onPress={() => openDetails(l)} className="mt-3 bg-slate-50 border border-slate-100 rounded-md py-2 items-center">
                    <Text className="font-semibold">👁  View Details</Text>
                  </Pressable>
                </View>
              </View>
            ))}
          </View>

          {/* bottom stats kept same */}
          <View className="bg-sky-50 border border-sky-100 rounded-xl p-4 mb-12">
            <Text className="font-semibold mb-4">This Month - November 2025</Text>

            <View style={{ flexDirection: twoColumnStats ? "row" : "column", gap: 12 }}>
              <StatBox title="Present Days" value="18" />
              <StatBox title="Attendance Rate" value="92%" />
            </View>

            <View style={{ height: 12 }} />

            <View style={{ flexDirection: twoColumnStats ? "row" : "column", gap: 12 }}>
              <StatBox title="On Time" value="16" />
              <StatBox title="Late Check-ins" value="2" highlight />
            </View>
          </View>
        </View>

        <LeaveModal
          visible={leaveModal}
          onClose={() => setLeaveModal(false)}
          onSubmit={(payload) => {
            console.log("Leave submitted:", payload);
            setLeaveModal(false);
          }}
        />

        <LeaveDetailsModal
          visible={detailsModalVisible}
          onClose={() => setDetailsModalVisible(false)}
          leave={selectedLeave}
          onCancel={(id) => {
            console.log("Cancel leave", id);
            setDetailsModalVisible(false);
          }}
          onEdit={(leave) => {
            console.log("Edit leave", leave);
            setDetailsModalVisible(false);
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

/* ---------- Small components ---------- */
function LeaveBar({ label, used, total, rightLabel, note }: { label: string; used: number; total: number; rightLabel: string; note: string; }) {
  const filled = Math.min(1, used / total);
  return (
    <View className="mb-4">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="font-medium">{label}</Text>
        <Text className="text-sm text-slate-600">{rightLabel}</Text>
      </View>

      <View className="h-2 bg-slate-100 rounded-full overflow-hidden">
        <View style={{ width: `${filled * 100}%` }} className="h-full bg-slate-900" />
      </View>

      <Text className="text-slate-500 text-xs mt-2">{note}</Text>
    </View>
  );
}

function StatBox({ title, value, highlight = false }: { title: string; value: string; highlight?: boolean }) {
  return (
    <View className="flex-1 bg-white rounded-md p-3 border border-slate-100 mb-3">
      <Text className="text-slate-500 text-xs">{title}</Text>
      <Text style={{ marginTop: 8, fontWeight: "800", fontSize: 18, color: highlight ? "#dc2626" : "#0f172a" }}>{value}</Text>
    </View>
  );
}
