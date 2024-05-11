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
          setSchedules(response.data);
          console.log("Esta es al respuesta mf: ", response.data);
          console.log("Schedule id: ", schedules);


        }
      } catch (error) {
        console.error('Error al obtener el token:', error);
      }
    };

    fetchToken();
  }, []);

  const handleSeatsShow = (schedule_id) => {
console.log("Id del eschedule:",schedule_id);

    navigation.navigate('Seats', { schedule_id, movie_id });
  };

  return (

    <Box bgColor='$secondary0' padding={10} borderRadius={'$2xl'} ml={5} mr={5}  >
      {schedules.length > 0 ? (
        schedules.map((schedule) => (
          <TouchableOpacity key={schedule.id} onPress={() => handleSeatsShow(schedule.id)}>
            <Box key={schedule.id} bgColor='$blue700' borderColor='$error100' borderWidth={'$1'} borderRadius={'$2xl'} width={300} padding={10} mb={9}>
              <Text color='white'>ID: {schedule.id}</Text>
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