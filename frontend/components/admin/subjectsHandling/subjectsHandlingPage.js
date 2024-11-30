import React from 'react';
import {Text, View} from 'react-native';

const SubjectsHandlingPage = ({ route }) => {
  const { departmentName } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text>{departmentName}</Text>
    </View>
  );
};

export default SubjectsHandlingPage;