import React from 'react';
import { Box, Text, Image, Card } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';

const Movie_Description = ({}) => {

  return (
    <Card size="md" variant="elevated" padding={0} margin={0} borderWidth={0} borderRadius="$2xl">
      <Box position='relative'>
        <Text color='black'>Hola, como estamos </Text>
      </Box>
    </Card>
  );
};

export default Movie_Description;