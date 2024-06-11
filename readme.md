Rotas:</br>
  users:
    post /users - rota para criar a conta sendo user ou org:
        name: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        role: z.enum(['USER', 'ORG']).optional(),
        latitude: z.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
        whatsAppNumber: z.string(),
    
    post /login - Rota para fazer o login:
        email: z.string().email(),
        password: z.string().min(6),

    patch /token/refresh - Rota para refazer o login

    get /profile - Rota para ver o perfil

  pets:
    post /pets - Rota para criar pets, só org pode usa-lá:
        name: z.string(),
        color: z.string().nullable(),
        isFemale: z.boolean(),
        race: z.string(),
        size: z.string(),
        cep: z.string(),
        street: z.string(),
        neighborhood: z.string(),
        city: z.string(),
        state: z.string(),
        userId: z.string().uuid(),
        latitude: z.number().refine((value) => {
          return Math.abs(value) <= 90
        }),
        longitude: z.number().refine((value) => {
          return Math.abs(value) <= 180
        }),
    
  post /pets/adopt - Rota para adotar um pet, só user pode usar, o userId vai pela requisição, só é necessário passar o id do pet:
        id: z.string(),
  
  post /pets/search - Rota para pesquisar o pet:
        city: z.string().optional(),
        currentPetPage: z.coerce.number().min(0),
        latitudeUser: z
          .number()
          .refine((value) => {
            return Math.abs(value) <= 90
          })
          .optional(),
        longitudeUser: z
          .number()
          .refine((value) => {
            return Math.abs(value) <= 180
          })
          .optional(),
