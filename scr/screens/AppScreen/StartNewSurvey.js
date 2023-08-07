import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar, TouchableOpacity } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import RadioButtonBox from '../../components/RadioButtonBox';
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const StartNewSurvey = ({ navigation }) => {
    const [respondentSelectOptn, setRespondentSelectOptn] = useState('');
    const selectHandler = (value) => {
        onSelect(value);
        respondentSelectOptn(value);
    };

    const respondentArray = [
        {
            key: '1',
            title: 'Domestic Visitor',
            value: 'Domestic Visitor',
            root: 'Domestic Visitor Navigation',
            screen: 'Domestic Visitor'
        },
        {
            key: '2',
            title: 'Foreign Visitor',
            value: 'Foreign Visitor',
            root: 'Foreign Visitor Navigation',
            screen: 'Foreign Visitor'
        },
        {
            key: '3',
            title: 'Domestic Exhibitor',
            value: 'Domestic Exhibitor',
            root: 'Domestic Exhibitor Navigation',
            screen: 'Domestic Exhibitor'
        },
        {
            key: '4',
            title: 'Foreign Exhibitor',
            value: 'Foreign Exhibitor',
            root: 'Foreign Exhibitor Navigation',
            screen: 'Foreign Exhibitor'
        },
        {
            key: '5',
            title: 'Sponsor',
            value: 'Sponsor',
            root: 'Sponsor Navigation',
            screen: 'Sponsor'
        },
    ];

    console.log('respondentSelectOptn-->', respondentSelectOptn);

    const GenderData = () => {
        return respondentArray.map((arrayRespondentData) => {
            return (
                <TouchableOpacity
                    key={arrayRespondentData.key}
                    style={
                        arrayRespondentData.value === respondentSelectOptn ? styles.selected : styles.unselected
                    }
                    // style={[styles.selectValueBox]}
                    // onPress={(value) => setRespondentSelect(arrayData.value)}
                    onSelect={(value) => selectHandler(value)}
                    onPress={
                        (value) => {
                            setRespondentSelectOptn(arrayRespondentData.value);
                            // navigation.navigate(arrayRespondentData.screen, respondentSelectOptn)
                            navigation.navigate(arrayRespondentData.root, {
                                screen: arrayRespondentData.screen,
                                params: {
                                    optionSelected: arrayRespondentData.value
                                }
                            });
                        }
                    }
                >
                    <Text style={[styles.selectValueTitle, {}]}>{arrayRespondentData.title}</Text>
                </TouchableOpacity>
            );
        });
    };

    const [option, setOption] = useState(null);
    const respondentData = [
        { value: 'Domestic Visitor' },
        { value: 'Foreign Visitor' },
        { value: 'Domestic Exhibitor' },
        { value: 'Foreign Exhibitor' },
        { value: 'Sponsor' },
    ];

    if (option === 'Domestic Visitor') {
        // navigation.navigate('Domestic Visitor Navigation', { screen: 'Domestic Visitor' });
        navigation.navigate('Domestic Visitor Navigation', { screen: 'Domestic Visitor', params: { optionSelected: 'Domestic Visitor' } });
    } else if (option === 'Foreign Visitor') {
        navigation.navigate("Foreign Visitor")
    } else if (option === 'Domestic Exhibitor') {
        navigation.navigate("Domestic Exhibitor")
    } else if (option === 'Foreign Exhibitor') {
        navigation.navigate("Foreign Exhibitor")
    } else if (option === 'Sponsor') {
        navigation.navigate("Sponsor")
    } else {
        console.log("");
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setRespondentSelectOptn(null)
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
                <Text style={styles.screenTitle}>The Respondent is</Text>
                {/* <RadioButtonBox
                    data={respondentData}
                    onSelect={(value) => setOption(value)}
                /> */}
                <View style={styles.selectSection}>
                    {GenderData()}
                </View>
            </View>
        </SafeAreaView>
    )
}

export default StartNewSurvey

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
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingTop: 20,
        paddingBottom: 10,
        borderRadius: 8
    },
    unselected: {
        width: '48%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 4,
        ...SHADOWS.light,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF"
    },
    selected: {
        width: '48%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 4,
        ...SHADOWS.light,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: COLORS.brand.primary,
        backgroundColor: "#F5F0F0"
    },
    selectValueBox: {
        width: '48%',
        height: 80,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 4,
        ...SHADOWS.light,
        marginHorizontal: 1,
        borderWidth: 1,
        borderColor: "#FFFFFF",
        backgroundColor: "#FFFFFF"
    },
    selectValueTitle: {
        fontSize: SIZES.font,
        letterSpacing: 0.2,
        fontFamily: FONT.OpenSansRegular,
        color: COLORS.brand.secondary,
        textAlign: 'center',
        lineHeight: 18
    },
    selectSection: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
})