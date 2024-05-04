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
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token);

                    const [categoryResponse, dubbingResponse, languageResponse, subtitleResponse] = await Promise.all([
                        axios.post(`http://192.168.0.15/Backend_Movie_Mads/public/api/category_show`, { id: data.category_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
                        axios.post(`http://192.168.0.15/Backend_Movie_Mads/public/api/dubbing_show`, { id: data.dubbing_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
                        axios.post(`http://192.168.0.15/Backend_Movie_Mads/public/api/language_show`, { id: data.language_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
                        axios.post(`http://192.168.0.15/Backend_Movie_Mads/public/api/subtitle_show`, { id: data.subtitle_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
                    ]);

                    setCategory(categoryResponse.data.category);
                    setDubbing(dubbingResponse.data.language);
                    setLanguage(languageResponse.data.language);
                    setSubtitle(subtitleResponse.data.language);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
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
            category_id: data.category_id}
        );
        console.log("Esta es la data de card: ", data.title);

    }





    return (

        <Card padding={10} variant="elevated" borderRadius="$2xl"  >
            <Box width={'$80'}>

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
                    <Text size='lg' color='black' >Category : {category} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Image :  </Text>
                    <Image borderRadius="$2xl" source={{ uri: data.image }} size="lg" alt={data.title} />
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Language : {language} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Dubbing : {dubbing} </Text>
                </Box>

                <Box marginBottom={'$3'}>
                    <Text size='lg' color='black' >Subtitle : {subtitle} </Text>
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