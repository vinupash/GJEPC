import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { COLORS, FONT } from '../constants';
// import { COLORS } from '../constants/theme';

export default function CustomSwitch({
    selectionMode,
    option1,
    option2,
    onSelectSwitch,
}) {
    const [getSelectionMode, setSelectionMode] = useState(selectionMode);

    const updateSwitchData = value => {
        setSelectionMode(value);
        onSelectSwitch(value);
    };

    return (
        <View
            style={{
                height: 44,
                width: '100%',
                backgroundColor: COLORS.brand.gray,
                borderRadius: 10,
                // borderColor: '#AD40AF',
                flexDirection: 'row',
                justifyContent: 'center',
            }}>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(1)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 1 ? COLORS.brand.primary : COLORS.brand.gray,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 1 ? "#FFFFFF" : COLORS.brand.primary,
                        fontSize: 14,
                        fontFamily: FONT.OpenSansRegular,
                    }}>
                    {option1}
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                activeOpacity={1}
                onPress={() => updateSwitchData(2)}
                style={{
                    flex: 1,
                    backgroundColor: getSelectionMode == 2 ? COLORS.brand.primary : COLORS.brand.gray,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Text
                    style={{
                        color: getSelectionMode == 2 ? "#FFFFFF" : COLORS.brand.primary,
                        fontSize: 14,
                        fontFamily: FONT.OpenSansRegular,
                    }}>
                    {option2}
                </Text>
            </TouchableOpacity>
        </View>
    );
}