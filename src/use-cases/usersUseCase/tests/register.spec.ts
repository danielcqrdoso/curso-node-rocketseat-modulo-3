import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '@/use-cases/usersUseCase/erros/user-already-exists-error'
import { compare } from 'bcryptjs'
import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from '@/use-cases/usersUseCase/register'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })

  it('should to register', async () => {
    await expect(() =>
      sut.execute({
        name: 'Daniel',
        email: 'daniel@gmail.com',
        password: '123456',
        role: 'USER',
        latitude: -22.8935692,
        longitude: -43.1802419,
        whatsAppNumber: '24988188',
      }),
    ).not.toBeNull
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: 'Daniel',
      email: 'daniel@gmail.com',
      password: '123456',
      role: 'USER',
      latitude: -22.8935692,
      longitude: -43.1802419,
      whatsAppNumber: '24988188',
    })

    const isPasswordCorrectlyHashed = await compare('123456', user.passwordHash)

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    await sut.execute({
      name: 'Daniel',
      email: 'daniel@gmail.com',
      password: '123456',
      role: 'USER',
      latitude: -22.8935692,
      longitude: -43.1802419,
      whatsAppNumber: '24988188',
    })

    await expect(() =>
      sut.execute({
        name: 'Daniel',
        email: 'daniel@gmail.com',
        password: '123456',
        role: 'USER',
        latitude: -22.8935692,
        longitude: -43.1802419,
        whatsAppNumber: '24988188',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
