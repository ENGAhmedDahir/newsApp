import React from 'react';
import '../gesture-handler.native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../src/components/Home'; // Home screen
import Details from '../src/components/Details'; // Details screen

const Stack = createStackNavigator();

const App = () => {
  return (
  
      <Stack.Navigator>
        <Stack.Screen 
          name="Home" 
          component={Home} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Details" 
          component={Details} 
          options={{ 
          title: 'News Details', 
          headerTitleStyle: {
            fontSize: 24,  // Change font size
            fontWeight: 'bold',  // Set font weight
            color: '#333',
           
    } 
  }} 
/>

      </Stack.Navigator>
   
  );
};

export default App;
