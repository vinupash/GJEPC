import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { BackHandler, Alert } from 'react-native';
import Navigation from './scr/navigations/Navigation';
import { AuthProvider } from './scr/context/AuthContext';

const App = () => {
  useEffect(() => {
    const backAction = () => {
      Alert.alert("Hold on!", "Are you sure you want to go back?", [
        {
          text: "Cancel",
          onPress: () => null,
          style: "cancel"
        },
        { text: "YES", onPress: () => BackHandler.exitApp() }
      ]);
      return true;
    }

    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );

    return () => backHandler.remove();
  }, [])

  return (
    <AuthProvider>
      <Navigation />
    </AuthProvider>
  )
}

export default App;