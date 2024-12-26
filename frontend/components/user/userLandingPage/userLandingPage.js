import { Text, TouchableOpacity, View } from 'react-native';

import { styles } from './styles';

export default function UserLandingPage({ navigation, route }) {
  const user = route.params;
  const userInfo = user.user;

  return (
    <View style={styles.container}>
      <Text>User Landing Page</Text>

      <TouchableOpacity title="ForumsPage" onPress={() => navigation.navigate('AllForumsPage', {userInfo})}>
        <Text>To Forums</Text>
      </TouchableOpacity>
    </View>
  );
}
