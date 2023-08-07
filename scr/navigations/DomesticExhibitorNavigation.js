import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import DomesticExhibitor from '../screens/AppScreen/RespondentScreen/DomesticExhibitor/DomesticExhibitor';


const DomesticExhibitorStack = createStackNavigator();

const DomesticExhibitorNavigation = () => {

    return (
        <DomesticExhibitorStack.Navigator>
            <DomesticExhibitorStack.Screen
                name="Domestic Exhibitor"
                component={DomesticExhibitor}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />

        </DomesticExhibitorStack.Navigator>
    )
}

export default DomesticExhibitorNavigation;
