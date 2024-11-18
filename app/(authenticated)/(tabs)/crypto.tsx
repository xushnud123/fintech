import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";

import { useQuery } from "@tanstack/react-query";
import { Currency } from "@/interface/crypto";
import colors from "@/styles/colors";
import { useHeaderHeight } from "@react-navigation/elements";
import { defaultStyles } from "@/styles/styles";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import cn from "@/lib/cn";
export default function Crypto() {
  const headerHeight = useHeaderHeight();
  const currencies = useQuery({
    queryKey: ["listings"],
    queryFn: async () => {
      const res = await fetch("/api/listings").then((res) => res.json());
      return res;
    },
    // refetchInterval: 5000,
  });

  const ids = currencies.data
    ?.map((currency: Currency) => currency.id)
    .join(",");

  const { data } = useQuery({
    queryKey: ["info", ids],
    queryFn: async () => {
      const res = await fetch(`/api/info?ids=${ids}`).then((res) => res.json());
      return res;
    },
    enabled: !!ids,
    // refetchInterval: 5000,
  });

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={{ paddingTop: headerHeight }}
    >
      <Text className={cn(defaultStyles.sectionHeader, "px-5")}>
        Latest Crypot
      </Text>
      <View className={cn(defaultStyles.block, "gap-4 mt-4 flex flex-col")}>
        {currencies.data?.map((currency: Currency) => (
          <Link href={`/crypto/${currency.id}`} key={currency.id} asChild>
            <TouchableOpacity className='flex-row gap-4 items-center'>
              <Image
                source={{ uri: data?.[currency.id].logo }}
                className='size-10'
              />
              <View className='flex-1 gap-2'>
                <Text
                  style={{ fontWeight: "600", color: colors.dark }}
                  className='text-base leading-[1] font-robMed'
                >
                  {data?.[currency.id].name}
                </Text>
                <Text style={{ color: colors.gray }}>
                  {data?.[currency.id].symbol}
                </Text>
              </View>
              <View style={{ gap: 6, alignItems: "flex-end" }}>
                <Text>{currency.quote.USD?.price.toFixed(2)} $</Text>
                <View style={{ flexDirection: "row", gap: 4 }}>
                  <Ionicons
                    name={
                      currency.quote.USD.percent_change_1h > 0
                        ? "caret-up"
                        : "caret-down"
                    }
                    size={16}
                    color={
                      currency.quote.USD.percent_change_1h > 0 ? "green" : "red"
                    }
                  />
                  <Text
                    style={{
                      color:
                        currency.quote.USD.percent_change_1h > 0
                          ? "green"
                          : "red",
                    }}
                  >
                    {currency.quote.USD.percent_change_1h.toFixed(2)} %
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          </Link>
        ))}
      </View>
    </ScrollView>
  );
}
