declare namespace Express {
  export interface Request {
    user?: {
      role: 'user' | 'admin' | 'superadmin'
      id: string
    }
  }
}
