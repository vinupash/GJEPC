import React from 'react'
import { StyleSheet, Text, View, TextInput, Dimensions } from 'react-native'
import { COLORS, FONT, SHADOWS, SIZES } from '../constants/theme'
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
export const Input = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputBox}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor="#BCBCBC"
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        </>
    )
}

export const InputForm = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    secureTextEntry = false,
    placeholderTextColor,
    autoCapitalize,
    label
}) => {
    return (
        <>
            <Text style={styles.inputLabel}>{label}</Text>
            <View style={styles.inputBoxForm}>
                <TextInput
                    style={styles.inputStyle}
                    placeholder={placeholder}
                    placeholderTextColor="#BCBCBC"
                    onChangeText={(text) => setValue(text)}
                    value={value}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    maxLength={maxLength}
                    autoCapitalize={autoCapitalize}
                />
            </View>
        </>
    )
}

export const CustomTextArea = ({
    props,
    name,
    maxLength,
    placeholder,
    value,
    setValue,
    keyboardType,
    // secureTextEntry = false,
    editable,
    autoFocus,
    autoCapitalize,
    placeholderTextColor,
    multiline,
    numberOfLines
}) => {
    return (
        <TextInput
            style={{
                backgroundColor: "#FFFFFF",
                paddingVertical: 10,
                paddingHorizontal: 10,
                textAlign: 'left',
                fontFamily: FONT.OpenSansRegular,
                borderRadius: 10,
                color: COLORS.brand.secondary,
                // height: 50,
                borderWidth: 1,
                borderColor: '#BCBCBC',
                fontSize: SIZES.font,
                textAlignVertical: 'top',
                marginBottom: 5,
                ...SHADOWS.light
            }}
            placeholder={placeholder}
            placeholderTextColor="#BCBCBC"
            onChangeText={(text) => setValue(text)}
            value={value}
            // secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            maxLength={maxLength}
            editable={editable}
            autoFocus={autoFocus}
            autoCapitalize={autoCapitalize}
            multiline={multiline}
            numberOfLines={numberOfLines}
        />
    )
}

const styles = StyleSheet.create({
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: "#696969",
        marginBottom: 5,
        width: windowWidth - 30,
    },
    inputBox: {
        height: 40,
        width: windowWidth - 30,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: '#BCBCBC',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    inputStyle: {
        fontFamily: FONT.OpenSansRegular,
        fontSize: SIZES.font,
        color: COLORS.brand.secondary,
        flex: 1,
    },
    inputBoxForm: {
        height: 40,
        width: "100%",
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: '#BCBCBC',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
})