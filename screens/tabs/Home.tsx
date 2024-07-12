import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, TextInput, Image } from 'react-native'
import { Ionicons, AntDesign, FontAwesome6, FontAwesome5, Entypo} from '@expo/vector-icons'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { icons } from '../../constants'
import Listing from './Listing'
import ListingDetail from './ListingDetail'
import Profile from './Profile'

const Stack = createNativeStackNavigator();

const Home = () => {
    return(
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Group>
        <Stack.Screen name="Listing" component={Listing} />
        {/* <Stack.Screen name="Details" component={ListingDetail} /> */}
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal' }}>
        <Stack.Screen name="Details" component={ListingDetail} />
        <Stack.Screen name="Profile" component={Profile} />
      </Stack.Group>
    </Stack.Navigator>
  )
} 
export default Home;