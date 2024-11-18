import React, { FC, useState } from "react";
import { View, Image, ImageProps, Text } from "react-native";
export interface CustomImageProps extends ImageProps {
  name: string;
}
const CustomImage: FC<CustomImageProps> = ({ name, ...props }) => {
  const [loading, setLoading] = useState(true);
  return (
    <View>
      {loading && (
        <View className='size-10 rounded-full bg-gray-300 justify-center items-center'>
          <Text>{name.slice(0, 1).toUpperCase()}</Text>
        </View>
      )}
      <Image
        style={[{ opacity: loading ? 0 : 1 }]}
        onLoad={() => setLoading(false)}
        {...props}
      />
    </View>
  );
};

export default CustomImage;
