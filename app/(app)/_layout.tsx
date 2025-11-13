import { Ionicons } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function PagesLayout() {
  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        // Remove default left icon
        headerLeft: () => null,
        // Add a custom right button
        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="menu" size={24} color="black" />
          </Pressable>
        ),
        // Centered custom header title
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>CRM</Text>
            <Text style={styles.headerSubtitle}>Field Force Management</Text>
          </View>
        ),
        // Header styling
        headerStyle: {
          backgroundColor: 'green',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 4, // for Android shadow
        },
      })}
    >
    </Drawer>
  );
}

const styles = StyleSheet.create({
  headerTitleContainer: {
    alignItems:'flex-start',
  },
  headerTitleText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: 'white',
  },
});
