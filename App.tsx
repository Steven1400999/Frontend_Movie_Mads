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


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const Logo = require('./assets/Logo/Logo_Login.jpg');

function Root() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Movies" component={Movies} />
      <Drawer.Screen name="Movie_store" component={Movie_store} />
      <Drawer.Screen name="Manage_Languages" component={Manage_Languages} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = ({ navigation }) => (

  <Box padding={10}>
    <Image alignSelf='center' marginTop={'$3'}
      size="xl" borderRadius="$none"
      source={Logo} alt='Logo_Movie_Mads'
    />
    <Box
      backgroundColor='$secondary200'
      borderRadius={'$xl'}
      marginBottom={8}
     >

      <TouchableOpacity
        onPress={() => navigation.navigate('Movies')}>

        <Text fontSize={'$xl'}
          padding={13} >
          Movies
        </Text>

      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$secondary200' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Movie_store')}>
        <Text fontSize={'$xl'} padding={13} >Store a movie</Text>
      </TouchableOpacity>
    </Box>

    <Box backgroundColor='$secondary200' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Manage_Languages')}>
        <Text fontSize={'$xl'} padding={13} >Manage Languages</Text>
      </TouchableOpacity>
    </Box>
    
    <Box backgroundColor='$secondary200' borderRadius={'$xl'} marginBottom={8}>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text fontSize={'$xl'} padding={13} >Logout</Text>
      </TouchableOpacity>
    </Box>

  </Box>
);

export default function App() {
  return (
    <NavigationContainer>
      <GluestackUIProvider config={config}>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} />
          <Stack.Screen name="Root" component={Root} options={{ headerShown: false }} />
          <Stack.Screen name="Update_Languages" component={UpdateLanguages} />
          <Stack.Screen name="Store_Language" component={Store_Language} />

        </Stack.Navigator>

      </GluestackUIProvider>
    </NavigationContainer>

  );
}

const Home = () => {
  return <Container />;
};


const Container = () => {
  return (

    <App />
  );
};