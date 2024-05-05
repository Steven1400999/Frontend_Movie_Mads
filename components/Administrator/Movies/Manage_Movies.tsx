import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, AccordionTitleText, Box, Button, ButtonText } from '@gluestack-ui/themed';
import { AccordionItem } from '@gluestack-ui/themed';
import { AccordionHeader } from '@gluestack-ui/themed';
import { AccordionIcon } from '@gluestack-ui/themed';
import { ChevronUpIcon } from '@gluestack-ui/themed';
import { AccordionTrigger } from '@gluestack-ui/themed';
import { AccordionContentText } from '@gluestack-ui/themed';
import { AccordionContent } from '@gluestack-ui/themed';
import { ChevronDownIcon } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@gluestack-ui/themed';
import CardMoviesAdmin from './CardMoviesAdmin';
import { IpAddress } from '../../IpAddress';

const Manage_Subtitles = () => {
  const [token, setToken] = useState(null);
  const [movies, setMovies] = useState([]);
  const navigation = useNavigation();


  const fetchDataMovies = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
      }
      const response = await axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/movie_index`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setMovies(response.data);
    }
    catch (error) {
      console.error('Something went wrong:', error);
    }
  };



  useEffect(() => {
    fetchDataMovies();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
        fetchDataMovies();
    }, [])
  );

  const handleStoreMovie = () => {
    navigation.navigate('Movie_store');
  };

  return (

    <ScrollView width={'$full'} bg="$secondary950" height={'$full'}>
      <Box bg="$secondary900" p="$5" padding={20} marginTop={0} height="100%" alignItems="center">


        <Button size="lg" variant="solid" action="primary" bgColor='$indigo400' isDisabled={false} isFocusVisible={false} onPress={handleStoreMovie} >
          <ButtonText>Store a Movie </ButtonText>
        </Button>


        <Box paddingTop={15}>
          {movies.map((movie) => (
            <Box key={movie.id} width="100%" paddingBottom={10}>
              <CardMoviesAdmin data={movie} />
            </Box>
          ))}
        </Box>
      </Box>

    </ScrollView>
  );
};

export default Manage_Subtitles;
