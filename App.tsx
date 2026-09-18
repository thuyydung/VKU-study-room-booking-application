import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import { HomeScreen } from './src/screens/HomeScreen';
import { BookingModalScreen } from './src/screens/BookingModalScreen';
import { MyBookingsScreen } from './src/screens/MyBookingsScreen';
import { initNotifications } from './src/services/notificationService';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#3B82F6',
        tabBarInactiveTintColor: '#94A3B8',
        tabBarStyle: { height: 60, paddingBottom: 8 },
        tabBarIcon: ({ color, size }) => {
          const iconName = route.name === 'HomeTab' ? 'business-outline' : 'ticket-outline';
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="HomeTab" component={HomeScreen} options={{ title: 'Phòng học' }} />
      <Tab.Screen name="MyBookingsTab" component={MyBookingsScreen} options={{ title: 'Lịch của tôi' }} />
    </Tab.Navigator>
  );
}

export default function App() {
  useEffect(() => {
    initNotifications();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainTabs" component={TabNavigator} options={{ headerShown: false }} />
        <Stack.Screen
          name="BookingModal"
          component={BookingModalScreen}
          options={{ presentation: 'modal', title: 'Chọn lịch giữ chỗ' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}