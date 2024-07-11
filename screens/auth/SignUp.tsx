import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { useNavigation, Link } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../constants";
import CustomButton from "../../components/CustomButton";
import CustomInput from "../../components/CustomInput";
import { auth } from "../../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db } from "../../services/firebase";
import { collection, addDoc } from "firebase/firestore";

const SignUp = () => {
  const navigation = useNavigation();

  const [form, setForm] = useState({
    username: "",
    email: "",
    phoneNumber: "",
    password: "",
  });

  const [isSelected, setSelection] = useState(false);

  //** SIGNUP HANDLER FUNCTION *//
  const handleSignUp = async () => {
    try {
      const signUp = await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      const user = signUp.user;
      if (user) {
        addDoc(collection(db, "users"), {
          username: form.username,
          email: form.email,
          phoneNumber: form.phoneNumber,
        });

        alert(`User created ${user.email}!`);
      }
    } catch (error) {
      return console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="py-10"
    >
      <ScrollView>
        <View className="w-full min-h-[90vh] justify-center px-4 my-6">
          <View className="px-4">
            <View className="flex-row items-center space-x-2 mb-3">
              <Image
                source={images.logo}
                resizeMode="contain"
                className="w-[55px] h-[55px]"
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
              <CustomButton title="Sign In" handlePress={() => navigation.navigate("LocationPermission")} containerStyles='px-5 w-full mt-7'/>
              <View className="justify-center pt-5 flex-row gap-1">
                <Text className="text-lg text-mainText font-pregular">
                  Have an account already?
                </Text>
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default SignUp;
