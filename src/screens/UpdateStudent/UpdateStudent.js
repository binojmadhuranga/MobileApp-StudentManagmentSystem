import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert,
    SafeAreaView,
    ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const UpdateStudent = () => {
    const [studentId, setStudentId] = useState('');
    const [studentName, setStudentName] = useState('');
    const [studentAge, setStudentAge] = useState('');
    const [studentAddress, setStudentAddress] = useState('');
    const [studentContact, setStudentContact] = useState('');

    const handleUpdate = async () => {
        if (!studentId || !studentName || !studentAge || !studentAddress || !studentContact) {
            Alert.alert('Validation', 'All fields are required');
            return;
        }

        try {
            const token = await AsyncStorage.getItem('userToken');

            if (!token) {
                Alert.alert('Error', 'User token not found. Please login again.');
                return;
            }

            const url = `https://student-api.acpt.lk/api/student/update/${studentId}`;

            await axios.put(
                url,
                {
                    student_name: studentName,
                    student_age: studentAge,
                    student_address: studentAddress,
                    student_contact: studentContact,
                },
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                }
            );

            Alert.alert('Success', 'Student updated successfully');
            setStudentId('');
            setStudentName('');
            setStudentAge('');
            setStudentAddress('');
            setStudentContact('');

        } catch (error) {
            console.error('Update Error:', error);
            const message = error.response?.data?.message || 'Something went wrong. Try again later.';
            Alert.alert('Error', message);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.inner}>
                <Text style={styles.title}>Update Student</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Student ID"
                    value={studentId}
                    onChangeText={setStudentId}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student Name"
                    value={studentName}
                    onChangeText={setStudentName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student Age"
                    value={studentAge}
                    onChangeText={setStudentAge}
                    keyboardType="numeric"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student Address"
                    value={studentAddress}
                    onChangeText={setStudentAddress}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Student Contact"
                    value={studentContact}
                    onChangeText={setStudentContact}
                    keyboardType="phone-pad"
                />

                <TouchableOpacity style={styles.button} onPress={handleUpdate}>
                    <Text style={styles.buttonText}>Update Student</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f7',
    },
    inner: {
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
        backgroundColor: '#003366',
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

export default UpdateStudent;
