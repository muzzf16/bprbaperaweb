import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'report',
    title: 'Reports (Laporan)',
    type: 'document',
    fields: [
        defineField({
            name: 'title',
            title: 'Judul Laporan',
            type: 'string',
            validation: Rule => Rule.required(),
            description: 'Contoh: Laporan Keuangan Publikasi Maret 2024'
        }),
        defineField({
            name: 'category',
            title: 'Kategori Laporan',
            type: 'string',
            options: {
                list: [
                    { title: 'Laporan Keuangan', value: 'financial' },
                    { title: 'Laporan GCG', value: 'gcg' },
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'year',
            title: 'Tahun',
            type: 'string', // Use string for year to allow flexibility or simple dropdown if needed. String is fine.
            options: {
                list: [
                    ...Array.from({ length: 10 }, (_, i) => ({ title: String(new Date().getFullYear() - i), value: String(new Date().getFullYear() - i) }))
                ]
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'period',
            title: 'Periode (Khusus Laporan Keuangan)',
            type: 'string',
            options: {
                list: [
                    { title: 'Triwulan 1 (Maret)', value: 'Triwulan 1' },
                    { title: 'Triwulan 2 (Juni)', value: 'Triwulan 2' },
                    { title: 'Triwulan 3 (September)', value: 'Triwulan 3' },
                    { title: 'Triwulan 4 (Desember)', value: 'Triwulan 4' },
                    { title: 'Tahunan', value: 'Tahunan' },
                ]
            },
            hidden: ({ document }) => document?.category !== 'financial'
        }),
        defineField({
            name: 'file',
            title: 'File Dokumen (PDF)',
            type: 'file',
            options: {
                accept: '.pdf'
            },
            validation: Rule => Rule.required()
        })
    ],
    preview: {
        select: {
            title: 'title',
            category: 'category',
            year: 'year'
        },
        prepare(selection) {
            const { title, category, year } = selection
            const catTitle = category === 'financial' ? 'Keuangan' : 'GCG'
            return {
                title: title,
                subtitle: `${catTitle} - ${year}`
            }
        }
    }
})
