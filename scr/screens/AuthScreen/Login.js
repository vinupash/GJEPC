import React, { useState, useContext, useEffect } from 'react'
import {
    StyleSheet,
    Text,
    View,
    Dimensions,
    SafeAreaView,
    StatusBar,
    TouchableOpacity,
    TextInput
} from 'react-native';
import { COLORS, FONT, SIZES } from '../../constants/theme';
import { SvgXml } from 'react-native-svg';
import Logo from '../../../assets/images/Logo';
import { Input } from '../../components/CustomInput';
import Eyeoff from '../../../assets/images/Eyeoff';
import eye from '../../../assets/images/eye';
import { PrimaryBtn } from '../../components/CustomButton';
import { validateEmail } from '../../constants/methods';
import { AuthContext } from '../../context/AuthContext';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { openDatabase } from 'react-native-sqlite-storage';

var db = openDatabase({ name: 'UserDatabaseGJEPC1.db' });

const Login = () => {
    const { userLogin } = useContext(AuthContext)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorEmail, setErrorEmail] = useState(null);
    const [errorPassword, setErrorPassword] = useState(null);
    const [secureTextEntry, setSecureTextEntry] = useState(true);

    useEffect(() => {
        db.transaction(function (txn) {
            txn.executeSql(
                "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
                [],
                function (tx, res) {
                    console.log('item:', res.rows.length);
                    if (res.rows.length == 0) {
                        txn.executeSql('DROP TABLE IF EXISTS table_user', []);
                        txn.executeSql(
                            'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), question_1 VARCHAR(100), question_4 VARCHAR(100), question_5A VARCHAR(255), question_5B VARCHAR(255), question_5C VARCHAR(255), question_5D VARCHAR(255), question_5E VARCHAR(255), question_6 VARCHAR(300))', []
                        );
                    }
                }
            );
        });
    }, []);

    const defaultPassword = "Shree123456"

    const loginUser = () => {
        if (email.trim().length == 0 || !validateEmail(email)) {
            setErrorEmail("Please enter vaild email address");
            return;
        } else if (password.trim().length == 0) {
            setErrorPassword('Please enter vaild password');
        } else {
            userLogin()
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle='light-content'
                backgroundColor={COLORS.brand.primary}
            />
            <SvgXml xml={Logo} width={94} height={40} />
            <Text style={styles.ScreenTitile}>Login</Text>
            <Input
                label='Email Address'
                placeholder='Enter Email address'
                value={email}
                setValue={setEmail}
                autoCapitalize='none'
            />
            {errorEmail ? <Text style={styles.invalidTextMsg}>{errorEmail}</Text> : null}

            <View style={{ marginTop: 20 }}>
                <View style={styles.secureTextBox}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <Text style={styles.inputLabelRight}></Text>
                </View>
                <View style={styles.inputBox}>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Enter password"
                        placeholderTextColor="#BCBCBC"
                        secureTextEntry={secureTextEntry}
                        onChangeText={setPassword}
                        value={password}
                    />
                    <TouchableOpacity
                        onPress={() => {
                            setSecureTextEntry(!secureTextEntry);
                            return false;
                        }}
                    >
                        {!secureTextEntry ? <SvgXml xml={Eyeoff} width={28} height={22} /> : <SvgXml xml={eye} width={28} height={22} />}
                    </TouchableOpacity>
                </View>
            </View>
            {errorPassword ? <Text style={styles.invalidTextMsg}>{errorPassword}</Text> : null}

            <View style={{ marginTop: 20 }}>
                <PrimaryBtn
                    btnText='Log in'
                    onPress={loginUser}
                />
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.brand.page
    },
    ScreenTitile: {
        color: COLORS.brand.secondary,
        textAlign: 'left',
        width: windowWidth - 30,
        marginVertical: 30,
        fontSize: SIZES.extraLarge,
        fontFamily: FONT.OpenSansSemiBold
    },
    secureTextBox: {
        marginBottom: 5,
        marginHorizontal: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    inputLabel: {
        fontFamily: FONT.PlusJakartaSansRegular,
        fontSize: SIZES.small,
        textAlign: 'left',
        lineHeight: 18,
        color: "#696969",
    },
    inputLabelRight: {
        fontFamily: FONT.PlusJakartaSansBold,
        fontSize: SIZES.small,
        lineHeight: 18,
        color: COLORS.brand.secondary,
        fontWeight: '600'
    },
    inputStyle: {
        width: windowWidth - 30,
        flex: 1,
        color: COLORS.brand.secondary
    },
    inputBox: {
        height: 40,
        width: windowWidth - 30,
        borderWidth: 1,
        backgroundColor: "FFFFFF",
        borderColor: "#BCBCBC",
        borderRadius: 5,
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
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