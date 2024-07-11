import { View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import {icons} from '../constants'
// import { usePathname, router } from 'expo-router'

const SearchInput = ({placeholder, value, handleChangeText, otherStyles }) => {
  // const [query, setQuery] = useState('');


  return (
    <View className={`border-2 items-center border-black-200 w-full h-16 px-4 bg-black-100 rounded-2xl focus:border-secondary-100 flex-row space-x-4 ${otherStyles}`}>
        <TextInput
          className="flex-1 text-mainText font-pregular h-full"
          value={value}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          onChangeText={handleChangeText}
        />
        <TouchableOpacity>
          <Image
            source={icons.search}
            className="w-5 h-5"
            resizeMode='contain'
          />
        </TouchableOpacity>
      </View> 
  )
}

export default SearchInput