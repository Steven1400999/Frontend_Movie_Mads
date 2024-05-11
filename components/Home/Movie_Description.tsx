import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, AccordionItem, AccordionTrigger, AccordionIcon, AccordionTitleText, AddIcon, AccordionContent, AccordionContentText, Accordion } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';
import { AccordionHeader } from '@gluestack-ui/themed';
import { RemoveIcon } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import Card_Schedules from './Card_Schedules';
import { ScrollView } from '@gluestack-ui/themed';

const Movie_Description = ({ route }) => {
  const { movie } = route.params;
  const [token, setToken] = useState([]);

  const [category, setCategory] = useState([]);
  const [dubbing, setDubbing] = useState([]);
  const [language, setLanguage] = useState([]);
  const [subtitle, setSubtitle] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await AsyncStorage.getItem('token');
        if (token !== null) {
          setToken(token);

          const [categoryResponse, dubbingResponse, languageResponse, subtitleResponse, schedulesResponse] = await Promise.all([
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/category_show`, { id: movie.category_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/dubbing_show`, { id: movie.dubbing_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/language_show`, { id: movie.language_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/subtitle_show`, { id: movie.subtitle_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),

          ]);

          setCategory(categoryResponse.data.category);
          setDubbing(dubbingResponse.data.language);
          setLanguage(languageResponse.data.language);
          setSubtitle(subtitleResponse.data.language);


        }        

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);


  return (
    <ScrollView width={'$full'} bg="white" height={'$full'}>

    <Box bg="white" height={'$full'}>

      <Box flexDirection="row" alignItems="center" paddingTop={20}>
        <Image
          borderRadius="$lg"
          alt={movie.title}
          height={250}
          width={175}
          borderColor='black'
          borderWidth={0.5}
          hardShadow='5'
          source={{
            uri: movie.image
          }}
          marginRight={20}
          marginLeft={20}
        />

        <Box flex={1}>

          <Text color='black' size='2xl'>{movie.title}</Text>



        </Box>

      </Box>

      <Box width={'$full'} alignItems='center'>
        <Accordion
          variant="unfilled"
          size="sm"
          m="$5"
          borderWidth={1}
          borderColor="$borderDark800"
          width="90%"
          maxWidth={640}
          backgroundColor="white"
        >
          <AccordionItem value="a">
            <AccordionHeader
              backgroundColor="white"
            >
              <AccordionTrigger>
                {({ isExpanded }) => (
                  <>
                    {isExpanded ? (
                      <AccordionIcon as={RemoveIcon} color='black' />
                    ) : (
                      <AccordionIcon as={AddIcon} color='black' />
                    )}
                    <AccordionTitleText ml="$3" color='black' >More info</AccordionTitleText>
                  </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent pb="$0">
              <Accordion
                width="100%"
                shadowColor="transparent"
                borderWidth={1}

                borderColor="$borderDark700"
                backgroundColor="white"

              >
                <AccordionItem value="b">
                  <AccordionHeader
                    backgroundColor="white" >
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} color='black' />
                          ) : (
                            <AccordionIcon as={AddIcon} color='black' />
                          )}
                          <AccordionTitleText ml="$3" color='black'>
                            Description
                          </AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent backgroundColor="white" mt="$0">
                    <AccordionContentText color='black' >
                      {movie.description}
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                width="100%"
                shadowColor="transparent"
                borderWidth={1}
                mt="$5"
                borderColor="$borderDark700"
                backgroundColor="white"

              >
                <AccordionItem value="c">
                  <AccordionHeader
                    backgroundColor="white" >
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} color='black' />
                          ) : (
                            <AccordionIcon as={AddIcon} color='black' />
                          )}
                          <AccordionTitleText ml="$3" color='black'>Category</AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent backgroundColor="white" mt="$0">
                    <AccordionContentText color='black' fontWeight='$bold'  >
                      {category}
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion
                width="100%"
                shadowColor="transparent"
                borderWidth={1}
                mt="$5"
                borderColor="$borderDark700"
                backgroundColor="$backgroundDark950"

              >
                <AccordionItem value="d">
                  <AccordionHeader
                    backgroundColor="white" >
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} color='black' />
                          ) : (
                            <AccordionIcon as={AddIcon} color='black' />
                          )}
                          <AccordionTitleText ml="$3" color='black' >Language</AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent backgroundColor="white" mt="$0">
                    <AccordionContentText>
                      <Text fontWeight='$bold' color='black' > Language: </Text> <Text color='black'>{language}</Text>
                    </AccordionContentText>
                    <AccordionContentText>
                      <Text fontWeight='$bold' color='black' > Dubbing: </Text> <Text color='black'>{dubbing}</Text>
                    </AccordionContentText>
                    <AccordionContentText>
                      <Text fontWeight='$bold' color='black' > Subtitles: </Text> <Text color='black'>{subtitle}</Text>
                    </AccordionContentText>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                width="100%"
                shadowColor="transparent"
                borderWidth={1}
                mt="$5"
                mb="$5"
                borderColor="$borderDark700"
                backgroundColor="white"

              >
                <AccordionItem value="c">
                  <AccordionHeader backgroundColor="white" >
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} color='black' />
                          ) : (
                            <AccordionIcon as={AddIcon} color='black' />
                          )}
                          <AccordionTitleText ml="$3" color='black' >Duration</AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent backgroundColor="white" mt="$0">
                    <AccordionContentText>
                      <Text fontWeight='$bold' color='black' >{movie.duration}</Text>  <Text color='black' > Hours</Text>
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>

      <Box>
          <Card_Schedules movie_id={movie.id}/>
       
      </Box>


    </Box>

    </ScrollView>
  );
};

export default Movie_Description;