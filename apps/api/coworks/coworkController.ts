import {
  Tags,
  Route,
  Get,
  Path,
  Put,
  Post,
  Delete,
  Body,
  Response,
  Request as tsoaReq
} from 'tsoa'
import CoworkService from './coworkService'
import { CreateCoworkInput, EditCoworkInput } from './coworkTypes'
import CustomError from '../errors/customError'
import { Request } from 'express'

@Route('coworks')
@Tags('Coworks')
export default class CoworkController {
  @Get('/')
  static async getCoworks() {
    return CoworkService.fetchAll()
  }

  @Response<CustomError>(404, 'Cowork not found')
  @Get('/{id}')
  static async getOne(@Path() id: string) {
    return CoworkService.fetchById(id)
  }

  /**
   *
   * @param id
   * @param data EditCoworkInput
   * @returns Cowork
   */
  @Response<CustomError>(404, 'Cowork not found')
  @Response<CustomError>(406, 'Input data not valid')
  @Put('/{id}')
  static async edit(@Path() id: string, @Body() data: EditCoworkInput) {
    return CoworkService.edit(id, data)
  }

  /**
   *
   * @param data CreateCoworkInput
   * @returns Cowork
   */
  @Response<CustomError>(406, 'Input data not valid')
  @Post('/')
  static async create(
    @Body() data: CreateCoworkInput,
    @tsoaReq() req: Request
  ) {
    return CoworkService.createCowork(data, req.user?.id || 'anon')
  }

  @Response<CustomError>(404, 'Cowork not found')
  @Delete('/{id}')
  static async remove(@Path() id: string) {
    return CoworkService.delete(id)
  }
}
