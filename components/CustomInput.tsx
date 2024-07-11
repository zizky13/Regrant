import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'

const CustomInput = ({title, value, placeholder, handleChangeText, otherStyles, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {/* <Text className="text-base text-mainText font-pmedium">{title}</Text> */}
      <View className="border-2 items-center border-black-200 w-full h-16 px-4 rounded-2xl focus:border-primary flex-row">
        <TextInput
          className="flex-1 text-mainText font-psemibold h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
          secureTextEntry={title === 'Password' && !showPassword}
        />

        {title === 'Password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            <Image source={!showPassword ? icons.eye : icons.eyeHide} className="w-7 h-7" resizeMode='contain' />
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default CustomInput