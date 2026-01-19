import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'product',
    title: 'Produk',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Nama Produk',
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
            name: 'category',
            title: 'Category',
            type: 'string',
            options: {
                list: [
                    { title: 'Kredit', value: 'kredit' },
                    { title: 'Tabungan', value: 'tabungan' },
                    { title: 'Deposito', value: 'deposito' },
                ]
            }
        }),
        defineField({
            name: 'shortDescription',
            title: 'Deskripsi Singkat',
            type: 'text',
            rows: 3,
        }),
        defineField({
            name: 'description',
            title: 'Deskripsi Lengkap',
            type: 'array',
            of: [{ type: 'block' }]
        }),
        defineField({
            name: 'interestRate',
            title: 'Suku Bunga (Display)',
            type: 'string',
            description: 'Contoh: 0.75% flat / bulan'
        }),
        defineField({
            name: 'features',
            title: 'Keunggulan / Fitur',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'requirements',
            title: 'Syarat & Ketentuan',
            type: 'array',
            of: [{ type: 'string' }]
        }),
        defineField({
            name: 'icon',
            title: 'Icon Name (Lucide)',
            type: 'string',
            description: 'Nama icon dari Lucide React (e.g., Wallet, PiggyBank)'
        }),
    ],
})
