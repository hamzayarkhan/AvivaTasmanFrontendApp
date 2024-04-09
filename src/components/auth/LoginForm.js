// import React from 'react';
// import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';

// function LoginForm({ toggleForm }) {
//     return (

//     );
// }

// export default LoginForm;

import { View, Text, StyleSheet, Image,TextInput,TouchableOpacity } from 'react-native'
import React from 'react'

const LoginForm = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <Text>Login</Text>
    <Image source={require('../../../assets/images/logo.png')} style={{ width: 70, height: 70 }} />

    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 200 }} placeholder="Username" />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput style={{ borderWidth: 1, borderColor: 'black', padding: 10, width: 200 }} placeholder="Password" secureTextEntry={true} />
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity>
            <Text>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity>
            <Text>Forgot password?</Text>
        </TouchableOpacity>
    </View>
    <TouchableOpacity style={{ padding: 10, backgroundColor: 'blue', marginTop: 10 }}>
        <Text style={{ color: 'white' }}>Login</Text>
    </TouchableOpacity>
    <View style={{ marginTop: 10 }}>
        <Text>Don't have an account?</Text>
        <TouchableOpacity>
            <Text style={{ color: 'blue' }}>Register</Text>
        </TouchableOpacity>
    </View>
</View>
  )
}


export default LoginForm