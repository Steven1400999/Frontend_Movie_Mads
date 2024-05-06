import React from 'react';
import { Box, Text, Image, Card } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';

const Movie_Description = ({ route }) => {
  const { movie } = route.params;

  console.log("este: ", { movie });
  return (
    <Box bg="$secondary950" height={'$full'}>
      <Card size="md" variant="elevated" padding={0} margin={0} borderWidth={0} borderRadius="$2xl">
        <Box position='relative'>
          <Image
            borderRadius="$none"
            alt={movie.title}
            size='full'
            source={{
              uri: movie.image
            }}
          />
        </Box>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          bg="rgba(0, 0, 0, 0.5)" // Color oscuro con transparencia
        >

          <Box marginTop={30} bgColor='rgba(0, 0, 0, 0.20)' marginHorizontal={30} borderRadius={'$md'}>
          <Text color="white" size='xl' textAlign="center" marginTop="auto" marginBottom="auto" padding={10} >
           {movie.title}
          </Text>
          </Box>
         
        </Box>
      </Card>
    </Box>
  );
};

export default Movie_Description;