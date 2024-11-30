import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomePage, 
         SignUpPage, 
         LoginPage, 
         AdminLandingPage, 
         UserLandingPage,
         ForgotPasswordPage,
         GrantRequestPermissionPage,
         ManageFacultiesPage,
         AddFacultyPage,
         ManageDepartmentsPage,
         AddDepartmentPage
        } from './components';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator HomePageRoute='homepage' screenOptions={{headerShown:false}}>
        <Stack.Screen name='HomePage' component={HomePage} />
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignUpPage" component={SignUpPage} />
        <Stack.Screen name="AdminLandingPage" component={AdminLandingPage} />
        <Stack.Screen name="UserLandingPage" component={UserLandingPage} />
        <Stack.Screen name="ForgotPasswordPage" component={ForgotPasswordPage} />
        <Stack.Screen name="GrantRequestPermissionPage" component={GrantRequestPermissionPage} />
        <Stack.Screen name="ManageFacultiesPage" component={ManageFacultiesPage} />
        <Stack.Screen name="AddFacultyPage" component={AddFacultyPage} />
        <Stack.Screen name="ManageDepartmentsPage" component={ManageDepartmentsPage} />
        <Stack.Screen name="AddDepartmentPage" component={AddDepartmentPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
