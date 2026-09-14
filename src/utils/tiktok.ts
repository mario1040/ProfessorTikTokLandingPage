/**
 * TikTok Pixel Helpers & Strongly Typed Event Trackers
 * Ensures rigid, valid contents payloads across all events
 * to completely eliminate "Content ID is missing in your events" errors.
 */

export interface TikTokContentItem {
  content_id: string;
  content_type: string;
  content_name: string;
  price?: number;
  quantity?: number;
}

/**
 * Standardize Egyptian & international phone numbers to E.164 format (+201XXXXXXXXX)
 * as strictly required by TikTok Advanced Matching.
 */
export const formatToE164 = (phone: string): string => {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');

  if (digits.startsWith('0')) {
    return '+20' + digits.substring(1);
  }
  if (digits.startsWith('20')) {
    return '+' + digits;
  }
  if (digits.length === 10 && ['10', '11', '12', '15'].some((prefix) => digits.startsWith(prefix))) {
    return '+20' + digits;
  }

  return '+' + digits;
};

/**
 * Track ViewContent event with guaranteed non-empty contents
 */
export const trackViewContent = (
  contentId = 'kitchen_custom_01',
  contentName = 'Custom Kitchen Design'
) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('ViewContent', {
        contents: [
          {
            content_id: contentId,
            content_type: 'product',
            content_name: contentName,
          },
        ],
        value: 100,
        currency: 'EGP',
      });
    }
  } catch (err) {
    console.warn('TikTok ViewContent Error:', err);
  }
};

/**
 * Track SubmitForm event with guaranteed non-empty contents and contextual parameters
 * (query & description for service type, without transmitting plain text PII)
 */
export const trackSubmitForm = (
  contentId = 'lead_form_01',
  contentName = 'Consultation Request',
  value = 500,
  currency = 'EGP',
  description?: string,
  query?: string
) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      const payload: Record<string, unknown> = {
        contents: [
          {
            content_id: contentId,
            content_type: 'product',
            content_name: contentName,
          },
        ],
        value,
        currency,
      };

      if (description) {
        payload.description = description;
      }
      if (query) {
        payload.query = query;
      }

      window.ttq.track('SubmitForm', payload);
    }
  } catch (err) {
    console.warn('TikTok SubmitForm Error:', err);
  }
};

/**
 * Track Schedule event with guaranteed non-empty contents
 */
export const trackSchedule = (
  contentId = 'consultation_01',
  contentName = 'Booked 3D Design'
) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('Schedule', {
        contents: [
          {
            content_id: contentId,
            content_type: 'product',
            content_name: contentName,
          },
        ],
      });
    }
  } catch (err) {
    console.warn('TikTok Schedule Error:', err);
  }
};

/**
 * Track Contact event (WhatsApp / Call button clicks) with guaranteed non-empty contents
 */
export const trackContact = (
  contentId = 'whatsapp_lead_01',
  contentName = 'WhatsApp Inquiry'
) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('Contact', {
        contents: [
          {
            content_id: contentId,
            content_type: 'product',
            content_name: contentName,
          },
        ],
      });
    }
  } catch (err) {
    console.warn('TikTok Contact Error:', err);
  }
};

/**
 * Identify user with E.164 phone number
 */
export const identifyUser = (phone: string, email?: string) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      const formattedPhone = formatToE164(phone);
      window.ttq.identify({
        phone_number: formattedPhone,
        ...(email ? { email } : {}),
      });
    }
  } catch (err) {
    console.warn('TikTok Identify Error:', err);
  }
};
