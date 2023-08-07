import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { NextBtn, PrevBtn } from '../../../../components/CustomButton';
import { Input, InputForm } from '../../../../components/CustomInput';
import HeaderBar from '../../../../components/HeaderBar';
import RadioButton from '../../../../components/RadioButton';
import { COLORS, FONT, SHADOWS, SIZES } from '../../../../constants';
import { validatePhoneNum } from '../../../../constants/methods';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { CommonActions } from '@react-navigation/native';
import RadioButtonBox from '../../../../components/RadioButtonBox';
import CustomSwitch from '../../../../components/CustomSwitch';
import SelectDropdown from 'react-native-select-dropdown';

const QuestionScreen2 = ({ navigation, route }) => {
    const { visitorName, optionSelected, optionRating, visitorMobileNo } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [visitorTab, setVisitorTab] = useState(1);
    const [selectedDomestic, setSelectedDomestic] = useState('');
    const [selectedForeign, setSelectedForeign] = useState('');
    const [domesticError, setDomesticError] = useState(null);
    const [foreignError, setForeignError] = useState(null);

    const onSelectSwitch = value => {
        setVisitorTab(value);
    };

    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const domestics = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]

    const submitDomesticsData = () => {
        console.log('submitDomesticsData');
        if (selectedDomestic == null) {
            setDomesticError('Please select one of the above options')
        } else {
            setDomesticError(null)
            console.log(selectedDomestic);
            navigation.navigate('Domestic Visitor Navigation', { screen: 'QuestionScreen3', params: { visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign } });
        }

    }

    const submitForeignData = () => {
        console.log('submitForeignData');
        if (selectedForeign == null) {
            setForeignError('Please select one of the above options')
        } else {
            setForeignError(null)
            navigation.navigate('Domestic Visitor Navigation', { screen: 'QuestionScreen3', params: { visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign } });
        }
    }


    // console.log(selectedForeign);
    // console.log(optionRating);

    if (isLoading) {
        return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <HeaderBar onPress={() => navigation.openDrawer()} />
            <View style={styles.pageBoxView}>
                <Text style={styles.screenTitle}>Select one option's</Text>
                <Text style={styles.screenSubText}>
                    to begin with.. Please rate satisfaction with this Event on a scale of 1 to 5.. where 5 being highly Satisfied.. and 1 being Not at all Satisfied.
                </Text>

                <View style={{ marginTop: 20 }}>
                    <CustomSwitch
                        selectionMode={1}
                        option1="Domestic Visitor"
                        option2="Foreign Visitor"
                        onSelectSwitch={onSelectSwitch}
                    />

                </View>

                <View style={{ marginTop: 20 }}>
                    {visitorTab == 1 &&
                        <>
                            <SelectDropdown
                                data={domestics}
                                onSelect={(selectedItem, index) => {
                                    // console.log(selectedItem, index)
                                    setSelectedDomestic(selectedItem)
                                }}
                                defaultButtonText="Domestic Visit"
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.medium, color: selectedDomestic ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.medium,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />

                            {domesticError ? <Text style={styles.invalidTextMsg}>{domesticError}</Text> : null}
                        </>
                    }

                    {visitorTab == 2 &&
                        <>
                            <SelectDropdown
                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    // console.log(selectedItem, index)
                                    setSelectedForeign(selectedItem)
                                }}
                                defaultButtonText="Foreign Visit"
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.medium, color: selectedForeign ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.medium,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />

                            {foreignError ? <Text style={styles.invalidTextMsg}>{foreignError}</Text> : null}
                        </>
                    }
                </View>

                {/* {visitorTab == 1 ? <>{foreignError ? <Text style={styles.invalidTextMsg}>{foreignError}</Text> : null}</> : <>{domesticError ? <Text style={styles.invalidTextMsg}>{domesticError}</Text> : null}</>} */}

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrevBtn
                        btnText='Prev'
                        onPress={() => navigation.dispatch(CommonActions.goBack())}
                    />
                    {visitorTab == 1 ?
                        (<NextBtn
                            btnText='Next'
                            onPress={submitDomesticsData}
                        />) :
                        (<NextBtn
                            btnText='Next'
                            onPress={submitForeignData}
                        />)
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default QuestionScreen2

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
    dropdownContainer: {
        height: 45,
        width: "100%",
        borderWidth: 1,
        backgroundColor: "#FFFFFFW",
        borderColor: "#DDDDDD",
        borderRadius: 10,
        paddingHorizontal: 6,
        // textAlign: 'left'
    },
})