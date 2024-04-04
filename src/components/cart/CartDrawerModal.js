// CartDrawerModal.js
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from 'react-native';

const CartDrawerModal = ({ visible, itemDetail, onClose, onGoToCart }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.cartDrawer}>
            <View style={styles.cartDrawerHandle} >
            <Text>Item added to your cart</Text>
            <Image
              source={itemDetail?.image_url}
              style={styles.cartImage}
            />
            <Text style={styles.cartTitle}>{itemDetail?.title}</Text>
            <TouchableOpacity
              style={styles.viewCartButton}
              onPress={onGoToCart}
            >
              <Text style={styles.viewCartButtonText}>View cart (5)</Text> {/* Update cart quantity dynamically */}
            </TouchableOpacity>
            <TouchableOpacity
              onPress={onClose}
            >
              <Text>Continue shopping</Text>
                          </TouchableOpacity>
                          </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  cartDrawer: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  cartDrawerHandle: {
    width: 40,
    height: 4,
    backgroundColor: '#ccc',
    borderRadius: 2,
    marginBottom: 10,
  },
  cartImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  cartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  viewCartButton: {
    backgroundColor: '#17588e',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    width: '100%',
  },
  viewCartButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "white",
  },
});

export default CartDrawerModal;
