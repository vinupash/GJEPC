import React, { useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, ActivityIndicator, Alert } from 'react-native';
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
import moment from 'moment';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabaseGJEPC1.db' });

const Feedback = ({ navigation, route }) => {
    const { visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor } = route.params;

    const [feedback, setFeedback] = useState('');
    const [feedbackError, setFeedbackError] = useState(null);

    var date = moment().format("YYYY-MM-DD HH:MM:SS")
    // var date = new Date()
    console.log('date--->', date);

    // moment(selectedDate).format("YYYY-MM-DD")

    const submitData = () => {
        console.log(visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor, feedback, date);


        if (feedback === '') {
            setFeedbackError('Please enter your feedback')
        } else {
            setFeedbackError(null)
            console.log(visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor, feedback, date);

            db.transaction(function (txn) {
                txn.executeSql(
                    'INSERT INTO user (user_name, user_contact, question_1, question_4, question_5A, question_5B, question_5C, question_5D, question_5E, question_6, dateadded, dateupdated) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)',
                    [visitorName, visitorMobileNo, optionSelected, optionRating, selectedDomestic, selectedForeign, domesticExhibitor, foreignExhibitor, selectedSponsor, feedback, date, date],
                    (tex, results) => {
                        console.log(results);
                        console.log('Results', results.rowsAffected);
                        if (results.rowsAffected == 1) {
                            navigation.navigate('SuccessScreen');
                        } else {
                            alert('Something Went Wrong, Try again')
                        }

                    },
                    (error) => {
                        console.log(error.message);
                    }

                );
            });
            // navigation.navigate('SuccessScreen');
        }
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
                    <CustomTextArea
                        placeholder='Type...'
                        value={feedback}
                        setValue={setFeedback}
                        autoFocus={false}
                        multiline={true}
                        numberOfLines={8}
                    />
                    {feedbackError ? <Text style={styles.invalidTextMsg}>{feedbackError}</Text> : null}
                </View>

                <View style={{ marginTop: 20, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <PrevBtn
                        btnText='Prev'
                        onPress={() => navigation.dispatch(CommonActions.goBack())}
                    />
                    <NextBtn
                        btnText='Submit'
                        onPress={submitData}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default Feedback

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