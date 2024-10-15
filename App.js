import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../tranquochuy/screens/Home';
import NoteList from '../tranquochuy/screens/NoteList';
import AddYourJob from '../tranquochuy/screens/AddYourJob';




const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
        <Stack.Screen name="NoteList" component={NoteList} options={{ headerShown: false }} />
        <Stack.Screen name="AddYourJob" component={AddYourJob} options={{ headerShown: false }} />
      
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;