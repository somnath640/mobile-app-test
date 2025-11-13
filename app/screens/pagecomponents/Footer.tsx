import React from 'react';
import { Text, View } from 'react-native';
import styles from '../../styles';

const Footer: React.FC = () => (
    <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={styles.footerPrimary}>© 2025 Lupin Pharmaceuticals</Text>
        <Text style={styles.footerSecondary}>Secure Field Force Management Platform</Text>
    </View>
);

export default Footer;