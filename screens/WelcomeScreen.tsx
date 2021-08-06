import { Ionicons } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import React, { PropsWithChildren } from "react";
import { Button, Text, View } from "react-native";
import tw from "tailwind-react-native-classnames";
import { useAuth } from "../components/AuthProvider";
import Divider from "../components/Divider";
import Stack from "../components/Stack";

type WelcomeItemProps = PropsWithChildren<{
  icon: keyof typeof Ionicons.glyphMap;
}>;

const WelcomeItem = ({ icon, children }: WelcomeItemProps) => (
  <Stack direction="row" style={tw`items-center`}>
    <View style={tw`w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center mr-5`}>
      <Ionicons name={icon} size={25} />
    </View>
    <View style={tw`flex-1`}>
      <Text style={tw`text-base`}>{children}</Text>
    </View>
  </Stack>
);

const WelcomeScreen = () => {
  const { signIn } = useAuth();

  return (
    <Stack spacing={4} style={tw`flex-1 justify-center p-6`}>
      <Text style={tw`text-3xl font-bold text-center`}>Welcome</Text>

      <Stack spacing={4} divider={<Divider />}>
        <WelcomeItem icon="newspaper">
          Stay up-to-date with announcements from LHS, ASB, and your clubs.
        </WelcomeItem>
        <WelcomeItem icon="calendar">
          Check out upcoming school events and other important dates.
        </WelcomeItem>
        <WelcomeItem icon="time">
          View daily class and club schedules, including special schedule weeks.
        </WelcomeItem>
        <WelcomeItem icon="gift">
          Earn points for participating in events and use them to redeem rewards and win class
          competitions!
        </WelcomeItem>

        <View>
          <Button title="Sign in with Schoology" onPress={signIn} />
          <Text style={tw`text-sm text-center text-gray-500`}>or</Text>
          <Button title="Continue as Guest" onPress={() => {}} />
        </View>
      </Stack>
    </Stack>
  );
};

export default WelcomeScreen;
