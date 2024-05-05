import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Accordion, AccordionTitleText, Box, Button, ButtonText } from '@gluestack-ui/themed';
import { AccordionItem } from '@gluestack-ui/themed';
import { AccordionHeader } from '@gluestack-ui/themed';
import { AccordionIcon } from '@gluestack-ui/themed';
import { ChevronUpIcon } from '@gluestack-ui/themed';
import { AccordionTrigger } from '@gluestack-ui/themed';
import { AccordionContentText } from '@gluestack-ui/themed';
import { AccordionContent } from '@gluestack-ui/themed';
import { ChevronDownIcon } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { Text } from '@gluestack-ui/themed';
import CardCategories from './CardCategories';
import { IpAddress } from '../IpAddress';

const Manage_Categories = () => {
    const [token, setToken] = useState(null);
    const [categories, setCategories] = useState([]);
    const navigation = useNavigation();


    const fetchDataCategories = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
            }
            const response = await axios.get(`${IpAddress}/Backend_Movie_Mads/public/api/category_index`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            });
            setCategories(response.data);
        }
        catch (error) {
            console.error('Something went wrong:', error);
        }
    };



    useEffect(() => {
        fetchDataCategories();
    }, []);


    useFocusEffect(
        React.useCallback(() => {
            fetchDataCategories();
        }, [])
    );

    const handleStoreCategory = () => {
        navigation.navigate('Store_Category');
    };

    return (

        <ScrollView width={'$full'} bg="$secondary950" height={'$full'}>
            <Box bg="$secondary900" p="$5" padding={20} marginTop={0} height="100%" alignItems="center">


                <Button size="lg" variant="solid" action="primary" bgColor='$indigo400' isDisabled={false} isFocusVisible={false} onPress={handleStoreCategory} >
                    <ButtonText>Store a category </ButtonText>
                </Button>


                <Box paddingTop={15}>
                    {categories.map((category) => (
                        <Box key={category.id} width="100%" paddingBottom={10}>
                            <CardCategories data={category} />
                        </Box>
                    ))}
                </Box>
            </Box>

        </ScrollView>
    );
};

export default Manage_Categories;
