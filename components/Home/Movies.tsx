import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Text } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Card_Movies from './Card_Movies';
import { ScrollView } from '@gluestack-ui/themed';
import { useFocusEffect } from '@react-navigation/native';

const Movie = () => {
    const [movies, setMovies] = useState([]);
    const [token, setToken] = useState(null);

    const fetchData = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            if (token !== null) {
                setToken(token); // Update state after token retrieval
                const response = await axios.get('http://192.168.0.15/Backend_Movie_Mads/public/api/movie_index', {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                });
                setMovies(response.data);
            }
        } catch (error) {
            console.error('Error al obtener las películas:', error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            fetchData();
        }, [])
    );
    
    return (
        <ScrollView width={'$full'} bg="$secondary950" height={'$full'}>

        <Box  alignItems='center' >         
             <Box  alignItems='center' flexDirection='row' flexWrap='wrap' justifyContent='center' marginTop={20}>

                {movies.map((movie) => (
                    <Box key={movie.id} width='45%' margin={5}>
                        <Card_Movies key={movie.id} movie={movie} />
                    </Box>

                ))}
            </Box>
        </Box>
        </ScrollView>

    );
};

export default Movie;