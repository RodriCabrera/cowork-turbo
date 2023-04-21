import { PrismaClient, Cowork, Address } from '@prisma/client'

export default class CoworkService {
  private static _client = new PrismaClient()

  static async createCowork(
    basicData: Pick<Cowork, 'email' | 'phone'>,
    address: Omit<Address, 'id'>
  ): Promise<Cowork> {}

  static async fetchAll(): Promise<Cowork[]> {}

  static async fetchById(id: string): Promise<Cowork> {}

  static async edit(id: string, data: Partial<Cowork>): Promise<Cowork> {}

  static async delete(id: string): Promise<boolean> {}
}
