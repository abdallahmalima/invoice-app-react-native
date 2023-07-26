import { createDrawerNavigator } from "@react-navigation/drawer";
import Home from "../Home";
import Header from "../header";
import { StyleSheet } from "react-native";

const Drawer = createDrawerNavigator();
const DrawerNavigator = () => (
  <Drawer.Navigator screenOptions={{ 
    headerStyle: styles.headerStyle,
    headerTintColor: '#fff', }}>
    <Drawer.Screen name="Invoice Detail" component={Home} />
    <Drawer.Screen name="Invoice Header" component={Header} />
  </Drawer.Navigator>
);
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#0074d9',
  },
});

export default DrawerNavigator;