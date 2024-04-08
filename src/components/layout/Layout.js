import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import React from 'react';
import Footer from './Footer';
import { StatusBar } from 'expo-status-bar';

const Layout = ({ children }) => {
    return (
        <>
            <StatusBar style="auto" />
            <SafeAreaView style={styles.container}>
                <View style={styles.content}>
                    {children}
                </View>
                <Footer style={styles.footer} />
            </SafeAreaView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1, // Ensures that the SafeAreaView takes up the full screen
        justifyContent: 'space-between',
        backgroundColor: "#ffffff", // This will place the footer at the bottom and content at the top
    },
    content: {
        flex: 1, // This ensures that the content area takes up all available space above the footer
    },
    footer: {
        width: "100%",
        borderTopWidth: 1,
        borderColor: "#ffffff",
        flex: 1,
    }
})

export default Layout;
