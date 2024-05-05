import React from 'react';
import { Box, Text, Image, Card } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';


const Card_Movies = ({ movie }) => {

  return (
    <Card size="md" variant="elevated" padding={0} margin={0} borderWidth={0} borderRadius="$2xl">
      <Box position='relative'>
        <Image  
        size="2xl"  
         borderRadius="$2xl"
          objectFit='cover'
           source={{uri: movie.image}}
           alt={movie.title} 
           />
      </Box>
    </Card>
  );
};

export default Card_Movies;