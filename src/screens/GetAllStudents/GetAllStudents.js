import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    SafeAreaView,
    ActivityIndicator,
    Alert
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';



const GetAllStudents = () => {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchStudents = async () => {
        try {
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                Alert.alert('Error', 'User token not found. Please login again.');
                setLoading(false);
                return;
            }

            const response = await axios.get('https://student-api.acpt.lk/api/student/getAll', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            setStudents(response.data);
        } catch (error) {
            console.error('Fetch Error:', error);
            const message = error.response?.data?.message || 'Something went wrong. Try again later.';
            Alert.alert('Error', message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, []);

    const renderStudentCard = ({ item }) => (
        <View style={styles.card}>
            <Text style={styles.name}>{item.student_name}</Text>
            <Text>Age: {item.student_age}</Text>
            <Text>Address: {item.student_address}</Text>
            <Text>Contact: {item.student_contact}</Text>
            <Text>ID: {item.id}</Text>
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>All Students</Text>

            {loading ? (
                <ActivityIndicator size="large" color="#4F8EF7" />
            ) : (
                <FlatList
                    data={students}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={renderStudentCard}
                    contentContainerStyle={styles.list}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    title: {
        fontSize: 26,
        fontWeight: 'bold',
        color: '#4F8EF7',
        textAlign: 'center',
        marginBottom: 16,
    },
    list: {
        paddingBottom: 20,
    },
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 6,
        elevation: 3,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 6,
        color: '#333',
    },
});

export default GetAllStudents;
