import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';

const Header = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {/* Logo on the left */}
            <TouchableOpacity  onPress={() => navigation.navigate('HomeScreen')}>
                <Image
                    source={require("../../../assets/images/logo.png")} // Replace with your logo URL
                    style={styles.logo}
                />
            </TouchableOpacity>

            {/* Icons on the right */}
            <View style={styles.iconsContainer}>
                <TouchableOpacity style={styles.menuContainer}>
                    <FontAwesome name="search" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuContainer} >
                    <FontAwesome name="user-circle" style={styles.icon} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.menuContainer} onPress={()=> navigation.navigate('CartScreen')}>
                    <FontAwesome name="shopping-cart" style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between", // Aligns logo to the left, icons to the right
        alignItems: "center", // Vertically center everything
        paddingHorizontal: 20,
        paddingVertical: 25,
        backgroundColor: "#ffffff"
    },
    iconsContainer: {
        flexDirection: "row",
    },
    menuContainer: {
        marginLeft: 10,
    },
    icon: {
        fontSize: 20,
        color: "#17588e",
    },
    logo: {
        // Adjust these values according to your logo's size
        width: 100,
        height: 100,
        resizeMode: 'contain',// This ensures your logo scales properly
    },
});
export default Header;
