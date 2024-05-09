import React, { useEffect, useState } from 'react';
import { Box, Text, Image, Card, Button, ButtonText, AlertIcon, ButtonIcon, EditIcon, AlertDialog, AlertDialogBackdrop, AlertDialogContent, AlertDialogHeader, Heading, AlertDialogCloseButton, AlertDialogFooter } from '@gluestack-ui/themed';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from '@gluestack-ui/themed';
import { InfoIcon } from '@gluestack-ui/themed';
import { useNavigation } from '@react-navigation/native';
import { IpAddress } from '../IpAddress';
import { TrashIcon } from '@gluestack-ui/themed';
import { AlertDialogBody } from '@gluestack-ui/themed';
import { Icon } from '@gluestack-ui/themed';
import { CloseIcon } from '@gluestack-ui/themed';
import { ButtonGroup } from '@gluestack-ui/themed';

const CardSubtitles = ({ data }) => {
    const [token, setToken] = useState(null);
    const navigation =useNavigation();
    const [showAlertDialog, setShowAlertDialog] = React.useState(false)

    useEffect(() => {
      const fetchToken = async () => {
        try {
          const token = await AsyncStorage.getItem('token');
          if (token !== null) {
            setToken(token);
          }
        } catch (error) {
          console.error('Error al obtener el token:', error);
        }
      };
  
      fetchToken();
    }, []);
  
    const handleDeleteSubtitle = async () => {
      try {
        if (token !== null) {
            const response = await axios.post(
                `${IpAddress}/Backend_Movie_Mads/public/api/subtitle_destroy`,
                { id: data.id }, 
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
          console.log(response);
          navigation.navigate('Movies');

        }
      } catch (error) {
        console.error('Error al eliminar el idioma:', error);
      }
    };

    const handleNavigateUpdate = () => {
      navigation.navigate('Update_Subtitle', {
        id: data.id,
        language: data.language
      });
    };

    return (
        
        <Card width="$full" padding={10} variant="elevated" borderRadius="$2xl">
        <Box width="$full" padding={10} display="flex" flexDirection="row" justifyContent="space-between">
            <Text size='lg' color='black' >{data.language}</Text>

            <Box display="flex" flexDirection="row" alignItems="center">
                    <Button size="sm" variant="solid" action="primary" bgColor='$info500' marginRight={12} onPress={handleNavigateUpdate} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={EditIcon} />
                    </Button>
                    <Button size="sm" variant="solid" action="primary" marginRight={0} bgColor='$red500' onPress={() => setShowAlertDialog(true)} isDisabled={false} isFocusVisible={false}>
                        <ButtonText></ButtonText>
                        <ButtonIcon as={TrashIcon} />
                    </Button>
                </Box>
        </Box>


        <AlertDialog
        isOpen={showAlertDialog}
        onClose={() => {
          setShowAlertDialog(false)
        }}
      >
        <AlertDialogBackdrop />
        <AlertDialogContent>
          <AlertDialogHeader>
            <Heading size="lg">Delete subtitle</Heading>
            <AlertDialogCloseButton>
              <Icon as={CloseIcon} />
            </AlertDialogCloseButton>
          </AlertDialogHeader>
          <AlertDialogBody>
            <Text size="sm">
              Are you sure you want to delete this subtitle? The subtitle will be permanently removed.
            </Text>
          </AlertDialogBody>
          <AlertDialogFooter>
            <ButtonGroup space="lg">
              <Button
                variant="outline"
                action="secondary"
                onPress={() => {
                  setShowAlertDialog(false)
                }}
              >
                <ButtonText>Cancel</ButtonText>
              </Button>
              <Button
                bg="$error600"
                action="negative"
                onPress={() => {
                    setShowAlertDialog(false);
                    handleDeleteSubtitle();
                }}
              >
                <ButtonText>Delete</ButtonText>
              </Button>
            </ButtonGroup>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>



    </Card>
    );
};

export default CardSubtitles;