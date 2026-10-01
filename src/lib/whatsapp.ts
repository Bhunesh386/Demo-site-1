interface WhatsAppParams {
  roomType?: string;
  checkIn?: string;
  checkOut?: string;
  adults?: number;
  children?: number;
}

const PHONE = "919929040000";

export function buildWhatsAppMessage(params: WhatsAppParams): string {
  let message = 'Hello! ';
  
  if (params.roomType) {
    const safeRoom = params.roomType.slice(0, 100);
    message += `I am interested in the ${safeRoom}. `;
  } else {
    message += `I am interested in making a reservation. `;
  }

  const details = [];
  if (params.checkIn) details.push(`Check-in: ${params.checkIn.slice(0, 20)}`);
  if (params.checkOut) details.push(`Check-out: ${params.checkOut.slice(0, 20)}`);
  
  if (params.adults !== undefined || params.children !== undefined) {
    const guests = [];
    if (params.adults) guests.push(`${params.adults} Adults`);
    if (params.children !== undefined) guests.push(`${params.children} Children`);
    if (guests.length) details.push(`Guests: ${guests.join(', ')}`);
  }

  if (details.length) {
    message += `\n\nDetails:\n${details.join('\n')}`;
  }

  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${PHONE}?text=${encodedMessage}`;
}
