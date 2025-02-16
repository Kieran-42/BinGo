import { Platform } from "react-native";
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from "expo-media-library";
import { CameraTypeToFacingMode } from "expo-camera/build/web/WebConstants";
import * as FileSystem from "expo-file-system";

// Camera Page
export default function CameraPage() {
    // Camera permissions and state
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);
    const navigation = useNavigation();

    // If permission is not granted, show request button
    if (!cameraPermission) { return null; }
    if (!cameraPermission.granted) {
        return (
            <View>
                <Text>We need permission to access the camera.</Text>
                <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    // Ensure permission before saving images
    const ensureMediaLibraryPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permissions not granted", "Cannot save photo without media library permissions.");
            throw new Error("Media library permission not granted");
        }
    };

    // Send photo to Flask backend
    const sendPhotoToBackend = async (uri) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            const apiUrl = "http://172.31.219.165:5000/classify"; //Change to your local IP address
            const response = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64 }),
            });

            const result = await response.json();
            console.log("Full API Response:", result);
            //undefined case
            const confidence = result.confidence && result.confidence !== "undefined" ? result.confidence.toFixed(2) : "N/A";
            //Alerts user to waste and condfidence level
            Alert.alert("Classification", `Detected: ${result.class} (Confidence: ${confidence}%)`);
            return result;
        } catch (error) {
            console.error("Error sending image:", error);
            return null;
        }
    };

    // Capture photo and handle backend communication
    const takePicture = async () => {
        /*try {
            const photo = await cameraRef.current.takePictureAsync();
            const classificationResult = await sendPhotoToBackend(photo.uri);
            if (photo?.uri) {
                setPhotoUri(photo.uri);
                await ensureMediaLibraryPermission();
                const savedAsset = await MediaLibrary.createAssetAsync(photo.uri);
                let assetUri = savedAsset.uri;
                if (Platform.OS === "ios") {
                    const assetInfo = await MediaLibrary.getAssetInfoAsync(savedAsset);
                    assetUri = assetInfo.localUri;
                }
                navigation.navigate("Summary", { photoUri: assetUri, classification: classificationResult.class });
            }
        } catch (error) {
            console.error("Unexpected error taking a photo:", error);
        }*/
            try {
                // Construct the file path (assuming "image.jpg" is stored in the app's document directory)
                const imagePath = FileSystem.documentDirectory + "image.jpg";
                console.log("Using image at path:", imagePath);
    
                // Check if file exists
                const fileInfo = await FileSystem.getInfoAsync(imagePath);
                if (!fileInfo.exists) {
                    Alert.alert("Error", "image.jpg not found in local storage.");
                    console.error("File does not exist at:", imagePath);
                    return;
                }
    
                // Send the image to the backend
                await sendPhotoToBackend(imagePath);
            } catch (error) {
                console.error("Error accessing stored image:", error);
            }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                mode="picture"
                facing={CameraTypeToFacingMode.back}
            />
            <Pressable style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.captureButtonText}>Capture</Text>
            </Pressable>
        </View>
    );
}

// Stylesheet
const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#000" },
    permissionContainer: { flex: 1, justifyContent: "center", alignItems: "center", paddingHorizontal: 20 },
    permissionText: { fontSize: 16, textAlign: "center", marginBottom: 10 },
    permissionButton: { padding: 10, backgroundColor: "green", borderRadius: 5 },
    permissionButtonText: { color: "#fff", fontSize: 16 },
    camera: { flex: 1 },
    captureButton: { position: "absolute", bottom: 30, alignSelf: "center", backgroundColor: "white", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 5 },
    captureButtonText: { fontSize: 18, color: "black" }
});
