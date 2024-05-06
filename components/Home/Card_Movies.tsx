import React from 'react';
import { Box, Text, Image, Card } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const Card_Movies = ({ movie }) => {
  const navigation = useNavigation();

  const handleImagePress = () => {

    navigation.navigate('Movie_Description',{ movie});
  };

  return (
    <Card size="md" variant="elevated" padding={0} margin={0} borderWidth={0} borderRadius="$2xl">
      <Box position='relative'>

        <TouchableOpacity onPress={handleImagePress}>
          <Image
            size="2xl"
            borderRadius="$2xl"
            objectFit='cover'
            source={{ uri: movie.image }}
            alt={movie.title}
          />
        </TouchableOpacity>

      </Box>
    </Card>
  );
};

export default Card_Movies;