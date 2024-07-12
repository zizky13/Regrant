import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

interface CustomButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: string;
  textStyles?: string;
  isLoading?: boolean;
}

const CustomButton: React.FC<CustomButtonProps> = ({ 
  title, 
  handlePress, 
  containerStyles = '', 
  textStyles = '', 
  isLoading = false 
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-primary rounded-full min-h-[50px] justify-center items-center ${containerStyles} ${isLoading ? 'opacity-50' : ''}`}
      disabled={isLoading}
    >
      <Text className={`text-white font-psemibold  ${textStyles}`}>{title}</Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
