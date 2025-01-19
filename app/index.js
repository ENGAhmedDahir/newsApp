import React from 'react';
import 'react-native-gesture-handler';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../src/components/Home';
import Details from '../src/components/Details';
import Bookmark from '../src/components/Bookmark';
import { Ionicons } from '@expo/vector-icons';
import { BookmarkProvider } from '../src/BookmarkContext';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack Navigator for Home and Details
const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Stack.Screen name="Details" component={Details} options={{ title: 'News Details' }} />
    </Stack.Navigator>
  );
};

// Stack Navigator for Bookmark and Details
const BookmarkStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Bookmark" 
        component={Bookmark} 
        options={{ title: 'Bookmarks' }} 
      />
      <Stack.Screen 
        name="Details" 
        component={Details} 
        options={{ title: 'News Details' }} 
      />
    </Stack.Navigator>
  );
};


const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <BookmarkProvider>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName = route.name === 'News' ? 'home' : 'bookmark';
              iconName += focused ? '' : '-outline';
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#1e90ff',
            tabBarInactiveTintColor: 'gray',
            tabBarStyle: { backgroundColor: '#f8f9fa', height: 60 },
          })}
        >
          <Tab.Screen name="News" component={HomeStack} options={{ headerShown: false }} />
          <Tab.Screen name="Bookmark" component={BookmarkStack} options={{ headerShown: false }} />
        </Tab.Navigator>
      </BookmarkProvider>
    </GestureHandlerRootView>
  );
};

export default App;
