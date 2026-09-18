import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Modal } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { useBookingStore } from '../store/useBookingStore';
import { Booking } from '../types';

export const MyBookingsScreen = () => {
  const { bookings, cancelBooking } = useBookingStore();
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  return (
    <View style={styles.container}>
      {bookings.length === 0 ? (
        <View style={styles.empty}>
          <Text style={styles.emptyText}>Bạn chưa có lịch đặt nào.</Text>
        </View>
      ) : (
        <FlatList
          data={bookings}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ padding: 16 }}
          renderItem={({ item }) => (
            <View style={styles.ticketCard}>
              <View style={styles.cardHeader}>
                <Text style={styles.roomTitle}>{item.roomName}</Text>
                <Text style={styles.codeText}>#{item.id}</Text>
              </View>
              <Text style={styles.detailText}>📅 Ngày: {item.date}</Text>
              <Text style={styles.detailText}>⏰ Giờ: {item.slotLabel}</Text>

              <View style={styles.btnRow}>
                <TouchableOpacity
                  style={styles.qrBtn}
                  onPress={() => setSelectedBooking(item)}
                >
                  <Text style={styles.qrBtnText}>Mã Check-in QR</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => cancelBooking(item.id)}
                >
                  <Text style={styles.cancelBtnText}>Hủy ca</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        />
      )}

      {/* Pop-up QR Code */}
      <Modal visible={!!selectedBooking} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.modalBody}>
            <Text style={styles.modalTitle}>Mã Check-in Phòng</Text>
            {selectedBooking && (
              <QRCode
                value={JSON.stringify({
                  bookingId: selectedBooking.id,
                  room: selectedBooking.roomName,
                  date: selectedBooking.date,
                  slot: selectedBooking.slotLabel,
                })}
                size={180}
              />
            )}
            <Text style={styles.qrDesc}>Đưa mã này trước camera tại cửa phòng học</Text>
            <TouchableOpacity
              style={styles.closeBtn}
              onPress={() => setSelectedBooking(null)}
            >
              <Text style={styles.closeBtnText}>Đóng</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  empty: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { color: '#64748B', fontSize: 16 },
  ticketCard: {
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  roomTitle: { fontSize: 16, fontWeight: '700', color: '#0F172A', flex: 1 },
  codeText: { color: '#3B82F6', fontWeight: '800' },
  detailText: { fontSize: 13, color: '#475569', marginBottom: 4 },
  btnRow: { flexDirection: 'row', gap: 12, marginTop: 12 },
  qrBtn: { flex: 1, backgroundColor: '#3B82F6', padding: 10, borderRadius: 8, alignItems: 'center' },
  qrBtnText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  cancelBtn: { padding: 10, borderRadius: 8, borderWidth: 1, borderColor: '#EF4444', alignItems: 'center' },
  cancelBtnText: { color: '#EF4444', fontWeight: '600', fontSize: 13 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalBody: { backgroundColor: '#FFF', padding: 24, borderRadius: 16, alignItems: 'center', width: '80%' },
  modalTitle: { fontSize: 18, fontWeight: '800', marginBottom: 16 },
  qrDesc: { fontSize: 12, color: '#64748B', marginTop: 12, textAlign: 'center' },
  closeBtn: { marginTop: 16, backgroundColor: '#0F172A', paddingVertical: 8, paddingHorizontal: 24, borderRadius: 8 },
  closeBtnText: { color: '#FFF', fontWeight: '600' },
});