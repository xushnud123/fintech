import React from "react";

import { Text, View } from "react-native";
import colors from "@/styles/colors";
import { Ionicons } from "@expo/vector-icons";
import { useBalanceStore } from "@/storage/balance-store";

const tiles = [
  {
    id: "spent",
  },
  {
    id: "cashback",
  },
  {
    id: "recent",
  },
  {
    id: "cards",
  },
];

const WidgetList = () => {
  const { transactions } = useBalanceStore();
  return (
    <View className=''>
      <View className='w-full flex-row gap-4 justify-between'>
        <View
          className='bg-white h-[160px] w-[186px] justify-center items-center rounded-3xl'
          pointerEvents='none'
        >
          <Text style={{ color: colors.gray, fontWeight: "500", fontSize: 16 }}>
            Spent this month
          </Text>
          <Text
            style={{
              color: colors.dark,
              fontWeight: "bold",
              fontSize: 26,
              paddingTop: 10,
            }}
          >
            1024€
          </Text>
        </View>
        <View
          className='bg-white h-[160px] w-[186px] justify-center items-center rounded-3xl'
          pointerEvents='none'
        >
          <View
            style={{ alignItems: "center", justifyContent: "center", gap: 10 }}
          >
            <View
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                backgroundColor: colors.primary,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
                5%
              </Text>
            </View>
            <Text
              style={{ color: colors.gray, fontWeight: "bold", fontSize: 18 }}
            >
              Cashback
            </Text>
          </View>
        </View>
      </View>
      <View className='w-full flex-row gap-4 justify-between mt-6'>
        <View
          pointerEvents='none'
          className='bg-white h-[160px] w-[186px] justify-center items-center rounded-3xl'
        >
          <View>
            <Text
              style={{ color: colors.gray, fontWeight: "500", fontSize: 16 }}
            >
              Recent transaction
            </Text>

            {transactions.length === 0 && (
              <Text
                style={{
                  color: colors.gray,
                  fontWeight: "bold",
                  fontSize: 18,
                  paddingTop: 10,
                }}
              >
                No transactions
              </Text>
            )}

            {transactions.length > 0 && (
              <>
                <Text
                  style={{
                    color: colors.dark,
                    fontWeight: "bold",
                    fontSize: 18,
                    paddingVertical: 10,
                  }}
                >
                  {transactions[transactions.length - 1].amount}€
                </Text>
                <Text
                  style={{
                    color: colors.gray,
                    fontWeight: "bold",
                    fontSize: 16,
                  }}
                >
                  {transactions[transactions.length - 1].title}
                </Text>
              </>
            )}
          </View>
        </View>
        <View
          pointerEvents='none'
          className='bg-white h-[160px] w-[186px] justify-center items-center rounded-3xl'
        >
          <Text style={{ color: colors.gray, fontWeight: "500", fontSize: 16 }}>
            Cards
          </Text>
          <Ionicons
            name='card'
            size={50}
            color={colors.primaryMuted}
            style={{ marginTop: 20, alignSelf: "center" }}
          />
        </View>
      </View>

      {/* <SortableList
        editing={true}
        onDragEnd={(positions) =>
          console.log(JSON.stringify(positions, null, 2))
        }
      >
        {[...tiles].map((tile, index) => (
          <Tile
            onLongPress={() => true}
            key={tile.id + "-" + index}
            id={tile.id}
          />
        ))}
      </SortableList> */}
    </View>
  );
};

export default WidgetList;
