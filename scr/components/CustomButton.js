import React from 'react';
import { StyleSheet, Text, View, Dimensions, TouchableOpacity } from 'react-native';
import { COLORS, FONT, SHADOWS, SIZES } from '../constants/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export const PrimaryBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.primaryBtn}
            onPress={onPress}
        >
            <Text style={styles.primaryBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export const TransparentBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.transparentBtn}
            onPress={onPress}
        >
            <Text style={styles.transparentBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}


export const PrevBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.prevBtn}
            onPress={onPress}
        >
            <Text style={styles.prevBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

export const NextBtn = ({
    onPress,
    btnText
}) => {
    return (
        <TouchableOpacity
            style={styles.nextBtn}
            onPress={onPress}
        >
            <Text style={styles.nextBtnText}>{btnText}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    primaryBtn: {
        width: windowWidth - 30,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.light,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 5,
        height: 48,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    primaryBtnText: {
        textAlign: 'center',
        fontFamily: FONT.OpenSansBold,
        fontSize: SIZES.medium,
        color: "#FFFFFF",
        lineHeight: 20
    },
    prevBtn: {
        width: 100,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.light,
        backgroundColor: "#F5F5F5",
        borderRadius: 5,
        height: 48,
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: '#DDDDDD'
    },
    prevBtnText: {
        textAlign: 'center',
        fontFamily: FONT.OpenSansRegular,
        fontSize: SIZES.medium,
        color: "#999999",
        lineHeight: 20
    },
    nextBtn: {
        width: 100,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.light,
        backgroundColor: COLORS.brand.primary,
        borderRadius: 5,
        height: 48,
        justifyContent: 'center',
    },
    nextBtnText: {
        textAlign: 'center',
        fontFamily: FONT.OpenSansRegular,
        fontSize: SIZES.medium,
        color: "#FFFFFF",
        lineHeight: 20
    },
    transparentBtn: {
        width: windowWidth - 30,
        borderRadius: 24,
        marginBottom: 5,
        ...SHADOWS.light,
        backgroundColor: "#FFFFFF",
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        borderRadius: 5,
        height: 48,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    transparentBtnText: {
        textAlign: 'center',
        fontFamily: FONT.OpenSansBold,
        fontSize: SIZES.medium,
        color: COLORS.brand.primary,
        lineHeight: 20
    },
})