import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'

const CustomInput = ({title, value, placeholder, handleChangeText, otherStyles, multiline=false, ...props}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={`space-y-2 ${otherStyles}`}>
      {/* <Text className="text-base text-mainText font-pmedium">{title}</Text> */}
      <View className="border-2 items-center border-black-200 w-full h-14 px-5 rounded-2xl focus:border-primary flex-row">
        <TextInput
          className="flex-1 text-mainText font-pmedium h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#a7a7a7"
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