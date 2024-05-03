import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';

const CardMoviesAdmin = ({ data }) => {
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    const [category, setCategory] = useState([]);
    const [dubbing, setDubbing] = useState([]);
    const [language, setLanguage] = useState([]);
    const [subtitle, setSubtitle] = useState([]);



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

    const handleDeleteMovie = async () => {
        try {
            if (token !== null) {
                const response = await axios.post(
                    'http://192.168.0.15/Backend_Movie_Mads/public/api/movie_destroy',
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
            console.error('Error deleting language:', error);
        }
    };






    const handleNavigateUpdate = () => {
        navigation.navigate('Update_Movie', {
            id: data.id,
            title: data.title,
            description: data.description,
            duration: data.duration,
            image: data.image,
            language_id: data.language_id,
            dubbing_id: data.dubbing_id,
            subtitle_id: data.subtitle_id,
            category_id: data.category_id,


        });
    };


    useEffect(() => {

    const getCategory = async () => {
        try {
            if (token !== null) {
                setToken(token);
                const response = await axios.get(`http://192.168.0.15/Backend_Movie_Mads/public/api/category_show`, data.category_id,{
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setCategory(response.data);
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error al obtener la categoría:', error);
            console.log(response.data);

        }
    };

    getCategory();
}, [data.category_id]);





    return (

        <Card padding={10} variant="elevated" borderRadius="$2xl"  >
            <Box  width={'$80'}>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Id : {data.id} </Text>
                </Box>
                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Title : {data.title} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Description : {data.description} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Duration : {data.duration} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Category : {category.category} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Image :  </Text>
                    <Image borderRadius="$2xl" source={{ uri: data.image }} size="lg" alt={data.title} />
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Language : {data.language_id} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Dubbing : {data.dubbing_id} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Subtitle : {data.subtitle_id} </Text>
                </Box>



                <Box display="flex" flexDirection="row" alignItems="center">
                    <Button size="sm" variant="solid" action="primary" bgColor='$info500' marginRight={12} onPress={handleNavigateUpdate} isDisabled={false} isFocusVisible={false}>
                        <ButtonText>Update</ButtonText>
                    </Button>
                    <Button size="sm" variant="solid" action="primary" marginRight={0} bgColor='$red500' onPress={handleDeleteMovie} isDisabled={false} isFocusVisible={false}>
                        <ButtonText>Delete</ButtonText>
                    </Button>
                </Box>
            </Box>

        </Card>
    );
};

export default CardMoviesAdmin;