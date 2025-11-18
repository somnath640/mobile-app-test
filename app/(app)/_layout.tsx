import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Drawer } from 'expo-router/drawer';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import COLORS from '../services/LupinColors';

export default function PagesLayout() {
  return (
    <Drawer
      screenOptions={({ navigation }) => ({
        drawerPosition: 'right',
        // Left logo
        headerLeft: () => (
          <View style={{ marginLeft: 12 }}>
            <View style={styles.logoWrap}>
              <Image source={require('../../assets/images/logo-lu.png')} style={styles.logoImage} resizeMode="contain" />
            </View>
          </View>
        ),
        // Add a custom right button (hamburger)
        headerRight: () => (
          <Pressable
            onPress={() => navigation.toggleDrawer()}
            style={{ marginRight: 15 }}
          >
            <Ionicons name="menu" size={24} color={COLORS.utility.white} />
          </Pressable>
        ),
        // Centered custom header title
        headerTitle: () => (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitleText}>LUPIN CRM</Text>
            <Text style={styles.headerSubtitle}>Field Force Management</Text>
          </View>
        ),
        // Header background (gradient)
        headerStyle: {
          backgroundColor: 'transparent',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.12,
          shadowRadius: 2,
          elevation: 4, // for Android shadow
        },
        headerBackground: () => (
          <LinearGradient
            colors={COLORS.gradients.lupinGreen as [string, string]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ flex: 1 }}
          />
        ),
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
  logoWrap: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoImage: { width: 28, height: 28, borderRadius: 14 },
});
