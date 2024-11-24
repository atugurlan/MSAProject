import React from 'react';
import {Text, View} from 'react-native';

export default ManageDepartmentsPage = ({ route }) => {
  const { facultyID, facultyName } = route.params;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View>
            <Text>{facultyName}</Text>
        </View>
    </View>
  );
};