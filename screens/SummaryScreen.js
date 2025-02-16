import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Import Ionicons

// Takes in the string output from the model and returns a json-formatted string
const getInstructions = (wasteType) => {
	let solutionObj = { name: "", locations: [], instructionBulletins: [] };

	switch (wasteType) {
		case "battery":
			solutionObj.name = "Battery";
			solutionObj.locations = ["Battery Retailers"];
			solutionObj.instructionBulletins = ["Never Dispose of Batteries in Regular Trash: Batteries contain hazardous materials and should not be thrown away with household waste.",
				"Store Batteries Safely Before Recycling: Keep used batteries in a cool, dry place and avoid storing them in bulk to prevent potential leaks or short-circuiting.",
				"Use Designated Recycling Programs: Many communities offer battery recycling services or hazardous waste collection events. You can look up for local facilities that can process batteries."
			];

			break;

		case "biological":
			solutionObj.name = "Organic Waste";
			solutionObj.locations = ["Compost Bins"];
			solutionObj.instructionBulletins = ["Utilize Green Waste Bins: Many municipalities provide curbside green bins specifically for organic waste like food scraps and plant materials. Participating in these programs ensures your waste is processed into compost or energy, diverting it from landfills.",
				"Understand What's Compostable: Include fruit and vegetable scraps, coffee grounds, eggshells, yard trimmings, and uncoated paper products. Avoid meat, dairy, and oily foods, as they can attract pests and complicate the composting process.",
				"Use Appropriate Collection Containers: Utilize a kitchen pail lined with compostable bags or paper to collect daily food scraps. Empty this into a larger outdoor compost bin or green waste cart regularly to prevent odors and pests.",
				"Be Mindful of Local Regulations: Some areas have specific guidelines for composting or provide green waste collection services. Check with your local waste management to ensure compliance and take advantage of available programs."
			];
			break;

		// glass cases
		case "brown-glass":
		case "green-glass":
		case "white-glass":
			solutionObj.name = "Glass";
			solutionObj.locations = ["Recycling Bins"];
			solutionObj.instructionBulletins = ["Handling Broken Glass: If the glass is broken, protect your hands from cuts by wearing heavy duty gloves.",
				"Recyclable Glass: Only glass bottles and jars can be recycled with curbside recycling.",
				"Rinse Containers: Ensure all glass bottles and jars are empty and rinsed to remove food residues, which can contaminate other recyclables.",
				"Avoid Including Non-Recyclable Glass: Items like light bulbs, ceramics, and drinking glasses are typically not accepted in curbside recycling programs due to their different melting points and compositions.",
				"Check Local Guidelines: Recycling programs vary; always verify which types of glass are accepted in your area.",
			];
			break;

		case "cardboard":
			solutionObj.name = "Carboard";
			solutionObj.locations = ["Recycling Bins"];
			solutionObj.instructionBulletins = ["Keep It Clean and Dry: Ensure all cardboard is free from food, liquid, and other residues. Contaminated cardboard can compromise the recycling process and may end up in landfills instead.",
				"Flatten Boxes: Break down cardboard boxes before placing them in the recycling bin. Flattening boxes saves space, making collection and processing more efficient.",
				"Remove Non-Cardboard Materials: Take out any packing materials such as bubble wrap, air pillows, or styrofoam inserts. These items are not recyclable with cardboard and should be disposed of separately."
			];
			break;

		case "clothes":
			solutionObj.name = "Clothes";
			solutionObj.locations = ["Charities", "Specific Retailers"];
			solutionObj.instructionBulletins = ["Donate Clothes: Clothes in good condition can be donated to charities or shelters, extending their lifespan and helping those in need.",
				"Repurpose Worn-Out Textiles: Old or damaged clothing can be repurposed as cleaning rags or craft materials.",
				"Utilize Retailer Programs: Some retailers offer take-back programs for textiles, accepting used clothing for recycling or repurposing."
			];
			break;

		case "metal":
			solutionObj.name = "Aluminum or Other Metals";
			solutionObj.locations = ["Recycling Bins"];
			solutionObj.instructionBulletins = ["Recycle Aluminum and Steel Cans: Empty, dry beverage and food cans are highly recyclable and can be placed in most curbside bins.",
				"Clean Metal Properly: Remove any food or residues from metals to ensure they are ready for recycling.",
				"Avoid Including Hazardous Metal Items: Items like propane tanks or electronics (e-waste) require special handling and should not be placed in regular recycling bins. You can look up online for nearby facilities you can take them to."
			];

			break;

		case "paper":
			solutionObj.name = "Paper";
			solutionObj.locations = ["Recycle Bins"];
			solutionObj.instructionBulletins = ["Recycle Clean Paper Products: Items such as office paper, newspapers, magazines, and envelopes are widely accepted in recycling programs. Ensure they are free from contaminants like food residue or grease before placing them in the recycling bin.",
				"Avoid Recycling Contaminated or Coated Paper: Paper products that are soiled with food, grease, or coated with materials like wax, plastic, or foil (e.g., certain wrapping papers, laminated documents) are typically non-recyclable and should be disposed of in regular trash."
			];

			break;

		case "plastic":
			solutionObj.name = "Plastic";
			solutionObj.locations = ["Recycle Bins"];
			solutionObj.instructionBulletins = ["Identify Recyclable Plastics: Plastics labeled with recycling codes #1 (PET) and #2 (HDPE) are widely accepted in recycling programs. Check the bottom (or sides) of containers for these codes to determine recyclability.",
				"Clean and Dry Before Recycling: Ensure plastic items are free from food residues and liquids. Contaminants can hinder the recycling process and may cause entire batches to be discarded.",
				"Avoid Bagging Recyclables: Place plastics directly into the recycling bin without bagging them, as plastic bags can interfere with sorting machinery. Instead, many retailers offer collection bins for plastic bags, wraps, and films, which are not typically accepted in curbside programs"
			];
			break;

		case "shoes":
			solutionObj.name = "Shoes";
			solutionObj.locations = ["Charities", "Specific Retailers"];
			solutionObj.instructionBulletins = ["Donate Usable Shoes: Gently worn shoes can be donated to organizations that distribute them to those in need.",
				"Explore Retailer Take-Back Programs: Some brands offer programs to recycle old shoes, turning them into new products or materials. You can easily find local ones online.",
				"Repurpose Worn-Out Footwear: Old shoes can be used for gardening or other activities where new shoes aren't necessary, extending their use before disposal."
			];
			break;

		case "trash":
			solutionObj.name = "Trash";
			solutionObj.locations = ["Landfill Bin", "Trash Can"];
			solutionObj.instructionBulletins = ["Secure Loose Materials: Bag items like ashes, sawdust, and pet waste before placing them in the trash to prevent litter during collection.",
				"Avoid Disposing of Hazardous Materials in Regular Trash: Items like batteries, paints, and chemicals require special handling. Look up your local hazardous waste disposal program for guidance."
			];
			break;

		default:
			solutionObj.name = "Unknown";
			solutionObj.locations = ["Unknown"];
			solutionObj.instructionBulletins = ["Check for Recycling Symbols: Examine product packaging for recycling symbols and codes, which indicate whether an item is recyclable.",
				"Plastics: Marked with numbers (1-7) inside a triangle, denoting the type of plastic and its recyclability.",
				"Glass: A triangle of arrows or a glass icon indicates recyclability. Ensure glass is clean and free from contaminants.",
				"Paper and Cardboard: Symbols like a recycling triangle with a paper icon denote recyclable paper products. Avoid recycling soiled or greasy paper.",
				"Metals: Aluminum and steel cans often have recycling symbols indicating they are recyclable. Rinse them before recycling.",
				"Consult Local Guidelines: Waste disposal regulations can vary by location. Refer to your local waste management resources or municipal guidelines to understand specific disposal requirements in your area."
			];
			break;
	}

	return solutionObj;
};

