import React, { useState, useEffect } from 'react';
import { FlatList, Text, View, TouchableOpacity, StyleSheet, Linking, Image } from 'react-native';
import { WebView } from 'react-native-webview';
// import { styles } from './styles';

import axios from 'axios';
import { BASE_URL } from '@env';

export default function SeeConversationPage({ route }) {
    const { questionId } = route.params;

    const [information, setInformation] = useState(null);
    const [files, setFiles] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedPdf, setSelectedPdf] = useState(null);

    const api_url = `${BASE_URL}/api/question`;

    const getQuestionInformation = async () => {
        try {
            const response = await axios.get(api_url, {
                params: { questionId },
            });
    
            const data = response.data;
    
            const combinedFiles = data.files.map(file => ({
                type: file.file_type,
                base64: file.file_data,
            }));
    
            setInformation(data);
            setFiles(combinedFiles);
        } catch (error) {
            console.error('Error fetching question information:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getQuestionInformation();
    }, []);

    if (loading) {
        return <Text>Loading requests...</Text>;
    } 

    return (
        <View>
            <Text>See Conversation Page</Text>
            <Text>{information.question_title}</Text>

            <Text>{information.student_name}</Text>
            <Text>{information.question_content}</Text>

            <FlatList
                data={files || []}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => {
                    const isImage = item.type.startsWith('image');
                    const isPdf = item.type === 'pdf';

                    return (
                        <View style={styles.fileContainer}>
                            {isImage ? (
                                <Image source={{ uri: `data:image/png;base64,${item.base64}` }} style={styles.thumbnail} />
                            ) :  (
                                <Text style={styles.unknownFileText}>Unknown file</Text>
                            )}
                        </View>
                    );
                }}
                numColumns={3}
                ListEmptyComponent={<Text>No files available.</Text>}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 10,
    },
    fileContainer: {
      width: 100,
      height: 100,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      backgroundColor: '#f9f9f9',
    },
    thumbnail: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
      resizeMode: 'cover',
    },
    pdfButton: {
      padding: 10,
      backgroundColor: '#007bff',
      borderRadius: 5,
    },
    pdfButtonText: {
      color: '#fff',
      fontSize: 12,
      textAlign: 'center',
    },
    unknownFileText: {
      color: '#666',
      fontSize: 12,
      textAlign: 'center',
    },
    pdfContainer: {
        flex: 1,
        backgroundColor: '#fff',
    },
  });