import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import { useMemo } from "react";
import { XCircleIcon } from "react-native-heroicons/solid";
import {
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
} from "../features/basketSlice";
import { urlFor } from "../../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);
  const items = useSelector(selectBasketItems);
  const [groupedItemsInBasket, setGroupedItemsInBasket] = useState([]);
  const basketTotal = useSelector(selectBasketTotal);

  const dispatch = useDispatch();

  useMemo(() => {
    const groupedItems = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});

    setGroupedItemsInBasket(groupedItems);
  }, [items]);

  return (
    <SafeAreaView
      className={`${Platform.OS === "ios" ? "py-5" : "pt-12"} bg-white flex-1`}
    >
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xs">
          <View>
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>

          <TouchableOpacity
            onPress={navigation.goBack}
            className="rounded-full bg-gray-100 absolute top-3 right-3"
          >
            <XCircleIcon color="#00CCBB" size={50} />
          </TouchableOpacity>
        </View>

        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://links.papareact.com/wru",
            }}
            className="h-7 w-7 bg-gray-300 rounded-full p-4"
          />
          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity>
            <Text className="text-[#00ccbb] font-bold">Change</Text>
          </TouchableOpacity>
        </View>

        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedItemsInBasket).map(([key, dishItems]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00ccbb]">{dishItems.length} x</Text>
              <Image
                source={{ uri: urlFor(dishItems[0]?.image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{dishItems[0]?.name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={dishItems[0]?.price} currency="usd" />
              </Text>

              <TouchableOpacity>
                <Text
                  className="text-[#00ccbb] text-xs"
                  onPress={() => dispatch(removeFromBasket({ id: key }))}
                >
                  Remove
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Subtotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={basketTotal} currency="usd" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={2.99} currency="usd" />
            </Text>
          </View>

          <View className="flex-row justify-between">
            <Text>Order total</Text>
            <Text className="font-extrabold">
              <Currency quantity={basketTotal + 2.99} currency="usd" />
            </Text>
          </View>

          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrder")}
            className="rounded-lg bg-[#00ccbb] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
