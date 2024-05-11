import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, InputField } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';

const StoreDubbing = ({  }) => {
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
                console.error('Error getting token:', error);
            }
        };

        fetchToken();
    }, []);

    const handleStoreDubbing = async () => {
        try {
            if (token !== null) {
                const response = await axios.post(
                    `${IpAddress}/Backend_Movie_Mads/public/api/dubbing_store`,
                    formData,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                console.log(response);
                navigation.navigate('Manage_Dubbings');

            }
        } catch (error) {
            console.error('Update went wrong:', error);
        }
    };

    const isLanguageValid = formData.language && formData.language.trim().length > 0;


    return (
        <Box bg="white" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
            <Text color="black" size="2xl" marginTop={30}>Store a dubbing</Text>


            <Box mt="$5" width="80%">
                <Text color="black" size="xl" textAlign="justify">Language</Text>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}
                    borderColor='$blue700'
                    borderWidth={2}>

                    <InputField type="text" placeholder="Language" color="black"

                        onChangeText={value => setFormData({
                            ...formData,
                            language: value
                        })} />

                </Input>
            </Box>


            <Box mt="$10" width="80%">

            <Button
                    size="md"
                    variant="solid"
                    action="primary"
                    bgColor={'$blue700'}
                    isDisabled={!isLanguageValid}
                    isFocusVisible={true}
                    onPress={handleStoreDubbing}
                >
                    <ButtonText>Create</ButtonText>
                </Button>
      
        </Box>


        </Box>
    );
};

export default StoreDubbing;