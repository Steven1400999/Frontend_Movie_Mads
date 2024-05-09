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

const Card_Schedules = ({ data }) => {
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
  
    const handleDeleteCategory = async () => {
      try {
        if (token !== null) {
            const response = await axios.post(
                'http://192.168.0.15/Backend_Movie_Mads/public/api/category_destroy',
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
      navigation.navigate('Update_Category', {
        id: data.id,
        category: data.category
      });
    };

    return (
        
        <Card width="$full" padding={10} variant="elevated" borderRadius="$2xl">
        <Box width="$full" padding={10} display="flex" flexDirection="row" justifyContent="space-between">
            <Text size='lg' color='black' >{data.category}</Text>

            <Box display="flex" flexDirection="row" alignItems="center">
                    <Button size="sm" variant="solid" action="primary" bgColor='$info500' marginRight={12} onPress={handleNavigateUpdate} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={EditIcon} />
                    </Button>
                    <Button size="sm" variant="solid" action="primary" marginRight={0} bgColor='$red500' onPress={handleDeleteCategory} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={TrashIcon} />
                    </Button>
                </Box>
        </Box>
    </Card>
    );
};

export default Card_Schedules;