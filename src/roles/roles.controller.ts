import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common';
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import {
    AssignPermissionDto,
    AssignMultiplePermissionsDto,
} from './dto/assign-permission.dto';

@Controller('roles')
export class RolesController {
    constructor(private readonly rolesService: RolesService) {}

    @Post()
    create(@Body() createRoleDto: CreateRoleDto) {
      return this.rolesService.create(createRoleDto);
    }

    @Get()
    findAll() {
      return this.rolesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.rolesService.findOne(+id);
    }

    @Patch(':id')
    update(
        @Param('id') id: string,
        @Body() updateRoleDto: UpdateRoleDto,
    ) {
      return this.rolesService.update(+id, updateRoleDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.rolesService.remove(+id);
    }

    @Post(':id/permissions')
    assignPermissionToRole(
        @Param('id') id: string,
        @Body() assignPermissionDto: AssignPermissionDto,
    ) {
        return this.rolesService.assignPermissionToRole(
            +id,
            assignPermissionDto.permissionId,
        );
    }

    @Delete(':id/permissions/:permissionId')
    removePermissionFromRole(
        @Param('id') id: string,
        @Param('permissionId') permissionId: string,
    ) {
        return this.rolesService.removePermissionFromRole(
            +id,
            +permissionId,
        );
    }

    @Post(':id/permissions/multiple')
    assignMultiplePermissionsToRole(
        @Param('id') id: string,
        @Body() assignMultiplePermissionsDto: AssignMultiplePermissionsDto,
    ) {
        return this.rolesService.assignMultiplePermissionsToRole(
            +id,
            assignMultiplePermissionsDto.permissionIds,
        );
    }

    @Get(':id/permissions')
    getRolePermissions(@Param('id') id: string) {
        return this.rolesService.getRolePermissions(+id);
    }
}
