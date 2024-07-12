import { View, Text, KeyboardAvoidingView, Platform, Image, TouchableOpacity, StyleSheet, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { ScrollView } from 'react-native-gesture-handler'
import CustomInput from '../../components/CustomInput'
import * as ImagePicker from 'expo-image-picker'
import { icons } from '../../constants'
import { Picker } from '@react-native-picker/picker';
import { Dropdown } from 'react-native-element-dropdown';
import CustomButton from '../../components/CustomButton'
import { listFiles, uploadToFirebase } from '../../services/firebase';
import * as MediaLibrary from 'expo-media-library';

const CreateListCopy = () => {
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

  const [image, setImage] = useState(null);
  const [files, setFiles] = useState([]);

  useEffect(() => {
      listFiles().then((listResp) => {
          const files = listResp.map((value) => {
              return { name: value.fullPath };
          });
          setFiles(files);
      });
  }, []);

  const openCamera = async () => {
    try {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted') {
            alert('Sorry, we need camera permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            aspect: [1,1],
            quality: 1,
        });

        if (!result.canceled) {
            console.log(result.assets[0].uri);
            const { uri } = result.assets[0];
            const fileName = uri.split("/").pop();

            // Save the image to the phone's storage
            const asset = await MediaLibrary.createAssetAsync(uri);
            await MediaLibrary.createAlbumAsync('ExpoPhotos', asset, false);

            const uploadResp = await uploadToFirebase(uri, fileName, (v) =>
                console.log(v)
            );
            console.log(uploadResp);
            setForm({...form, photo: {uri}}); // update form state
        } else {
            console.log('User cancelled image picker');

            listFiles().then((listResp) => {
                const files = listResp.map((value) => {
                    return { name: value.fullPath };
                });
                setFiles(files);
            });
        }
    } catch (e) {
        Alert.alert("Error uploading image " + e.message);
    }
  };


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
          <View>
              {image && <Image source={{ uri: image }}/>}
          </View>
          <View className="flex-row justify-evenly items-center pd-5 w-full h-24 px-4 rounded-2xl border-2 border-dashed border-black-100 space-x-2">
            <View>
              <TouchableOpacity onPress={() => openPicker('image')}>
                {form.photo ? (
                  <Image
                    source={{uri: form.photo.uri}}
                    resizeMode='cover'
                    className="w-full h-40 px-4 rounded-2xl"
                  />
                ) : (
                  <View className="flex-row">
                    <View>
                      <Image
                        source={icons.picture}
                        resizeMode='contain'
                        className="w-8 h-8"
                      />
                    </View>
                    <View className="px-2">
                      <Text className="text-xs text-disabled font-pmedium">Take photo</Text>
                      <Text className="text-xs text-disabled font-pmedium ">from gallery</Text>
                    </View>
                  </View>
                )}
              </TouchableOpacity>
            </View>
            <View className='w-0.5 h-20 bg-black'/>
            <View>
              <TouchableOpacity onPress={openCamera}>
                  <View className="flex-row">
                    <View>
                      <Image
                        source={icons.picture}
                        resizeMode='contain'
                        className="w-8 h-8"
                      />
                    </View>
                    <View className="px-2">
                      <Text className="text-xs text-disabled font-pmedium">Take photo</Text>
                      <Text className="text-xs text-disabled font-pmedium ">with camera</Text>
                    </View>
                  </View>
              </TouchableOpacity>
            </View>
          </View>
          <CustomInput
            title="Title"
            value = {form.title}
            placeholder="Title (eg. Watches, Fan, Chair, etc.)"
            handleChangeText={(e) => setForm({...form, title:e})}
            otherStyles="mt-5"
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
            otherStyles="mt-5"
            multiline={true}
          />
           <CustomInput
            title="Address"
            value = {form.description}
            placeholder="Address (City, Street, etc.)"
            handleChangeText={(e) => setForm({...form, address:e})}
            otherStyles="mt-5"
            multiline={true}
          />
          <View className='w-full items-center justify-center mt-10'>
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
    height: 60,
    borderColor: '#252525',
    borderWidth: 2,
    borderRadius: 16,
    paddingHorizontal: 8,
    marginTop: 20
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
    fontSize: 14.5,
    fontFamily: "Poppins-Medium",
    paddingLeft:9,
    color:'#a7a7a7'
  },
  selectedTextStyle: {
    fontSize: 16,
    fontFamily: "Poppins-Medium",
    paddingLeft:9,
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

export default CreateListCopy