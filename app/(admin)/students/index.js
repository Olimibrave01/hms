import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '@/services/supabase';

export default function StudentManagement() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    const { data, error } = await supabase
      .from('students')
      .select(`
        *,
        rooms (
          room_number
        )
      `)
      .order('created_at', { ascending: false });
    
    if (!error) setStudents(data);
  };

  const StudentCard = ({ student }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/admin/students/${student.id}`)}
    >
      <View style={styles.studentInfo}>
        <Text style={styles.name}>{student.first_name} {student.last_name}</Text>
        <Text style={styles.details}>ID: {student.student_id}</Text>
        <Text style={styles.details}>
          Room: {student.rooms?.room_number || 'Not Assigned'}
        </Text>
        <Text style={styles.details}>Phone: {student.phone}</Text>
      </View>
      <View style={[styles.status, { backgroundColor: student.status === 'active' ? '#e6ffe6' : '#ffe6e6' }]}>
        <Text>{student.status}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Student Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/students/add')}
        >
          <Text style={styles.addButtonText}>Add Student</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={students}
        renderItem={({ item }) => <StudentCard student={item} />}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  addButtonText: {
    color: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  studentInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    color: '#666',
    marginBottom: 2,
  },
  status: {
    padding: 5,
    borderRadius: 5,
    minWidth: 80,
    alignItems: 'center',
  },
}); 