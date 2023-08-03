import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  UnauthorizedException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/UserDto';
import { JwtGuard } from 'src/auth/guards/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  async findOne(@Param('id') id: number) {
    const user = await this.userService.findOne(id);
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(JwtGuard)
  @Put(':id')
  update(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Request() req,
  ) {
    if (req.user.id != id) {
      throw new UnauthorizedException();
    }
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtGuard)
  @Delete(':id')
  delete(@Param('id') id: number, @Request() req) {
    if (req.user.id != id) {
      throw new UnauthorizedException();
    }
    return this.userService.delete(id);
  }
}
