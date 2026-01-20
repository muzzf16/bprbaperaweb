import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'interestRate',
    title: 'Suku Bunga',
    type: 'document',
    fields: [
        defineField({
            name: 'productName',
            title: 'Nama Produk',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'rate',
            title: 'Suku Bunga (Display)',
            type: 'string',
            description: 'Contoh: 5.0% p.a',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'minBalance',
            title: 'Minimal Penempatan',
            type: 'string',
            description: 'Contoh: Rp 1.000.000'
        }),
        defineField({
            name: 'period',
            title: 'Jangka Waktu (Khusus Deposito)',
            type: 'string',
            description: 'Contoh: 1 Bulan'
        }),
        defineField({
            name: 'type',
            title: 'Jenis Produk',
            type: 'string',
            options: {
                list: [
                    { title: 'Tabungan', value: 'tabungan' },
                    { title: 'Deposito', value: 'deposito' }
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'order',
            title: 'Urutan Tampil',
            type: 'number',
            initialValue: 0
        }),
    ],
    preview: {
        select: {
            title: 'productName',
            subtitle: 'rate',
        }
    }
})
