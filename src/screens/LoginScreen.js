import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Logo from '../components/common/Logo';
import { useNavigation } from "@react-navigation/native";
import { AuthService } from "../services/AuthService";
import OTP from '../components/common/OTP';

export default function LoginForm() {

  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMethod, setLoginMethod] = useState(true);
  const [errors, setErrors] = useState({ email: '', password: '', phone: '' });
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [responseMessage, setResponseMessage] = useState("");
  const [responseType, setResponseType] = useState("");
  const [otpModalVisible,setOtpModalVisible] = useState(false);
  // const [userData, setUserData] = useState({})



  const navigation = useNavigation();
  const inputStyle = (value, required) => {
    let baseStyle = styles.input;
    if (required && submitAttempted && !value) {
      return [baseStyle, styles.inputError];
    } else {
      return baseStyle;
    }
  };
  const validateEmail = (email) => {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!regex.test(String(email).toLowerCase())) {
      setErrors(prevErrors => ({ ...prevErrors, email: "Invalid email format" }));
    } else {
      setErrors(prevErrors => ({ ...prevErrors, email: '' }));
    }
  };

  const handleToggle = (method) => {
    setLoginMethod(method);
    setErrors({ ...errors, email: '', password: '', phone: '' }); // Clear errors on toggle
    setSubmitAttempted(false);
  };

  const handleChange = (name, value) => {
    switch (name) {
      case 'phone':
        setPhone(value);
        break;
      case 'email':
        validateEmail(value); // validate and set error inside
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      default:
        break;
    }

    // Clear the specific error when the user types, except for email which is handled in validateEmail
    if (name !== 'email') {
      setErrors(prevErrors => ({ ...prevErrors, [name]: '' }));
    }
  };

  const validateForm = () => {
    let newErrors = { email: '', password: '', phone: '' };
    let valid = true;

    if (loginMethod && !email) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!loginMethod && !phone) {
      newErrors.phone = 'Mobile number is required';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      valid = false;
    }

    setErrors(newErrors);
    setSubmitAttempted(true);
    return valid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }
  
    try {
      const response = await AuthService.Login({
        loginWithEmail: loginMethod,
        phoneNumber: phone,
        email: email,
        password: password,
      });
  
      if (!response.isSuccess) {
        setResponseMessage(response.message);
        setResponseType("error");
      } else {
        setResponseType("success");
        setOtpModalVisible(true);
        setResponseMessage(response.message);
    
      }
    } catch (error) {
      console.error('Failed to login', error);
    }
  
  

  };

  return (
   
      <>
       <View style={styles.container}>
      <Logo />
      {/* <Text style={styles.heading}>Login</Text> */}
      
      <View style={styles.toggleContainer}>
        <TouchableOpacity
          style={[styles.toggleOption, loginMethod ? styles.activeToggle : null]}
          onPress={() => handleToggle(true)}
        >
          <Text style={[
            styles.toggleText,
            loginMethod && styles.activeToggleText,
          ]}>Email</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleOption, !loginMethod ? styles.activeToggle : null]}
          onPress={() => handleToggle(false)}
        >
          <Text style={[
            styles.toggleText,
            !loginMethod && styles.activeToggleText,
          ]}>Mobile</Text>
        </TouchableOpacity>
      </View>
      <Text style={[styles.responseText, responseType === 'success' ? styles.successText : styles.errorText]}>
        {responseMessage}
      </Text>
      {!loginMethod ? (
        <>
          <TextInput
            style={inputStyle(phone, true)}
            value={phone}
            onChangeText={(value) => handleChange('phone', value)}
            placeholder="Mobile"
          />
          {errors.phone && <Text style={styles.validationMessage}>{errors.phone}</Text>}
        </>
      ) : (
        <>
          <TextInput
            name="email"
            style={inputStyle(email, !!errors.email)}
            value={email}
            onChangeText={(value) => handleChange('email', value)}
            onBlur={() => validateEmail(email)}
            placeholder="Email"
          />
          {errors.email && <Text style={styles.validationMessage}>{errors.email}</Text>}
        </>
      )}
      <TextInput
        style={inputStyle(password, true)}
        value={password}
        onChangeText={(value) => handleChange('password', value)}
        placeholder="Password"
        secureTextEntry
      />
      {errors.password && <Text style={styles.validationMessage}>{errors.password}</Text>}
      <View style={styles.linkContainer}>
        <TouchableOpacity style={styles.registerLink} onPress={() => navigation.navigate("RegisterScreen")}>
          <Text style={styles.linkText}>Don't have an account?</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.forgotLink}>
          <Text style={styles.linkText}>Forgot password?</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      
          
      

    </View>
    <OTP 
        visible={otpModalVisible}
        onClose={() => setOtpModalVisible(false)}
        loginMethod = {loginMethod}
        email = {email}
        password = {password}
        phoneNumber ={phone}
      />
      </>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff', // Changed background color
    paddingHorizontal: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 10, // Changed margin
  },
  toggleOption: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#ccc',
    color: '#17588e', // Default text color
  },
  activeToggle: {
    backgroundColor: '#17588e',
    color: 'white',
  },
  activeToggleText: {
    color: "white",
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: '#17588e',
    marginBottom: 10
  },
  inputError: {
    borderColor: 'red',
  },
  validationMessage: {
    color: 'red',
    marginBottom: 10,
    alignSelf: 'flex-start'
  },
  button: {
    width: '100%',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#17588e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  forgotLink: {
    flex: 1,
    alignItems: "flex-end",
  },
  registerLink: {
    flex: 1,
    alignItems: "flex-start",
  },
  linkText: {
    color: "blue",
  },
  responseText: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 16,
  },
  successText: {
    color: 'green',
  },
  errorText: {
    color:'red'
  }

});