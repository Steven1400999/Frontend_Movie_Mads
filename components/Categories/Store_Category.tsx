import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, InputField } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@gluestack-ui/themed';

const StoreCategory = ({  }) => {
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    const [formData, setFormData] = React.useState({});


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

    const handleStoreCategory = async () => {
        try {
            if (token !== null) {
                const response = await axios.post(
                    'http://192.168.0.15/Backend_Movie_Mads/public/api/category_store',
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
                navigation.navigate('Manage_Categories');

            }
        } catch (error) {
            console.error('Update went wrong:', error);
        }
    };

    const isCategoryValid = formData.category && formData.category.trim().length > 0;


    return (
        <Box bg="$secondary950" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
            <Text color="white" size="2xl" marginTop={30}>Store a category</Text>


            <Box mt="$5" width="80%">
                <Text color="white" size="xl" textAlign="justify">Category</Text>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}>

                    <InputField type="text" placeholder="Category" color="white"

                        onChangeText={value => setFormData({
                            ...formData,
                            category: value
                        })} />

                </Input>
            </Box>


            <Box mt="$10" width="80%">

            <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    bgColor={'$emerald500'}
                    isDisabled={!isCategoryValid}
                    isFocusVisible={true}
                    onPress={handleStoreCategory}
                >
                    <ButtonText>Create</ButtonText>
                </Button>
      
        </Box>


        </Box>
    );
};

export default StoreCategory;