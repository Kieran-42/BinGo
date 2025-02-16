// Import: Native React Modules
import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from "expo-media-library";
import { CameraTypeToFacingMode } from "expo-camera/build/web/WebConstants";
import * as FileSystem from "expo-file-system"; // ✅ Fix: Use Expo FileSystem instead of RNFS

// Function: Camera Page
export default function CameraPage() {
    const [cameraPermission, requestCameraPermission] = useCameraPermissions();
    const cameraRef = useRef(null);
    const [photoUri, setPhotoUri] = useState(null);
    const navigation = useNavigation();

    if (!cameraPermission) { return null; }
    if (!cameraPermission.granted) {
        return (
            <View>
                <Text>Access Camera Permission Required.</Text>
                <Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
                    <Text style={styles.permissionButtonText}>Grant Permission</Text>
                </Pressable>
            </View>
        );
    }

    const ensureMediaLibraryPermission = async () => {
        const { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== "granted") {
            Alert.alert("Permissions not granted", "Cannot save photo without media library permissions.");
            throw new Error("Media library permission not granted");
        }
    };

    const sendPhotoToBackend = async (uri) => {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });

            const response = await fetch("http://10.0.2.2:5000/classify", { // Use "localhost" for iOS
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: base64 }),
            });

            const result = await response.json();
            console.log("Classification Result:", result);

            if (result.error) {
                Alert.alert("Error", result.error);
            } else {
                Alert.alert("Classification", `Detected: ${result.class} (Confidence: ${result.confidence.toFixed(2)}%)`);
            }
        } catch (error) {
            console.error("Error sending image:", error);
        }
    };

    const takePicture = async () => {
        try {
            const photo = await cameraRef.current.takePictureAsync();
            // await sendPhotoToBackend(photo.uri);
            if (photo?.uri) {
                setPhotoUri(photo.uri);
                await ensureMediaLibraryPermission();
                await MediaLibrary.createAssetAsync(photo.uri);
                navigation.navigate("Summary", { photoUri: photo.uri });
            }
        } catch (error) {
            console.error("Unexpected error taking a photo:", error);
        }
    };

    return (
        <View style={styles.container}>
            <CameraView
                ref={cameraRef}
                style={styles.camera}
                mode="picture"
                facing={CameraTypeToFacingMode.back} // ✅ Camera implementation unchanged
            />
            <Pressable style={styles.captureButton} onPress={takePicture}>
                <Text style={styles.captureButtonText}>Capture</Text>
            </Pressable>
        </View>
    );
}

// Stylesheet: For Objects
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
