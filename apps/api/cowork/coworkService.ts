import { PrismaClient, Cowork, Address } from '@prisma/client'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(
    basicData: Pick<Cowork, 'email' | 'phone'>,
    address: Omit<Address, 'id'>
  ): Promise<Cowork> {
    throw new Error('Service not implemented')
  }

  static async fetchAll(): Promise<Cowork[]> {
    throw new Error('Service not implemented')
  }

  static async fetchById(id: string): Promise<Cowork> {
    throw new Error('Service not implemented')
  }

  static async edit(id: string, data: Partial<Cowork>): Promise<Cowork> {
    throw new Error('Service not implemented')
  }

  static async delete(id: string): Promise<boolean> {
    throw new Error('Service not implemented')
  }
}
