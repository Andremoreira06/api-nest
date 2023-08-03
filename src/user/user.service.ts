import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/UserDto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  async findOne(id: number) {
    const user = await this.userRepository.findOne({
      where: { id: id },
    });
    return user;
  }

  async findOneWithUserName(username: string) {
    try {
      const user = await this.userRepository.findOne({
        where: { username: username },
        select: ['id', 'username', 'password', 'nome'],
      });
      console.log('id');
      return user;
    } catch (e) {
      console.log('else');
      return null;
    }
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async create(createUserDto: CreateUserDto) {
    const existeUser = await this.userRepository.findOne({
      where: { username: createUserDto.username },
    });
    if (existeUser) {
      throw new BadRequestException('Email ja cadastrado');
    }
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async delete(id: number) {
    return this.userRepository.delete(id);
  }
}
