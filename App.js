import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Playlist from './src/pages/Playlist';

export default function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Playlist" component={Playlist} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}