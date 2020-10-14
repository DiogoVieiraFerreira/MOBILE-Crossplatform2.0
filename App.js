import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'

import { AuthContext } from './src/components/Context';
import { Alert } from 'react-native';
import { isEmpty } from './src/components/Helpers';


import Router from './src/router';
export default function App() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [userToken, setUserToken] = React.useState(null);
  const [basket, setBasket] = React.useState([]);
  React.useEffect(() => {
    async function fetchData()
    {
      let basket = JSON.parse(await AsyncStorage.getItem('basketTest2'))
      setBasket(basket)     
    }
    fetchData()
  }, [])

  const authContext = React.useMemo(() => {
    return {
      isLoading,
      setIsLoading,
      userToken,
      basket,
      addToBasket: async (product) => {
        let basket = JSON.parse(await AsyncStorage.getItem('basketTest2'))
        if (basket === null)
        basket = []
        
        if (basket.length != 0 && basket.find(({ id }) => id == product.id)){
          Alert.alert("Market 😶", `le produit '${product.name}' est déjà présent dans votre panier`);
          return;
        }
        
        basket.push(product)
        await AsyncStorage.setItem('basketTest2', JSON.stringify(basket))   
        setBasket(basket)     
        Alert.alert("Market 👍", `Ajout de ${product.name} au panier`);
      },
      removeOnBasket: async (product) => {
        let basket = JSON.parse(await AsyncStorage.getItem('basketTest2'))
        
        basket = basket.filter(({id}) => id != product.id)
        
        await AsyncStorage.setItem('basketTest2', JSON.stringify(basket))   
        setBasket(basket)     
        Alert.alert("Market 😲", `Le produit ${product.name} a été retiré`);
      },
      sendBasketToAPI: async () => {

      },
      signIn: async (token) => {
        try {
          setIsLoading(true)
          var res = await axios.get(`/me`, { headers: { Authorization: `Bearer ${token}` } })
          setUserToken(token)
          AsyncStorage.setItem('user_token', token)
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        }
        catch (e) {
          AsyncStorage.removeItem('user_token')
          Alert.alert("😵 Erreur de connexion", "Une erreur est survenue lors de la connexion!\nMerci de vérifier votre token ou que vous ayez bien une connexion internet...")
        }
        finally {
          setIsLoading(false)
        }
      },
      signOut: () => {
        setUserToken(null),
          AsyncStorage.removeItem('user_token')
      },
      signUp: async (user) => {
        try {
          setIsLoading(true)
          var res = await axios.post(`/user/apply`, { firstname: user.firstname, lastname: user.lastname, phonenumber: user.phonenumber })
          setUserToken(null)
          Alert.alert("👍 Inscription complétée", "Vous recevrez votre token par message,\ncela peut prendre plusieurs jours, merci de bien vouloir patienter...")
        }
        catch (e) {
          console.log(e.message)
          Alert.alert("😓 Erreur d'inscription", "Une erreur est survenue lors de l'inscription\nVeuillez reéssayer plus tard s'il vous plaît...")
        }
        finally {
          setIsLoading(false)
        }
      },
    }
  });

  return (
    <AuthContext.Provider value={authContext}>
      <Router />
    </AuthContext.Provider>
  );
}

