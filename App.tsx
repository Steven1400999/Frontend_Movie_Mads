import { config } from '@gluestack-ui/config';
import { Box, CalendarDaysIcon, GluestackUIProvider, Icon, Text } from '@gluestack-ui/themed';
import Card_Movies from './components/Home/Card_Movies'
import Register from './components/Register'
import Login from './components/Login';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import Movies from './components/Home/Movies';
import Movie_store from './components/Administrator/Movies/Movie_store'
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from '@gluestack-ui/themed';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Manage_Languages from './components/Languages/Manage_Languages';
import UpdateLanguages from './components/Languages/UpdateLanguage';
import Store_Language from './components/Languages/Store_Language';
import Manage_Subtitles from './components/Subtitles/Manage_Subtitles';
import Update_Subtitle from './components/Subtitles/Update__Subtitle';
import Store_Subtitle from './components/Subtitles/Store_Subtitle';
import Manage_Dubbings from './components/Dubbings/Manage_Dubbings';
import Update_Dubbing from './components/Dubbings/Update_Dubbing';
import Store_Dubbing from './components/Dubbings/Store_Dubbing';
import Manage_Categories from './components/Categories/Manage_Categories';
import Update_Category from './components/Categories/Update_Category';
import Store_Category from './components/Categories/Store_Category';
import Manage_Movies from './components/Administrator/Movies/Manage_Movies';
import Update_Movie from './components/Administrator/Movies/Update_Movie';
import Movie_Description from './components/Home/Movie_Description';
import Seats from './components/Home/Seats';
import Create_Movie_Function from './components/Administrator/Create_Movie_Function';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Reservations from './components/Reservations';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Logo = require('./assets/Logo/Logo_Login.jpg');

function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Movies" component={Movies} />
      <Drawer.Screen name="Manage_Languages" component={Manage_Languages} />
      <Drawer.Screen name="Manage_Subtitles" component={Manage_Subtitles} />
      <Drawer.Screen name="Manage_Dubbings" component={Manage_Dubbings} />
      <Drawer.Screen name="Manage_Categories" component={Manage_Categories} />
      <Drawer.Screen name="Manage_Movies" component={Manage_Movies} />
      <Drawer.Screen name="Create_Movie_Function" component={Create_Movie_Function} />
      <Drawer.Screen name="Reservations" component={Reservations} />

    </Drawer.Navigator>
  );
}

function CustomDrawerContent({ navigation }) {
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    async function fetchUserRole() {
      const role = await AsyncStorage.getItem('role');
      setUserRole(role);
    }
    fetchUserRole();
  }, []);

  return (
  <Box padding={10}>
    <Image alignSelf='center' marginTop={'$3'}
      size="xl" borderRadius={7}
      source={Logo} alt='Logo_Movie_Mads'
      borderWidth={2} 
      mt={40}
      mb={20}
    />
    <Box
      backgroundColor='$blue700'
      borderRadius={'$xl'}
      marginBottom={8}
     >

      <TouchableOpacity
        onPress={() => navigation.navigate('Movies')}>

        <Text fontSize={'$xl'}
          padding={13}
          color='white' >
          Movies
        </Text>

      </TouchableOpacity>
    </Box>


    {userRole === 'administrator' && (
        <>
        <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Create_Movie_Function')}>
        <Text color='white' fontSize={'$xl'} padding={13} >Create a movie function</Text>
      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Manage_Movies')}>
        <Text color='white' fontSize={'$xl'} padding={13} >Manage Movies</Text>
      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Manage_Languages')}>
        <Text color='white' fontSize={'$xl'} padding={13} >Manage Languages</Text>
      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Manage_Subtitles')}>
        <Text color='white' fontSize={'$xl'} padding={13} >Manage Subtitles</Text>
      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Manage_Dubbings')}>
        <Text color='white' fontSize={'$xl'} padding={13} >Manage Dubbings</Text>
      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Manage_Categories')}>
        <Text color='white' fontSize={'$xl'} padding={13} >Manage Categories</Text>
      </TouchableOpacity>
    </Box>

    </>
      )}


<Box
      backgroundColor='$blue700'
      borderRadius={'$xl'}
      marginBottom={8}
     >

      <TouchableOpacity
        onPress={() => navigation.navigate('Reservations')}>

        <Text fontSize={'$xl'}
          padding={13} color='white' >
          Reservations
        </Text>

      </TouchableOpacity>
    </Box>


    <Box backgroundColor='$blue700' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text fontSize={'$xl'} padding={13} color='white' >Logout</Text>
      </TouchableOpacity>
    </Box>

    

  </Box>
);
}





export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register}  />
          <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
          <Stack.Screen name="Update_Languages" component={UpdateLanguages} />
          <Stack.Screen name="Store_Language" component={Store_Language} />
          <Stack.Screen name="Update_Subtitle" component={Update_Subtitle} />
          <Stack.Screen name="Store_Subtitle" component={Store_Subtitle} />
          <Stack.Screen name="Update_Dubbing" component={Update_Dubbing} />
          <Stack.Screen name="Store_Dubbing" component={Store_Dubbing} />
          <Stack.Screen name="Update_Category" component={Update_Category} />
          <Stack.Screen name="Store_Category" component={Store_Category} />
          <Stack.Screen name="Movie_store" component={Movie_store} />
          <Stack.Screen name="Update_Movie" component={Update_Movie} />


          <Stack.Screen name="Movie_Description" component={Movie_Description} />
          <Stack.Screen name="Seats" component={Seats} />

        </Stack.Navigator>

      </GluestackUIProvider>
    </NavigationContainer>

  );
}
