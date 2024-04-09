import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import RegisterForm from '../components/auth/RegisterForm'


const RegisterScreen = () => {
  return (
  
     <View style= {styles.container}>
      <View style= {styles.imageContainer}>
      <Image
                    source={require("../../assets/images/logo.png")} // Replace with your logo URL
                    style={styles.logo}
                />
 
      </View>
            <RegisterForm></RegisterForm> 
    </View>
  
   
   
  )
}
const styles = StyleSheet.create({
  container: { 
    justifyContent: 'center',
    flex: 1,
    padding: 20,
    backgroundColor: '#ffffff'
  },
  imageContainer: { 
    justifyContent: 'center',
    flexDirection:'row'
  },
  
  logo: {
      // Adjust these values according to your logo's size
      width: 130,
      height: 130,
      resizeMode: 'contain',
      a:"center"// This ensures your logo scales properly
  },
});
export default RegisterScreen