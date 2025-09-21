import { Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { UpdatePermissionDto } from './dto/update-permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './entities/permission.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PermissionsService {

  constructor(
    @InjectRepository(Permission)
    private readonly permissionsRepository: Repository<Permission>,
  ){}

  async create(createPermissionDto: CreatePermissionDto) {
    const newPermission = this.permissionsRepository.create({
      ...createPermissionDto
    })

    return await this.permissionsRepository.save(newPermission);
  }

  findAll() {
    return this.permissionsRepository.find();
  }

  findOne(id: number) {
    return this.permissionsRepository.findOne({ where: { id } });
  }

  async update(id: number, updatePermissionDto: UpdatePermissionDto) {
    await this.permissionsRepository.update(id, updatePermissionDto);
  
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.permissionsRepository.delete(id);

    if(result.affected){
      return { id };
    }

    return null;
  }
}
