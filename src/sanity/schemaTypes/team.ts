import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'team',
    title: 'Tim Manajemen',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Nama Lengkap',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'position',
            title: 'Jabatan',
            type: 'string',
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'role',
            title: 'Role',
            type: 'string',
            options: {
                list: [
                    { title: 'Komisaris', value: 'commissioner' },
                    { title: 'Direksi', value: 'director' }
                ],
                layout: 'radio'
            },
            validation: Rule => Rule.required()
        }),
        defineField({
            name: 'image',
            title: 'Foto',
            type: 'image',
            options: {
                hotspot: true,
            },
        }),
        defineField({
            name: 'bio',
            title: 'Bio Singkat',
            type: 'text',
            rows: 3
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
            title: 'name',
            subtitle: 'position',
            media: 'image'
        }
    }
})
