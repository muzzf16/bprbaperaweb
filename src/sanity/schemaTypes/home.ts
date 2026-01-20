import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'home',
    title: 'Home Page',
    type: 'document',
    fields: [
        defineField({
            name: 'heroTitle',
            title: 'Hero Title',
            type: 'string',
            validation: Rule => Rule.required(),
            initialValue: 'Solusi Keuangan Terpercaya & Aman'
        }),
        defineField({
            name: 'heroSubtitle',
            title: 'Hero Subtitle',
            type: 'text',
            rows: 3,
            validation: Rule => Rule.required(),
            initialValue: 'Bersama BPR Bapera, wujudkan impian finansial Anda dengan layanan perbankan yang transparan dan diawasi OJK.'
        }),
        defineField({
            name: 'heroImage',
            title: 'Hero Background Image',
            type: 'image',
            options: { hotspot: true },
        }),
        defineField({
            name: 'features',
            title: 'Keunggulan (Why Choose Us)',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Feature',
                    fields: [
                        { name: 'title', type: 'string', title: 'Title' },
                        { name: 'description', type: 'text', title: 'Description', rows: 2 },
                        {
                            name: 'icon',
                            type: 'string',
                            title: 'Icon Name (Lucide)',
                            description: 'e.g. ShieldCheck, Landmark, Wallet, PiggyBank',
                            initialValue: 'ShieldCheck'
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'ctaSection',
            title: 'CTA Section (Bottom)',
            type: 'object',
            fields: [
                { name: 'title', type: 'string', title: 'Title' },
                { name: 'body', type: 'text', title: 'Body Text' },
            ]
        })
    ],
    preview: {
        prepare() {
            return { title: 'Home Page Settings' }
        }
    }
})
