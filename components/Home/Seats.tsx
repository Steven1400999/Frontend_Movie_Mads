import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, AccordionItem, AccordionTrigger, AccordionIcon, AccordionTitleText, AddIcon, AccordionContent, AccordionContentText, Accordion, Button, ButtonText } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';
import { AccordionHeader } from '@gluestack-ui/themed';
import { RemoveIcon } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Card_Schedules from './Card_Schedules';
import { ScrollView } from '@gluestack-ui/themed';
import { Alert, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

const Seats = ({ route }) => {
    const { schedule_id, movie_id } = route.params;
    const [schedules, setSchedules] = useState([]);
    const [seats, setSeats] = useState([]);
    const [movie, setMovie] = useState([]);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchToken = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    const response = await axios.post(
                        `${IpAddress}/Backend_Movie_Mads/public/api/seat_show`,
                        { schedule_id: schedule_id },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setSchedules(response.data);
                    setSeats(response.data);

                    console.log("this are the seats: ", response.data);

                }
            } catch (error) {
                console.error('Error al obtener el token:', error);
            }
        };

        fetchToken();


        const fetchImage = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                if (token !== null) {
                    const response = await axios.post(
                        `${IpAddress}/Backend_Movie_Mads/public/api/movie_show`,
                        { id: movie_id },
                        {
                            headers: {
                                'Content-Type': 'application/json',
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    setMovie(response.data);

                    console.log("this are the movie: ", response.data);

                }
            } catch (error) {
                console.error('Error al obtener el token:', error);
            }
        };

        fetchImage();

    }, []);

    
    const toggleSeatSelection = (id) => {
        setSelectedSeats(current => {
            const isAlreadySelected = current.includes(id);
            if (isAlreadySelected) {
                return current.filter(seatId => seatId !== id);
            } else {
                if (current.length < 5) {
                    return [...current, id];
                } else {
                    Alert.alert("Limit Reached", "You can only select up to 5 seats.");
                    return current;
                }
            }
        });
    };
    const handleReserveSeats = async () => {
        const token = await AsyncStorage.getItem('token');
        const userId = await AsyncStorage.getItem('user_id');

        if (!token || !userId) {
            Alert.alert("Authentication Required", "Please log in to continue.");
            return;
        }

        try {
            const reservationResponse = await axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/reservation_store`, {
                user_id: userId,
                schedule_id: schedule_id,
                seats: selectedSeats,
                qr_code: 'Optional-QR-Code'
            }, {
                headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json' }
            });

             if (reservationResponse.status === 201) {
                Alert.alert("Success", "Seats reserved successfully.", [
                    { text: "OK", onPress: () => navigation.navigate('Movies') }
                ]);
                setSelectedSeats([]);
                setSeats(await fetchSeats()); // Refetch the seats to update the UI
            }

        } catch (error) {
        }
    };

    const styles = StyleSheet.create({
        container: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'center',
            padding: 10
        },
        seat: {
            width: 30,
            height: 30,
            margin: 5,
            borderRadius: 5,
            borderWidth: 2,
            borderColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
             backgroundColor: 'white',
        // Adding shadow properties
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.50,
        elevation: 2,
        },
        seatText: {
            color: 'white'
        }
    });
    return (
        <ScrollView contentContainerStyle={styles.container}>
        <Box width={'$full'} alignItems='center' mb={7}>
            {movie.image && (
                <Image
                    borderRadius="$2xl"
                    objectFit='cover'
                    style={{ height: 300, width: 200 }}
                    alt={movie.title}
                    source={{ uri: movie.image }}
                />
            )}
        </Box>
        {seats.map((seat) => (
            <TouchableOpacity
                key={seat.id}
                style={[
                    styles.seat,
                    { backgroundColor: selectedSeats.includes(seat.id) ? 'blue' : seat.status === 'occupied' ? 'gray' : 'white' },
                ]}
                onPress={() => toggleSeatSelection(seat.id)}
                disabled={seat.status === 'occupied'}
            >
                <Text style={styles.seatText}>{seat.seat_number}</Text>
            </TouchableOpacity>
        ))}
        <Box width={'$full'} alignItems='center' mt={30}>
            <Button
                size="xl"
                variant="solid"
                action="primary"
                bgColor='$blue700'
                onPress={handleReserveSeats}
                isDisabled={selectedSeats.length === 0}
            >
                <ButtonText>Reserve</ButtonText>
            </Button>
        </Box>
    </ScrollView>
    );
};

export default Seats;