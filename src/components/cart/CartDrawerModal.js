import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const CartDrawerModal = ({ visible, onClose, onViewCart, onCheckout }) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity style={styles.centeredView} onPress={onClose}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Item added to cart!</Text>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonViewCart]}
                        onPress={onViewCart}
                    >
                        <Text style={styles.textStyle}>View Cart</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonCheckout]}
                        onPress={onCheckout}
                    >
                        <Text style={styles.textStyle}>Checkout</Text>
                    </TouchableOpacity>
                </View>
            </TouchableOpacity>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: 'rgba(0, 0, 0, 0.4)', // Semi-transparent background
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginTop: 10,
        width: 120,
    },
    buttonViewCart: {
        backgroundColor: "#17588e",
    },
    buttonCheckout: {
        backgroundColor: "#3AA040",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        fontSize: 16,
    }
});

export default CartDrawerModal;
