import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, AccordionItem, AccordionTrigger, AccordionIcon, AccordionTitleText, AddIcon, AccordionContent, AccordionContentText, Accordion } from '@gluestack-ui/themed';
import { IpAddress } from '../IpAddress';
import { AccordionHeader } from '@gluestack-ui/themed';
import { RemoveIcon } from '@gluestack-ui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

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

          const [categoryResponse, dubbingResponse, languageResponse, subtitleResponse] = await Promise.all([
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/category_show`, { id: movie.category_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/dubbing_show`, { id: movie.dubbing_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/language_show`, { id: movie.language_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } }),
            axios.post(`${IpAddress}/Backend_Movie_Mads/public/api/subtitle_show`, { id: movie.subtitle_id }, { headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` } })
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






  console.log("Movie.routes: ", { movie });
  return (
    <Box bg="$secondary950" height={'$full'}>

      <Box flexDirection="row" alignItems="center" paddingTop={20}>
        <Image
          borderRadius="$lg"
          alt={movie.title}
          height={250}
          width={175}
          source={{
            uri: movie.image
          }}
          marginRight={20}
          marginLeft={20}
        />

        <Box flex={1}>

          <Text color='white' size='2xl'>{movie.title}</Text>
        </Box>

      </Box>

      <Box width={'$full'} alignItems='center'>
        <Accordion
          variant="unfilled"
          size="sm"
          m="$5"
          borderWidth={1}
          borderColor="$borderLight300"
          $dark-borderColor="$borderDark700"
          width="90%"
          maxWidth={640}
        >
          <AccordionItem value="a">
            <AccordionHeader
              sx={{
                backgroundColor: "$backgroundLight0",
                _dark: {
                  backgroundColor: "$backgroundDark950",
                },
              }}
            >
              <AccordionTrigger>
                {({ isExpanded }) => (
                  <>
                    {isExpanded ? (
                      <AccordionIcon as={RemoveIcon} />
                    ) : (
                      <AccordionIcon as={AddIcon} />
                    )}
                    <AccordionTitleText ml="$3">More info</AccordionTitleText>
                  </>
                )}
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent pb="$0">
              <Accordion
                width="100%"
                shadowColor="transparent"
                borderWidth={1}
                sx={{
                  borderColor: "$borderLight300",
                  backgroundColor: "$backgroundLight0",
                  _dark: {
                    borderColor: "$borderDark700",
                    backgroundColor: "$backgroundDark950",
                  },
                }}
              >
                <AccordionItem value="b">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} />
                          ) : (
                            <AccordionIcon as={AddIcon} />
                          )}
                          <AccordionTitleText ml="$3">
                            Description
                          </AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      {movie.description}
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <Accordion
                width="100%"
                shadowColor="transparent"
                mt="$5"
                sx={{
                  backgroundColor: "$backgroundLight0",
                  _dark: {
                    backgroundColor: "$backgroundDark950",
                  },
                }}
              >
                <AccordionItem value="c">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} />
                          ) : (
                            <AccordionIcon as={AddIcon} />
                          )}
                          <AccordionTitleText ml="$3">Category</AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      {category}
                    </AccordionContentText>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <Accordion
                width="100%"
                shadowColor="transparent"
                mt="$5"
                mb='$5'
                sx={{
                  backgroundColor: "$backgroundLight0",
                  _dark: {
                    backgroundColor: "$backgroundDark950",
                  },
                }}
              >
                <AccordionItem value="d">
                  <AccordionHeader>
                    <AccordionTrigger>
                      {({ isExpanded }) => (
                        <>
                          {isExpanded ? (
                            <AccordionIcon as={RemoveIcon} />
                          ) : (
                            <AccordionIcon as={AddIcon} />
                          )}
                          <AccordionTitleText ml="$3">Language</AccordionTitleText>
                        </>
                      )}
                    </AccordionTrigger>
                  </AccordionHeader>
                  <AccordionContent>
                    <AccordionContentText>
                      <Text fontWeight='$bold'> Language: </Text>{language}
                    </AccordionContentText>
                    <AccordionContentText>
                      <Text fontWeight='$bold'> Dubbing: </Text>{dubbing}
                    </AccordionContentText>
                    <AccordionContentText>
                      <Text fontWeight='$bold'> Subtitles: </Text>{subtitle}
                    </AccordionContentText>

                  </AccordionContent>
                </AccordionItem>
              </Accordion>

            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Box>


      <Box>



      </Box>



    </Box>
  );
};

export default Movie_Description;