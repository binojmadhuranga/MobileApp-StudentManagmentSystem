import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Menu = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Student Management Menu</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SaveStudent')}>
        <Text style={styles.buttonText}>Save Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('UpdateStudent')}>
        <Text style={styles.buttonText}>Update Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('DeleteStudent')}>
        <Text style={styles.buttonText}>Delete Student</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GetAllStudents')}>
        <Text style={styles.buttonText}>Get All Students</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f7',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 40,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    width: '80%',
    backgroundColor: '#4F8EF7',
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default Menu;
