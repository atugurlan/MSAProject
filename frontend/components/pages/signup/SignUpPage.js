import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './styles';
import { colors } from '../../../config/colors';

import axios from 'axios';
import { BASE_URL } from '@env';

 
export default function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const api_url = `${BASE_URL}/api/requests`;

  const pickImage = async () => {
    const grantCameraPermission = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!grantCameraPermission.granted) {
      Alert.alert('Permission Denied', 'You need to grant permission to access your photo library.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: false,
      quality: 1,
      base64: true,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); 
    }
  };

  const postRequest = async () => {
    if(!email || !password || !selectedImage) {
      Alert.alert('Error', 'All the fields are mandatory. Please fill all of them!');
      return;
    }

    try {
      const response = await fetch(selectedImage);
      const blob = await response.blob();
      const base64Image = await blobToBase64(blob);

      const endpointResponse = await axios.post(
        api_url,
        {
          email,
          password,
          photo: base64Image
        },
      );
  
      Alert.alert('Success. Come at a later time to see if the account was accepted');
      setEmail('');
      setPassword('');
      setSelectedImage(null);
    } catch(error) {
      Alert.alert('Error', 'Could not create a request for account');
    }
  }

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(',')[1]); 
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    }
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request an account</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="School email"
          keyboardType="email-address"
          placeholderTextColor={colors.greyText}
          value={email}
          onChangeText={setEmail}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={colors.greyText}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.inputContainer} onPress={pickImage}>
        <MaterialIcons name="image" style={styles.icon} />
        <Text style={styles.uploadText}>
          {selectedImage ? 'Photo selected' : 'Upload photo of university document'}
        </Text>
      </TouchableOpacity>

      {selectedImage && (
        <Image source={{ uri: selectedImage }} style={styles.previewImage} />
      )}

      <TouchableOpacity style={styles.button} onPress={postRequest}>
        <Text style={styles.buttonText}>Request account</Text>
      </TouchableOpacity>
    </View>
  );
}
