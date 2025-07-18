import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DeleteStudent = () => {
    const [studentId, setStudentId] = useState('');

    const handleDelete = async () => {
        if (!studentId) {
            Alert.alert('Validation', 'Student ID is required');
            return;
        }

        Alert.alert('Confirm Delete', `Are you sure you want to delete student ID ${studentId}?`, [
            {
                text: 'Cancel',
                style: 'cancel'
            },
            {
                text: 'Delete',
                style: 'destructive',
                onPress: async () => {
                    try {
                        const token = await AsyncStorage.getItem('userToken');

                        if (!token) {
                            Alert.alert('Error', 'User token not found. Please login again.');
                            return;
                        }

                        const url = `https://student-api.acpt.lk/api/student/delete/${studentId}`;

                        const response = await fetch(url, {
                            method: 'DELETE',
                            headers: {
                                'Authorization': `Bearer ${token}`
                            }
                        });

                        const data = await response.json();

                        if (response.ok) {
                            Alert.alert('Success', 'Student deleted successfully');
                            setStudentId('');
                        } else {
                            Alert.alert('Error', data.message || 'Failed to delete student');
                        }

                    } catch (error) {
                        console.error('Delete Error:', error);
                        Alert.alert('Error', 'Something went wrong. Try again later.');
                    }
                }
            }
        ]);
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}>Delete Student</Text>

            <TextInput
                style={styles.input}
                placeholder="Enter Student ID"
                value={studentId}
                onChangeText={setStudentId}
                keyboardType="numeric"
            />

            <TouchableOpacity style={styles.button} onPress={handleDelete}>
                <Text style={styles.buttonText}>Delete Student</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#003366',
    },
    input: {
        backgroundColor: '#fff',
        padding: 14,
        marginVertical: 10,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#cc2f2fff',
        paddingVertical: 16,
        borderRadius: 10,
        marginTop: 20,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default DeleteStudent;
