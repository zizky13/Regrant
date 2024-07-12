import React, {useState} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList, ScrollView, TextInput, Image } from 'react-native'
import { Ionicons, AntDesign, FontAwesome6, FontAwesome5, Entypo} from '@expo/vector-icons'

import { icons } from '../../constants'
import { useNavigation } from '@react-navigation/native'
import {images} from '../../constants'

const Profile = () => {
  const [activeTab, setActiveTab] = useState('offer');
  const navigation = useNavigation()

  return (
    <View className='flex-1 p-[10px] mt-[50px] '>
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
            User Profile
          </Text>
        </View>
        <View className='flex-1'>
            <TopTabs setActiveTab={setActiveTab} activeTab={activeTab} />
                {activeTab === 'offer' && <OfferCard />}
                {activeTab === 'reviews' && <ReviewCard />}
        </View>
        
    </View>
  )
} 
export default Profile;


const TopTabs = ({ setActiveTab, activeTab }) => {
    return (
        <View className='flex-row items-center mb-[15px]'>
            <TouchableOpacity onPress={() => setActiveTab('offer')}
                className=' border-b-mainText ml-[10px] mr-[25px] pb-[3px]'
                style={{ borderBottomWidth: activeTab === 'offer' ? 2 : 0 }}
            >
                <Text className='text-[25px] font-medium'
                    style={{ color: activeTab === 'offer' ? '#252525' : '#707070' }}
                > Items </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setActiveTab('request')}
                style={{ borderBottomWidth: activeTab === 'request' ? 2 : 0, }}
                className=' border-b-mainText pb-[3px]'   
            >
                <Text className='text-[25px] font-medium'
                    style={{ color: activeTab === 'request' ? '#252525' : '#707070'}}
                    
                > Reviews</Text>
            </TouchableOpacity>
        </View>
    );
};

const OfferCard = () => {

    // dummy
    const navigation = useNavigation();

    const offers = [
        {
          id: 1,
          title: "Deez Watch",
          image: require('../../assets/images/logo.png'),
          condition: "Used",
          conditionPercentage: 98,
          get: true,
          borrow: true,
          distance: "500m"
        },
        {
          id: 2,
          title: "Dummy 2nd",
          image: require('../../assets/images/logo.png'),
          condition: "Like new",
          conditionPercentage: 100,
          get: false,
          borrow: true,
          distance: "1km"
        },
        {
          id: 3,
          title: "Dummy 3rd",
          image: require('../../assets/images/logo.png'),
          condition: "Refurbished",
          conditionPercentage: 90,
          get: true,
          borrow: false,
          distance: "2km"
        }
      ];
    return (
        <FlatList
            data={offers}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
            <TouchableOpacity onPress={() => navigation.navigate("Details")}
                className='flex-row border-[2px] rounded-[5px] border-disabled mb-[12px] p-[8px]'
                >
                <Image source={item.image}
                    className='w-[125px] h-[135px] rounded-[5px] '
                    style={{ resizeMode: 'contain' }}
                />
                <View className='ml-[10px] my-[2px] justify-between'>
                    <View>
                        <Text className='text-[22px] font-medium text-mainText'>{item.title}</Text>
                        <View className='flex-row items-center my-[2px]'>
                            <View className='flex-row items-center mr-[20px]'>
                                <Ionicons name="pulse" size={20} color="#808080" />
                                <Text className='text-subhead text-[12px] font-medium ml-[5px]'>{item.condition}</Text>
                            </View>
                            <View className='flex-row items-center'>
                                <FontAwesome5 name="heartbeat" size={15} color="#808080" />
                                <Text className='text-subhead text-[12px] font-medium ml-[5px]'> Condition {item.conditionPercentage}%</Text>
                            </View>
                        </View>
                    </View>
                    <View className='my-[5px]'>
                        <View className='flex-row items-end'>
                            <View className='flex-row items-center mr-[15px]'>
                                <FontAwesome5 name="shopping-cart" size={14} color="#A7A7A7" />
                                <Text className='text-disabled text-[12px] font-normal ml-[5px]'> Get</Text>
                            </View>
                            <View className='flex-row items-end'>
                                <FontAwesome5 name="hand-holding" size={18} color="#299B65" marginBottom={5} />
                                <Text className='text-primary text-[12px] font-normal ml-[5px]'> Borrow</Text>
                            </View>
                            <View className='flex-row ml-[35px]'>
                                <Ionicons name="location-sharp" size={18} color="#252525" />
                                <Text className='text-mainText text-[13px]'>{item.distance}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
            )}
            keyExtractor={(item) => item.id.toString()}
    />
    );
};

