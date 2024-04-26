import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal, TouchableWithoutFeedback, TextInput, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/layout/Header'
import Footer from '../components/layout/Footer'
import CartDrawerModal from '../components/cart/CartDrawerModal';
import { useNavigation } from '@react-navigation/native';
import resolveProductImage from '../utils/customfunctions';
import { ProductService } from '../services/ProductService';
import FontAwesome from 'react-native-vector-icons/FontAwesome5';

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
        // Check if adding the new quantity exceeds the stock
        if (existingCart[index].quantity + quantity > itemDetail.quantityInStock) {
          Alert.alert(
            "Quantity Exceeded",
            "You can't add more than the available stock.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        } else {
          existingCart[index].quantity += quantity; // Update quantity
          await AsyncStorage.setItem('cart', JSON.stringify(existingCart));
          setCartModalVisible(true); // Show the cart modal
        }
      } else {
        // For new item, check if the initial quantity exceeds the stock
        if (quantity > itemDetail.quantityInStock) {
          Alert.alert(
            "Quantity Exceeded",
            "You can't add more than the available stock.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          );
        } else {
          existingCart.push({ ...itemDetail, quantity }); // Add new item
          await AsyncStorage.setItem('cart', JSON.stringify(existingCart));
          setCartModalVisible(true); // Show the cart modal
        }
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  const onQuantityChange = (newQuantity, totalQuantity) => {
    const num = parseInt(newQuantity, 10);
   
    if (!isNaN(num) && num > 0) {
      if (num > totalQuantity) {
        Alert.alert(
          "Quantity Exceeded",
          "You can't add more than the available stock.",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }]
        );
        return;
      }
      setQuantity(num);
    } else {
      setQuantity(1);
    }
  };
  //find item details
  useEffect(() => {
    const { params } = route;
    const fetchProductDetail = async (id) => {
      try {
        const response = await ProductService.FetchProductDetailById(id)
        setItemDetail(response)
        // console.log(itemDetail)

      } catch (error) {

      }
    }
    fetchProductDetail(params.id)

  }, [route]);

  const productImage = resolveProductImage(itemDetail.name);


  return (
    <>
      <Header />
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity style={styles.imageContainer} onPress={() => setModalVisible(true)}>
          <Image source={productImage} style={styles.image} />
        </TouchableOpacity>
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>{itemDetail?.name}</Text>
          <Text style={styles.price}>{itemDetail.variants ? itemDetail.variants[0].sales_price  : "N/A"} PHP </Text>
          {parseFloat(itemDetail?.quantityInStock) > 0 ?
            <>
              <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => onQuantityChange(quantity - 1, itemDetail.quantityInStock)}>
                  <FontAwesome name="minus" style={styles.quantityButton} />
                </TouchableOpacity>
                <TextInput
                  style={styles.quantityInput}
                  keyboardType='numeric'
                  onChangeText={onQuantityChange}
                  value={quantity.toString()}
                />
                <TouchableOpacity onPress={() => onQuantityChange(quantity + 1 , itemDetail.quantityInStock)}>
                  <FontAwesome name="plus" style={styles.quantityButton} />
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.addToCartButton} disabled={itemDetail?.quantityInStock <= 0}
                onPress={() => openCartDrawer()}
              >
                <Text style={styles.addToCartButtonText}>Add to cart</Text>
              </TouchableOpacity>
              </View>

               </> : <View style={styles.outOfStockContainer}>
              <Text style={styles.outOfStockText}>Out of Stock</Text>
            </View>}

          <Text style={styles.contentItem}>{itemDetail.additional_info}</Text>



        </View>
        {/* <Modal
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
        </Modal> */}
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
    backgroundColor: '#f0f0f0',  // Light grey background for subtle contrast
  },
  imageContainer: {
    height: 300,
    width: '100%',
    marginTop: 5,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: 'cover',
  },
  outOfStockContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5,
  },
  outOfStockText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center', // Ensure text is centered within its container
  },
  detailsContainer: {
    padding: 20,
    backgroundColor: 'white',  // White background for the details container
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginTop: -10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',  // Dark grey for better readability
  },
  price: {
    fontSize: 25,
    color: '#3AA040',  // A shade of green for price
    marginVertical: 10,
  },
  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    fontSize: 20,
    padding: 10,
    backgroundColor: '#17588e',  // Consistent blue theme
    color: 'white',
    borderRadius: 8,
    margin:10,  // Circular buttons
  },
  quantityInput: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    paddingVertical: 8,
    paddingHorizontal: 15,
    textAlign: 'center',
    width: 100,
    color: '#333',
  },
  addToCartButton: {
    backgroundColor: '#3AA040',  // Vibrant orange button
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 0,
  },
  addToCartButtonText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  contentItem: {
    fontSize: 16,
    lineHeight: 24,
    color: '#666',  // Lighter text for additional info
  },
});


export default ItemDetail