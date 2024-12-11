import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import background from '../assets/pictures/BG.png'; // Background Image

export default function Homepage() {
    const navigation = useNavigation();
    const [loaded] = useFonts({
        'Poppins-Bold': require('../assets/fonts/Poppins-Bold.ttf'),
    });

    const [showOptions, setShowOptions] = useState(false);

    if (!loaded) {
        return null;
    }

    return (
        <ImageBackground 
            source={background} 
            resizeMode="cover" // Make sure the background image covers the screen
            style={styles.container} // Apply styles directly to ImageBackground
        >
            {/* About Us Button */}
            <TouchableOpacity
                style={styles.Btn}
                onPress={() => navigation.navigate('Aboutus')}
            >
                <Image
                    source={require('../assets/pictures/aboutus.png')}  // Ensure correct image path
                    style={styles.icon}
                />
            </TouchableOpacity>

            {/* Main Button */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    onPress={() => setShowOptions(!showOptions)}
                    style={styles.mainButton}
                >
                    <Text style={styles.Text}>Let's check your COINS!</Text>
                </TouchableOpacity>
            </View>

            {/* Sign In and Sign Up Buttons */}
            {showOptions && (
                <View style={styles.optionsContainer}>
                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => navigation.navigate('Signup')}
                    >
                        <Text style={styles.optionText}>Sign Up</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.optionButton}
                        onPress={() => navigation.navigate('Signin')}
                    >
                        <Text style={styles.optionText}>Sign In</Text>
                    </TouchableOpacity>
                </View>
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        position: 'absolute',
        top: '80%',
        alignItems: 'center',
    },
    mainButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        elevation: 10,
        backgroundColor: '#FFFFFF',
        width: 300,
        height: 70,
        borderColor: '#FFA000',
        borderWidth: 5,
        borderRadius: 50,
        bottom: 40,
    },
    Text: {
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'Poppins-Bold',
        lineHeight: 21,
        letterSpacing: 0.25,
        color: '#F59E0B',
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 55,
        flexDirection: 'row',
        gap: 10,
    },
    optionButton: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 5,
        paddingHorizontal: 25,
        backgroundColor: '#8B5634',
        borderRadius: 5,
        marginVertical: 10,
        width: 150,
        borderColor: '#FFFFFF',
        borderWidth: 5,
        height: 50,
    },
    optionText: {
        color: '#fff',
        fontFamily: 'Poppins-Bold',
        fontSize: 16,
    },
    icon: {
        width: 30,
        height: 30,
    },
    Btn: {
        position: 'absolute',
        right: 10,
        bottom: 10,
        padding: 10,
    },
});
