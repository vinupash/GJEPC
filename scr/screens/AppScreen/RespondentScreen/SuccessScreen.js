import React from 'react'
import { StyleSheet, Text, View, SafeAreaView, Dimensions } from 'react-native';
import { PrimaryBtn, TransparentBtn } from '../../../components/CustomButton';
import { COLORS, FONT, SHADOWS, SIZES } from '../../../constants';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
import { SvgXml } from 'react-native-svg';
import Success from '../../../../assets/images/Success';

const SuccessScreen = ({ navigation, route }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.popupSection}>
                <SvgXml xml={Success} width={64} height={64} />
                <Text style={styles.pageTitle}>Response submitted!</Text>
            </View>
            <View style={styles.buttonGroup}>
                <PrimaryBtn
                    btnText='Start a New Survey'
                    onPress={() => { navigation.navigate("Start New Survey") }}
                />

                <View style={{ marginTop: 20 }}>
                    <TransparentBtn
                        btnText='Go to my Dashboard'
                        onPress={() => { navigation.navigate("Home") }}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

export default SuccessScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    popupSection: {
        flex: 1,
        height: windowHeight - 160,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonGroup: {
        height: 160,
        width: windowWidth,
    },
    pageTitle: {
        color: COLORS.brand.secondary,
        fontSize: 20,
        fontFamily: FONT.OpenSansBold,
        marginTop: 20,
    }
})