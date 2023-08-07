import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';

const RadioButton = ({
    data,
    onSelect
}) => {

    const [userOption, setUserOption] = useState(null);
    const selectHandler = (value) => {
        onSelect(value);
        setUserOption(value);
    };

    return (
        <View style={styles.selectSection}>
            {data.map((item, i) => {
                return (
                    <TouchableOpacity
                        key={i}
                        onPress={() => selectHandler(item.value)}
                        style={styles.selected}
                    >
                        <View style={styles.outerCircle}>
                            <View style={
                                item.value === userOption ? styles.innerCircleFell : styles.innerCircle}></View>
                        </View>
                        <Text style={styles.selectValueTitle}>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    )
}

export default RadioButton

const styles = StyleSheet.create({
    selected: {
        height: 30,
        flexDirection: 'row',
        alignItems: 'center'
    },
    selectValueTitle: {
        fontSize: SIZES.medium,
        letterSpacing: 0.2,
        fontFamily: FONT.OpenSansLight,
        color: '#696969',
        lineHeight: 18
    },
    outerCircle: {
        width: 16,
        height: 16,
        borderWidth: 1,
        borderRadius: 16 / 2,
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 8,
        backgroundColor: '#FFFFFF',
        borderColor: '#BCBCBC'
    },
    innerCircle: {
        width: 8,
        height: 8,
        borderWidth: 1,
        borderRadius: 8 / 2,
        borderColor: "#FFFFFF"
    },
    innerCircleFell: {
        width: 8,
        height: 8,
        borderWidth: 1,
        borderRadius: 8 / 2,
        borderColor: COLORS.brand.primary,
        backgroundColor: COLORS.brand.primary
    }
})