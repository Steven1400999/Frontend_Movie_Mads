import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text, Image, Input, InputField, Button, ButtonText, ButtonSpinner, Link, GluestackUIProvider, Select, SelectTrigger, SelectIcon, SelectPortal, FormControl, FormControlLabel, FormControlHelperText, FormControlErrorText, FormControlError, FormControlLabelText } from '@gluestack-ui/themed';
import { SelectInput } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { SelectBackdrop } from '@gluestack-ui/themed';
import { SelectContent } from '@gluestack-ui/themed';
import { SelectDragIndicatorWrapper } from '@gluestack-ui/themed';
import { SelectItem } from '@gluestack-ui/themed';
import { SelectDragIndicator } from '@gluestack-ui/themed';
import { FormControlHelper } from '@gluestack-ui/themed';
import { FormControlErrorIcon } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';
import { ChevronDownIcon } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';


const Create_Movie_Function = () => {
    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [token, setToken] = useState(null);
    const [movies, setMovies] = useState([]);
    const navigation = useNavigation();
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [date, setDate] = useState('');
    const [time, setTime] = useState('');


    useEffect(() => {
        const getMovies = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token);
                    axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/movie_index`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setMovies(response.data);
                        })
                        .catch(error => {
                            console.error('Error geting movies:', error);
                        });
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getMovies();

    }, []);



    const handleDateChange = (value) => {
        setDate(value);
        // Actualiza el formData inmediatamente cada vez que cambia el valor
        setFormData({
            ...formData,
            start_time: `${value} ${time}`
        });
    };

    const handleTimeChange = (value) => {
        setTime(value);
        // Actualiza el formData inmediatamente cada vez que cambia el valor
        setFormData({
            ...formData,
            start_time: `${date} ${value}`
        });
    };



    const onSubmit = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setToken(token);
                console.log(formData);
                axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/schedule_store`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        console.log('Schedule stored correctly', response.data);
                        navigation.navigate('Movies');
                        setFormData({});

                    })
                    .catch(error => {
                        console.error('Error geting movies:', error);
                    });
            }
        } catch (error) {
            console.log(error.message);
        }
    };


    return (

        <ScrollView width={'$full'} height={'$full'} bgColor='white' >

            <Box bg="white" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
                <Text color="black" size="2xl" marginTop={30}>Store a movie function</Text>



                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Movie</Text>
                    <FormControl isRequired={!selectedMovie} isInvalid={!selectedMovie}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary300'>
                                Choose the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select borderColor='$blue700' borderWidth={2} borderRadius={5} onValueChange={(value) => {
                            setFormData({ ...formData, movie_id: value });
                            setSelectedMovie(value);
                        }}>
                            <SelectTrigger>
                                <SelectInput color='black' placeholder="Select option" />
                                <SelectIcon mr="$3">
                                    <Icon as={ChevronDownIcon} />
                                </SelectIcon>
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    {movies.map((movie) => (
                                        <SelectItem
                                            key={movie.id}
                                            label={movie.title}
                                            value={movie.id} />
                                    ))}
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                        <FormControlHelper>
                            <FormControlHelperText>
                                You can only select one option
                            </FormControlHelperText>
                        </FormControlHelper>
                        <FormControlError>
                            <FormControlErrorText>Mandatory field</FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                </Box>

                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Start Hour</Text>
                    <Input variant="outline" size="md" isDisabled={false} borderColor='$blue700' borderWidth={2}>
                        <InputField id='title' type="text" placeholder="HH:MM:SS" color="black"
                            onChangeText={handleTimeChange} />

                    </Input>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Date</Text>
                    <Input variant="outline" size="md" isDisabled={false} borderColor='$blue700' borderWidth={2}>
                        <InputField id='title' type="text" placeholder="YYYY-MM-DD" color="black"
                            onChangeText={handleDateChange} />

                    </Input>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Room</Text>
                    <FormControl isRequired={!selectedMovie} isInvalid={!selectedMovie}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary300'>
                                Choose the room
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select borderColor='$blue700' borderWidth={2} borderRadius={5} onValueChange={(value) => {
                            setFormData({ ...formData, room: value });
                        }}>
                            <SelectTrigger>
                                <SelectInput color='black' placeholder="Select option" />
                                <SelectIcon mr="$3">
                                    <Icon as={ChevronDownIcon} />
                                </SelectIcon>
                            </SelectTrigger>
                            <SelectPortal>
                                <SelectBackdrop />
                                <SelectContent>
                                    <SelectDragIndicatorWrapper>
                                        <SelectDragIndicator />
                                    </SelectDragIndicatorWrapper>
                                    <SelectItem label="Room 1" value="1" />
                                    <SelectItem label="Room 2" value="2" />
                                    <SelectItem label="Room 3" value="3" />
                                    <SelectItem label="Room 4" value="4" />
                                    <SelectItem label="Room 5" value="5" />
                                    <SelectItem label="Room 6" value="6" />
                                    <SelectItem label="Room 7" value="7" />
                                    <SelectItem label="Room 8" value="8" />
                                    <SelectItem label="Room 9" value="9" />
                                    <SelectItem label="Room 10" value="10" />
                                </SelectContent>
                            </SelectPortal>
                        </Select>
                        <FormControlHelper>
                            <FormControlHelperText>
                                You can only select one option
                            </FormControlHelperText>
                        </FormControlHelper>
                        <FormControlError>
                            <FormControlErrorText>Mandatory field</FormControlErrorText>
                        </FormControlError>
                    </FormControl>
                </Box>







                <Box marginTop="$1/6">
                    <Button action="primary" variant="solid" size="lg" isDisabled={false} bgColor="$cyan200" onPress={onSubmit}>
                        <ButtonText color='black'>Save schedule</ButtonText>
                    </Button>
                </Box>





            </Box>
        </ScrollView>

    );
};

export default Create_Movie_Function;
