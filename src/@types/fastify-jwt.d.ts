import '@fastify/jwt'

declare module '@fastify/jwt' {
  export interface FastifyJWT {
    user: {
      role: 'ORG' | 'USER'
      sub: string
    }
  }
}
