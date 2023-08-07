import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/AuthScreen/SplashScreen';
import Login from '../screens/AuthScreen/Login';

const LoginStack = createStackNavigator();

const AuthNavigation = () => {

    const [isSplashScreen, setSplashScreen] = useState(true);
    useEffect(() => {
        setInterval(() => {
            setSplashScreen(false)
        }, 4000);
    }, [])

    return (
        <LoginStack.Navigator>
            {isSplashScreen ?
                (<LoginStack.Screen
                    name="SplashScreen"
                    component={SplashScreen}
                    options={{
                        headerShown: false,
                        animation: 'fade'
                    }}
                />) : null}
            {/* <LoginStack.Screen
                name="SplashScreen"
                component={SplashScreen}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            /> */}
            <LoginStack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
        </LoginStack.Navigator>
    )
}

export default AuthNavigation;