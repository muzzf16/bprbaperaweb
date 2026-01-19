import { type SchemaTypeDefinition } from 'sanity'
import product from './product'
import article from './article'

export const schema: { types: SchemaTypeDefinition[] } = {
    types: [product, article],
}
