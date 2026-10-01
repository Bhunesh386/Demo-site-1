// Date utility for Asia/Kolkata
export function getTodayIST(): string {
  return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
}

export function isValidBookingDateRange(checkIn: string, checkOut: string): boolean {
  const today = getTodayIST();
  if (checkIn < today) return false;
  if (checkOut <= checkIn) return false;
  return true;
}
