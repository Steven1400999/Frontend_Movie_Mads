import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, InputField } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Input } from '@gluestack-ui/themed';

const UpdateSubtitle = ({ route }) => {
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    const { id, language } = route.params;
    const [formData, setFormData] = useState({ id: route.params.id, language: route.params.language });


    useEffect(() => {
        console.log(id);
        console.log(language);


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

    const handleUpdateDubbing = async () => {
        try {
            if (token !== null) {
                const response = await axios.post(
                    'http://192.168.0.15/Backend_Movie_Mads/public/api/dubbing_update',
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


    const isLanguageChanged = formData.language !== language; 

    return (
        <Box bg="$secondary950" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
            <Text color="white" size="2xl" marginTop={30}>Update a dubbing</Text>

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
                <Text color="white" size="xl" textAlign="justify">Language</Text>
                <Input
                    variant="outline"
                    size="md"
                    isDisabled={false}>

                    <InputField type="text" placeholder="Language" color="white"

                        onChangeText={value => setFormData({
                            ...formData,
                            language: value
                        })} >
                        {language}
                    </InputField>

                </Input>
            </Box>


            <Box mt="$5" width="80%">

        <Button size="md" 
        variant="solid"
         action="primary" 
          bgColor={isLanguageChanged ? '$emerald500' : '$gray400'}
          isDisabled={!isLanguageChanged}
          isFocusVisible={false}
          onPress={handleUpdateDubbing}
          >
          <ButtonText>Update</ButtonText>
        </Button>
      
        </Box>


        </Box>
    );
};

export default UpdateSubtitle;