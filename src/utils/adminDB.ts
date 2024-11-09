export interface AdminCredentials {
  email: string;
  password: string;
  name: string;
}

const ADMIN_DB_KEY = 'xylearn_admins';

// Get all admins
const getAdmins = (): Record<string, AdminCredentials> => {
  const admins = localStorage.getItem(ADMIN_DB_KEY);
  return admins ? JSON.parse(admins) : {};
};

// Save all admins
const saveAdmins = (admins: Record<string, AdminCredentials>) => {
  localStorage.setItem(ADMIN_DB_KEY, JSON.stringify(admins));
};

// Add a new admin
export const addAdmin = (admin: AdminCredentials) => {
  const admins = getAdmins();
  admins[admin.email] = admin;
  saveAdmins(admins);
};

// Get an admin by email
export const getAdmin = (email: string): AdminCredentials | null => {
  const admins = getAdmins();
  return admins[email] || null;
};

// Remove an admin
export const removeAdmin = (email: string) => {
  const admins = getAdmins();
  delete admins[email];
  saveAdmins(admins);
};