import React, { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import BottomNavigation from './components/BottomNavigation'
import AnalyticsReportsScreen from './screens/analytics-reports/AnalyticsReportsScreen'
import SampleTracking from './screens/field-activities/sample-tracking'
import HCPManagementScreen from './screens/hcp-tab-screen/HCPManagementScreen'
import RouteDashboardScreen from './screens/route-tab-screen/RouteDashboardScreen'

export default function BottomNavPage() {
  const [active, setActive] = useState<string>('home')

    return (
      <View style={styles.screen}>

        <View style={styles.content}>
          {active === 'home' ? (
            <SampleTracking />
          ) : active === 'AnalyticsReportsScreen' ? (
            <AnalyticsReportsScreen />
          )  : active == 'HCPManagementScreen' ? (
            <HCPManagementScreen />
          ) : active == 'RouteDashboardScreen' ? (<RouteDashboardScreen />)  : (
            <View style={{ alignItems: 'center', justifyContent: 'center', flex: 1 }}>
              <Text style={styles.h1}>{active.charAt(0).toUpperCase() + active.slice(1)}</Text>
              <Text style={styles.p}>Placeholder for the {active} screen</Text>
            </View>
          )}
        </View>
        <BottomNavigation onChange={(k) => setActive(k)} />
      </View>
    )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  h1: { fontSize: 18, fontWeight: '700', marginBottom: 8 },
  p: { color: '#6B7280' },
})
