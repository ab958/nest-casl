import { applyDecorators } from '@nestjs/common';
import { ApiConsumes, ApiOperation } from '@nestjs/swagger';
/**
 * @description ApiDescription adds description to the route.
 */
export const ApiFormData = ( description: string ) =>
    applyDecorators(ApiConsumes('multipart/form-data'))
