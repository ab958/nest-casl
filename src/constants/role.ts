import { Role } from 'nest-access-control';

export enum AppRoles {
  ADMIN = 'admin',
  USER = 'user',
}

export const roles = [
  { name: AppRoles.ADMIN, permissions: ['*'] },
  { name: AppRoles.USER, permissions: ['read:products'] },
];
