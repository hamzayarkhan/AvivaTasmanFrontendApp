import React from 'react'
import  {View, Text, FlatList, StyleSheet} from  'react-native';
import Layout from '../components/layout/Layout';
import Header from '../components/layout/Header';
import ItemsList from '../components/item/ItemsList';


export default function HomeScreen() {
  return (

    <Layout>
        <View>
        <Header/> 
        <ItemsList/>
        </View>
    </Layout>
    
    
  )
}

const styles = StyleSheet.create({
  Container : {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1
  },
  text: {
    fontSize : 30,
    fontWeight : 'bold'
  }
})
