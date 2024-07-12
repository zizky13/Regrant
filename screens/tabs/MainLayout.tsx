import { View, Text, Image } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './Home';
import CreateList from './CreateList';
import Chat from './Chat';
import { icons } from '../../constants';

const Tab = createBottomTabNavigator();

const TabIcon = ({icon, color, name, focused}) => {
  return(
    <View className="items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'font-psemibold' : 'font-pregular'} text-xs`} style={{color: color}}>{name}</Text>
    </View>
  )
}

const MainLayout = () => {
  return (
    <Tab.Navigator screenOptions={{ 
      tabBarShowLabel: false,
      tabBarActiveTintColor: "#299B65",
      tabBarInactiveTintColor: "#252525",
      tabBarStyle: {
        // borderTopWidth: 1,
        // borderTopColor: "#252525",
        height: 70
      }
     }}>
      <Tab.Screen 
        name="Home" 
        component={Home}
        options={{ 
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={icons.home}
              color={color}
              name="Home"
              focused={focused}
            />
          )
      }}/>
      <Tab.Screen 
        name="Create List" 
        component={CreateList} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={icons.plus}
              color={color}
              name="Make a List"
              focused={focused}
            />
          )
      }}/>
      <Tab.Screen 
        name="Chat" 
        component={Chat} 
        options={{ 
          headerShown: false,
          tabBarIcon: ({color, focused}) => (
            <TabIcon
              icon={icons.chat}
              color={color}
              name="Chat"
              focused={focused}
            />
          )
      }}/>
    </Tab.Navigator>
  )
}

export default MainLayout