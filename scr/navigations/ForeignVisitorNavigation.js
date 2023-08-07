import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ForeignVisitor from '../screens/AppScreen/RespondentScreen/ForeignVisitor/ForeignVisitor';


const ForeignVisitorStack = createStackNavigator();

const ForeignVisitorNavigation = () => {

    return (
        <ForeignVisitorStack.Navigator>
            <ForeignVisitorStack.Screen
                name="Foreign Visitor"
                component={ForeignVisitor}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
        </ForeignVisitorStack.Navigator>
    )
}

export default ForeignVisitorNavigation;
