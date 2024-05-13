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
import { IpAddress } from '../../IpAddress';


const Movie_store = () => {
    const [formData, setFormData] = React.useState({});
    const [errors, setErrors] = React.useState({});
    const [token, setToken] = useState(null);
    const [categories, setCategories] = useState([]);
    const [dubbings, setDubbings] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [subtitles, setSubtitles] = useState([]);
    const navigation = useNavigation();
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedDubbing, setSelectedDubbing] = useState(null);
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [selectedSubtitle, setSelectedSubtitle] = useState(null);


    useEffect(() => {
        const getData = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token); // Update state after token retrieval
                    axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/category_index`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setCategories(response.data);
                        })
                        .catch(error => {
                            console.error('Error getting movies:', error);
                        });
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getData();


        const getdubbings = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token); // Update state after token retrieval
                    axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/dubbing_index`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setDubbings(response.data);
                        })
                        .catch(error => {
                            console.error('Error getting data:', error);
                        });
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getdubbings();

        const getlanguages = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token); // Update state after token retrieval
                    axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/language_index`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setLanguages(response.data);
                        })
                        .catch(error => {
                            console.error('Error getting data:', error);
                        });
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getlanguages();


        const getsubtitles = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    setToken(token); // Update state after token retrieval
                    axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/subtitle_index`, {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setSubtitles(response.data);
                        })
                        .catch(error => {
                            console.error('Error getting data:', error);
                        });
                }
            } catch (error) {
                console.log(error.message);
            }
        };

        getsubtitles();

    }, []);


    const onSubmit = async () => {
        try {
            //const response = await fetch(selectedImage);
            //const blob = await response.blob();
            //formData.append('Image', blob, )
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setToken(token);
                console.log(formData);
                axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/movie_store`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                        Authorization: `Bearer ${token}`,
                    },
                })
                    .then(response => {
                        console.log('Movie stored correctly', response.data);
                        navigation.navigate('Movies');
                        setFormData({});

                    })
                    .catch(error => {
                        console.error('Error storing a movie:', error);
                    });
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            quality: 1,
        });

        setFormData({
            ...formData,
            image: result.assets[0].uri
        });


        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            console.log(result);
        } else {
            alert('You didn´t select any image.');
        }
    };




    return (

        <ScrollView width={'$full'} height={'$full'}>

            <Box bg="white" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
                <Text color="black" size="2xl" marginTop={30}>Store a movie</Text>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Title</Text>
                    <Input variant="outline" size="md" isDisabled={false} borderColor='$blue700' borderWidth={2}>
                        <InputField id='title' type="text" placeholder="Title" color="black"
                            onChangeText={value => setFormData({
                                ...formData,
                                title: value
                            })} />

                    </Input>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Description</Text>
                    <Input variant="outline" size="md" isDisabled={false} borderColor='$blue700' borderWidth={2}>
                        <InputField id='description' type="text" placeholder="Description" color="black" onChangeText={value => setFormData({
                            ...formData,
                            description: value
                        })} />

                    </Input>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Duration</Text>
                    <Input variant="outline" size="md" isDisabled={false} borderColor='$blue700' borderWidth={2}>
                        <InputField id='duration' type="text" placeholder="HH:MM:SS" color="black" /*inputMode='numeric'*/ maxLength={8} onChangeText={value => setFormData({
                            ...formData,
                            duration: value
                        })} />
                    </Input>
                </Box>

                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="black" size="xl" textAlign="justify">Category</Text>
                    <FormControl isRequired={!selectedCategory} isInvalid={!selectedCategory}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary300'>
                                Choose the category of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select borderColor='$blue700' borderWidth={2} borderRadius={5} onValueChange={(value) => {
                            setFormData({ ...formData, category_id: value });
                            setSelectedCategory(value);
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
                                    {categories.map((category) => (
                                        <SelectItem
                                            key={category.id}
                                            label={category.category}
                                            value={category.id} />
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
                    <Text color="black" size="xl" textAlign="justify">Language</Text>
                    <FormControl isRequired={!selectedLanguage} isInvalid={!selectedLanguage}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary300'>
                                Choose the language of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select borderColor='$blue700' borderWidth={2} borderRadius={5} onValueChange={(value) => {
                            setFormData({ ...formData, language_id: value });
                            setSelectedLanguage(value);

                        }}
                        >
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
                                    {languages.map((language) => (
                                        <SelectItem
                                            key={language.id}
                                            label={language.language}
                                            value={language.id}
                                        />
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
                    <Text color="black" size="xl" textAlign="justify">Dubbing</Text>
                    <FormControl isRequired={!selectedDubbing} isInvalid={!selectedDubbing}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary300'>
                                Choose the dubbing of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select borderColor='$blue700' borderWidth={2} borderRadius={5} onValueChange={(value) => {
                            setFormData({ ...formData, dubbing_id: value });
                            setSelectedDubbing(value);

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
                                    {dubbings.map((dubbing) => (
                                        <SelectItem
                                            key={dubbing.id}
                                            label={dubbing.language}
                                            value={dubbing.id} />
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
                    <Text color="black" size="xl" textAlign="justify">Subtitle</Text>
                    <FormControl isRequired={!selectedSubtitle} isInvalid={!selectedSubtitle}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary300'>
                                Choose the subtitle of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select borderColor='$blue700' borderWidth={2} borderRadius={5} onValueChange={(value) => {

                            setFormData({ ...formData, subtitle_id: value });
                            setSelectedSubtitle(value);



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
                                    {subtitles.map((subtitle) => (
                                        <SelectItem
                                            key={subtitle.id}
                                            label={subtitle.language}
                                            value={subtitle.id} />
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
                    <Text color="black" size="xl" textAlign="justify">Image</Text>
                    <Button
                        bgColor='$secondary400'
                        size="md"
                        variant="solid"
                        action="primary"
                        isDisabled={false}
                        isFocusVisible={false}
                        onPress={pickImageAsync}>
                        <ButtonText>Choose Image </ButtonText>
                    </Button>
                    {selectedImage && (
                        <Box mt="$3" width="100%" alignItems="center">
                            <Image borderRadius="$2xl" source={{ uri: selectedImage }} size="xl" alt={selectedImage} />
                        </Box>
                    )}

                </Box>


                <Box marginTop="$1/6">
                    <Button action="primary" variant="solid" size="lg" isDisabled={false} bgColor="$cyan200" onPress={onSubmit}>
                        <ButtonText color='black'>Save movie</ButtonText>
                    </Button>
                </Box>



            </Box>
        </ScrollView>

    );
};

export default Movie_store;
