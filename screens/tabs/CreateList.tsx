import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import CustomInput from '../../components/CustomInput'
import * as ImagePicker from 'expo-image-picker'
import { icons } from '../../constants'
import {Picker} from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../../components/CustomButton'

const CreateList = () => {
  const [form, setForm] = useState({
    title: '',
    description: '',
    photo: null,
    address: ''
  })

  const [selected, setSelected] = useState();

  const openPicker = async (selectType) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: selectType === 'image' ? ImagePicker.MediaTypeOptions.Images : ImagePicker.MediaTypeOptions.Videos,
      aspect: [4, 3],
      quality: 1,
    });

    if(!result.canceled){
      if(selectType === 'image'){
        setForm({...form, photo: result.assets[0]})
      }

      if(selectType === 'video'){
        setForm({...form, photo: result.assets[0]})
      }
    }

  }

  const data = [
    { label: 'Lend', value: 'Lend' },
    { label: 'Gift', value: 'Gift' },
  ];

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  return (
    <SafeAreaView className="h-full">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="py-10"
      >
        <ScrollView className="px-4">
          <Text className="text-2xl text-mainText font-psemibold">
            Make Your Listing
          </Text>
          <View className="mt-7 space-y-2">
            <TouchableOpacity onPress={() => openPicker('image')}>
              {form.photo ? (
                <Image
                  source={{uri: form.photo.uri}}
                  resizeMode='cover'
                  className="w-full h-40 px-4 rounded-2xl"
                />
              ) : (
                <View className="w-full h-24 px-4 rounded-2xl justify-center items-center border-2 border-dashed border-black-100 flex-row space-x-2">
                  <Image
                    source={icons.picture}
                    resizeMode='contain'
                    className="w-5 h-5"
                  />
                  <Text className="text-sm text-mainText font-pmedium">
                    Take item photo
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          </View>
          <CustomInput
            title="Title"
            value = {form.title}
            placeholder="Title (eg. Watches, Fan, Chair, etc.)"
            handleChangeText={(e) => setForm({...form, title:e})}
            otherStyles="mt-7"
            multiline={true}
          />
          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: '#299B65' }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
              setValue(item.value);
              setIsFocus(false);
            }}
          />
          <CustomInput
            title="Description"
            value = {form.description}
            placeholder="Description (Condition, Weight, etc.)"
            handleChangeText={(e) => setForm({...form, description:e})}
            otherStyles="mt-7"
            multiline={true}
          />
           <CustomInput
            title="Address"
            value = {form.description}
            placeholder="Address (City, Street, etc.)"
            handleChangeText={(e) => setForm({...form, address:e})}
            otherStyles="mt-7"
            multiline={true}
          />
          <View className='w-full items-center justify-center mt-7'>
            <CustomButton title="Submit" handlePress={() => console.log('helloword')} containerStyles='px-5 w-full'/>
          </View>
        </ScrollView>
    </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 64,
    borderColor: '#252525',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 8,
    marginTop: 27
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

export default CreateList