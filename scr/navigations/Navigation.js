import React, { useContext } from 'react';
import { ActivityIndicator } from 'react-native';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { AuthContext } from '../context/AuthContext';
import { COLORS } from '../constants';

import AppNavigation from './AppNavigation';
import AuthNavigation from './AuthNavigation';

const theme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        backgroundColor: 'transparent'
    }
}

const Navigation = () => {
    const { isLoading, userTokan } = useContext(AuthContext)
    if (isLoading) {
        return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }
    return (
        <NavigationContainer theme={theme} independent={true}>
            {userTokan !== null ? <AppNavigation /> : <AuthNavigation />}
        </NavigationContainer>
    )
}

export default Navigation;