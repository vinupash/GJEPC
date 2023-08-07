import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { NextBtn, PrevBtn } from '../../../../components/CustomButton';
import { Input, InputForm } from '../../../../components/CustomInput';
import HeaderBar from '../../../../components/HeaderBar';
import RadioButton from '../../../../components/RadioButton';
import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants';
import { validatePhoneNum } from '../../../../constants/methods';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { CommonActions } from '@react-navigation/native';

const QuestionScreen1 = ({ navigation, route }) => {
    const { visitorName, optionSelected, visitorMobileNo } = route.params;
    const [optionRating, setOptionRating] = useState(null);
    const [optionError, setOptionError] = useState(null);
    const respondentData = [
        { value: '5 (Highly Satisfied)' },
        { value: '4' },
        { value: '3' },
        { value: '2' },
        { value: '1 (Not Satisfied)' },
    ];

    const submitVisiterData = () => {
        if (!optionRating) {
            setOptionError('Please select one of the above options')
        } else {
            setOptionError(null)
            navigation.navigate('Domestic Visitor Navigation', { screen: 'QuestionScreen2', params: { visitorName, visitorMobileNo, optionSelected, optionRating } });
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setOptionRating(null)
        });
        return unsubscribe;
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <HeaderBar onPress={() => navigation.openDrawer()} />
            <View style={styles.pageBoxView}>
                <Text style={styles.screenTitle}>Thank You Mr. {visitorName}</Text>
                <Text style={styles.screenSubText}>
                    to begin with.. Please rate satisfaction with this Event on a scale of 1 to 5.. where 5 being highly Satisfied.. and 1 being Not at all Satisfied.
                </Text>

                <View style={{ marginTop: 20 }}>
                    <RadioButton
                        data={respondentData}
                        onSelect={(value) => setOptionRating(value)}
                    />

                    {optionError ? <Text style={styles.invalidTextMsg}>{optionError}</Text> : null}
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrevBtn
                        btnText='Prev'
                        onPress={() => navigation.dispatch(CommonActions.goBack())}
                    />
                    <NextBtn
                        btnText='Next'
                        onPress={submitVisiterData}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default QuestionScreen1

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    screenTitle: {
        color: COLORS.brand.secondary,
        fontSize: 20,
        fontFamily: FONT.OpenSansBold,
        marginBottom: 10,
        textAlign: 'left'
    },
    pageBoxView: {
        marginTop: 10,
        width: windowWidth - 30,
        backgroundColor: "#FFFFFF",
        alignSelf: 'center',
        ...SHADOWS.light,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 8
    },
    screenSubText: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: "#696969",
    },
    invalidTextMsg: {
        width: windowWidth - 40,
        marginTop: 5,
        fontFamily: FONT.OpenSansRegular,
        fontSize: 11,
        textAlign: 'left',
        lineHeight: 18,
        color: "#ff2c55",
    },
})