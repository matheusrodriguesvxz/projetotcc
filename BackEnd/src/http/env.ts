import z from 'zod'


// criando um objeto envSchema onde necessariamente ela vai precisar
//receber uma url do tipo string
const envSchema = z.object({
   DATABASE_URL:z.string().url()
})

//verifica se a variavel de ambiente segue o formato do objeto
export const env = envSchema.parse(process.env);