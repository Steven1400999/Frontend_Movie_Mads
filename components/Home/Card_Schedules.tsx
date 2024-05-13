import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, TrashIcon } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { IpAddress } from '../IpAddress';
import { ButtonIcon } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import { ScrollView } from 'react-native-gesture-handler';
import { TouchableOpacity } from 'react-native';

const Card_Schedules = ({ movie_id }) => {
  const [token, setToken] = useState(null);
  const navigation = useNavigation();
  const [schedules, setSchedules] = useState([]);
  const movie = movie_id;

  useEffect(() => {
    console.log("movieid: ", movie_id);
    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          const response = await axios.post(
            `${IpAddress}/Backend_Movie_Mads/public/api/schedule_show`,
            { movie_id: movie },
            {
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const now = new Date();
          const futureSchedules = response.data.filter(schedule => {
            const scheduleDate = new Date(schedule.start_time);
            return scheduleDate >= now;
          });
          setSchedules(futureSchedules);
        }
      } catch (error) {
        console.error('Error getting token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleSeatsShow = (schedule_id) => {
console.log("Id del eschedule:",schedule_id);

    navigation.navigate('Seats', { schedule_id, movie_id });
  };

  return (

    <Box bgColor='white' padding={10} borderRadius={'$2xl'} ml={30} mr={30} borderColor='black' borderWidth={1.5} hardShadow='5' alignItems='center' >
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <TouchableOpacity key={schedule.id} onPress={() => handleSeatsShow(schedule.id)}>
            <Box key={schedule.id} bgColor='$blue700' borderColor='$error100' borderWidth={'$1'} borderRadius={'$2xl'} width={270} padding={10} mb={9}>
              <Text color='white'>Start Time: {schedule.start_time}</Text>
              <Text color='white'>Room: {schedule.room}</Text>
            </Box>
          </TouchableOpacity>
        ))
      ) : (
        <Text>No schedules available for this movie.</Text>
      )}
    </Box>


  );
};

export default Card_Schedules;