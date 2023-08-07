import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { CustomTextArea, InputForm } from '../../components/CustomInput';
import HeaderBar from '../../components/HeaderBar';
import { COLORS, SHADOWS, FONT, SIZES } from '../../constants/theme';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import SelectDropdown from 'react-native-select-dropdown';
import { PrevBtn, PrimaryBtn } from '../../components/CustomButton';
import moment from 'moment';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabaseGJEPC1.db' });
import { useIsFocused } from '@react-navigation/native';

const UpdateUserSurvey = ({ navigation, route }) => {

    const [userName, setUserName] = useState('')
    const [userId, setUserId] = useState('')
    const [userNameError, setUserNameError] = useState(null);
    const [userContactNumber, setUserContactNumber] = useState('')
    const [userContactError, setUserContactError] = useState(null);
    const [respondent, setRespondent] = useState(null);
    const [userRating, setUserRating] = useState(null);
    const [domesticState, setDomesticState] = useState(null)
    const [foreignCuntry, setForeignCuntry] = useState(null)
    const [domesticExhibitor, setDomesticExhibitor] = useState('')
    const [foreignExhibitor, setForeignExhibitor] = useState('')
    const [sponsor, setSponsor] = useState(null)
    const [feedback, setFeedback] = useState('')

    const isFocused = useIsFocused()

    useEffect(() => {
        setUserId(route.params.user.id)
        setUserName(route.params.user.userName)
        setRespondent(route.params.user.respondentName)
        setUserContactNumber(route.params.user.userContactNo)
        setUserRating(route.params.user.optionRating)
        setDomesticState(route.params.user.domesticState)
        setForeignCuntry(route.params.user.foreignCuntry)
        setDomesticExhibitor(route.params.user.domesticExhibitor)
        setForeignExhibitor(route.params.user.foreignExhibitor)
        setSponsor(route.params.user.sponsor)
        setFeedback(route.params.user.feedback)
    }, [isFocused])

    const RespondentList = ['Domestic Visitor', 'Foreign Visitor', 'Domestic Exhibitor', 'Foreign Exhibitor', 'Sponsor']
    const userRatingData = ['5 (Highly Satisfied)', '4', '3', '2', '1 (Not Satisfied)']
    const countries = ["Egypt", "Canada", "Australia", "Ireland"]
    const domestics = ["Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"]
    const sponsorData = ["Sponsor_1", "Sponsor_2", "Sponsor_3", "Sponsor_4", "Others", "No"]

    const submitUpdatedData = () => {
        var date = moment().format("YYYY-MM-DD HH:MM:SS")
        db.transaction((tx) => {
            tx.executeSql(
                'UPDATE user set user_name=?, user_contact=?, question_1=?, question_4=?, question_5A=?, question_5B=?, question_5C=?, question_5D=?, question_5E=?,  question_6=?, dateupdated=? where user_id=?',
                [userName, userContactNumber, respondent, userRating, domesticState, foreignCuntry, domesticExhibitor, foreignExhibitor, sponsor, feedback, date, userId],
                (tx, results) => {
                    console.log(results);
                    console.log('Results', results.rowsAffected);
                    if (results.rowsAffected == 1) {
                        navigation.navigate('UpdatedSuccessScreen');
                    } else {
                        alert('Something Went Wrong, Try again')
                    }

                },
                (error) => {
                    console.log(error.message);
                }
            );
        });
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <HeaderBar onPress={() => navigation.openDrawer()} />
            <View style={styles.pageBoxView}>
                <Text style={styles.screenTitle}>Update user data</Text>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                >
                    <KeyboardAvoidingView>
                        <View style={{ marginTop: 0 }}>
                            <InputForm
                                label='Name'
                                placeholder='Enter name'
                                value={userName}
                                setValue={setUserName}
                                autoCapitalize='none'
                            />
                            {userNameError ? <Text style={styles.invalidTextMsg}>{userNameError}</Text> : null}
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <InputForm
                                label='Contact Number'
                                placeholder='Enter name'
                                value={userContactNumber.toString()}
                                setValue={setUserContactNumber}
                                autoCapitalize='none'
                                keyboardType="number-pad"
                                maxLength={10}
                            />
                            {userContactError ? <Text style={styles.invalidTextMsg}>{userContactError}</Text> : null}
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Update respondent</Text>
                            <SelectDropdown
                                data={RespondentList}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setRespondent(selectedItem)
                                }}
                                defaultButtonText={respondent}
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font, color: respondent ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />
                        </View>

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Rating</Text>
                            <SelectDropdown
                                data={userRatingData}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setUserRating(selectedItem)
                                }}
                                defaultButtonText={userRating}
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font, color: userRating ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />
                        </View>

                        {!domesticState ? null : (<View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Update Domestic state</Text>
                            <SelectDropdown
                                data={domestics}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setDomesticState(selectedItem)
                                }}
                                defaultButtonText={domesticState}
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font, color: domesticState ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />
                        </View>)}

                        {!foreignCuntry ? null : (<View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Update foreign country</Text>
                            <SelectDropdown
                                data={countries}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setForeignCuntry(selectedItem)
                                }}
                                defaultButtonText={foreignCuntry}
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font, color: foreignCuntry ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />
                        </View>)}

                        {!domesticExhibitor ? null : (<View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Update foreign country</Text>
                            <CustomTextArea
                                placeholder='Type...'
                                value={domesticExhibitor}
                                setValue={setDomesticExhibitor}
                                autoFocus={false}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>)}

                        {!foreignExhibitor ? null : (<View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Update foreign country</Text>
                            <CustomTextArea
                                placeholder='Type...'
                                value={foreignExhibitor}
                                setValue={setDomesticExhibitor}
                                autoFocus={false}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>)}

                        <View style={{ marginTop: 10 }}>
                            <Text style={styles.inputLabel}>Update foreign country</Text>
                            <SelectDropdown
                                data={sponsorData}
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index)
                                    setSponsor(selectedItem)
                                }}
                                defaultButtonText={sponsor}
                                buttonStyle={styles.dropdownContainer}
                                buttonTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font, color: sponsor ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                                }}
                                // renderDropdownIcon={isOpened => {
                                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                                // }}
                                rowStyle={{
                                    height: 45,
                                }}
                                rowTextStyle={{
                                    fontFamily: FONT.OpenSansRegular,
                                    fontSize: SIZES.font,
                                    color: COLORS.brand.secondary
                                }}
                                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
                            />
                        </View>

                        <View style={{ marginTop: 10, marginBottom: 10 }}>
                            <Text style={styles.inputLabel}>Feedback</Text>
                            <CustomTextArea
                                placeholder='Type...'
                                value={feedback}
                                setValue={setFeedback}
                                autoFocus={false}
                                multiline={true}
                                numberOfLines={5}
                            />
                        </View>

                        <TouchableOpacity
                            style={styles.primaryBtn}
                            onPress={submitUpdatedData}
                        >
                            <Text style={styles.primaryBtnText}>Update data</Text>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
            {/* <View style={{ height: 100, justifyContent: 'center' }}>
                <PrimaryBtn
                    btnText='Update data'
                    onPress={submitUpdatedData}
                />
            </View> */}
            {/* <Text>{userId}</Text>
            <Text>{userName}</Text>
            <Text>{respondent}</Text>
            <Text>{userRating}</Text>
            <Text>{foreignCuntry}</Text>
            <Text>{domesticExhibitor}</Text>
            <Text>{foreignExhibitor}</Text>
            <Text>{sponsor}</Text>
            <Text>{feedback}</Text> */}
        </SafeAreaView>
    )
}

export default UpdateUserSurvey

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    pageBoxView: {
        marginTop: 10,
        width: windowWidth - 30,
        height: windowHeight - 100,
        backgroundColor: "#FFFFFF",
        alignSelf: 'center',
        ...SHADOWS.light,
        paddingHorizontal: 10,
        paddingVertical: 20,
        borderRadius: 8,
        // marginBottom: 100,

    },
    dropdownContainer: {
        height: 45,
        width: "100%",
        borderWidth: 1,
        backgroundColor: "#FFFFFFW",
        borderColor: "#DDDDDD",
        borderRadius: 5,
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
        width: windowWidth - 30,
    },
    screenTitle: {
        color: COLORS.brand.secondary,
        fontSize: 20,
        fontFamily: FONT.OpenSansBold,
        marginBottom: 10,
        textAlign: 'left'
    },
    primaryBtn: {
        width: '100%',
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
})