import { UsersRepository } from '@/repositories/users-repository'
import { UserAlreadyExistsError } from '@/use-cases/usersUseCase/erros/user-already-exists-error'
import { Role, User } from '@prisma/client'
import { hash } from 'bcryptjs'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
  role?: Role
  latitude: number
  longitude: number
  whatsAppNumber: string
}

interface RegisterUseCaseResponse {
  user: User
}

export class RegisterUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    name,
    email,
    password,
    latitude,
    longitude,
    role,
    whatsAppNumber,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const userWithSameEmail = await this.usersRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const passwordHash = await hash(password, 6)

    const user = await this.usersRepository.create({
      name,
      email,
      passwordHash,
      latitude,
      longitude,
      whatsAppNumber,
      role,
    })

    return {
      user,
    }
  }
}
