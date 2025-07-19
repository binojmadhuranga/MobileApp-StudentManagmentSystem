import React, { useEffect, useRef, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StatusBar,
    Animated,
    Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Home = () => {
    const [showWelcome, setShowWelcome] = useState(true);
    const slideAnim = useRef(new Animated.Value(-300)).current;
    const navigation = useNavigation();

    useEffect(() => {
        Animated.timing(slideAnim, {
            toValue: 0,
            duration: 1000,
            useNativeDriver: true,
        }).start();

        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 2500);

        return () => clearTimeout(timer);
    }, []);

    const handleLogout = async () => {
        Alert.alert('Logout', 'Are you sure you want to logout?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Logout',
                style: 'destructive',
                onPress: async () => {
                    await AsyncStorage.removeItem('userToken');
                    navigation.replace('Login');
                },
            },
        ]);
    };

    if (showWelcome) {
        return (
            <SafeAreaView style={styles.welcomeContainer}>
                <StatusBar barStyle="light-content" backgroundColor="#003366" />
                <Animated.Text style={[styles.welcomeText, { transform: [{ translateX: slideAnim }] }]}>
                    Welcome Back!
                </Animated.Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#003366" />

            <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Student Management System</Text>
                <Text style={styles.subtitle}>Manage students easily and efficiently</Text>
            </View>
            <Image
                source={require('../../assets/logo.png')} // replace with your local icon or image
                style={styles.image}
                resizeMode="contain"
            />
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
                <Text style={styles.buttonText}>Go to Menu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#003366',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    logoutContainer: {
        width: '100%',
        alignItems: 'flex-end',
        padding: 16,
        position: 'absolute',
        top: 0,
        right: 0,
        zIndex: 1,
    },
    logoutText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
    welcomeContainer: {
        flex: 1,
        backgroundColor: '#003366',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#ffffff',
        letterSpacing: 1.5,
        fontStyle: 'italic',
        fontFamily: 'serif',
    },
    header: {
        marginTop: 100,
        marginBottom: 20,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 28,
        color: '#ffffff',
        fontWeight: 'bold',
        letterSpacing: 0.5,
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 16,
        color: '#cfe2f3',
        marginTop: 15,
        textAlign: 'center',
    },
    image: {
        width: 180,
        height: 180,
        borderRadius: 150,
        marginVertical: 30,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#ffffff',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        elevation: 3,
        marginTop: 10,
    },
    buttonText: {
        color: '#003366',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Home;
