import React, { useState } from 'react';
import { Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

import { styles } from './styles';
import { colors } from '../../../config/colors';

export default function SignUpPage() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

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
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); 
    }
  };

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
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed-outline" style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={!passwordVisible}
          placeholderTextColor={colors.greyText}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
          <Ionicons
            name={passwordVisible ? 'eye-off-outline' : 'eye-outline'}
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

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Request account</Text>
      </TouchableOpacity>
    </View>
  );
}
