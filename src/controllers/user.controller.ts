import { Request, Response } from 'express';
import { userService } from '../services/user.service';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export const userController = {
  getAll: (req: Request, res: Response) => {
    const users = userService.getAllUsers();
    return res.json(users);
  },

  getById: (req: Request, res: Response) => {
    const user = userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    return res.json(user);
  },

  create: (req: Request, res: Response) => {
    const parse = CreateUserDto.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.flatten() });
    }
    const result = userService.createUser(parse.data);
    if (result.error) return res.status(409).json({ error: result.error });
    return res.status(201).json(result.user);
  },

  update: (req: Request, res: Response) => {
    const parse = UpdateUserDto.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.flatten() });
    }
    const result = userService.updateUser(req.params.id, parse.data);
    if (result.error) {
      if (result.error === 'User not found') return res.status(404).json({ error: result.error });
      return res.status(409).json({ error: result.error });
    }
    return res.json(result.user);
  },

  delete: (req: Request, res: Response) => {
    const result = userService.deleteUser(req.params.id);
    if (!result.success) return res.status(404).json({ error: result.error });
    return res.status(204).send();
  },
};