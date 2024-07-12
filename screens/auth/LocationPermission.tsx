import { View, Text, StyleSheet } from 'react-native'
import React, { useState, useEffect } from 'react'
import { useNavigation, Link } from '@react-navigation/native'
import CustomButton from '../../components/CustomButton'
import { SafeAreaView } from 'react-native-safe-area-context'
import SearchInput from '../../components/SearchInput'
import MapView,  { PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from 'expo-location';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase'
import { useStore } from '../../store/zustandStore'


type Location = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number
}

const LocationPermission = () => {
  
  const navigation = useNavigation();
  const [search, setSearch] = useState('')
  const [location, setLocation] = useState<Location>();
  const [errorMsg, setErrorMsg] = useState(null);
  const [dataAddress, setDataAddress] = useState('')

  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: location?.coords?.latitude || 37.78825, 
        longitude: location?.coords?.longitude || -122.4324, 
        latitudeDelta: 0.0922, 
        longitudeDelta: 0.0421});
    })();
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const getAddress = async (latitude: number, longitude: number) => {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyCsP1F3JYuKG-Lv59Zi2eGYN0zCYDrpuYw`;
    const res  = await fetch(url);

    if (!res.ok) {
        throw new Error('Failed to fetch address')
    }

    const data = await res.json();
    const dataAddress = data.results[0].formatted_address;
    setDataAddress(dataAddress);
    
    await updateDoc(doc(db, 'users', useStore.getState().docId), {
        address: {
          fullAddress: dataAddress,
          latitude: latitude,
          longitude: longitude
        }
      });

  }


  return (
    <SafeAreaView>
      <View className="w-full min-h-[80vh] items-center">
        <View className="w-full px-4 mb-5 mt-3">
          <Text className="text-primary text-2xl">Set your location</Text>
          <SearchInput
            placeholder="Search your location"
            value={search}
            handleChangeText={(e) => setSearch(e)}
            otherStyles="mt-3"
          />
        </View>

        {/* todo: add geocoder to extract address name by using coordinates */}
        <View className="relative w-full items-center min-h-[77vh] ">
          {location && 
            <MapView
            style={StyleSheet.absoluteFillObject}
            provider={PROVIDER_GOOGLE}
            initialRegion={location}
            showsUserLocation
            onPress={(e) => (e.nativeEvent.coordinate)}

          >
            </MapView>}
          <View className="absolute bottom-5 right-4 left-4">
            <CustomButton
              title="Set Location"
              handlePress={() => getAddress(location?.latitude, location?.longitude)}
              containerStyles="px-5 w-full"
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default LocationPermission