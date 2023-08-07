import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, FlatList, Dimensions, ActivityIndicator, TouchableOpacity } from 'react-native';
import HeaderBar from '../../components/HeaderBar';
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabaseGJEPC1.db' });
import { useIsFocused } from '@react-navigation/native';
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import moment from 'moment';
import SelectDropdown from 'react-native-select-dropdown';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import Calendar from '../../../assets/images/Calendar';
import { SvgXml } from 'react-native-svg';

const MySurveys = ({ navigation, route }) => {
    const isFocused = useIsFocused();
    const dropdownRef = useRef({});
    const [isLoading, setLoading] = useState(false);
    const [flatListItems, setFlatListItems] = useState([]);
    const [surveyList, setSurveyList] = useState([])
    const [selectedFilter, setSelectedFilter] = useState(null);
    const [selectedFromDate, setSelectedFromDate] = useState('');
    const [fromDate, setFromDate] = useState(false);
    const [selectedToDate, setSelectedToDate] = useState();
    const [toDate, setToDate] = useState(false);


    const showDatePicker = () => {
        setFromDate(true);
    };

    const hideDatePicker = () => {
        setFromDate(false);
    };

    const showDateToPicker = () => {
        setToDate(true);
    };

    const hideDateToPicker = () => {
        setToDate(false);
    };


    const handleConfirm = (date) => {
        setSelectedFromDate(date);
        hideDatePicker();
    };

    const handleToConfirm = (date) => {
        setSelectedToDate(date);
        hideDateToPicker();
    };

    const resetFunt = () => {
        dropdownRef.current.reset()
        setSelectedFilter(null)
        setSelectedFromDate(null)
        setSelectedToDate(null)
        setFlatListItems(surveyList)
    }

    useEffect(() => {
        db.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM user ORDER BY user_id DESC',
                [],
                (tx, results) => {
                    // console.log('results--->', results);
                    setLoading(true)
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        console.log(results.rows.item(i));
                        temp.push(results.rows.item(i));
                    }
                    setLoading(false)
                    setFlatListItems(temp);
                    setSurveyList(temp)
                }
            );
        });
    }, [isFocused]);

    const listItemView = (item) => {
        return (
            <View
                key={item.user_id}
                style={{
                    marginTop: 5,
                    marginBottom: 10,
                    width: windowWidth - 30,
                    backgroundColor: "#FFFFFF",
                    alignSelf: 'center',
                    ...SHADOWS.light,
                    padding: 10,
                    borderRadius: 8
                }}>
                {/* <Text>Id: {item.user_id}</Text> */}
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 60, fontFamily: FONT.OpenSansRegular, color: '#696969', fontSize: SIZES.font }}>Name :</Text>
                    <Text style={{ flex: 1, fontFamily: FONT.OpenSansBold, color: COLORS.brand.secondary, fontSize: SIZES.font }}>{item.user_name}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 60, fontFamily: FONT.OpenSansRegular, color: '#696969', fontSize: SIZES.font }}>Mob :</Text>
                    <Text style={{ flex: 1, fontFamily: FONT.OpenSansBold, color: COLORS.brand.secondary, fontSize: SIZES.font }}>{item.user_contact}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <Text style={{ width: 60, fontFamily: FONT.OpenSansRegular, color: '#696969', fontSize: SIZES.font }}>Type :</Text>
                    <Text style={{ flex: 1, fontFamily: FONT.OpenSansBold, color: COLORS.brand.secondary, fontSize: SIZES.font }}>{item.question_1}</Text>
                </View>
                <TouchableOpacity
                    style={{ width: 80, alignSelf: 'flex-end', justifyContent: 'center', height: 30, borderRadius: 5, ...SHADOWS.light, marginBottom: 5, backgroundColor: COLORS.brand.primary }}
                    onPress={() => {
                        navigation.navigate('Update User Survey', {
                            user: {
                                id: item.user_id,
                                userName: item.user_name,
                                userContactNo: item.user_contact,
                                respondentName: item.question_1,
                                optionRating: item.question_4,
                                domesticState: item.question_5A,
                                foreignCuntry: item.question_5B,
                                domesticExhibitor: item.question_5C,
                                foreignExhibitor: item.question_5D,
                                sponsor: item.question_5E,
                                feedback: item.question_6
                            },
                        });

                    }}
                >
                    <Text style={{ color: "#FFFFFF", textAlign: 'center' }}>Edit</Text>
                </TouchableOpacity>
            </View >
        );
    };

    const domestics = ["Domestic Visitor", "Foreign Visitor", "Domestic Exhibitor", "Foreign Exhibitor", "Sponsor"]

    const getFilteredData = () => {

        var selectderFiterValue = selectedFilter;
        var startDate = selectedFromDate;
        var endDate = selectedToDate;

        var queryData = 'SELECT * FROM user where 1 '
        if (selectderFiterValue) {
            queryData += 'and question_1 like "%' + selectderFiterValue + '%"'
        }
        if (startDate) {
            var startDate = moment(selectedFromDate).format("YYYY-MM-DD 00:00:00");
            queryData += 'and dateadded >= "' + startDate + '" '
        }
        if (endDate) {
            var endDate = moment(selectedToDate).format("YYYY-MM-DD 23:59:59");
            queryData += 'and dateadded <= "' + endDate + '" '
        }
        queryData += 'ORDER BY user_id DESC';

        console.log(queryData);
        db.transaction((tx) => {
            tx.executeSql(
                queryData,
                [],
                (tx, results) => {
                    // console.log('results--->', results);
                    setLoading(true)
                    var temp = [];
                    for (let i = 0; i < results.rows.length; ++i) {
                        // console.log(results.rows.item(i));
                        temp.push(results.rows.item(i));
                    }
                    setLoading(false)
                    setFlatListItems(temp)
                    // setSurveyList(temp)
                }
            );
        });
    }

    useEffect(() => {
        getFilteredData()
    }, [])


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSelectedFromDate(null), setSelectedToDate(null), setSelectedFilter(null)
        });
        return unsubscribe;
    }, [navigation]);

    if (isLoading) {
        return <ActivityIndicator size='small' color={COLORS.brand.primary} style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} />;
    }

    return (
        <SafeAreaView style={styles.container}>
            <HeaderBar onPress={() => navigation.openDrawer()} />
            <Text style={styles.screenTitle}>My surveys</Text>
            <SelectDropdown
                data={domestics}
                ref={dropdownRef}
                onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    setSelectedFilter(selectedItem)
                }}
                defaultButtonText={selectedFilter ? selectedFilter : "Domestic Visit"}
                defaultValueByIndex={true}
                buttonStyle={styles.dropdownContainer}
                buttonTextStyle={{
                    fontFamily: FONT.OpenSansRegular,
                    fontSize: SIZES.medium, color: selectedFilter ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                }}
                // buttonTextStyle={{
                //     fontFamily: FONT.OpenSansRegular,
                //     fontSize: SIZES.medium, color: selectedFilter ? COLORS.brand.secondary : COLORS.brand.quaternary, textAlign: 'left'
                // }}
                // renderDropdownIcon={isOpened => {
                //     return <AntDesign name={isOpened ? 'filter' : 'filter'} color={COLORS.neutrals.thunder} size={14} />;
                // }}
                rowStyle={{
                    height: 45,
                }
                }
                rowTextStyle={{
                    fontFamily: FONT.OpenSansRegular,
                    fontSize: SIZES.medium,
                    color: COLORS.brand.secondary
                }}
                dropdownStyle={{ backgroundColor: COLORS.brand.gray, borderRadius: 10 }}
            />

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30, alignSelf: 'center', marginBottom: 15
            }}>

                <View style={{ width: '48%' }}>
                    <Text style={styles.calendarTitle}>From</Text>
                    <TouchableOpacity
                        onPress={showDatePicker}
                        style={styles.inputDateBox}
                    >
                        <Text
                            style={[styles.inputDate, { color: selectedFromDate ? COLORS.brand.secondary : "#BCBCBC" }]} name="fromDate" value={fromDate}
                            placeholder="Select Date"
                            placeholderTextColor={selectedFromDate ? COLORS.brand.secondary : "#BCBCBC"}
                            onChangeText={actualData => setFromDate(actualData)}
                        >{`${selectedFromDate ? moment(selectedFromDate).format("DD-MMM-YYYY") : "Select Date"}`}</Text>

                        <SvgXml xml={Calendar} width={24} height={24} style={{ marginTop: 1, marginLeft: 5 }} />

                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={fromDate}
                        mode="date"
                        onConfirm={handleConfirm}
                        onCancel={hideDatePicker}
                    />
                </View>

                <View style={{ width: '48%' }}>
                    <Text style={styles.calendarTitle}>To</Text>
                    <TouchableOpacity
                        onPress={showDateToPicker}
                        style={styles.inputDateBox}
                    >
                        <Text
                            style={[styles.inputDate, { color: selectedToDate ? COLORS.brand.secondary : "#BCBCBC" }]} name="toData" value={toDate}
                            placeholder="Select Date"
                            placeholderTextColor={selectedToDate ? COLORS.brand.secondary : "#BCBCBC"}
                            onChangeText={actualData => setFromDate(actualData)}
                        >{`${selectedToDate ? moment(selectedToDate).format("DD-MMM-YYYY") : "Select Date"}`}</Text>

                        <SvgXml xml={Calendar} width={24} height={24} style={{ marginTop: 1, marginLeft: 5 }} />

                    </TouchableOpacity>

                    <DateTimePickerModal
                        isVisible={toDate}
                        mode="date"
                        onConfirm={handleToConfirm}
                        onCancel={hideDateToPicker}
                    />
                </View>
            </View>

            <View style={{
                flexDirection: 'row', justifyContent: 'space-between', width: windowWidth - 30, alignSelf: 'center', marginBottom: 10
            }}>

                <TouchableOpacity style={{ width: '29%', height: 45, borderRadius: 5, backgroundColor: "#DDDDDD", justifyContent: 'center' }}
                    onPress={resetFunt}
                >
                    <Text style={{ color: COLORS.brand.secondary, fontFamily: FONT.OpenSansSemiBold, fontSize: SIZES.medium, textAlign: 'center' }}>Reset</Text>
                </TouchableOpacity>

                <TouchableOpacity style={{ width: '69%', height: 45, borderRadius: 5, backgroundColor: COLORS.brand.primary, justifyContent: 'center' }}
                    onPress={getFilteredData}
                >
                    <Text style={{ color: "#FFFFFF", fontFamily: FONT.OpenSansSemiBold, fontSize: SIZES.medium, textAlign: 'center' }}>Apply Filter</Text>
                </TouchableOpacity>
            </View>

            {flatListItems.length > 0 ? (
                <FlatList
                    showsHorizontalScrollIndicator={false}
                    showsVerticalScrollIndicator={false}
                    data={flatListItems}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => listItemView(item)}
                />
            ) : <Text style={{ textAlign: 'center', marginTop: 10, fontFamily: FONT.OpenSansMedium, fontSize: SIZES.medium, color: '#ff2c55' }}>No record found! Change filter value</Text>}
        </SafeAreaView>
    )
}

export default MySurveys

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    dropdownContainer: {
        height: 45,
        width: windowWidth - 30,
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: "#DDDDDD",
        borderRadius: 5,
        paddingHorizontal: 6,
        alignSelf: 'center',
        marginBottom: 10,
    },
    screenTitle: {
        color: COLORS.brand.secondary,
        fontSize: 20,
        fontFamily: FONT.OpenSansBold,
        width: windowWidth - 30,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10
    },
    inputDateBox: {
        height: 45,
        // width: '48%',
        borderWidth: 1,
        backgroundColor: "#FFFFFF",
        borderColor: "#DDDDDD",
        borderRadius: 5,
        paddingHorizontal: 10,
        // justifyContent: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    inputDate: {
        fontFamily: FONT.OpenSansRegular,
        fontSize: SIZES.medium,
        // letterSpacing: 1,
        color: COLORS.brand.secondary
    },
    calendarTitle: {
        color: COLORS.brand.secondary,
        fontSize: SIZES.medium,
        fontFamily: FONT.OpenSansBold,
        marginBottom: 5
    }
})