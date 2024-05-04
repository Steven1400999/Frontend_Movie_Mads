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



const Movie_update = ({ route }) => {

    const { id, title, description, duration, image, language_id, dubbing_id, subtitle_id, category_id } = route.params || {};
    const [formData, setFormData] = useState({
        id,
        title,
        description,
        duration,
        image,
        language_id,
        dubbing_id,
        subtitle_id,
        category_id
    });

    console.log("Datos", id, title);


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
                    setToken(token);
                    axios.get('http://192.168.0.15/Backend_Movie_Mads/public/api/category_index', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setCategories(response.data);
                        })
                        .catch(error => {
                            console.error('Error al obtener las películas:', error);
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
                    axios.get('http://192.168.0.15/Backend_Movie_Mads/public/api/dubbing_index', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setDubbings(response.data);
                        })
                        .catch(error => {
                            console.error('Error al obtener las películas:', error);
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
                    axios.get('http://192.168.0.15/Backend_Movie_Mads/public/api/language_index', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setLanguages(response.data);
                        })
                        .catch(error => {
                            console.error('Error al obtener las películas:', error);
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
                    axios.get('http://192.168.0.15/Backend_Movie_Mads/public/api/subtitle_index', {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },
                    })
                        .then(response => {
                            setSubtitles(response.data);
                        })
                        .catch(error => {
                            console.error('Error al obtener las películas:', error);
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
           
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setToken(token);
                console.log(formData);
                axios.post('http://192.168.0.15/Backend_Movie_Mads/public/api/movie_update', formData, {
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
                        console.error('Error al obtener las películas:', error);
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


    const isFormChanged =
    formData.title !== title ||
    formData.description !== description ||
    formData.duration !== duration ||
    formData.category_id !== category_id ||
    formData.language_id !== language_id ||
    formData.dubbing_id !== dubbing_id ||
    formData.subtitle_id !== subtitle_id ||
    formData.image !== image;


    return (

        <ScrollView width={'$full'} height={'$full'}>

            <Box bg="$secondary950" p="$5" paddingTop={2} marginTop={0} height="100%" alignItems="center">
                <Text color="white" size="2xl" marginTop={30}>Update movie</Text>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="white" size="xl" textAlign="justify">Title</Text>
                    <Input variant="outline" size="md" isDisabled={false}>
                        <InputField id='title' type="text" placeholder="Title" color="white"
                            onChangeText={value => setFormData({
                                ...formData,
                                title: value
                            })} >
                            {title}
                        </InputField>

                    </Input>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="white" size="xl" textAlign="justify">Description</Text>
                    <Input variant="outline" size="md" isDisabled={false}>
                        <InputField id='description' type="text" placeholder="Description" color="white" onChangeText={value => setFormData({
                            ...formData,
                            description: value
                        })} >
                            {description}
                        </InputField>
                    </Input>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="white" size="xl" textAlign="justify">Duration</Text>
                    <Input variant="outline" size="md" isDisabled={false}>
                        <InputField id='duration' type="text" placeholder="HH:MM:SS" color="white" /*inputMode='numeric'*/ maxLength={8} onChangeText={value => setFormData({
                            ...formData,
                            duration: value
                        })} >
                            {duration}
                        </InputField>
                    </Input>
                </Box>

                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="white" size="xl" textAlign="justify">Category</Text>
                    <FormControl isRequired={!selectedCategory} isInvalid={!selectedCategory}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary200'>
                                Choose the category of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={(value) => {
                            setFormData({ ...formData, category_id: value });
                            setSelectedCategory(value);
                        }}
                        >

                            <SelectTrigger>
                            <SelectInput placeholder={categories.find(cat => cat.id === formData.category_id)?.category || "Select option"} />
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

                    </FormControl>
                </Box>


                <Box mt="$5" marginTop="$5" width="80%">
                    <Text color="white" size="xl" textAlign="justify">Language</Text>
                    <FormControl isRequired={!selectedLanguage} isInvalid={!selectedLanguage}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary200'>
                                Choose the language of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={(value) => {
                            setFormData({ ...formData, language_id: value });
                            setSelectedLanguage(value);

                        }}
                        >
                            <SelectTrigger>
                            <SelectInput placeholder={languages.find(lan => lan.id === formData.language_id)?.language || "Select option"} />
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
                    <Text color="white" size="xl" textAlign="justify">Dubbing</Text>
                    <FormControl isRequired={!selectedDubbing} isInvalid={!selectedDubbing}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary200'>
                                Choose the dubbing of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={(value) => {
                            setFormData({ ...formData, dubbing_id: value });
                            setSelectedDubbing(value);

                        }}>
                            <SelectTrigger>
                            <SelectInput placeholder={dubbings.find(dub => dub.id === formData.dubbing_id)?.language || "Select option"} />
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
                    <Text color="white" size="xl" textAlign="justify">Subtitle</Text>
                    <FormControl isRequired={!selectedSubtitle} isInvalid={!selectedSubtitle}>
                        <FormControlLabel>
                            <FormControlLabelText color='$secondary200'>
                                Choose the subtitle of the movie
                            </FormControlLabelText>
                        </FormControlLabel>
                        <Select onValueChange={(value) => {

                            setFormData({ ...formData, subtitle_id: value });
                            setSelectedSubtitle(value);



                        }}>
                            <SelectTrigger>
                            <SelectInput placeholder={subtitles.find(sub => sub.id === formData.subtitle_id)?.language || "Select option"} />
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
                    <Text color="white" size="xl" textAlign="justify">Image</Text>
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
                        <Box mt="$3" width="100%" alignItems="center">
                            <Image borderRadius="$2xl" source={{ uri: image }} size="xl" alt={image} />
                        </Box>
                    

                </Box>


                <Box marginTop="$1/6">
                    <Button action="primary" variant="solid" size="lg" 
                     bgColor={isFormChanged ? '$cyan200' : '$gray400'}
                         isDisabled={!isFormChanged} onPress={onSubmit}>
                        <ButtonText color='black'>Save movie</ButtonText>
                    </Button>
                </Box>



            </Box>
        </ScrollView>

    );
};

export default Movie_update;
