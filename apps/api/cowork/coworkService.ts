import { PrismaClient, Cowork, Address } from '@prisma/client'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(
    basicData: Pick<Cowork, 'email' | 'phone'>,
    address: Omit<Address, 'id'>
  ): Promise<Cowork> {
    return
  }

  static async fetchAll(): Promise<Cowork[]> {
    return []
  }

  static async fetchById(id: string): Promise<Cowork> {
    return
  }

  static async edit(id: string, data: Partial<Cowork>): Promise<Cowork> {
    return
  }

  static async delete(id: string): Promise<boolean> {
    return false
  }
}
