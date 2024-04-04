import React from 'react';
import { View, StyleSheet, SafeAreaView, ScrollView, Text } from 'react-native';
import Header from '../layout/Header';
import Footer from '../layout/Footer';


const RefundPolicy = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
          
                <Header />
                <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
                    <View style={styles.container}>
                        <Text style={styles.header}>Refund policy</Text>
                        <Text style={styles.content}>
                            Due to the nature of the items we cannot receive returns.
                        </Text>
                    </View>
                </ScrollView>
                <Footer />
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#ffffff', // or your preferred background color
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
         // or any color that matches your theme
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
    },
    scrollView: {
        flex: 1, // Take up all space between header and footer
    },
    scrollContent: {
        paddingVertical: 20, // Or any other padding you prefer
    },
});

export default RefundPolicy;
