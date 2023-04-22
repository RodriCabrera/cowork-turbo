import { Tags, Route, Get, Path, Put, Post, Delete, Body, BodyProp } from 'tsoa'
import CoworkService from './coworkService'
import { Cowork, Address } from '@prisma/client'

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
  static async edit(@Path() id: string, @Body() body: Partial<Cowork>) {
    return CoworkService.edit(id, body)
  }

  @Post('/')
  static async create(
    @BodyProp() basicData: Pick<Cowork, 'email' | 'phone'>,
    @BodyProp() address: Omit<Address, 'id'>
  ) {
    return CoworkService.createCowork(basicData, address)
  }

  @Delete('/{id}')
  static async remove(@Path() id: string) {
    return CoworkService.delete(id)
  }
}
