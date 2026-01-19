import { groq } from "next-sanity";
import { client } from "./sanity";
import { Product } from "@/types/product.types"; // We might need to map Sanity types to our internal types

// Query to get all products by category
export const getProductsByCategory = async (category: string) => {
    return client.fetch(
        groq`*[_type == "product" && category == $category] {
      _id,
      title,
      "slug": slug.current,
      shortDescription,
      interestRate,
      icon,
      features
    }`,
        { category }
    );
};

// Query to get single product by slug
export const getProductBySlug = async (slug: string) => {
    return client.fetch(
        groq`*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      category,
      shortDescription,
      description,
      interestRate,
      features,
      requirements,
      icon
    }`,
        { slug }
    );
};

// Query to get all articles
export const getArticles = async () => {
    return client.fetch(
        groq`*[_type == "article"] | order(publishedAt desc) {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      category,
      publishedAt,
      "imageUrl": featuredImage.asset->url
    }`
    );
};

// Query to get single article by slug
export const getArticleBySlug = async (slug: string) => {
    return client.fetch(
        groq`*[_type == "article" && slug.current == $slug][0] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      content,
      category,
      publishedAt,
      "imageUrl": featuredImage.asset->url,
      author->{name, "imageUrl": image.asset->url}
    }`,
        { slug }
    );
};
