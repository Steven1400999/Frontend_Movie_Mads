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

  useEffect(() => {


    const unsubscribe = navigation.addListener('focus', () => {
        fetchReservations();
    });

    return unsubscribe;
}, [navigation]);


    const fetchReservations = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const user_id = await AsyncStorage.getItem('user_id');

            if (token !== null) {
                const response = await axios.post(
                    `${IpAddress}/Backend_Movie_Mads/public/api/reservation_show`,
                    { user_id: user_id },
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                const sortedReservations = response.data.sort((a, b) => {
                    return new Date(b.created_at) - new Date(a.created_at);
                  });
                  setReservations(sortedReservations);

                console.log("this are reservations: ", response.data);

            }
        } catch (error) {
            console.error('Error getting reservations:', error);
        }
    };


  return (
    <ScrollView width={'$full'} bg="white" height={'$full'}>
      {reservations.map((reservation, index) => (
        <Box key={index}  padding={10} borderWidth={2} borderColor='$blue700' ml={15} mr={15} mt={10} mb={5} borderRadius={10}>
          <Text size color='black' >Movie: {JSON.parse(reservation.qr_code).Movie}</Text>
          <Text color='black' >Schedule: {JSON.parse(reservation.qr_code).Schedule}</Text>
          <Text color='black'>Room: {JSON.parse(reservation.qr_code).Room}</Text>
          <Text color='black'>Seats: {JSON.parse(reservation.qr_code).Seats}</Text>
          <Box alignItems='center'>
            <QRCode value={reservation.qr_code} size={200}  />
          </Box>
        </Box>
      ))}
    </ScrollView>
  );
};

export default Reservations;
