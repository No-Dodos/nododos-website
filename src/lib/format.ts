import { t } from '@lib/i18n';

export type Contact = {
  fullName: string;
  email: string;
  phone: string;
};

export const markEmail = (email: string) => email.replace('@', '+contact@');

export const phoneText = (contact: Contact) =>
  t('call_person_on_phone', { name: contact.fullName, phone: contact.phone });

export const emailText = (contact: Contact) =>
  t('send_email_to_person', {
    name: contact.fullName,
    email: markEmail(contact.email),
  });
