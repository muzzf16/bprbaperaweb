import { groq } from "next-sanity";
import { client } from "./sanity";
// Product type may be needed for mapping Sanity types to internal types in the future

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
      features,
      requirements
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
// Query to get team members
export const getTeamMembers = async () => {
  return client.fetch(
    groq`*[_type == "team"] | order(order asc) {
      _id,
      name,
      position,
      role,
      bio,
      "imageUrl": image.asset->url
    }`
  );
};

// Query to get interest rates
export const getInterestRates = async () => {
  return client.fetch(
    groq`*[_type == "interestRate"] | order(order asc) {
      _id,
      productName,
      rate,
      period,
      type,
      minBalance
    }`
  );
};

// Query to get Homepage Singleton
export const getHomepageData = async () => {
  return client.fetch(
    groq`*[_type == "home"][0]{
      heroTitle,
      heroSubtitle,
      "heroImageUrl": heroImage.asset->url,
      features[]{
        title,
        description,
        icon
      },
      ctaSection
    }`
  );
};

// Query to get Reports by category
export const getReports = async (category: string) => {
  return client.fetch(
    groq`*[_type == "report" && category == $category] | order(year desc, period desc) {
      _id,
      title,
      category,
      year,
      period,
      "fileUrl": file.asset->url
    }`,
    { category }
  );
};

// Query to get Site Settings
export const getSiteSettings = async () => {
  return client.fetch(
    groq`*[_type == "siteSettings"][0]{
      branding,
      mainMenu,
      contactInfo
    }`
  );
};
