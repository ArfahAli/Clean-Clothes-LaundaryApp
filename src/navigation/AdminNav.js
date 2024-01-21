import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AdminHomeScreen from "../AdminPanel/Home";
import ManageServicesScreen from "../AdminPanel/ManageServices";
import AddServiceScreen from "../AdminPanel/AddServices";
import ManageOrders from "../AdminPanel/ManageOrders";
import UserAcc from "../AdminPanel/UserAcc";
import EditServiceScreen from "../AdminPanel/EditService";
const Stack = createStackNavigator();
const AdminNav = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AdminHomeScreen">
        <Stack.Screen name="AdminHomeScreen" component={AdminHomeScreen} />
        <Stack.Screen name="ManageServicesScreen" component={ManageServicesScreen} />
        <Stack.Screen name="AddServiceScreen" component={AddServiceScreen} />
        <Stack.Screen name="ManageOrders" component={ManageOrders} />
        <Stack.Screen name="UserAcc" component={UserAcc} />
        <Stack.Screen name="EditServiceScreen" component={EditServiceScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default AdminNav;