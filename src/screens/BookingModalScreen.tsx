import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Room } from '../types';
import { TIME_SLOTS } from '../data/mockRooms';
import { useBookingStore } from '../store/useBookingStore';

export const BookingModalScreen = ({ route, navigation }: any) => {
  const { room }: { room: Room } = route.params;
  const { isSlotBooked, addBooking } = useBookingStore();

  // Tạo danh sách 7 ngày tiếp theo
  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() + i);
    return d.toISOString().split('T')[0];
  });

  const [selectedDate, setSelectedDate] = useState(dates[0]);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  const handleConfirm = async () => {
    if (!selectedSlot) {
      Alert.alert('Chưa chọn khung giờ', 'Vui lòng chọn 1 khung giờ trước khi tiếp tục.');
      return;
    }

    const slotInfo = TIME_SLOTS.find((s) => s.id === selectedSlot)!;
    const success = await addBooking(
      {
        roomId: room.id,
        roomName: room.name,
        building: room.building,
        date: selectedDate,
        slotId: slotInfo.id,
        slotLabel: slotInfo.label,
        userName: 'Sinh viên VKU',
      },
      slotInfo.startHour,
      slotInfo.startMinute
    );

    if (success) {
      Alert.alert('Thành công', 'Phòng đã được đặt thành công!', [
        { text: 'Xem vé đặt', onPress: () => navigation.navigate('MyBookingsTab') },
      ]);
    } else {
      Alert.alert('Xung đột lịch', 'Khung giờ này vừa có người khác đặt. Vui lòng chọn ca khác.');
    }
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 20 }}>
      <Text style={styles.title}>{room.name}</Text>
      <Text style={styles.subtitle}>Chọn ngày đặt:</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginBottom: 16 }}>
        {dates.map((d) => (
          <TouchableOpacity
            key={d}
            style={[styles.dateChip, selectedDate === d && styles.activeChip]}
            onPress={() => {
              setSelectedDate(d);
              setSelectedSlot(null);
            }}
          >
            <Text style={[styles.dateText, selectedDate === d && styles.activeDateText]}>{d}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Text style={styles.subtitle}>Khung giờ khả dụng (2 tiếng/ca):</Text>
      <View style={styles.slotsGrid}>
        {TIME_SLOTS.map((slot) => {
          const booked = isSlotBooked(room.id, selectedDate, slot.id);
          const isSelected = selectedSlot === slot.id;

          return (
            <TouchableOpacity
              key={slot.id}
              disabled={booked}
              style={[
                styles.slotButton,
                booked && styles.slotDisabled,
                isSelected && styles.slotSelected,
              ]}
              onPress={() => setSelectedSlot(slot.id)}
            >
              <Text
                style={[
                  styles.slotText,
                  booked && styles.textDisabled,
                  isSelected && styles.textSelected,
                ]}
              >
                {slot.label}
              </Text>
              <Text style={styles.slotStateText}>
                {booked ? 'Đã kín' : isSelected ? 'Đang chọn' : 'Còn trống'}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <TouchableOpacity style={styles.submitBtn} onPress={handleConfirm}>
        <Text style={styles.submitText}>Xác nhận & Giữ chỗ</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  title: { fontSize: 20, fontWeight: '800', color: '#1E293B', marginBottom: 16 },
  subtitle: { fontSize: 14, fontWeight: '600', color: '#64748B', marginBottom: 8 },
  dateChip: { padding: 10, borderRadius: 8, backgroundColor: '#F1F5F9', marginRight: 8 },
  activeChip: { backgroundColor: '#3B82F6' },
  dateText: { fontSize: 13, color: '#334155' },
  activeDateText: { color: '#FFF', fontWeight: '700' },
  slotsGrid: { gap: 10, marginVertical: 12 },
  slotButton: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  slotDisabled: { backgroundColor: '#F8FAFC', borderColor: '#CBD5E1', opacity: 0.5 },
  slotSelected: { borderColor: '#3B82F6', backgroundColor: '#EFF6FF' },
  slotText: { fontSize: 15, fontWeight: '700', color: '#0F172A' },
  slotStateText: { fontSize: 12, color: '#64748B' },
  textDisabled: { color: '#94A3B8' },
  textSelected: { color: '#3B82F6' },
  submitBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 24,
  },
  submitText: { color: '#FFF', fontSize: 16, fontWeight: '700' },
});