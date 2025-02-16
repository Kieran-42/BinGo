import React, { useRef, useState } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { View, Text, Pressable, StyleSheet, Alert} from "react-native";
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from "expo-media-library";
import {CameraTypeToFacingMode} from "expo-camera/build/web/WebConstants";

// Camera Page
export default function CameraPage() {
	// first we should get the camera permission then store ref to camera view
	// we also need to store the state to hold the last photo taken
	// we also need navigation instance from react nav.

	const [cameraPermission, requestCameraPermission] = useCameraPermissions();
	const cameraRef = useRef(null);
	const [photoUri, setPhotoUri] = useState(null);
	const navigation = useNavigation();

	// if we haven't yet gotten the permission from the user then return null
	if (!cameraPermission) { return null; }

	// if camera permission is not yet granted we need to ask the user for it
	if (!cameraPermission.granted) {
		return(
			<View>
				<Text>
					We need permission to access the camera.
				</Text>
				<Pressable style={styles.permissionButton} onPress={requestCameraPermission}>
					<Text style={styles.permissionButtonText}>Grant Permission</Text>
				</Pressable>
			</View>
		)
	}

	// This is a helper function that makes sure that we have library permission prior to saving it to photo lib
	const ensureMediaLibraryPermission = async () => {
		const { status } = await MediaLibrary.requestPermissionsAsync();
		if (status !== "granted") {
			Alert.alert(
				"Permissions not granted",
				"Cannot save photo without media library permissions."
			);
			throw new Error("Media library permission not granted");
		}
	}
	const sendPhotoToBackend = async (uri) => {
        try {
            const base64 = await RNFS.readFile(uri, "base64"); // Convert image to Base64

            const response = await fetch("http://127.0.0.1:5000/classify", {
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
			await sendPhotoToBackend(photo.uri);
			if (photo?.uri) {
				setPhotoUri(photo.uri);
				await ensureMediaLibraryPermission();
				await MediaLibrary.createAssetAsync(photo.uri);
				// from here we need to go to the summary screen and pass the photoUri as a param.
				navigation.navigate("Summary", {photoUri: photo.uri});
			}
		} catch (error) {
			console.log("Unexpected Error taking a photo: ", error);
		}
	}
	// camera capture screen component
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
};

// Stylesheet for this page
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#000",
	},
	permissionContainer: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	permissionText: {
		fontSize: 16,
		textAlign: "center",
		marginBottom: 10,
	},
	permissionButton: {
		padding: 10,
		backgroundColor: "green",
		borderRadius: 5,
	},
	permissionButtonText: {
		color: "#fff",
		fontSize: 16,
	},
	camera: {
		flex: 1,
	},
	captureButton: {
		position: "absolute",
		bottom: 30,
		alignSelf: "center",
		backgroundColor: "white",
		paddingVertical: 10,
		paddingHorizontal: 20,
		borderRadius: 5,
	},
	captureButtonText: {
		fontSize: 18,
		color: "black"
	}
})