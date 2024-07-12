import { View, Text, Image, KeyboardAvoidingView, Platform, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { useNavigation, Link } from '@react-navigation/native'
import { ScrollView } from 'react-native-gesture-handler'
import {images} from '../../constants'
import CustomButton from '../../components/CustomButton'
import CustomInput from '../../components/CustomInput'
import { auth } from "../../services/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const SignIn = () => {
  const navigation = useNavigation();
  
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  //** SIGNIN HANDLER FUNCTION */
  const handleLogin = async () => {
    try {
      const login = await signInWithEmailAndPassword(auth, form.email, form.password);
      const user = login.user;
      if (user) {
        alert(`Welcome ${user.email}!`);
        navigation.navigate("MainLayout");
      }

    } catch (error) {
      return console.log(error);
    }
  }
  
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="py-10"
    >
      <ScrollView>
        <View className="w-full min-h-[85vh] justify-center px-4 my-6">
          <View className="px-4">
            <View className="flex-row items-center space-x-2 mb-3">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[55px] h-[55px]"
              />
              <Text className="text-5xl font-psemibold mt-3 text-primary">
                Regrant
              </Text>
            </View>
            <Text className="text-3xl text-primary text-semibold mt-5 font-psemibold">
              Sign In
            </Text>
            <CustomInput
              title="Email"
              placeholder="Email"
              value={form.email}
              handleChangeText={(e) => setForm({ ...form, email: e })}
              otherStyles="mt-7"
              keyboardType="email-address"
            />
            <CustomInput
              title="Password"
              placeholder="Password"
              value={form.password}
              handleChangeText={(e) => setForm({ ...form, password: e })}
              otherStyles="mt-7"
            />
            <CustomButton
              title="Sign In"
              handlePress={handleLogin}
              containerStyles="px-5 w-full mt-7"
            />
            <View className="justify-center pt-5 flex-row gap-2">
              <Text className="text-lg text-mainText font-pregular">
                Don't have account?
              </Text>
              <Link to={{ screen: "SignUp" }}>
                <Text className="text-lg font-psemibold text-primary">
                  Sign Up
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

export default SignIn