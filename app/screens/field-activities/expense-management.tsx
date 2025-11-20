// App.tsx
import ExpenseDetailsModal from "@/app/components/ExpenseDetailsModal";
import ExpenseFormModal from "@/app/components/ExpenseFormModal";
import { Ionicons } from "@expo/vector-icons";
import React, { JSX, useMemo, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
  useWindowDimensions
} from "react-native";

/* ---------- Types & Data ---------- */
type Expense = {
  id: string;
  title: string;
  amount: number;
  type: string;
  date: string;
  location: string;
  status: "Pending" | "Approved";
};

const EXPENSES_INIT: Expense[] = [
  { id: "1", title: "Clinic Visit", amount: 1250, type: "TA/DA", date: "Nov 1, 2025", location: "Pune City Clinic", status: "Approved" },
  { id: "2", title: "Next Station Call", amount: 1800, type: "Other", date: "Oct 31, 2025", location: "Thane", status: "Approved" },
  { id: "3", title: "Hospital Visit", amount: 1050, type: "TA/DA", date: "Nov 3, 2025", location: "Breach Candy Hospital", status: "Pending" },
  { id: "4", title: "Outstation Call", amount: 2500, type: "Other", date: "Nov 2, 2025", location: "Pune", status: "Pending" },
  { id: "5", title: "Pharmacy Visit", amount: 650, type: "TA/DA", date: "Oct 28, 2025", location: "Andheri Pharmacy", status: "Pending" },
];

/* ---------- Responsive helper ---------- */
function useResponsive() {
  const { width } = useWindowDimensions();

  const TABLET_BREAK = 768;
  const LAPTOP_BREAK = 1200;

  const isPhone = width < TABLET_BREAK;
  const isTablet = width >= TABLET_BREAK && width < LAPTOP_BREAK;
  const isLaptop = width >= LAPTOP_BREAK;

  let container = Math.min(width - 32, 1000);
  if (isTablet) container = Math.min(width - 64, 1400);
  if (isLaptop) container = Math.min(width - 160, 1800);

  return { width, container, isPhone, isTablet, isLaptop };
}

/* ---------- Local screenshot / decoration image ---------- */
// NOTE: the developer requested that we use the uploaded image file path as the local asset.
//const HEADER_DECOR = require('/mnt/data/9312f371-3a71-448b-ad5f-837b71c05114.png');

