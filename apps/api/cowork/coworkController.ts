import {
  Tags,
  Route,
  Get,
  Path,
  Put,
  Post,
  Delete,
  Body,
  BodyProp,
  Response
} from 'tsoa'
import CoworkService from './coworkService'
import { EditCoworkInput } from './coworkTypes'
import CustomError from '../errors/customError'

@Route('cowork')
@Tags('Coworks')
export default class CoworkController {
  @Get('/')
  static async getCoworks() {
    return CoworkService.fetchAll()
  }

  @Get('/{id}')
  @Response<CustomError>(404, 'Cowork not found')
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
  @Put('/{id}')
  static async edit(@Path() id: string, @Body() data: EditCoworkInput) {
    return CoworkService.edit(id, data)
  }

  /**
   *
   * @param data EditCoworkInput
   * @returns Cowork
   */
  @Post('/')
  static async create(@BodyProp() data: EditCoworkInput) {
    return CoworkService.createCowork(data)
  }

  @Delete('/{id}')
  @Response<CustomError>(404, 'Cowork not found')
  static async remove(@Path() id: string) {
    return CoworkService.delete(id)
  }
}
