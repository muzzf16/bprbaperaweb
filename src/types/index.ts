/**
 * Central barrel export for all type definitions
 * Import types from this file: import { Product, Article } from '@/types'
 */

// Product types
export type {
    Product,
    ProductCategory,
    ProductFilter,
} from './product.types';

// Article types
export type {
    Article,
    ArticleCategory,
    ArticleFilter,
} from './article.types';

// Common types
export type {
    NavLink,
    ContactInfo,
    ApiResponse,
    PaginationMeta,
    PaginatedResponse,
} from './common.types';

// Component types
export type {
    BreadcrumbItem,
    PageHeaderProps,
    CardProductProps,
    ButtonProps,
    InputProps,
    SelectProps,
} from './component.types';

