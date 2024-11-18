import {
  View,
  Text,
  SafeAreaView,
  SectionList,
  Image,
  TouchableOpacity,
  ScrollView,
  TextInput,
} from "react-native";
import { format } from "date-fns";

import React, { useCallback, useState } from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useHeaderHeight } from "@react-navigation/elements";
import cn from "@/lib/cn";
import { defaultStyles } from "@/styles/styles";
import { useQuery } from "@tanstack/react-query";
import { Ionicons } from "@expo/vector-icons";
import colors from "@/styles/colors";
import { CartesianChart, Line, useChartPressState } from "victory-native";
import { Circle, useFont } from "@shopify/react-native-skia";
import Animated, {
  SharedValue,
  useAnimatedProps,
} from "react-native-reanimated";

const categories = ["Overview", "News", "Orders", "Transactions"];

const SingeCrypto = () => {
  const { id } = useLocalSearchParams();
  const headerHeight = useHeaderHeight();
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { state, isActive } = useChartPressState({ x: 0, y: { price: 0 } });
  const font = useFont(require("@/assets/fonts/roboto/Roboto-Medium.ttf"));

  const { data } = useQuery({
    queryKey: ["info", id],
    queryFn: async () => {
      const response = await fetch(`/api/info?ids=${id}`).then((res) =>
        res.json()
      );
      return response[+id];
    },
    enabled: !!id,
  });
  const { data: tickersData } = useQuery({
    queryKey: ["tickers"],
    queryFn: async (): Promise<any[]> => {
      const response = await fetch(`/api/tickers`).then((res) => res.json());
      return response;
    },
  });

  Animated.addWhitelistedNativeProps({ text: true });
  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  const renderSectionHeader = useCallback(
    () => (
      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          paddingHorizontal: 16,
          paddingBottom: 8,
          backgroundColor: colors.background,
          borderBottomColor: colors.lightGray,
        }}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            onPress={() => setActiveCategory(category)}
            className={cn(
              "py-[10px] px-[14px] justify-center items-center rounded-3xl",
              activeCategory === category && "bg-white"
            )}
          >
            <Text
              className={cn(
                "text-base  text-gray-400 font-robMed tracking-[0.4px]",
                activeCategory === category && "text-gray-900"
              )}
            >
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    ),
    [activeCategory]
  );

  const animatedText = useAnimatedProps(() => {
    return {
      text: `${state.y.price.value.value.toFixed(2)} €`,
      defaultValue: "",
    };
  });

  const animatedDateText = useAnimatedProps(() => {
    const date = new Date(state.x.value.value);
    return {
      text: `${date.toLocaleDateString()}`,
      defaultValue: "",
    };
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: data?.name,
          headerTitleStyle: {
            fontFamily: "IBM-Plex-Sans-medium",
            fontWeight: 500,
          },
        }}
      />
      <SectionList
        style={{
          marginTop: headerHeight,
        }}
        keyExtractor={(i) => i.title}
        contentInsetAdjustmentBehavior='automatic'
        renderSectionHeader={renderSectionHeader}
        ListHeaderComponent={() => (
          <>
            <View className='flex-row items-center justify-between mx-4'>
              <Text className='text-2xl font-robMed text-gray-600'>
                {data?.name}
              </Text>
              <Image source={{ uri: data?.logo }} className='size-[60px]' />
            </View>
            <View style={{ flexDirection: "row", gap: 10, margin: 12 }}>
              <TouchableOpacity
                className={cn(
                  defaultStyles.pillButtonSmall,
                  "bg-framPurple-600 flex-row gap-4"
                )}
              >
                <Ionicons name='add' size={24} color={"#fff"} />
                <Text className={cn(defaultStyles.buttonText, "text-white")}>
                  Buy
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={cn(
                  defaultStyles.pillButtonSmall,
                  "bg-framPurple-200 flex-row gap-4"
                )}
              >
                <Ionicons name='arrow-back' size={24} color={colors.primary} />
                <Text
                  className={cn(
                    defaultStyles.buttonText,
                    "text-framPurple-600"
                  )}
                >
                  Receive
                </Text>
              </TouchableOpacity>
            </View>
          </>
        )}
        renderItem={({ item }) => (
          <>
            <View
              style={{ height: 540 }}
              className={cn(
                defaultStyles.block,
                "h-[540px] min-h-[540px] flex-1"
              )}
            >
              {tickersData && (
                <>
                  {!isActive && (
                    <View className='mb-4'>
                      <Text
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: colors.dark,
                        }}
                      >
                        {tickersData[tickersData.length - 1].price.toFixed(2)} €
                      </Text>
                      <Text style={{ fontSize: 18, color: colors.gray }}>
                        Today
                      </Text>
                    </View>
                  )}
                  {isActive && (
                    <View className='mb-4'>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={{
                          fontSize: 30,
                          fontWeight: "bold",
                          color: colors.dark,
                        }}
                        animatedProps={animatedText}
                      ></AnimatedTextInput>
                      <AnimatedTextInput
                        editable={false}
                        underlineColorAndroid={"transparent"}
                        style={{ fontSize: 18, color: colors.gray }}
                        animatedProps={animatedDateText}
                      ></AnimatedTextInput>
                    </View>
                  )}
                  <CartesianChart
                    data={tickersData}
                    xKey='timestamp'
                    yKeys={["price"]}
                    // @ts-ignore
                    chartPressState={state}
                    axisOptions={{
                      font,
                      tickCount: 5,
                      labelOffset: { x: -2, y: 0 },
                      labelColor: colors.gray,
                      formatYLabel: (v) => `${v} $`,
                      formatXLabel: (ms) => format(new Date(ms), "MM/yy"),
                    }}
                  >
                    {({ points }) => (
                      <>
                        <Line
                          points={points.price}
                          color='#c7c6fa'
                          strokeWidth={3}
                        />
                        {isActive ? (
                          <ToolTip
                            x={state.x.position}
                            y={state.y.price.position}
                          />
                        ) : null}
                      </>
                    )}
                  </CartesianChart>
                </>
              )}
            </View>
            <View className={cn(defaultStyles.block, "mt-5")}>
              <Text className='text-xl font-robMed text-gray-600'>
                Overview
              </Text>
              <Text className='text-gray-400 mt-4 text-[18px] leading-tight font-rob'>
                Bitcoin is a decentralized digital currency, without a central
                bank or single administrator, that can be sent from user to user
                on the peer-to-peer bitcoin network without the need for
                intermediaries. Transactions are verified by network nodes
                through cryptography and recorded in a public distributed ledger
                called a blockchain.
              </Text>
            </View>
          </>
        )}
        sections={[{ data: [{ title: "Chart" }] }]}
      ></SectionList>
    </>
  );
};

export default SingeCrypto;

function ToolTip({ x, y }: { x: SharedValue<number>; y: SharedValue<number> }) {
  return <Circle cx={x} cy={y} r={8} color='#a8a6f2' />;
}
