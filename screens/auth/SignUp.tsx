import { View, Text, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, Link } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import {images} from '../../constants'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'

const SignUp = () => {
  const navigation = useNavigation();
  
  const [form, setForm] = useState({
    username: '',
    email: '',
    phoneNumber: '',
    password: ''
  })

  const [isSelected, setSelection] = useState(false);
  
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} className="py-10">
      <ScrollView>
        <View className = "w-full min-h-[90vh] justify-center px-4 my-6">
            <View className='px-4'>
              <View className='flex-row items-center space-x-2 mb-3'>
                <Image 
                  source={images.logo} 
                  resizeMode='contain'
                  className="w-[55px] h-[55px]"
                />
                <Text className='text-4xl font-psemibold mt-2 text-primary'>Regrant</Text>
              </View>
              <Text className="text-3xl text-primary text-semibold mt-4 font-psemibold">Sign Up</Text>
              <Text className='text-base text-primary'>Create a new account</Text>
              <CustomInput
                title="Username"
                placeholder="Username"
                value={form.username}
                handleChangeText={(e) => setForm({...form, username:e})}
                otherStyles="mt-5"
              />
              <CustomInput
                title="Email"
                placeholder="Email"
                value={form.email}
                handleChangeText={(e) => setForm({...form, email:e})}
                otherStyles="mt-7"
                keyboardType="email-address"
              />
              <CustomInput
                title="phoneNumber"
                placeholder="Phone Number"
                value={form.phoneNumber}
                handleChangeText={(e) => setForm({...form, phoneNumber:e})}
                otherStyles="mt-7"
              />
              <CustomInput
                title="Password"
                placeholder="Password"
                value={form.password}
                handleChangeText={(e) => setForm({...form, password:e})}
                otherStyles="mt-7"
              />
              <CustomButton title="Sign In" handlePress={() => navigation.navigate("SignIn")} containerStyles='px-5 w-full mt-7'/>
              <View className="justify-center pt-5 flex-row gap-1">
                <Text className="text-lg text-mainText font-pregular">
                  Have an account already?
                </Text>
                <Link to={{screen:'SignIn'}}><Text className='text-lg font-psemibold text-primary'>Sign In</Text></Link>
              </View>
            </View>
          </View>
      </ScrollView>
    </KeyboardAvoidingView>
  )
}

export default SignUp;