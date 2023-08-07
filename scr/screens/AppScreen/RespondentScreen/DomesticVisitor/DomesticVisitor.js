import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { NextBtn, PrevBtn } from '../../../../components/CustomButton';
import { Input, InputForm } from '../../../../components/CustomInput';
import HeaderBar from '../../../../components/HeaderBar';
import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants';
import { validatePhoneNum } from '../../../../constants/methods';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const DomesticVisitor = ({ navigation, route }) => {
    const { optionSelected } = route.params;
    const [visitorName, setVisitorName] = useState('');
    const [visitorNameError, setVisitorNameError] = useState('');
    const [visitorMobileNo, setVisitorMobileNo] = useState('');
    const [visitorMobileNoError, setVisitorMobileNoError] = useState(null);

    console.log('optionSelected--->', optionSelected);

    const submitVisiterData = () => {
        if (visitorName === '') {
            setVisitorNameError('Please enter name')
        } else {
            setVisitorNameError(null)
        }

        if (visitorMobileNo === '' || visitorMobileNo.trim().length < 10 || !validatePhoneNum(visitorMobileNo)) {
            setVisitorMobileNoError('Please enter vaild mobile number')
        } else {
            setVisitorMobileNoError(null)
            navigation.navigate('Domestic Visitor Navigation', { screen: 'QuestionScreen1', params: { visitorName, visitorMobileNo, optionSelected } });
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setVisitorName(''), setVisitorMobileNo('')
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
                <Text style={styles.screenTitle}>Welcome Domestic Visitor</Text>
                <Text style={styles.screenSubText}>
                    we would like to take a short survey of yours to know your feedback / inputs and suggestions on the IIJS Show of GJEPC.
                </Text>

                <View style={{ marginTop: 10 }}>
                    <InputForm
                        label='For Records, May I have your Name'
                        placeholder='Enter name'
                        value={visitorName}
                        setValue={setVisitorName}
                        autoCapitalize='none'
                    />
                    {visitorNameError ? <Text style={styles.invalidTextMsg}>{visitorNameError}</Text> : null}
                </View>
                <View style={{ marginTop: 20 }}>
                    <InputForm
                        label='and Mobile No.'
                        placeholder='Enter mobile number'
                        value={visitorMobileNo}
                        setValue={setVisitorMobileNo}
                        autoCapitalize='none'
                        keyboardType="number-pad"
                        maxLength={10}
                    />
                    {visitorMobileNoError ? <Text style={styles.invalidTextMsg}>{visitorMobileNoError}</Text> : null}
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrevBtn
                        btnText='Prev'
                        onPress={() => navigation.navigate('Start New Survey')}
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

export default DomesticVisitor

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