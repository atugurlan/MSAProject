import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { UserProvider,
         HomePage, 
         SignUpPage, 
         LoginPage, 
         AdminLandingPage, 
         UserLandingPage,
         ForgotPasswordPage,
         GrantRequestPermissionPage,
         ManageFacultiesPage,
         AddFacultyPage,
         ManageDepartmentsPage,
         AddDepartmentPage,
         SubjectsHandlingPage,
         SubjectInformationPage,
         AddSubjectPage,
         CompleteProfilePage,
         AllForumsPage,
         ForumPage,
         AddQuestionPage,
         SeeConversationPage,
        } from './components';

const Stack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
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
          <Stack.Screen name="SubjectsHandlingPage" component={SubjectsHandlingPage} />
          <Stack.Screen name="SubjectInformationPage" component={SubjectInformationPage} />
          <Stack.Screen name="AddSubjectPage" component={AddSubjectPage} />
          <Stack.Screen name="CompleteProfilePage" component={CompleteProfilePage} />
          <Stack.Screen name="AllForumsPage" component={AllForumsPage} />
          <Stack.Screen name="ForumPage" component={ForumPage} />
          <Stack.Screen name="AddQuestionPage" component={AddQuestionPage} />
          <Stack.Screen name="SeeConversationPage" component={SeeConversationPage} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}
