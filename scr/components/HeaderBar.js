import React from 'react'
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native'
import { SHADOWS } from '../constants/theme';
import { SvgXml } from 'react-native-svg';
import Menu from '../../assets/images/Menu';
import Logo from '../../assets/images/Logo';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const HeaderBar = ({
    onPress
}) => {
    return (
        <View style={styles.headerBar}>
            <TouchableOpacity onPress={onPress} style={{ height: 35, width: 35, justifyContent: 'center' }}>
                <SvgXml xml={Menu} width={24} height={24} />
            </TouchableOpacity>
            <SvgXml xml={Logo} width={56} height={24} />
        </View>
    )
}

export default HeaderBar

const styles = StyleSheet.create({
    headerBar: {
        height: 56,
        width: windowWidth,
        // justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 15,
        backgroundColor: '#FFFFFF',
        ...SHADOWS.medium,
        marginBottom: 5,
        flexDirection: 'row'
    }
})