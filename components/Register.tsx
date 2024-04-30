import React, { useState } from 'react';
import axios from 'axios';
import { Box, Text, Image, Input, InputField, Button, ButtonText, ButtonSpinner, Link, GluestackUIProvider } from '@gluestack-ui/themed';
import { LinkText } from '@gluestack-ui/themed';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './Login';
import { config } from '@gluestack-ui/config';
import { useNavigation } from '@react-navigation/native';


const Logo = require('../assets/Logo/Logo_Login.jpg');

const Register = () => {



  const [formData, setFormData] = React.useState({ role: 'customer' });
  const [errors, setErrors] = React.useState({});
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordMatch, setPasswordMatch] = useState(false);
  const navigation = useNavigation();

  let regex_email = /[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)@[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)[.][a-zA-Z]{2,5}$/;
  const digit = /[0-9]/;
  const upperCase = /[A-Z]/;
  const lowerCase = /[a-z]/;
  const nonAlphanumeric = /[^0-9A-Za-z]/;
  const isStrongPassword = password => [digit, upperCase, lowerCase, nonAlphanumeric].every(re => re.test(password)) && password.length >= 8 && password.length <= 32;


  const validate = () => {
    console.log(formData);
    setErrors({});
    console.log('email', formData.email);
    console.log('password', formData.password);
    if (regex_email.test(formData.email) != false) {
      console.log('regex_email', formData.email);
      setErrors({
        ...errors,
        email: 'Email.is not valid'
      });
      return false;
    }
    if (!isStrongPassword(formData.password)) {
      setErrors({
        ...errors,
        password: 'Password is not valid'
      });
      return false;
    }
    if (!validatePasswordConfirmation()) {
      return false;
    }
    return true;
  };


  const user_validation = () => {
    console.log(formData)
    axios.post("http://192.168.0.15/Backend_Movie_Mads/public/api/register", formData,
      {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        console.log("response");
        console.log(response);
        navigation.navigate('Movies');

      })
      .catch((error) => {
        console.log(error);
      });
  };


  const onSubmit = () => {
    user_validation();

    // navigation.navigate('Iphone2') :
    // post_Jsonplaceholder() :

  };

  const validatePasswordConfirmation = () => {
    if (password !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match'
      });
      return false;
    }
    return true;
  };

  const handleConfirmPasswordChange = (value) => {
    setConfirmPassword(value);
    setPasswordMatch(formData.password === value);
  };


  return (

    <Box bg="$secondary950" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
      <Image size="xl" borderRadius="$xl" source={Logo} marginTop={40} alt='Logo_Movie_Mads' />
      <Text color="white" size="2xl" marginTop={10}>Register</Text>


      <Box mt="$5" marginTop="$5" width="80%">
        <Text color="white" size="xl" textAlign="justify">Name</Text>
        <Input variant="outline" size="md" isDisabled={false}>
          <InputField type="text" placeholder="Name" color="white" onChangeText={value => setFormData({
            ...formData,
            name: value
          })} />

        </Input>
      </Box>


      <Box mt="$5" marginTop="$5" width="80%">
        <Text color="white" size="xl" textAlign="justify">Email</Text>
        <Input variant="outline" size="md" isDisabled={false}>
          <InputField type="text" placeholder="Email" color="white" onChangeText={value => setFormData({
            ...formData,
            email: value
          })} />

        </Input>
      </Box>

      <Box mt="$5" marginTop="$5" width="80%">
        <Text color="white" size="xl" textAlign="justify">Password</Text>
        <Input variant="outline" size="md" isDisabled={false}>
          <InputField type="password" placeholder="Password" color="white" onChangeText={value => setFormData({
            ...formData,
            password: value
          })} />
        </Input>
      </Box>


      <Box mt="$5" marginTop="$5" width="80%">
        <Text color="white" size="xl" textAlign="justify">Confirm password</Text>
        <Input variant="outline" size="md" isDisabled={false}>
          <InputField type="password" placeholder="Password" color="white" onChangeText={handleConfirmPasswordChange} />
        </Input>
      </Box>


      <Box marginTop="$1/6">
        <Button action="primary" variant="solid" size="lg" isDisabled={!passwordMatch} bgColor="$cyan200" onPress={user_validation}>
          <ButtonText color='black'>Register</ButtonText>
        </Button>
      </Box>

    </Box>
  );
};

export default Register;
