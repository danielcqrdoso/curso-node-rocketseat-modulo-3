import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from '@/use-cases/usersUseCase/authenticate'
import { InvalidCredentialsError } from '@/use-cases/usersUseCase/erros/invalid-credentials-error'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })

  it('should be able to authenticate', async () => {
    await usersRepository.create({
      id: randomUUID(),
      name: 'Daniel',
      email: 'daniel@gmail.com',
      passwordHash: await hash('123456', 6),
      role: 'USER',
      latitude: -22.893569,
      longitude: -43.1802419,
      whatsAppNumber: '24988188',
      createdAt: new Date(),
    })

    const { user } = await sut.execute({
      email: 'daniel@gmail.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'johndoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      id: randomUUID(),
      name: 'Daniel',
      email: 'daniel@gmail.com',
      passwordHash: await hash('123456', 6),
      role: 'USER',
      latitude: -22.8935692,
      longitude: -43.1802419,
      whatsAppNumber: '24988188',
      createdAt: new Date(),
    })

    await expect(() =>
      sut.execute({
        email: 'daniel@gmail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
