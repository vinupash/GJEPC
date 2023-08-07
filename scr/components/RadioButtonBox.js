import React, { useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { COLORS, SHADOWS, FONT, SIZES } from '../constants';

const RadioButtonBox = ({
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
                        style={
                            item.value === userOption ? styles.selected : styles.unselected
                        }
                    >
                        <Text style={styles.selectValueTitle}>{item.value}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
        // <TouchableOpacity
        //     style={[styles.selectValueBox]}
        // >
        //     <Text style={[styles.selectValueTitle]}></Text>
        // </TouchableOpacity>
    )
}

export default RadioButtonBox

const styles = StyleSheet.create({
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