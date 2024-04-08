import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, TextInput } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import { productsData } from '../services/products';
import CartDrawerModal from '../components/cart/CartDrawerModal';
import { useNavigation } from '@react-navigation/native';

const ItemDetail = ({ route }) => {
  const [itemDetail, setItemDetail] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);
  const [cartModalVisible, setCartModalVisible] = useState(false);
  const navigation = useNavigation();

  const openCartDrawer = async () => {
    try {
      const existingCartJSON = await AsyncStorage.getItem('cart');
      const existingCart = existingCartJSON ? JSON.parse(existingCartJSON) : [];
      const index = existingCart.findIndex(item => item.id === itemDetail.id);

      if (index !== -1) {
        existingCart[index].quantity += quantity; // Update quantity
      } else {
        existingCart.push({ ...itemDetail, quantity }); // Add new item
      }

      await AsyncStorage.setItem('cart', JSON.stringify(existingCart));
      setCartModalVisible(true); // Assuming this controls a confirmation modal
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const onQuantityChange = (newQuantity) => {
    const num = parseInt(newQuantity, 10);
    if (!isNaN(num) && num > 0) {
      setQuantity(num);
    } else {
      setQuantity(1);
    }
  };
  //find item details
  useEffect(() => {
    const { params } = route;
    const getItem = productsData.find((p) => {
      return p.id === params?.id
    })
    setItemDetail(getItem);
  }, [route]);
  return (
    <>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(true)}>
          <Image source={itemDetail?.image_url} // Replace with your image path
            style={styles.image} />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{itemDetail?.title}</Text>
          <Text style={styles.price}>${itemDetail?.price}</Text>

          <View style={styles.quantityContainer}>
            <TouchableOpacity onPress={() => onQuantityChange(quantity - 1)}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableOpacity>
            <TextInput
              style={styles.quantityInput}
              keyboardType='numeric'
              onChangeText={onQuantityChange}
              value={quantity.toString()}
            />
            <TouchableOpacity onPress={() => onQuantityChange(quantity + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addToCartButton} disabled={itemDetail?.quantity <= 0}
            onPress={() => openCartDrawer()}
          >
            <Text style={styles.addToCartButtonText}>{itemDetail?.quantity > 0 ? "Add to cart" : "Out Of Stock"}</Text>
          </TouchableOpacity>

          <Text style={styles.consistsTitle}>Consists of</Text>
          {/* Map your contents here */}

          {itemDetail?.contents?.map((content, index) => (
            <Text key={index} style={styles.contentItem}>• {content}</Text>
          ))}
          {/* ... other items */}
        </View>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.centeredView}>
              <TouchableWithoutFeedback>
                <View style={styles.modalView}>
                  <Image
                    source={itemDetail?.image_url} // Use the itemDetail image URL
                    style={styles.modalImage}
                  />
                </View>
              </TouchableWithoutFeedback>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      </ScrollView>
      <CartDrawerModal
        visible={cartModalVisible}
        onClose={() => setCartModalVisible(false)}
        onViewCart={() => {
          // Logic to navigate to the cart
          setCartModalVisible(false);
          navigation.navigate('CartScreen'); // Adjust this to your cart screen route name
        }}
        onCheckout={() => {
          // Logic to navigate to the checkout screen
          setCartModalVisible(false);
          navigation.navigate('CheckoutScreen'); // Adjust this to your checkout screen route name
        }}
      />

      <Footer />
    </>



  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  imageContainer: {
    alignItems: 'center',
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: 300,
    resizeMode: 'contain',
  },
  detailsContainer: {
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 22,
    color: 'green',
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#17588e',
    color: "white",
  },
  quantityInput: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginHorizontal: 10,
    width: 40,
    textAlign: 'center',
    color: "black"
  },
  addToCartButton: {
    backgroundColor: '#17588e',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
    borderRadius: 15
  },
  addToCartButtonText: {
    fontWeight: 'bold',
    color: "white"
  },
  consistsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  contentItem: {
    fontSize: 16,
    lineHeight: 24,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Dimmed background
  },
  modalView: {
    width: '80%', // Take up 80% of screen width
    height: '80%', // Take up 80% of screen height
    backgroundColor: 'transparent',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center', // Center children vertically
    shadowColor: '#ffffff',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2,
    elevation: 1,
  },
  modalImage: {
    width: '100%', // Fill the width of the modalView
    height: '100%', // Fill the height of the modalView
    resizeMode: 'contain',
  },
});

export default ItemDetail