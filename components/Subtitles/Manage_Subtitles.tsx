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
import CardSubtitles from './CardSubtitles';

const Manage_Subtitles = () => {
  const [token, setToken] = useState(null);
  const [subtitles, setSubtitles] = useState([]);
  const navigation = useNavigation();


  const fetchDataLanguages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
      }
      const response = await axios.get('http://192.168.0.15/Backend_Movie_Mads/public/api/subtitle_index', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setSubtitles(response.data);
    }
    catch (error) {
      console.error('Something went wrong:', error);
    }
  };



  useEffect(() => {
    fetchDataLanguages();
  }, []);


  useFocusEffect(
    React.useCallback(() => {
      fetchDataLanguages();
    }, [])
  );

  const handleStoreLanguage = () => {
    navigation.navigate('Store_Subtitle');
  };

  return (

    <ScrollView width={'$full'} bg="$secondary950" height={'$full'}>
      <Box bg="$secondary900" p="$5" padding={20} marginTop={0} height="100%" alignItems="center">


        <Button size="lg" variant="solid" action="primary" bgColor='$indigo400' isDisabled={false} isFocusVisible={false} onPress={handleStoreLanguage} >
          <ButtonText>Store a Subtitle </ButtonText>
        </Button>


        <Box paddingTop={15}>
          {subtitles.map((subtitle) => (
            <Box key={subtitle.id} width="100%" paddingBottom={10}>
              <CardSubtitles data={subtitle} />
            </Box>
          ))}
        </Box>
      </Box>

    </ScrollView>
  );
};

export default Manage_Subtitles;
