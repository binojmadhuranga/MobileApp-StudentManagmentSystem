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
            {
                text: 'Cancel',
                style: 'cancel',
            },
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
                <StatusBar barStyle="light-content" backgroundColor="#4F8EF7" />
                <Animated.Text style={[styles.welcomeText, { transform: [{ translateX: slideAnim }] }]}>
                    Hello Welcome!
                </Animated.Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="#4F8EF7" />
            
            {/* Logout Button */}
            <View style={styles.logoutContainer}>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logoutText}>Logout</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Welcome Home!</Text>
                <Text style={styles.subtitle}>Your productivity starts here.</Text>
            </View>
            <Image
                source={{
                    uri: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
                }}
                style={styles.image}
                resizeMode="cover"
            />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#4F8EF7',
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
        backgroundColor: '#4F8EF7',
        justifyContent: 'center',
        alignItems: 'center',
    },
    welcomeText: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#fff',
        letterSpacing: 2,
    },
    header: {
        marginTop: 100,
        marginBottom: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        color: '#fff',
        fontWeight: 'bold',
        letterSpacing: 1,
    },
    subtitle: {
        fontSize: 16,
        color: '#e2dbdbff',
        marginTop: 8,
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 150,
        marginVertical: 30,
        shadowColor: '#000',
        shadowOpacity: 0.2,
        shadowRadius: 8,
        shadowOffset: { width: 0, height: 4 },
    },
    button: {
        backgroundColor: '#fff',
        paddingVertical: 14,
        paddingHorizontal: 40,
        borderRadius: 30,
        elevation: 3,
        marginTop: 10,
    },
    buttonText: {
        color: '#4F8EF7',
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 1,
    },
});

export default Home;
