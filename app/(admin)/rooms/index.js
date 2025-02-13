import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import { supabase } from '../../../services/supabase';

export default function RoomManagement() {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    const { data, error } = await supabase
      .from('rooms')
      .select('*')
      .order('room_number');
    
    if (!error) setRooms(data);
  };

  const RoomCard = ({ room }) => (
    <TouchableOpacity 
      style={[styles.card, !room.is_available && styles.occupiedRoom]}
      onPress={() => router.push(`/admin/rooms/${room.id}`)}
    >
      <Text style={styles.roomNumber}>Room {room.room_number}</Text>
      <View style={styles.details}>
        <Text>Type: {room.room_type}</Text>
        <Text>Price: ${room.price}/month</Text>
        <Text style={styles.status}>
          Status: {room.is_available ? 'Available' : 'Occupied'}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Room Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/rooms/add')}
        >
          <Text style={styles.addButtonText}>Add Room</Text>
        </TouchableOpacity>
      </View>
      
      <FlatList
        data={rooms}
        renderItem={({ item }) => <RoomCard room={item} />}
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
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  occupiedRoom: {
    backgroundColor: '#f8f8f8',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  roomNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    gap: 5,
  },
  status: {
    marginTop: 5,
    fontWeight: '500',
  },
}); 