const RequestCard = () => {
    //dummy
    const requests = [
        {
            id: 1,
            title: "Kobe needs",
            image: require('../../assets/images/kobeRequested.png'),
            description: "Speaker, Microphone",
            chatIcon: icons.chat,
        },
        {
            id: 2,
            title: "John needs",
            image: require('../../assets/images/kobeRequested.png'),
            description: "Iron, Power Socket",
            chatIcon: icons.chat,
        },
        {
            id: 3,
            title: "Charlotte needs",
            image: require('../../assets/images/kobeRequested.png'),
            description: "Book, Pen",
            chatIcon: icons.chat,
        },
        {
            id: 4,
            title: "Lerbon needs",
            image: require('../../assets/images/kobeRequested.png'),
            description: "Fishing rod, baits",
            chatIcon: icons.chat,
        },
      ];
    

    return (
        <FlatList
            data={requests}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View className='flex-row border-[2px] rounded-[5px] border-disabled mb-[12px] p-[10px] items-center'>
                    <Image source={item.image}
                        className='w-[78px] h-[78px] rounded-[5px]'
                        style={{ resizeMode: 'contain' }}
                    />
                    <View className='flex-1 ml-[10px] my-[15px]'>
                        <Text className='text-[20px] font-medium text-mainText'>
                        {item.title}
                        </Text>
                        <View className='border-b-primary border-b-[1px] self-start'>
                        <Text className='text-subhead font-normal ml-[5px] my-[2px]'>
                            {item.description}
                        </Text>
                        </View>
                    </View>
                    <View className='mx-[10px]'>
                        <TouchableOpacity onPress={() => console.log('Navigate to chat!')}>
                            <Image source={item.chatIcon}
                                className='w-[40px] h-[40px]'
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};

const ReviewCard = () => {
    // dummy data untuk reviews
    const reviews = [
        {
            id: 1,
            userName: "John Doe",
            userImage: images.profileEmpty,
            rating: 4.5,
            date: "2 days ago",
            comment: "Great service! The item was exactly as described.",
            starIcon: icons.star,
        },
        {
            id: 2,
            userName: "Jane Smith",
            userImage: images.profileEmpty,
            rating: 5,
            date: "1 week ago",
            comment: "Excellent communication and fast delivery. Highly recommended!",
            starIcon: icons.star,
        },
        {
            id: 3,
            userName: "Mike Johnson",
            userImage: images.profileEmpty,
            rating: 4,
            date: "2 weeks ago",
            comment: "Good experience overall. The item arrived in good condition.",
            starIcon: icons.star,
        },
        {
            id: 4,
            userName: "Sarah Wilson",
            userImage: images.profileEmpty,
            rating: 4.8,
            date: "1 month ago",
            comment: "Very satisfied with the purchase. Will buy again!",
            starIcon: icons.star,
        },
    ];

    return (
        <FlatList
            data={reviews}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
                <View className='border-[2px] rounded-[5px] border-disabled mb-[12px] p-[10px]'>
                    <View className='flex-row items-center mb-[8px]'>
                        <Image 
                            source={item.userImage}
                            className='w-[40px] h-[40px] rounded-full'
                        />
                        <View className='flex-1 ml-[10px]'>
                            <Text className='text-[16px] font-medium text-mainText'>
                                {item.userName}
                            </Text>
                            <View className='flex-row items-center'>
                                <Text className='text-primary font-medium mr-[5px]'>
                                    {item.rating}
                                </Text>
                                <Image 
                                    source={item.starIcon}
                                    className='w-[14px] h-[14px]'
                                />
                            </View>
                        </View>
                        <Text className='text-subhead text-[12px]'>
                            {item.date}
                        </Text>
                    </View>
                    <Text className='text-subhead font-normal'>
                        {item.comment}
                    </Text>
                </View>
            )}
            keyExtractor={(item) => item.id.toString()}
        />
    );
};
