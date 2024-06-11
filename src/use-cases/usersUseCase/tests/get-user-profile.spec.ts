import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserNotFoundError } from '@/use-cases/usersUseCase/erros/user-not-found-error'
import { GetUserProfileUseCase } from '@/use-cases/usersUseCase/get-user-profile'
import { hash } from 'bcryptjs'
import { randomUUID } from 'crypto'
import { expect, describe, it, beforeEach } from 'vitest'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase

describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })

  it('should be able to get user profile', async () => {
    const createdUser = await usersRepository.create({
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

    const { user } = await sut.execute({
      id: createdUser.id,
    })

    expect(user.name).toEqual('Daniel')
  })

  it('should not be able to get user profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        id: 'non-existing-id',
      }),
    ).rejects.toBeInstanceOf(UserNotFoundError)
  })
})
