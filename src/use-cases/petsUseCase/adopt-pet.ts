import { PetsRepository } from '@/repositories/Pets-repository'

export class AdoptPetUseCase {
  // eslint-disable-next-line prettier/prettier
  constructor(private petRepository: PetsRepository) { }

  async execute(id: string, userId: string): Promise<void> {
    await this.petRepository.adopt(id, userId)
  }
}
