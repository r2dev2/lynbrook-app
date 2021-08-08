import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  ActivityIndicator,
  SectionList,
  Text,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import tw from "tailwind-react-native-classnames";
import APIError from "../../components/APIError";
import ListItem from "../../components/ListItem";
import Stack from "../../components/Stack";
import { useClubOrgs, useUserOrgs } from "../../helpers/api";
import { Organization, OrganizationType } from "../../helpers/api/models";
import { ClubsScreenProps } from "../../navigation/tabs/ActivitiesNavigator";

type ClubItemProps = {
  item: Organization;
  subscribed: boolean;
  toggle: () => void;
  info: () => void;
};

const ClubItem = ({ item, subscribed, toggle, info }: ClubItemProps) => (
  <TouchableHighlight onPress={info}>
    <ListItem text={item.name} direction="row" align="center">
      {item.type == OrganizationType.CLUB && (
        <Stack direction="row" spacing={2} align="center">
          <TouchableOpacity onPress={toggle}>
            <Ionicons
              name={subscribed ? "remove-circle-outline" : "add-circle-outline"}
              style={tw`text-${subscribed ? "red" : "green"}-500 text-2xl`}
            />
          </TouchableOpacity>
          <Ionicons name="chevron-forward" style={tw`text-lg text-gray-500`} />
        </Stack>
      )}
    </ListItem>
  </TouchableHighlight>
);

const ClubsScreen = ({ navigation }: ClubsScreenProps) => {
  const { data: clubOrgs, error } = useClubOrgs();
  const { data: userOrgs, error: error2 } = useUserOrgs();

  if (error) return <APIError error={error} />;
  if (error2) return <APIError error={error2} />;
  if (!clubOrgs) return <ActivityIndicator style={tw`m-4`} />;
  if (!userOrgs) return <ActivityIndicator style={tw`m-4`} />;

  const listData = [
    {
      title: "My Clubs",
      data: userOrgs,
    },
    {
      title: "Other Clubs",
      data: clubOrgs.filter((item) => !userOrgs.some((i) => i.id === item.id)),
    },
  ];

  return (
    <SectionList<Organization>
      style={tw`-mb-px`}
      sections={listData}
      renderItem={({ item }) => (
        <ClubItem
          item={item}
          subscribed={userOrgs.includes(item)}
          toggle={() => console.log("TODO TOGGLE :D")}
          info={() => navigation.navigate("ClubDetail", { id: item.id })}
        />
      )}
      renderSectionHeader={({ section: { title } }) => (
        <ListItem
          style={tw`bg-gray-100`}
          border={listData.findIndex((x) => x.title === title) === 0 ? "both" : "bottom"}
        >
          <Text style={tw`font-medium text-center`}>{title}</Text>
        </ListItem>
      )}
      keyExtractor={(item) => item.id.toString()}
    />
  );
};

export default ClubsScreen;
