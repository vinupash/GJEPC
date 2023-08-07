import React, { useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { COLORS, FONT, SIZES, SHADOWS } from '../constants';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { SvgXml } from 'react-native-svg';
import Logo from '../../assets/images/Logo';
import Logout from '../../assets/images/Logout';
import Close from '../../assets/images/Close';
import { AuthContext } from '../context/AuthContext';

const CustomDrawer = ({ props, navigation }) => {
    const { userLogout } = useContext(AuthContext)
    return (
        <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    backgroundColor: "#FFFFFF",
                }}
            >
                <View style={{ flexDirection: 'row', alignItems: 'center', padding: 20 }}>
                    <TouchableOpacity
                        onPress={() => navigation.closeDrawer()}
                    >
                        <SvgXml xml={Close} width={28} height={28} />
                    </TouchableOpacity>
                    <View style={styles.logoSection}>
                        <SvgXml xml={Logo} width={56} height={24} />
                    </View>
                </View>
                <View style={{ flex: 1, backgroundColor: "#FFFFFF", marginTop: 20, padding: 20 }}>
                    <DrawerItem
                        label="Dashboard"
                        labelStyle={styles.menuLabel}
                        onPress={() => { navigation.navigate('Home') }}
                        style={styles.drawerItemStyle}
                    />

                    <DrawerItem
                        label="My Surveys"
                        labelStyle={styles.menuLabel}
                        onPress={() => { navigation.navigate('My Surveys') }}
                        style={styles.drawerItemStyle}
                    />

                    <DrawerItem
                        label="Start New Survey"
                        labelStyle={styles.menuLabel}
                        onPress={() => { navigation.navigate('Start New Survey') }}
                        style={styles.drawerItemStyle}
                    />
                </View>
            </DrawerContentScrollView>
            <TouchableOpacity
                onPress={() => { userLogout() }}
                style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    borderWidth: 1,
                    marginHorizontal: 20,
                    borderRadius: 10,
                    borderColor: '#DDDDDD',
                    marginBottom: 20,
                    height: 45,
                }}
            >
                <Text style={{ fontFamily: FONT.OpenSansRegular, fontSize: SIZES.font, color: "#262D37", marginRight: 8, lineHeight: 18, marginLeft: 6 }}>Logout</Text>
                <SvgXml xml={Logout} width={20} height={20} />
            </TouchableOpacity>
        </View>
    )
}

export default CustomDrawer

const styles = StyleSheet.create({
    logoSection: {
        marginLeft: 10
    },
    menuLabel: {
        fontFamily: FONT.OpenSansRegular,
        fontSize: SIZES.font,
        color: "#262D37",
        lineHeight: 17,
        paddingHorizontal: 15,
    },
    drawerItemStyle: {
        marginHorizontal: null,
        marginVertical: null,
        paddingVertical: null,
        borderRadius: 0,
        height: 45,
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 10,
        borderColor: '#DDDDDD',
    }
})