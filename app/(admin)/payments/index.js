import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import { router } from 'expo-router';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import { supabase } from '../../../services/supabase';

export default function PaymentManagement() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    const { data, error } = await supabase
      .from('payments')
      .select(`
        *,
        students (
          first_name,
          last_name
        ),
        rooms (
          room_number
        )
      `)
      .order('payment_date', { ascending: false });
    
    if (!error) setPayments(data);
  };

  const generateReceipt = async (payment) => {
    const html = `
      <html>
        <body style="padding: 20px;">
          <h1>Payment Receipt</h1>
          <hr/>
          <p><strong>Receipt No:</strong> ${payment.receipt_number}</p>
          <p><strong>Date:</strong> ${new Date(payment.payment_date).toLocaleDateString()}</p>
          <p><strong>Student:</strong> ${payment.students.first_name} ${payment.students.last_name}</p>
          <p><strong>Room:</strong> ${payment.rooms.room_number}</p>
          <p><strong>Amount:</strong> $${payment.amount}</p>
          <p><strong>Status:</strong> ${payment.status}</p>
          <hr/>
          <p style="text-align: center;">Thank you for your payment!</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html });
      await Sharing.shareAsync(uri);
    } catch (error) {
      alert('Error generating receipt');
    }
  };

  const PaymentCard = ({ payment }) => (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => router.push(`/admin/payments/${payment.id}`)}
    >
      <View style={styles.paymentInfo}>
        <Text style={styles.name}>
          {payment.students.first_name} {payment.students.last_name}
        </Text>
        <Text style={styles.details}>
          Room: {payment.rooms.room_number}
        </Text>
        <Text style={styles.amount}>
          Amount: ${payment.amount}
        </Text>
        <Text style={styles.date}>
          Date: {new Date(payment.payment_date).toLocaleDateString()}
        </Text>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity 
          style={styles.receiptButton}
          onPress={() => generateReceipt(payment)}
        >
          <Text style={styles.receiptButtonText}>Receipt</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Payment Management</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => router.push('/admin/payments/add')}
        >
          <Text style={styles.addButtonText}>New Payment</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={payments}
        renderItem={({ item }) => <PaymentCard payment={item} />}
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
  paymentInfo: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  details: {
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: '500',
    marginTop: 5,
  },
  date: {
    color: '#666',
    fontSize: 12,
  },
  actions: {
    marginLeft: 10,
  },
  receiptButton: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 5,
  },
  receiptButtonText: {
    color: '#fff',
  },
}); 