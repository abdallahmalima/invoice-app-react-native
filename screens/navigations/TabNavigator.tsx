import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import DrawerNavigator from "./DrawerNavigator";

const Tab = createBottomTabNavigator();
const TabNavigator=()=>(
  <Tab.Navigator
  screenOptions={{
    tabBarLabelPosition: "beside-icon",
    tabBarLabelStyle: {
      fontWeight: "700",
      fontSize: 15
    },
    tabBarIconStyle: { display: "none" },
  }}
  >
    <Tab.Screen 
    name="Tab One" 
    component={DrawerNavigator} 
    options={{ headerShown: false }}
    />
    <Tab.Screen 
    name="Tab Two"
     component={DrawerNavigator}
     options={{ headerShown: false }}
      />
  </Tab.Navigator>
);

export  default TabNavigator;