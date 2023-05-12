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
  Request,
  Security,
  Query
} from 'tsoa'
import CoworkService from './coworkService'
import {
  CreateCoworkInput,
  EditCoworkInput,
  CoworkFilters
} from './coworkTypes'
import CustomError from '../errors/customError'
import express from 'express'

@Route('coworks')
@Tags('Coworks')
export default class CoworkController {
  /**
   *
   * @param status
   * @param city
   * @param country
   * @param sort field name to sort response by ( could be of either cowork or address ) <br /> Add '-' before to sort in reverse (ie: -country)
   * @returns PaginatedCoworks
   */
  @Get('/')
  static async getCoworks(
    @Query('status') status?: CoworkFilters['status'],
    @Query('city') city?: string,
    @Query('country') country?: string,
    @Query('sort') sort?: string,
    @Query('count') count?: number,
    @Query('cursor') cursor?: string
  ) {
    return CoworkService.fetchAll({ status, city, country }, sort, {
      count,
      cursor
    })
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
  @Response<CustomError>(401, 'Unauthorized')
  @Security('')
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
  @Response<CustomError>(401, 'Unauthorized')
  @Security('')
  @Post('/')
  static async create(
    @Body() data: CreateCoworkInput,
    @Request() req: express.Request
  ) {
    return CoworkService.createCowork(data, req.user?.id || 'anon')
  }

  /**
   *
   * @param id
   * @returns
   */
  @Response<CustomError>(404, 'Cowork not found')
  @Response<CustomError>(401, 'Unauthorized')
  @Security('')
  @Delete('/{id}')
  static async remove(@Path() id: string) {
    return CoworkService.delete(id)
  }
}
