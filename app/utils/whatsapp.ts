export interface WhatsAppPayload {
  title?: string;
  amount?: string;
  plan?: string;
  source?: string;
  pageUrl?: string;
}

export const openWhatsApp = (payload: WhatsAppPayload) => {
  const { title = '', amount = '', plan = '', source = 'Website', pageUrl = '' } = payload;
  const message = `Hi I'm interested in ${title ? `"${title}"` : 'your services'}. ${amount ? `Price: ${amount}` : ''} ${plan ? `Plan: ${plan}` : ''} Source: ${source} ${pageUrl ? `Page: ${pageUrl}` : ''}  .Please share more details.`;
  const url = `https://wa.me/07880927149?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');
};
