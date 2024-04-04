import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { NavigationContainer } from '@react-navigation/native'
import HomeScreen from './src/screens/HomeScreen'
import RefundPolicy from './src/components/policy/RefundPolicy'
import PrivacyPolicy from './src/components/policy/PrivacyPolicy'
import ItemDetail from './src/screens/ItemDetail'
import CartScreen from './src/screens/CartScreen'


//routes
const Stack = createNativeStackNavigator()

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ItemDetail" component={ItemDetail} options={{ headerShown: false }} />
        <Stack.Screen name="CartScreen" component={CartScreen} options={{ headerShown: false }} />

        {/* Policy Screen */}
        <Stack.Screen name="RefundPolicy" component={RefundPolicy}  options={{ headerShown: false }}   />
        <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy}  options={{ headerShown: false }}   />
      </Stack.Navigator>
    </NavigationContainer>
  )
}


const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  menuContainer: {
    alignItems: "center",
    justifyContent: "center"
  },
  icon: {
    fontSize: 25,
    color: "#000000"
  }
})
export default App;