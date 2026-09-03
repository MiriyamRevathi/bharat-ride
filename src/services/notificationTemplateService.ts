// Multi-Channel Passenger & Driver Notification Dispatcher
export interface NotificationDispatchPayload {
  channel: 'SMS' | 'WHATSAPP' | 'PUSH' | 'EMAIL';
  recipientAddress: string;
  templateId: string;
  renderedText: string;
  senderHeader: string;
  isHighPriorityTransactional: boolean;
}

export function formatBookingConfirmedNotification(
  bookingId: string,
  passengerName: string,
  sourceCity: string,
  destCity: string,
  departureDateTime: string,
  seatNumbers: string[],
  busNumber: string
): NotificationDispatchPayload {
  const seatsStr = seatNumbers.join(', ');
  const msg = `Namaste ${passengerName}! Your Bharat Bus booking #${bookingId} from ${sourceCity} to ${destCity} on ${departureDateTime} is CONFIRMED. Seats: ${seatsStr}. Bus: ${busNumber}. Track live: https://bharatride.in/track/${bookingId}`;
  return {
    channel: 'WHATSAPP',
    recipientAddress: passengerName,
    templateId: 'BHARAT_TKT_CONFIRM_V2',
    renderedText: msg,
    senderHeader: 'BHRTRD',
    isHighPriorityTransactional: true
  };
}

export function formatDriverAssignedNotification(
  passengerName: string,
  driverName: string,
  driverPhone: string,
  busNumber: string
): NotificationDispatchPayload {
  const msg = `Captain ${driverName} (${driverPhone}) has been assigned to your Bharat Bus (${busNumber}). Your bus is on schedule. Emergency contact: 1800-419-8999.`;
  return {
    channel: 'SMS',
    recipientAddress: passengerName,
    templateId: 'BHARAT_DRV_ASSIGNED',
    renderedText: msg,
    senderHeader: 'BHRTRD',
    isHighPriorityTransactional: true
  };
}
