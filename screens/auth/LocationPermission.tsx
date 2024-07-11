import { View, Text, Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import SignUp from './SignUp'
import { useNavigation, Link } from '@react-navigation/native'
import {images} from '../../constants'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'

const LocationPermission = () => {
  
  const navigation = useNavigation();
  
  const [search, setSearch] = useState('')

  return (
    <SafeAreaView>
      <View className='w-full min-h-[80vh] items-center'>
        <View className="w-full px-4 mb-5 mt-3">
          <Text className="text-primary text-2xl">Set your location</Text>
          <SearchInput
            placeholder="Search your location"
            value={search}
            handleChangeText={(e) => setSearch(e)}
            otherStyles="mt-3"
          />
        </View>
        <View className='relative w-full items-center min-h-[77vh] bg-red-400'>
          {/* Map */}
          <View className="absolute bottom-5 right-4 left-4">
            <CustomButton 
              title="Set Location" 
              handlePress={() => navigation.navigate("SignIn")} 
              containerStyles='px-5 w-full'
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LocationPermission