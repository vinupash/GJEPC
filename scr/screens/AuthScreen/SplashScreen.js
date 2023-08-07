import React from 'react'
import { StyleSheet, Text, View, Dimensions, SafeAreaView, StatusBar } from 'react-native'
import { COLORS } from '../../constants/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
const SplashScreen = () => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <SvgXml xml={Logo} width={94} height={40} />
        </SafeAreaView>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    container: {
        height: windowHeight,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.page
    }
})