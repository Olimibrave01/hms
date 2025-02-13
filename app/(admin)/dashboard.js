import { View, Text, StyleSheet } from 'react-native';
import { useEffect, useState } from 'react';
import { supabase } from '../../services/supabase';

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalRooms: 0,
    occupiedRooms: 0,
    totalStudents: 0,
    pendingPayments: 0,
  });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    // Fetch dashboard statistics from Supabase
    const { data: rooms } = await supabase.from('rooms').select('*');
    const { data: students } = await supabase.from('students').select('*');
    const { data: payments } = await supabase
      .from('payments')
      .select('*')
      .eq('status', 'pending');

    setStats({
      totalRooms: rooms?.length || 0,
      occupiedRooms: rooms?.filter(room => !room.is_available).length || 0,
      totalStudents: students?.length || 0,
      pendingPayments: payments?.length || 0,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Admin Dashboard</Text>
      <View style={styles.statsContainer}>
        <StatCard title="Total Rooms" value={stats.totalRooms} />
        <StatCard title="Occupied Rooms" value={stats.occupiedRooms} />
        <StatCard title="Total Students" value={stats.totalStudents} />
        <StatCard title="Pending Payments" value={stats.pendingPayments} />
      </View>
    </View>
  );
}

const StatCard = ({ title, value }) => (
  <View style={styles.card}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: '48%',
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 16,
    color: '#666',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 5,
  },
}); 