import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage, 
         SignUpPage, 
         LoginPage, 
         AdminLandingPage, 
         UserLandingPage 
        } from './components';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator HomePageRoute='homepage'>
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="AdminLandingPage" component={AdminLandingPage} />
        <Stack.Screen name="UserLandingPage" component={UserLandingPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
