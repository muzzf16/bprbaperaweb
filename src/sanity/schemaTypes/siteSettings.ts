import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'siteSettings',
    title: 'Site Settings',
    type: 'document',
    fields: [
        defineField({
            name: 'branding',
            title: 'Branding & UI',
            type: 'object',
            fields: [
                { name: 'siteTitle', type: 'string', title: 'Site Title', initialValue: 'BPR Bapera' },
                { name: 'logo', type: 'image', title: 'Logo', options: { hotspot: true } },
                {
                    name: 'primaryColor',
                    type: 'string',
                    title: 'Primary Color (Hex)',
                    description: 'Dominant color for buttons and headers (e.g. #1e3a8a)',
                    initialValue: '#1e3a8a',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false }).warning('Must be a valid hex color')
                },
                {
                    name: 'accentColor',
                    type: 'string',
                    title: 'Accent Color (Hex)',
                    description: 'Secondary color for highlights (e.g. #f59e0b)',
                    initialValue: '#f59e0b',
                    validation: Rule => Rule.regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, { name: 'hex color', invert: false }).warning('Must be a valid hex color')
                }
            ]
        }),
        defineField({
            name: 'mainMenu',
            title: 'Main Navigation Menu',
            type: 'array',
            of: [
                {
                    type: 'object',
                    title: 'Menu Item',
                    fields: [
                        { name: 'label', type: 'string', title: 'Label' },
                        { name: 'href', type: 'string', title: 'URL Path (e.g. /tentang-kami)' },
                        {
                            name: 'children',
                            type: 'array',
                            title: 'Submenu (Dropdown)',
                            of: [
                                {
                                    type: 'object',
                                    title: 'Sub Item',
                                    fields: [
                                        { name: 'label', type: 'string', title: 'Label' },
                                        { name: 'href', type: 'string', title: 'URL Path' }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }),
        defineField({
            name: 'contactInfo',
            title: 'Contact Information (Footer)',
            type: 'object',
            fields: [
                { name: 'address', type: 'text', title: 'Address', rows: 3 },
                { name: 'phone', type: 'string', title: 'Phone Number' },
                { name: 'email', type: 'string', title: 'Email Address' },
                { name: 'whatsapp', type: 'string', title: 'WhatsApp Number' },
            ]
        })
    ],
    preview: {
        prepare() {
            return { title: 'Global Site Settings' }
        }
    }
})
