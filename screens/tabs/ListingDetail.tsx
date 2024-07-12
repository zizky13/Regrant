import { View, Text, Image, Platform, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import {images} from '../../constants'
import CustomButton from '../../components/CustomButton'

const ListingDetail = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView className="h-full">
      <ScrollView className="py-4 px-4 ">
        <View className='flex-row justify-center'>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            className="absolute left-0"
          >
            <Image
              source={icons.back}
              resizeMode='contain'
              className="w-8 h-8"
            />
          </TouchableOpacity>
          <Text className="text-3xl text-mainText font-psemibold text-center">
            Item Details
          </Text>
        </View>
        <View className='w-full items-center mt-7'>
          <Image
            source={images.item}
            resizeMode='contain'
          />
        </View>
        <View className='mt-5 flex-row justify-between items-center'>
          <Text className='text-2xl text-mainText font-psemibold mb-[2px]'>Deez Watch</Text>
          <View className='flex-row items-center gap-x-1'>
            <Image
              source={icons.location}
              resizeMode='contain'
              className='w-[10px] h-[14px] mb-[2px]'
              style={{
                tintColor: "#299B65"
              }}
            />
            <Text className='font-pmedium text-primary'>U Ville, Bintaro Jaya</Text>
          </View>
        </View>
        <View className='flex-row items-center gap-2'>
          <Image
            source={icons.condition}
            resizeMode='contain'
            className='w-[15px] h-[13px]'
          />
          <Text className='ml-[4px] text-subhead'>Conditions 78%</Text>
        </View>
        <View className='border-t mt-[10px]'>
          <Text className='text-xl font-pmedium mt-[10px] text-mainText'>Description</Text>
          <Text className='font-pregular mb-3'>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptate quasi enim earum doloribus similique error, inventore voluptatem repellendus natus cupiditate dolor pariatur expedita quas obcaecati ex non, atque deserunt eveniet.
          </Text>
          {/* Map here */}
          <Image
            source={images.map}
            resizeMode='cover'
            className='w-full h-[133px]'
          />
        </View>
        <TouchableOpacity 
          onPress={() => navigation.navigate('Profile')} 
          className='border p-2 flex-row mt-4 mb-5 justify-between rounded-xl'
        >
          <View className='flex-row gap-x-1'>
            <Image source={images.profileEmpty} resizeMode='contain' className='w-[40px] h-[40px]'/>
            <View>
              <Text className='text-mainText mb-[2px] text-pmedium text-base'>
                JaneDoe
              </Text>
              <View className='flex-row items-center gap-x-1'>
                <Text className='font-pregular text-primary'>4.84</Text>
                <Image source={icons.star} resizeMode='contain' className='w-[14px] h-[14px] mb-[3px]'/>
              </View>
            </View>
          </View>
          <View className='flex-row items-center gap-x-1'>
            <Text className='font-pmedium text-subhead'>82</Text>
            <Text className='font-pregular text-subhead'>Reviews</Text>
          </View>
        </TouchableOpacity>
        <CustomButton title="Chat to offer" handlePress={() => navigation.navigate('Chat')} containerStyles='px-5 w-full mb-10'/>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ListingDetail