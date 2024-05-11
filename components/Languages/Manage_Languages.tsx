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
import CardLanguages from './CardLanguages';
import { IpAddress } from '../IpAddress';

const Manage_Lnaguages = () => {
  const [token, setToken] = useState(null);
  const [languages, setLanguages] = useState([]);
  const navigation = useNavigation();


  const fetchDataLanguages = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token !== null) {
      }
      const response = await axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/language_index`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });
      setLanguages(response.data);
    }
    catch (error) {
      console.error('Error al obtener las películas:', error);
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
    navigation.navigate('Store_Language');
  };

  return (

    <ScrollView width={'$full'} bg="white" height={'$full'}>
      <Box bg="white" p="$5" padding={20} marginTop={0} height="100%" alignItems="center">


        <Button size="lg" variant="solid" action="primary" bgColor='$blue700' isDisabled={false} isFocusVisible={false} onPress={handleStoreLanguage} >
          <ButtonText>Store a Language </ButtonText>
        </Button>


        <Box paddingTop={15}>
          {languages.map((language) => (
            <Box key={language.id} width="100%" paddingBottom={10}>
              <CardLanguages data={language} />
            </Box>
          ))}
        </Box>
      </Box>

    </ScrollView>
  );
};

export default Manage_Lnaguages;
