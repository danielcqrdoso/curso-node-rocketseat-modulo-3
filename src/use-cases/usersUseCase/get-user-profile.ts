import { UsersRepository } from '@/repositories/users-repository'
import { User } from '@prisma/client'
import { UserNotFoundError } from '@/use-cases/usersUseCase/erros/user-not-found-error'

interface GetUserProfileUseCaseRequest {
  id: string
}

interface GetUserProfileUseCaseResponse {
  user: User
}

export class GetUserProfileUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private usersRepository: UsersRepository) { }

  async execute({
    id,
  }: GetUserProfileUseCaseRequest): Promise<GetUserProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(id)

    if (!user) {
      throw new UserNotFoundError()
    }

    return {
      user,
    }
  }
}
