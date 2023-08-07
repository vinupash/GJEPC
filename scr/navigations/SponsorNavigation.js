import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ForeignVisitor from '../screens/AppScreen/RespondentScreen/ForeignVisitor/ForeignVisitor';
import Sponsor from '../screens/AppScreen/RespondentScreen/Sponsor/Sponsor';


const SponsorStack = createStackNavigator();

const SponsorNavigation = () => {

    return (
        <SponsorStack.Navigator>
            <SponsorStack.Screen
                name="Sponsor"
                component={Sponsor}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
        </SponsorStack.Navigator>
    )
}

export default SponsorNavigation;
