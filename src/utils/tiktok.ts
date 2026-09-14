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
 * Standardize any Egyptian phone format (starting with 01, 1, 20, or +20)
 * into strictly compliant E.164 format (+201XXXXXXXXX) as required by TikTok Advanced Matching.
 */
export const formatToE164 = (phone: string): string => {
  if (!phone) return '';
  // Remove all non-digit characters
  let digits = phone.replace(/\D/g, '');

  if (!digits) return '';

  // Case: Starts with 0020... -> remove leading 00
  if (digits.startsWith('0020')) {
    digits = digits.substring(2);
  }

  // Case: Starts with 201... (12 digits)
  if (digits.startsWith('20') && digits.length >= 12) {
    return '+' + digits;
  }

  // Case: Starts with 01... (11 digits e.g. 01149238763) -> convert to +201149238763
  if (digits.startsWith('01') && digits.length === 11) {
    return '+20' + digits.substring(1);
  }

  // Case: Starts with 1... (10 digits e.g. 1149238763, 10, 12, 15)
  if (digits.length === 10 && ['10', '11', '12', '15'].some((prefix) => digits.startsWith(prefix))) {
    return '+20' + digits;
  }

  // If already starts with 20
  if (digits.startsWith('20')) {
    return '+' + digits;
  }

  // Default fallback if digits provided
  return '+20' + digits;
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
 * Track SubmitForm event with guaranteed non-empty contents and explicit value
 */
export const trackSubmitForm = (
  contentId = 'lead_form_01',
  contentName = 'Consultation Request',
  value = 500,
  currency = 'EGP'
) => {
  try {
    if (typeof window !== 'undefined' && window.ttq) {
      window.ttq.track('SubmitForm', {
        contents: [
          {
            content_id: contentId,
            content_type: 'product',
            content_name: contentName,
          },
        ],
        value,
        currency,
      });
    }
  } catch (err) {
    console.warn('TikTok SubmitForm Error:', err);
  }
};

/**
 * Track Schedule event with guaranteed non-empty contents and explicit value
 */
export const trackSchedule = (
  contentId = 'consultation_01',
  contentName = 'Booked 3D Design',
  value = 500,
  currency = 'EGP'
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
        value,
        currency,
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
 * Identify user with E.164 phone number for Advanced Matching
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
