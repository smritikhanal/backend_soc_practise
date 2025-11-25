import { userRepository } from '../repositories/user.repository';
import { User } from '../types/user.types';
import { CreateUserDtoType, UpdateUserDtoType } from '../dtos/user.dto';

export const userService = {
  getAllUsers: (): User[] => userRepository.getAll(),

  getUserById: (id: string): User | undefined => userRepository.getById(id),

  createUser: (data: CreateUserDtoType): { user?: User; error?: string } => {
    if (userRepository.findById(data.id)) {
      return { error: 'User ID already exists' };
    }
    if (userRepository.findByEmail(data.email)) {
      return { error: 'Email already exists' };
    }
    if (userRepository.findByUsername(data.username)) {
      return { error: 'Username already exists' };
    }
    const user: User = { ...data };
    return { user: userRepository.create(user) };
  },

  updateUser: (id: string, data: UpdateUserDtoType): { user?: User; error?: string } => {
    if (!userRepository.getById(id)) {
      return { error: 'User not found' };
    }
    if (userRepository.findByEmailExcludingId(data.email, id)) {
      return { error: 'Email already exists' };
    }
    if (userRepository.findByUsernameExcludingId(data.username, id)) {
      return { error: 'Username already exists' };
    }
    const updated = userRepository.update(id, data);
    return updated ? { user: updated } : { error: 'User not found' };
  },

  deleteUser: (id: string): { success: boolean; error?: string } => {
    if (!userRepository.getById(id)) {
      return { success: false, error: 'User not found' };
    }
    userRepository.delete(id);
    return { success: true };
  },
};