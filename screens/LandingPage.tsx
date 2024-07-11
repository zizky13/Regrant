import { View, Text, Button, Image } from 'react-native'
import React from 'react'
import SignIn from './auth/SignIn'
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import {images} from '../constants'
import CustomButton from '../components/CustomButton'

const LandingPage = () => {
  const navigation = useNavigation();
  
  return (
    <SafeAreaView>
        <View className='w-full min-h-[80vh] items-center justify-center px-4'>
          <Image
            source={images.logo}
            className="w-[140px] h-[140px]"
            resizeMode='contain'
          />
          <Text className='text-5xl font-psemibold text-primary mt-5'>Regrant</Text>
          <Text className='text-base font-psemibold text-primary mb-10'>Where sharing builds caring</Text>
        </View>
        <View className='w-full items-center justify-center'>
          <CustomButton title="Let's Go" handlePress={() => navigation.navigate("SignIn")} containerStyles='px-5 w-4/5'/>
        </View>
    </SafeAreaView>
  )
}

export default LandingPage