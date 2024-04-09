import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import LoginForm from '../components/auth/LoginForm'


const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Text>LoginScreen</Text>
      { <LoginForm /> }
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
export default LoginScreen