/* ---------- App ---------- */
export default function ExpenseManagement(): JSX.Element {
  const { container, isPhone } = useResponsive();

  // app state
  const [showModal, setShowModal] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedExpense, setSelectedExpense] = useState<Expense | undefined>(undefined);
  const [expenses] = useState<Expense[]>(EXPENSES_INIT);

  // tabs state: "pending" | "approved" | "all"
  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "all">("pending");

  // derived counts
  const pendingCount = useMemo(() => expenses.filter((x) => x.status === "Pending").length, [expenses]);
  const approvedCount = useMemo(() => expenses.filter((x) => x.status === "Approved").length, [expenses]);
  const allCount = expenses.length;

  // filtered list according to tab
  const visibleExpenses = useMemo(() => {
    if (activeTab === "pending") return expenses.filter((x) => x.status === "Pending");
    if (activeTab === "approved") return expenses.filter((x) => x.status === "Approved");
    return expenses;
  }, [activeTab, expenses]);

  // summary numbers (unchanged)
  const monthlyEligibility = 25000;
  const claimed = 18450;
  const pendingTotal = 3250;
  const remaining = monthlyEligibility - claimed - pendingTotal;
  const progress = Math.min(1, (claimed + pendingTotal) / monthlyEligibility);

  function handleAddExpenseClick() {
    setShowModal(true);
  }
  function handleClose() {
    setShowModal(false);
  }
  function handleSubmit(payload: any) {
    console.log("Submitted expense:", payload);
  }

  function openDetails(exp: Expense) {
    setSelectedExpense(exp);
    setDetailsOpen(true);
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#f6f7fb' }}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f7fb" />
      <ScrollView contentContainerStyle={{ paddingVertical: 22 }}>
        <View style={{ width: container, alignSelf: 'center', paddingHorizontal: 8 }}>
          {/* Header */}
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            <Text style={{ fontSize: 22, fontWeight: '800', color: '#0f172a' }}>Expense Management</Text>

            <Pressable onPress={handleAddExpenseClick} style={{ backgroundColor: '#0f172a', paddingHorizontal: 14, paddingVertical: 8, borderRadius: 10, flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="add" size={14} color="#fff" />
              <Text style={{ color: '#fff', fontWeight: '700' }}>Add Expense</Text>
            </Pressable>
          </View>

          {/* Eligibility Card (matches screenshot colors + icon) */}
          <View style={{ backgroundColor: '#fbf8ff', borderRadius: 14, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#efe9fb', overflow: 'hidden' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <View>
                <Text style={{ color: '#6b7280', fontSize: 13 }}>Monthly Eligibility - November 2025</Text>
                <Text style={{ fontSize: 30, fontWeight: '900', marginTop: 8 }}>₹{monthlyEligibility.toLocaleString()}</Text>
              </View>

            </View>

            {/* Progress track - large dark bar like screenshot */}
            <View style={{ marginTop: 14 }}>
              <View style={{ height: 12, backgroundColor: '#f1f2f6', borderRadius: 999, overflow: 'hidden' }}>
                <View style={{ width: `${Math.round(progress * 100)}%`, height: '100%', backgroundColor: '#0f172a' }} />
              </View>
            </View>

            {/* Summary row */}
            <View style={{ flexDirection: isPhone ? 'column' : 'row', marginTop: 14 }}>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#f1f5f9', marginRight: isPhone ? 0 : 8, marginBottom: isPhone ? 8 : 0 }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Claimed</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#059669', marginTop: 8 }}>₹{claimed.toLocaleString()}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#f1f5f9', marginRight: isPhone ? 0 : 8, marginBottom: isPhone ? 8 : 0 }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Pending</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#ef4444', marginTop: 8 }}>₹{pendingTotal.toLocaleString()}</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 14, borderRadius: 10, borderWidth: 1, borderColor: '#f1f5f9' }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Remaining</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', color: '#0ea5e9', marginTop: 8 }}>₹{remaining.toLocaleString()}</Text>
              </View>
            </View>
          </View>

          {/* Big green summary like screenshot (This Month's Expenses) */}
          <View style={{ backgroundColor: '#ecfdf5', borderRadius: 12, padding: 18, marginBottom: 16, borderWidth: 1, borderColor: '#d1fae5', position: 'relative' }}>
            {/* rupee mark on right */}
            <View style={{ position: 'absolute', right: 16, top: 16 }}>
              <Text style={{ fontSize: 28, color: '#059669', fontWeight: '900' }}>₹</Text>
            </View>

            <Text style={{ color: '#6b7280', fontSize: 13 }}>This Month's Expenses</Text>
            <Text style={{ fontSize: 28, fontWeight: '900', marginTop: 6 }}>₹18,450</Text>

            <View style={{ flexDirection: isPhone ? 'column' : 'row', marginTop: 18 }}>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ecfdf5', marginRight: isPhone ? 0 : 8 }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>TA/DA</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', marginTop: 8 }}>₹12,200</Text>
              </View>

              <View style={{ width: isPhone ? '100%' : 200, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#ecfdf5', marginTop: isPhone ? 12 : 0 }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Other</Text>
                <Text style={{ fontSize: 16, fontWeight: '800', marginTop: 8 }}>₹6,250</Text>
              </View>
            </View>
          </View>

          {/* Policy box */}
          <View style={{ backgroundColor: '#ecfeff', borderRadius: 12, padding: 14, marginBottom: 16, borderWidth: 1, borderColor: '#e6f6f8' }}>
            <Text style={{ fontWeight: '700', marginBottom: 8 }}>Expense Policy Guidelines</Text>
            <Text style={{ color: '#374151', lineHeight: 20 }}>
              • TA auto-calculated based on geographical zone{"\n"}
              • DA varies by station type: Local (₹450), Next Station (₹600), Outstation (₹750){"\n"}
              • Other expenses require prior approval for outstation/next-station calls
            </Text>
          </View>

          {/* Tabs - pill row (matches screenshot) */}
          <View style={{ flexDirection: 'row', backgroundColor: '#f3f4f6', borderRadius: 999, padding: 4, marginBottom: 16 }}>
            {/* Pending */}
            <Pressable
              onPress={() => setActiveTab('pending')}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: 'center',
                borderRadius: 999,
                backgroundColor: activeTab === 'pending' ? '#fff' : 'transparent',
                marginRight: 6,
              }}
            >
              <Text style={{ fontWeight: activeTab === 'pending' ? '800' : '600' }}>Pending ({pendingCount})</Text>
            </Pressable>

            {/* Approved (center pill in screenshot) */}
            <Pressable
              onPress={() => setActiveTab('approved')}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: 'center',
                borderRadius: 999,
                backgroundColor: activeTab === 'approved' ? '#fff' : 'transparent',
                marginHorizontal: 6,
              }}
            >
              <Text style={{ fontWeight: activeTab === 'approved' ? '800' : '600' }}>Approved ({approvedCount})</Text>
            </Pressable>

            {/* All */}
            <Pressable
              onPress={() => setActiveTab('all')}
              style={{
                flex: 1,
                paddingVertical: 10,
                alignItems: 'center',
                borderRadius: 999,
                backgroundColor: activeTab === 'all' ? '#fff' : 'transparent',
                marginLeft: 6,
              }}
            >
              <Text style={{ fontWeight: activeTab === 'all' ? '800' : '600' }}>All ({allCount})</Text>
            </Pressable>
          </View>

          {/* Expense list (filtered) */}
          <View style={{ gap: 12, marginBottom: 16 }}>
            {visibleExpenses.map((e) => (
              <View
                key={e.id}
                style={{
                  backgroundColor: '#fff',
                  borderRadius: 12,
                  padding: 12,
                  borderWidth: 1,
                  borderColor: '#eef2f7',
                  flexDirection: isPhone ? 'column' : 'row',
                  alignItems: 'flex-start',
                }}
              >
                <View style={{ width: isPhone ? '100%' : 96, marginBottom: isPhone ? 8 : 0 }}>
                  <Text style={{ fontWeight: '900', fontSize: 18 }}>₹{e.amount}</Text>
                  <View style={{ marginTop: 8, alignSelf: 'flex-start', paddingHorizontal: 8, paddingVertical: 6, borderRadius: 8, borderWidth: 1, borderColor: '#e6e6e6' }}>
                    <Text style={{ fontSize: 12 }}>{e.type}</Text>
                  </View>
                </View>

                <View style={{ flex: 1, paddingHorizontal: isPhone ? 0 : 12 }}>
                  <Text style={{ fontWeight: '800', fontSize: 15 }}>{e.title}</Text>
                  <Text style={{ color: '#6b7280', marginTop: 6 }}>{e.date} • {e.location}</Text>

                  <View style={{ marginTop: 12 }}>
                    <View style={{ height: 10, backgroundColor: '#f3f4f6', borderRadius: 6 }} />
                    <Pressable
                      onPress={() => openDetails(e)}
                      style={{
                        marginTop: 10,
                        alignSelf: 'stretch',
                        backgroundColor: '#f1f5f9',
                        borderRadius: 8,
                        paddingVertical: 10,
                        alignItems: 'center',
                        flexDirection: 'row',
                        justifyContent: 'center',
                        gap: 8,
                      }}
                    >
                      <Ionicons name="eye-outline" size={16} color="#0b1220" />
                      <Text style={{ fontWeight: '700' }}>View Details</Text>
                    </Pressable>
                  </View>
                </View>

                <View style={{ width: isPhone ? '100%' : 96, alignItems: 'flex-end', marginTop: isPhone ? 12 : 0 }}>
                  {/* approved badge or pending pill */}
                  {e.status === 'Approved' ? (
                    <View style={{ backgroundColor: '#ecfdf5', borderWidth: 1, borderColor: '#d1fae5', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999, flexDirection: 'row', alignItems: 'center' }}>
                      <Ionicons name="checkmark" size={12} color="#059669" style={{ marginRight: 6 }} />
                      <Text style={{ color: '#059669', fontWeight: '700', fontSize: 12 }}>Approved</Text>
                    </View>
                  ) : (
                    <View style={{ backgroundColor: '#fff', borderWidth: 1, borderColor: '#eef2f7', paddingHorizontal: 10, paddingVertical: 6, borderRadius: 999 }}>
                      <Text style={{ color: '#475569', fontWeight: '700', fontSize: 12 }}>{e.status}</Text>
                    </View>
                  )}
                </View>
              </View>
            ))}

            {visibleExpenses.length === 0 && (
              <View style={{ padding: 20, alignItems: 'center', borderRadius: 8, backgroundColor: '#fff', borderWidth: 1, borderColor: '#eef2f7' }}>
                <Text style={{ color: '#6b7280' }}>No expenses in this tab.</Text>
              </View>
            )}
          </View>

          {/* Stats card (unchanged) */}
          <View style={{ backgroundColor: '#eaf6ff', borderRadius: 12, padding: 14, marginBottom: 40, borderWidth: 1, borderColor: '#dbeffd' }}>
            <Text style={{ fontWeight: '700', marginBottom: 12 }}>November 2025 Statistics</Text>

            <View style={{ flexDirection: isPhone ? 'column' : 'row', gap: 12 }}>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#f3f7fb', marginRight: isPhone ? 0 : 8 }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Total Expenses</Text>
                <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 8 }}>₹18,450</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#f3f7fb' }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Avg per Day</Text>
                <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 8 }}>₹842</Text>
              </View>
            </View>

            <View style={{ height: 12 }} />

            <View style={{ flexDirection: isPhone ? 'column' : 'row', gap: 12 }}>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#f3f7fb', marginRight: isPhone ? 0 : 8 }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>TA/DA Claims</Text>
                <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 8 }}>8</Text>
              </View>
              <View style={{ flex: 1, backgroundColor: '#fff', padding: 12, borderRadius: 8, borderWidth: 1, borderColor: '#f3f7fb' }}>
                <Text style={{ color: '#6b7280', fontSize: 12 }}>Other Expenses</Text>
                <Text style={{ fontWeight: '800', fontSize: 18, marginTop: 8 }}>4</Text>
              </View>
            </View>
          </View>

          <ExpenseFormModal visible={showModal} onClose={handleClose} onSubmit={handleSubmit} />
          <ExpenseDetailsModal
            visible={detailsOpen}
            onClose={() => setDetailsOpen(false)}
            expense={selectedExpense}
            onEdit={(exp) => { /* navigate to edit or open expense form */ }}
            onDelete={(exp) => { /* delete flow */ }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
