import { Text, View } from 'react-native';


export default function SubjectInformationPage({ route }) {
  const { subjectName, subjectID } = route.params;

  return (
    <Text>{subjectName}</Text>
  );
}
