import { Dropdown, RoundBtn } from "@/components";
import WidgetList from "@/components/sortable-list/widget-list";
import cn from "@/lib/cn";
import { useBalanceStore } from "@/storage/balance-store";
import colors from "@/styles/colors";
import { defaultStyles } from "@/styles/styles";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ScrollView } from "react-native";
import { useHeaderHeight } from "@react-navigation/elements";

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const { balance, runTransaction, transactions, clearTransactions } =
    useBalanceStore();

  const onAddMoney = () => {
    runTransaction({
      id: Math.random().toString(),
      amount: Math.floor(Math.random() * 1000) * (Math.random() > 0.5 ? 1 : -1),
      date: new Date(),
      title: "Added money",
    });
  };

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      className='px-5 pb-10'
      contentContainerStyle={{
        paddingTop: headerHeight,
        paddingBottom: 90,
      }}
    >
      <View className='m-20 center'>
        <View className='flex-row items-end justify-center gap-2'>
          <Text className='text-5xl font-ibmSemi text-gray-900'>
            {balance()}
          </Text>
          <Text className='text-3xl font-ibmSemi text-gray-900'>$</Text>
        </View>
      </View>
      <View className='flex-row justify-between '>
        <RoundBtn icon={"add"} title={"Add money"} onPress={onAddMoney} />
        <RoundBtn
          icon={"refresh"}
          title={"Exchange"}
          onPress={clearTransactions}
        />
        <RoundBtn icon={"list"} title={"Details"} />
        <Dropdown />
      </View>

      <Text className={cn(defaultStyles.sectionHeader, "mt-5")}>
        Transactions
      </Text>
      <View className='bg-white rounded-2xl gap-5 mt-3 p-3'>
        {transactions.length === 0 && (
          <Text className={cn("text-base text-gray-400 p-2")}>
            No transactions yet
          </Text>
        )}

        {transactions.map((transaction) => (
          <View key={transaction.id} className='flex-row items-center gap-4'>
            <View className='size-10 rounded-[20px] bg-gray-300 justify-center items-center'>
              <Ionicons
                name={transaction.amount > 0 ? "add" : "remove"}
                size={24}
                color={colors.dark}
              />
            </View>

            <View className='flex-1'>
              <Text className='font-rob'>{transaction.title}</Text>
              <Text className='text-base text-gray-400 mt-1'>
                {transaction.date.toLocaleString()}
              </Text>
            </View>
            <Text className='text-[18px] leading-tight'>
              {transaction.amount} €
            </Text>
          </View>
        ))}
      </View>
      <Text className={cn(defaultStyles.sectionHeader, "mt-5")}>
        Transactions
      </Text>
      <View className='mt-5'>
        <WidgetList />
      </View>
    </ScrollView>
  );
}
