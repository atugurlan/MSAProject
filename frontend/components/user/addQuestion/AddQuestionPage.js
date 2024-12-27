import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Switch, TextInput, FlatList } from 'react-native';
import { styles } from './styles';

import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';

import axios from 'axios';
import { BASE_URL } from '@env';

import { useUser } from '../../context/UserContext';

export default function AddQuestionPage({ navigation, route }) {
    const { subjectID } = route.params;
    const { user } = useUser();

    const [questionTitle, setQuestionTitle] = useState('');
    const [questionDescription, setQuestionDescription] = useState('');
    const [files, setFiles] = useState([]);
    const [isAnonymous, setIsAnonymous] = useState(false);

    const api_url = `${BASE_URL}/api/question`;

    const getFileType = (uri) => {
        const extension = uri.split('.').pop().toLowerCase();
        switch (extension) {
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif':
                return 'image';
            case 'pdf':
                return 'pdf';
            default:
                return 'unknown';
        }
    };

    const pickFiles = async () => {
        try {
            const result = await DocumentPicker.getDocumentAsync({
                type: ['*/*'],
                multiple: true,
            });

            if (result.canceled) {
                console.log("User canceled file selection");
                return;
            }

            if (result.assets && result.assets.length > 0) {
                const newFiles = result.assets.map((file) => ({
                    uri: file.uri,
                    name: file.name || 'Unnamed file',
                    type: getFileType(file.uri),
                }));
                
                setFiles((prevFiles) => [...prevFiles, ...newFiles]);
            }
        } catch (error) {
            Alert.alert('Error', 'An error occurred while picking the file.');
        }
    };

    const removeFile = (uri) => {
        setFiles((prevFiles) => prevFiles.filter((file) => file.uri !== uri));
    };

    const readFileAsBase64 = async (uri) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return base64;
        } catch (error) {
            console.error('Error reading file as base64:', error);
            return null;
        }
    };

    const getName = () => {
        if (isAnonymous) {
            return 'Anonymous';
        }
        return `${user.firstname} ${user.lastname}`;
    };

    const handleSubmit = async () => {
        if (!questionTitle || !questionDescription) {
            Alert.alert('Error', 'Please fill in the fields.');
            return;
        }

        const filesBase64 = await Promise.all(
            files.map(async (file) => {
                console.log(file);
                const base64 = await readFileAsBase64(file.uri);
                
                if (!base64) {
                    Alert.alert('Error', `Failed to process file: ${file.name}`);
                }
                
                return {
                    type: getFileType(file.uri),
                    uri: file.uri,
                    name: file.name,
                    base64: base64,
                };
            })
        );

        const selectedName = getName();

        const endpointResponse = await axios.post(
            api_url,
            {
                userId: user.id,
                student_name: selectedName,
                subjectId: subjectID,
                questionTitle,
                questionContent: questionDescription,
                files: filesBase64
            },
        );
      
        Alert.alert('Success.');
        setQuestionTitle('');
        setQuestionDescription('');
        setFiles([]);
    };

    return (
        <View>
            <Text>Add Question Page</Text>

            <TextInput
                placeholder="Enter the question title"
                multiline
                value={questionTitle}
                onChangeText={setQuestionTitle}
            />

            <TextInput
                placeholder="Enter the question description"
                multiline
                value={questionDescription}
                onChangeText={setQuestionDescription}
            />

            <View>
                <Text>Post the question anonymously?</Text>
                <Switch
                    value={isAnonymous}
                    onValueChange={setIsAnonymous}
                />
            </View>

            <TouchableOpacity
                style={{
                    backgroundColor: '#f0f0f0',
                    padding: 10,
                    marginBottom: 15,
                    alignItems: 'center',
                }}
                onPress={pickFiles}
            >
                <Text>Attach Files</Text>
            </TouchableOpacity>

            <FlatList
                data={files}
                keyExtractor={(item) => item.uri}
                renderItem={({ item }) => (
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: 10,
                        }}
                    >
                        <Text>{item.name}</Text>
                        <TouchableOpacity onPress={() => removeFile(item.uri)}>
                            <Text style={{ color: 'red' }}>Remove</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />

            <TouchableOpacity onPress={handleSubmit}>
                <Text>Post question</Text>
            </TouchableOpacity>
        </View>
    );
}
