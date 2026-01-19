import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'article',
    title: 'Artikel',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Artikel',
            type: 'string',
        }),
        defineField({
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96,
            },
        }),
        defineField({
            name: 'author',
            title: 'Author',
            type: 'string',
            initialValue: 'BPR Bapera Team'
        }),
        defineField({
            name: 'mainImage',
            title: 'Gambar Utama',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'category',
            title: 'Kategori',
            type: 'string',
            options: {
                list: [
                    { title: 'Edukasi Keuangan', value: 'Edukasi Keuangan' },
                    { title: 'Berita', value: 'Berita' },
                    { title: 'Promo', value: 'Promo' },
                ]
            }
        }),
        defineField({
            name: 'publishedAt',
            title: 'Tanggal Publish',
            type: 'datetime',
        }),
        defineField({
            name: 'excerpt',
            title: 'Cuplikan (Excerpt)',
            type: 'text',
            rows: 4
        }),
        defineField({
            name: 'body',
            title: 'Isi Artikel',
            type: 'array',
            of: [
                {
                    type: 'block',
                },
                {
                    type: 'image',
                    options: { hotspot: true },
                },
            ],
        }),
    ],
})
