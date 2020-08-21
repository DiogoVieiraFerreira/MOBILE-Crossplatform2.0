import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity, View, Text } from 'react-native';

import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import DetailProduct from '../views/DetailProduct';
import List from '../views/ListOfProducts';
import Connection from '../views/Connection';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

const ListOfProductsStack = createStackNavigator();
const ListOfProductsStackScreen = ({ navigation }) => (
    <ListOfProductsStack.Navigator >
        <ListOfProductsStack.Screen name="Magasin" component={List} options={{
            title: "Magasin",
            headerLeft: () => (
                <TouchableOpacity style={{ paddingLeft: 10, paddingTop: 5 }} onPress={() => navigation.openDrawer()}>
                    <Icon name='ios-menu' size={25} color='black' />
                </TouchableOpacity>
            )
        }} />
        <ListOfProductsStack.Screen name="DetailProduct" component={DetailProduct} options={({ route }) => ({ title: route.params.product.name })} />
    </ListOfProductsStack.Navigator>
);
const Drawer = createDrawerNavigator();
export const DrawerScreen = () => (
    <Drawer.Navigator initialRouteName="Magasin"
        drawerType="back"
        drawerContentOptions={{
            labelStyle: {
                fontSize: 20,
            },
            // itemStyle: {
            //     borderBottomColor: "rgb(185, 188, 169)",
            //     borderBottomWidth: 1
            // },
            activeBackgroundColor: "rgba(160, 187, 194, 0.5)",
            activeTintColor: "rgb(0, 94, 146)"
        }}
        drawerStyle={{ position: "absolute", top: 60 }} >
        <Drawer.Screen name="Profil" component={Connection} options={{ animationEnabled: false }} />
        <Drawer.Screen name="Magasin" component={ListOfProductsStackScreen} />
    </Drawer.Navigator>
);