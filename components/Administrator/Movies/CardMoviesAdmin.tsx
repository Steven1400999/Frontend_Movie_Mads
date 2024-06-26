import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, TrashIcon, ButtonIcon, EditIcon, AlertDialogBackdrop, AlertDialogContent, AlertDialogCloseButton, Icon, AlertDialogBody, AlertDialogFooter, ButtonGroup } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { IpAddress } from '../../IpAddress';
import { AlertDialog } from '@gluestack-ui/themed';
import { AlertDialogHeader } from '@gluestack-ui/themed';
import { Heading } from '@gluestack-ui/themed';
import { CloseIcon } from '@gluestack-ui/themed';

const CardMoviesAdmin = ({ data }) => {
    const [token, setToken] = useState(null);
    const navigation = useNavigation();
    const [category, setCategory] = useState([]);
    const [dubbing, setDubbing] = useState([]);
    const [language, setLanguage] = useState([]);
    const [subtitle, setSubtitle] = useState([]);
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)


    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token);

                    const [categoryResponse, dubbingResponse, languageResponse, subtitleResponse] = await Promise.all([
                        axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/category_show`, { id: data.category_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
                        axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/dubbing_show`, { id: data.dubbing_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
                        axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/language_show`, { id: data.language_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
                        axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/subtitle_show`, { id: data.subtitle_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
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
                    `${IpAddress}/Backend_Movie_Mads/public/api/movie_destroy`,
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
            console.error('Error deleting movie:', error);
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

    }





    return (

        <Card bgColor='white' padding={10} variant="elevated" borderRadius="$2xl" borderColor='$blue800' borderWidth={1.5} hardShadow='2' >
            <Box width={'$80'}>

                <Box marginBottom={'$3'} >
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
                    <Button width={150} size="sm" variant="solid" action="primary" bgColor='$blue600' marginRight={12} onPress={handleNavigateUpdate} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={EditIcon} />

                    </Button>
                    <Button  width={150} size="sm" variant="solid" action="primary" marginRight={0} bgColor='$red500'  onPress={() => setShowAlertDialog(true)} isDisabled={false} isFocusVisible={false}>
                        
                        <ButtonText></ButtonText>
                        <ButtonIcon as={TrashIcon} />

                    </Button>
                </Box>
            </Box>
            <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Delete Movie</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to delete this movie? the movie will be permanently removed.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                    setShowAlertDialog(false);
                    handleDeleteMovie();
                }}
              >
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
        </Card>
    );
};

export default CardMoviesAdmin;