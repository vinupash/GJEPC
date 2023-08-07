import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, SafeAreaView, Dimensions, StatusBar } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { PrimaryBtn } from '../../components/CustomButton';
import HeaderBar from '../../components/HeaderBar';
import { COLORS, FONT, SHADOWS, SIZES } from '../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'UserDatabaseGJEPC1.db' });
import moment from 'moment';

const Dashboard = ({ navigation }) => {

    const [todaySurveys, setTodaySurveys] = useState('');
    const [overallSurveys, setOverallSurveys] = useState('');

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), question_1 VARCHAR(100), question_4 VARCHAR(100), question_5A VARCHAR(255), question_5B VARCHAR(255), question_5C VARCHAR(255), question_5D VARCHAR(255), question_5E VARCHAR(255), dateadded DATETIME, dateupdated DATETIME,question_6 VARCHAR(300))', []
                        );
                    }
                }
            );
        });
    }, []);

    const isFocused = useIsFocused()

    useEffect(() => {
        var date = moment().format("YYYY-MM-DD")
        var start_Date = date + ' 00:00:00'
        var end_Date = date + ' 23:59:59'

        db.transaction((tx) => {
            tx.executeSql(
                'SELECT COUNT (*) as TTL FROM user where dateadded >= ? and dateadded <= ? ORDER BY user_id DESC',
                [start_Date, end_Date],
                (tx, results) => {
                    // console.log('results.rows.length--->', results);
                    setTodaySurveys(results.rows.item(0).TTL)
                }
            ); //Today count surveys

            tx.executeSql(
                'SELECT COUNT (*) as TTL FROM user',
                [],
                (tx, results) => {
                    // console.log('results.rows.length cool--->', results.rows.item(0).TTL);
                    setOverallSurveys(results.rows.item(0).TTL)
                }
            ); //Overall count surveys
        });
    }, [isFocused]);

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <HeaderBar onPress={() => navigation.openDrawer()} />
            <Text style={styles.screenTitle}>Surveys</Text>
            <View style={styles.dashboardBox}>
                <View style={styles.dashboardBoxDetails}>
                    <Text style={[styles.boxDetailsTitle, { color: "#3FB44C", }]}>{todaySurveys}</Text>
                    <View style={styles.hrLine} />
                    <Text style={[styles.boxDetailsSubTitle, { color: "#3FB44C" }]}>Today’s</Text>
                </View>
                <View style={styles.dashboardBoxDetails}>
                    <Text style={[styles.boxDetailsTitle, { color: "#0B9DB4", }]}>{overallSurveys}</Text>
                    <View style={styles.hrLine} />
                    <Text style={[styles.boxDetailsSubTitle, { color: "#0B9DB4" }]}>Overall</Text>
                </View>
            </View>
            <View style={{ marginTop: 20 }}>
                <PrimaryBtn
                    btnText='Start a New Survey'
                    onPress={() => { navigation.navigate("Start New Survey") }}
                />
            </View>
        </SafeAreaView>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF'
    },
    screenTitle: {
        color: COLORS.brand.secondary,
        fontSize: 20,
        fontFamily: FONT.OpenSansBold,
        width: windowWidth - 30,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 5
    },
    dashboardBox: {
        flexDirection: 'row',
        flexWrap: "wrap",
        justifyContent: 'space-between',
        width: windowWidth - 30,
        alignSelf: 'center',
        marginTop: 10
    },
    dashboardBoxDetails: {
        width: '48%',
        height: 90,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        paddingHorizontal: 10,
        paddingVertical: 16,
        borderRadius: 4,
        ...SHADOWS.medium,
        marginHorizontal: 1,
        backgroundColor: '#FFFFFF'
    },
    hrLine: {
        width: '80%',
        borderTopWidth: 1,
        marginVertical: 10,
        borderTopColor: '#DDDDDD'
    },
    boxDetailsTitle: {
        fontFamily: FONT.OpenSansSemiBold,
        fontSize: SIZES.large
    },
    boxDetailsSubTitle: {
        fontSize: SIZES.small,
        fontFamily: FONT.OpenSansRegular
    }
})