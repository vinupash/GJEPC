import React, { useEffect, useState } from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/AuthScreen/SplashScreen';
import Login from '../screens/AuthScreen/Login';
import DomesticVisitor from '../screens/AppScreen/RespondentScreen/DomesticVisitor/DomesticVisitor.js';
import QuestionScreen1 from '../screens/AppScreen/RespondentScreen/DomesticVisitor/QuestionScreen1';
import QuestionScreen2 from '../screens/AppScreen/RespondentScreen/DomesticVisitor/QuestionScreen2';
import QuestionScreen3 from '../screens/AppScreen/RespondentScreen/DomesticVisitor/QuestionScreen3';
import Feedback from '../screens/AppScreen/RespondentScreen/DomesticVisitor/Feedback';

const DomesticVisitorStack = createStackNavigator();

const DomesticVisitorNavigation = () => {

    return (
        <DomesticVisitorStack.Navigator>
            <DomesticVisitorStack.Screen
                name="Domestic Visitor"
                component={DomesticVisitor}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
            <DomesticVisitorStack.Screen
                name="QuestionScreen1"
                component={QuestionScreen1}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
            <DomesticVisitorStack.Screen
                name="QuestionScreen2"
                component={QuestionScreen2}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
            <DomesticVisitorStack.Screen
                name="QuestionScreen3"
                component={QuestionScreen3}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
            <DomesticVisitorStack.Screen
                name="Feedback"
                component={Feedback}
                options={{
                    headerShown: false,
                    animation: 'fade'
                }}
            />
        </DomesticVisitorStack.Navigator>
    )
}

export default DomesticVisitorNavigation;
