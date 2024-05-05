import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { IpAddress } from '../IpAddress';
import { ButtonIcon } from '@gluestack-ui/themed';
import { EditIcon } from '@gluestack-ui/themed';
import { TrashIcon } from '@gluestack-ui/themed';

const CardLanguages = ({ data }) => {
    const [token, setToken] = useState(null);
    const navigation =useNavigation();

    useEffect(() => {
      const fetchToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token !== null) {
            setToken(token);
          }
        } catch (error) {
          console.error('Error al obtener el token:', error);
        }
      };
  
      fetchToken();
    }, []);
  
    const handleDeleteLanguage = async () => {
      try {
        if (token !== null) {
            const response = await axios.post(
                `${IpAddress}/Backend_Movie_Mads/public/api/language_destroy`,
                { id: data.id }, 
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
          console.log(response);
          navigation.navigate('Movies');

        }
      } catch (error) {
        console.error('Error al eliminar el idioma:', error);
      }
    };

    const handleNavigateUpdate = () => {
      navigation.navigate('Update_Languages', {
        id: data.id,
        language: data.language
      });
    };

    return (
        
        <Card width="$full" padding={10} variant="elevated" borderRadius="$2xl">
        <Box width="$full" padding={10} display="flex" flexDirection="row" justifyContent="space-between">
            <Text size='lg' color='black' >{data.language}</Text>

            <Box display="flex" flexDirection="row" alignItems="center">
                    <Button size="sm" variant="solid" action="primary" bgColor='$info500' marginRight={12} onPress={handleNavigateUpdate} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={EditIcon} />
                    </Button>
                    <Button size="sm" variant="solid" action="primary" marginRight={0} bgColor='$red500' onPress={handleDeleteLanguage} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={TrashIcon} />
                    </Button>
                </Box>
        </Box>
    </Card>
    );
};

export default CardLanguages;