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


