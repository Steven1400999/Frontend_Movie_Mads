import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

const CardSubtitles = ({ data }) => {
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
  
    const handleDeleteSubtitle = async () => {
      try {
        if (token !== null) {
            const response = await axios.post(
                'http://192.168.0.15/Backend_Movie_Mads/public/api/subtitle_destroy',
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
      navigation.navigate('Update_Subtitle', {
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
                        <ButtonText>Update</ButtonText>
                    </Button>
                    <Button size="sm" variant="solid" action="primary" marginRight={0} bgColor='$red500' onPress={handleDeleteSubtitle} isDisabled={false} isFocusVisible={false}>
                        <ButtonText>Delete</ButtonText>
                    </Button>
                </Box>
        </Box>
    </Card>
    );
};

export default CardSubtitles;