import { type SchemaTypeDefinition } from 'sanity'
import article from './article'
import product from './product'
import team from './team'
import interestRate from './interestRate'
import home from './home'
import report from './report'
import siteSettings from './siteSettings'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [article, product, team, interestRate, home, report, siteSettings],
}
