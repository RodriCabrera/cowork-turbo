import { Tags, Route, Get, Path, Put, Post, Delete, Body, BodyProp } from 'tsoa'
import CoworkService from './coworkService'
import { Cowork, Address } from '@prisma/client'
import { EditCoworkInput } from './coworkTypes'

@Route('cowork')
@Tags('Coworks')
export default class CoworkController {
  @Get('/')
  static async getCoworks() {
    return CoworkService.fetchAll()
  }

  @Get('/{id}')
  static async getOne(@Path() id: string) {
    return CoworkService.fetchById(id)
  }

  @Put('/{id}')
  static async edit(@Path() id: string, @Body() body: EditCoworkInput) {
    return CoworkService.edit(id, body)
  }

  @Post('/')
  static async create(@BodyProp() data: EditCoworkInput) {
    return CoworkService.createCowork(data)
  }

  @Delete('/{id}')
  static async remove(@Path() id: string) {
    return CoworkService.delete(id)
  }
}
