import React, { useState } from 'react';
import axios from 'axios';
import { Box, Text, Image, Input, InputField, Button, ButtonText, ButtonSpinner, Link } from '@gluestack-ui/themed';
import { LinkText } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { InputSlot } from '@gluestack-ui/themed';
import { EyeIcon } from '@gluestack-ui/themed';
import { EyeOffIcon } from '@gluestack-ui/themed';
import { InputIcon } from '@gluestack-ui/themed';
import { IpAddress } from './IpAddress';

const Logo = require('../assets/Logo/Logo_Login.jpg');

const Login = () => {
  const [formData, setFormData] = React.useState({});
  const [errors, setErrors] = React.useState({});
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
    return true;
  };


  const user_validation = () => {
    console.log(formData)
    axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/login`, formData,
      {
        headers: {
          Accept: "application/json",
        },
      })
      .then((response) => {
        AsyncStorage.setItem('token', response.data.token);
        AsyncStorage.setItem('user_id',response.data.id.toString());
        AsyncStorage.setItem('role',response.data.role);

        navigation.navigate('Root');

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



  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };
  const [showPassword, setShowPassword] = useState(false)
  const handleState = () => {
    setShowPassword((showState) => {
      return !showState
    })
  }
  return (
    <Box bg="white" p="$5" paddingTop={20} marginTop={0} height="100%" alignItems="center">
      <Image size="xl" borderRadius="$xl" source={Logo} marginTop={40} alt='Logo_Movie_Mads' borderWidth={2} borderColor='$blue700' />
      <Text color="black" size="2xl" marginTop={10}>Login</Text>

      <Box mt="$5" marginTop="$5" width="80%">
        <Text color="black" size="xl" textAlign="justify">Email</Text>
        <Input variant="outline" size="md" isDisabled={false} borderWidth={2} borderColor='$blue700'>
          <InputField type="text" placeholder="Email" color="black" onChangeText={value => setFormData({
            ...formData,
            email: value
          })} />

        </Input>
      </Box>

      <Box mt="$5" marginTop="$5" width="80%">
        <Text color="black" size="xl" textAlign="justify">Password</Text>
        <Input variant="outline" size="md" isDisabled={false} borderWidth={2} borderColor='$blue700'>
          <InputField type={showPassword ? "text" : "password"} placeholder="Password" color="black" onChangeText={value => setFormData({
            ...formData,
            password: value
          })} />
          <InputSlot pr="$3" onPress={handleState}>
            {/* EyeIcon, EyeOffIcon are both imported from 'lucide-react-native' */}
            <InputIcon
              as={showPassword ? EyeIcon : EyeOffIcon}
              color="$darkBlue500"
            />
          </InputSlot>
        </Input>
      </Box>

      <Box marginTop="$1/6">
        <Button action="primary" variant="solid" size="lg" isDisabled={false} bgColor="$blue700" onPress={user_validation}>
          <ButtonText>Log in</ButtonText>
        </Button>
      </Box>


      <Link onPress={handleNavigateToRegister} marginTop="$72">
        <Box flexDirection='row'>
          <Text color="$primary500" size="md" textAlign="justify"> Don't have an account? </Text>
          <LinkText color="$primary400" size="md" textAlign="justify">Sign up here</LinkText>
        </Box>
      </Link>




    </Box>
  );
};

export default Login;
