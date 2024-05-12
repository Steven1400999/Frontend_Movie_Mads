import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import QRCode from 'react-native-qrcode-svg';
import { IpAddress } from './IpAddress';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, ButtonText } from '@gluestack-ui/themed';

const Reservations = () => {
  const [token, setToken] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const navigation = useNavigation();
  const [reservations, setReservations] = useState([]);


  const fetchReservations = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
      }
      const response = await axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/reservation_show`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setReservations(response.data);
      console.log(response.data);
    }
    catch (error) {
      console.error('Something went wrong:', error);
    }
  };



  useEffect(() => {
    fetchReservations();
  }, []);



  const handleStoreLanguage = () => {
    navigation.navigate('Store_Subtitle');
  };

  return (

    <ScrollView width={'$full'} bg="white" height={'$full'}>
      <Box bg="white" p="$5" padding={20} marginTop={0} height="100%" alignItems="center">


      <Button size="lg" variant="solid" action="primary" bgColor='$blue700' isDisabled={false} isFocusVisible={false} onPress={handleStoreLanguage} >
          <ButtonText>Store a Subtitle </ButtonText>
        </Button>

      </Box>

    </ScrollView>
  );
};

export default Reservations;
