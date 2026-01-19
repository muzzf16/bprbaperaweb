/**
 * This route is responsible for the built-in authoring environment using Sanity Studio.
 * All routes under /studio will be handled by this file using Next.js Rewrites & Layouts.
 * For more information, visit https://github.com/sanity-io/next-sanity
 */

import { NextStudio } from 'next-sanity/studio'
import config from '../../../../sanity.config'

export default function StudioPage() {
    return <NextStudio config={config} />
}
