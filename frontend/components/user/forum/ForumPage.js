import React, { useState, useEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function ForumPage({ route }) {
    const { subjectID, subjectName } = route.params;

    console.log(subjectID);
    console.log(subjectName);

    return (
        <View>
            <Text>{subjectName}</Text>
        </View>
    );
}
