import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import RestaurantCard from "./RestaurantCard";
import sanityClient from "../../sanity";
import { getFeaturedRowsRestaurants } from "../constants";

const FeaturedRow = ({ title, description, id }) => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[_type == "featured" && _id == $id] {
          ...,
          restaurants[]->{
            ...,
            dishes[]->,
            type->{
              name
            }
          }
        }[0]`,
        { id }
      )
      .then((data) => setRestaurants(data?.restaurants))
      .catch((err) => console.log(err));
  }, []);

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="text-lg font-bold">{title}</Text>
        <ArrowRightIcon color="#00ccbb" size={25} />
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}</Text>

      <ScrollView
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
        showsHorizontalScrollIndicator={false}
        className="pt-4"
      >
        {/* RestaurantCards */}
        {restaurants?.map((restaurant) => (
          <RestaurantCard
            key={restaurant._id}
            id={restaurant._id}
            imgUrl={restaurant?.image}
            title={restaurant?.name}
            rating={restaurant?.rating}
            genre={restaurant?.type?.name}
            address={restaurant?.address}
            shortDescription={restaurant?.short_description}
            dishes={restaurant?.dishes}
            long={restaurant?.long}
            lat={restaurant?.lat}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
