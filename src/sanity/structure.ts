import type { StructureResolver } from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Singleton Site Settings
      S.listItem()
        .title('Site Settings (Tampilan & Menu)')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
        ),
      // Singleton Home Page Item
      S.listItem()
        .title('Home Page')
        .id('home')
        .child(
          S.document()
            .schemaType('home')
            .documentId('home')
        ),
      S.divider(),

      // Regular Document Types (filter out singletons)
      ...S.documentTypeListItems().filter(
        (listItem) => !['home', 'siteSettings'].includes(listItem.getId() as string)
      ),
    ])
