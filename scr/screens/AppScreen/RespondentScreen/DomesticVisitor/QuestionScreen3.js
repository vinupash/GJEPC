import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, ActivityIndicator } from 'react-native';
import { NextBtn, PrevBtn } from '../../../../components/CustomButton';
import { CustomTextArea, Input, InputForm } from '../../../../components/CustomInput';
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

const QuestionScreen3 = ({ navigation, route }) => {
    const { visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign } = route.params;
    const [isLoading, setLoading] = useState(false);
    const [visitorTab, setVisitorTab] = useState(1);
    const [domesticExhibitor, setDomesticExhibitor] = useState('');
    const [domesticExhibitorError, setDomesticExhibitorError] = useState(null);
    const [foreignExhibitor, setForeignExhibitor] = useState('');
    const [foreignExhibitorError, setForeignExhibitorError] = useState(null);
    const [selectedSponsor, setSelectedSponsor] = useState(null);
    const [selectedSponsorError, setSelectedSponsorError] = useState('');

    const onSelectSwitch = value => {
        setVisitorTab(value);
    };

    const sponsor = ["Sponsor_1", "Sponsor_2", "Sponsor_3", "Sponsor_4", "Others", "No"]

    console.log('selectedSponsor--->', selectedSponsor, domesticExhibitor, foreignExhibitor);

    const submitDomesticsData = () => {
        console.log('submitDomesticsData');
        // console.log(visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor);
        if (domesticExhibitor == '') {
            setDomesticExhibitorError('Please enter your')
        } else if (selectedSponsor == null) {
            setSelectedSponsorError('Please select sponsor option')
        } else {
            navigation.navigate('Domestic Visitor Navigation', { screen: 'Feedback', params: { visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor } });
        }

    }

    const submitForeignData = () => {
        console.log('submitForeignData');

        if (selectedSponsor == null) {
            setSelectedSponsorError('Please select sponsor option')
        } else if (foreignExhibitor == '') {
            setForeignExhibitorError('Please enter your')
        } else {
            setForeignExhibitorError(null)
            navigation.navigate('Domestic Visitor Navigation', { screen: 'Feedback', params: { visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor } });
        }
    }

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
                {/* <Text style={styles.screenTitle}>Select one option's</Text> */}
                <Text style={styles.screenSubText}>
                    Is there are other feedback or suggestions that you would like to give to GJEPC (Text Box)
                </Text>

                <View style={{ marginTop: 20 }}>
                    <CustomSwitch
                        selectionMode={1}
                        option1="Domestic Exhibitor"
                        option2="Foreign Exhibitor"
                        onSelectSwitch={onSelectSwitch}
                    />

                </View>

                <View style={{ marginTop: 20 }}>
                    {visitorTab == 1 &&
                        <>

                            <CustomTextArea
                                placeholder='Type...'
                                value={domesticExhibitor}
                                setValue={setDomesticExhibitor}
                                autoFocus={false}
                                multiline={true}
                                numberOfLines={8}
                            />
                            {domesticExhibitorError ? <Text style={styles.invalidTextMsg}>{domesticExhibitorError}</Text> : null}
                        </>
                    }

                    {visitorTab == 2 &&
                        <>
                            <CustomTextArea
                                placeholder='Type...'
                                value={foreignExhibitor}
                                setValue={setForeignExhibitor}
                                autoFocus={false}
                                multiline={true}
                                numberOfLines={8}
                            />

                            {foreignExhibitorError ? <Text style={styles.invalidTextMsg}>{foreignExhibitorError}</Text> : null}
                        </>
                    }
                </View>

                <View style={{ marginTop: 20 }}>
                    <Text style={styles.inputLabel}>Select sponsor</Text>
                    <SelectDropdown
                        data={sponsor}
                        onSelect={(selectedItem, index) => {
                            // console.log(selectedItem, index)
                            setSelectedSponsor(selectedItem)
                        }}
                        defaultButtonText="Select Sponsor option"
                        buttonStyle={styles.dropdownContainer}
                        buttonTextStyle={{
                            fontFamily: FONT.OpenSansRegular,
                            fontSize: SIZES.medium, color: selectedSponsor ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
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

                    {selectedSponsorError ? <Text style={styles.invalidTextMsg}>{selectedSponsorError}</Text> : null}
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrevBtn
                        btnText='Prev'
                        onPress={() => navigation.dispatch(CommonActions.goBack())}
                    />
                    {visitorTab == 1 ?
                        (<NextBtn
                            btnText='Submit'
                            onPress={submitDomesticsData}
                        />) :
                        (<NextBtn
                            btnText='Submit'
                            onPress={submitForeignData}
                        />)
                    }
                </View>
            </View>
        </SafeAreaView>
    )
}

export default QuestionScreen3

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
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: "#696969",
        marginBottom: 5,
        marginLeft: 5
    },
})