import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, InputField } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';

const UpdateCategory = ({ route }) => {
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    const { id, category } = route.params;
    const [formData, setFormData] = useState({ id: route.params.id, category: route.params.category });


    useEffect(() => {
        console.log(id);
        console.log(category);


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

    const handleUpdateSubtitle = async () => {
        try {
            if (token !== null) {
                const response = await axios.post(
                    `${IpAddress}/Backend_Movie_Mads/public/api/category_update`,
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


    const isCategoryChanged = formData.category !== category; 

    return (
        <Box bg="$secondary950" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
            <Text color="white" size="2xl" marginTop={30}>Update a language</Text>

            <Box mt="$5" width="80%">
                <Text color="white" size="xl" textAlign="justify">Id</Text>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={true}
                >

                    <InputField  type="text" placeholder="Id" color="white" >
                        {id}
                    </InputField>
                </Input>
            </Box>

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
                        })} >
                        {category}
                    </InputField>

                </Input>
            </Box>


            <Box mt="$5" width="80%">

        <Button size="md" 
        variant="solid"
         action="primary" 
          bgColor={isCategoryChanged ? '$emerald500' : '$gray400'}
          isDisabled={!isCategoryChanged}
          isFocusVisible={false}
          onPress={handleUpdateSubtitle}
          >
          <ButtonText>Update</ButtonText>
        </Button>
      
        </Box>


        </Box>
    );
};

export default UpdateCategory;