import colors from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

type RoundBtnProps = {
  icon: typeof Ionicons.defaultProps;
  title: string;
  onPress?: () => void;
  size?: number;
};

const RoundBtn = ({ icon, title, onPress, size = 30 }: RoundBtnProps) => {
  return (
    <TouchableOpacity className='items-center gap-[10px]' onPress={onPress}>
      <View className='size-[60px] rounded-[30px] bg-gray-200 justify-center items-center'>
        <Ionicons name={icon} size={size} color={colors.dark} />
      </View>
      <Text className='text-lg font-robMed text-900'>{title}</Text>
    </TouchableOpacity>
  );
};

export default RoundBtn;
