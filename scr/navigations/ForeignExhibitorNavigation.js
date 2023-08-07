import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ForeignExhibitor from '../screens/AppScreen/RespondentScreen/ForeignExhibitor/ForeignExhibitor';


const ForeignExhibitorStack = createStackNavigator();

const ForeignExhibitorNavigation = () => {

    return (
        <ForeignExhibitorStack.Navigator>
            <ForeignExhibitorStack.Screen
                name="Foreign Exhibitor"
                component={ForeignExhibitor}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
        </ForeignExhibitorStack.Navigator>
    )
}

export default ForeignExhibitorNavigation;