export default function SummaryScreen({ route }) {
	const navigation = useNavigation();
	const { photoUri, classification } = route.params || {};

	const [instructions, setInstructions] = useState({ name: "", locations: [], instructionBulletins: [] });

	useEffect(() => {
		if (classification) {
			const instructionData = getInstructions(classification);
			setInstructions(instructionData);
		}
	}, [classification]);

	return (
		<View style={styles.container}>
			{/* Scrollable Content */}
			<ScrollView style={styles.instructionsContainer} contentContainerStyle={styles.scrollContent}>
				{/* Title */}
				<Text style={styles.title}>Waste Type: {instructions.name || "Unknown"}</Text>

				{/* Image Preview */}
				{photoUri && <Image source={{ uri: photoUri }} style={styles.previewImage} />}

				{/* Disposal Locations */}
				<Text style={styles.instructionsTitle}>Disposal Locations:</Text>
				{instructions.locations.length > 0 ? (
					instructions.locations.map((location, index) => (
						<Text key={index} style={styles.instructionText}>{location}</Text>
					))
				) : (
					<Text style={styles.instructionText}>No locations available.</Text>
				)}

				{/* Disposal Instructions */}
				<Text style={styles.instructionsTitle}>Instructions:</Text>
				{instructions.instructionBulletins.length > 0 ? (
					instructions.instructionBulletins.map((bulletin, index) => (
						<Text key={index} style={styles.instructionText}>{bulletin}</Text>
					))
				) : (
					<Text style={styles.instructionText}>No instructions available.</Text>
				)}
			</ScrollView>

			{/* Fixed Home Button */}
			<View style={styles.homeButtonBackground}>
				<TouchableOpacity style={styles.homeButton} onPress={() => navigation.navigate("Home")}>
					<Ionicons name="home" size={40} color="#ffffff" />
				</TouchableOpacity>
			</View>
		</View>
	);
}



const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#D3E8D2",
		alignItems: "center",
		justifyContent: "center",
		padding: 20,
	},

	homeButton: {
		width: 55,
		height: 55,
		marginTop: 15,
		marginLeft: 9,
		alignItems: "center",
	},

	homeButtonBackground: {
		width: 75,
		height: 75,
		backgroundColor: "#3C6049",
		borderColor: "#3C6049",
		marginTop: 60,
		marginBottom: 30,
		marginHorizontal: 159,
		borderWidth: 1,
		borderRadius: 20,
	},

	title: {
		fontSize: 25,
		fontWeight: "bold",
		color: "#3C6049",
		top: 50,
		marginBottom: 100,
		textAlign: "center",
	},

	previewImage: {
		width: 300,
		height: 300,
		backgroundColor: "#D9D9D9",
		borderRadius: 10,
	},

	classificationText: {
		fontSize: 25,
		fontWeight: "600",
		color: "#3C6049",
		textAlign: "center",
		marginTop: 50,
	},

	instructionsContainer: {
		marginTop: 20,
		width: "90%",
	},

	instructionsTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#3C6049",
		marginBottom: 10,
	},

	instructionText: {
		fontSize: 16,
		color: "#3C6049",
		marginBottom: 5,
	},
	locationContainer: {
		marginTop: 20,
		width: "90%",
	},

	locationTitle: {
		fontSize: 20,
		fontWeight: "bold",
		color: "#3C6049",
		marginBottom: 10,
	},

	locationText: {
		fontSize: 16,
		color: "#3C6049",
		marginBottom: 5,
	},
});
