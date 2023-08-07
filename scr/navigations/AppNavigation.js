import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Dashboard from '../screens/AppScreen/Dashboard';
import MySurveys from '../screens/AppScreen/MySurveys';
import StartNewSurvey from '../screens/AppScreen/StartNewSurvey';

import DomesticVisitorNavigation from './DomesticVisitorNavigation';
import SuccessScreen from '../screens/AppScreen/RespondentScreen/SuccessScreen';
import DomesticExhibitorNavigation from './DomesticExhibitorNavigation';
import ForeignExhibitorNavigation from './ForeignExhibitorNavigation';
import ForeignVisitorNavigation from './ForeignVisitorNavigation';
import SponsorNavigation from './SponsorNavigation';
import UpdateUserSurvey from '../screens/AppScreen/UpdateUserSurvey';
import UpdatedSuccessScreen from '../screens/AppScreen/UpdatedSuccessScreen';

const Drawer = createDrawerNavigator();

const AppNavigation = () => {
    return (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomDrawer {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Drawer.Screen name="Home" component={Dashboard} />
            <Drawer.Screen name="My Surveys" component={MySurveys} />
            <Drawer.Screen name="Start New Survey" component={StartNewSurvey} />
            <Drawer.Screen name="Domestic Visitor Navigation" component={DomesticVisitorNavigation} />
            <Drawer.Screen name="Domestic Exhibitor Navigation" component={DomesticExhibitorNavigation} />
            <Drawer.Screen name="Foreign Exhibitor Navigation" component={ForeignExhibitorNavigation} />
            <Drawer.Screen name="Foreign Visitor Navigation" component={ForeignVisitorNavigation} />
            <Drawer.Screen name="Sponsor Navigation" component={SponsorNavigation} />
            <Drawer.Screen name="SuccessScreen" component={SuccessScreen} />
            <Drawer.Screen name="Update User Survey" component={UpdateUserSurvey} />
            <Drawer.Screen name="UpdatedSuccessScreen" component={UpdatedSuccessScreen} />
        </Drawer.Navigator>
    )
}

export default AppNavigation;