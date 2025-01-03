import { defineQuery } from "next-sanity";

export const POSTS_QUERY =
  defineQuery(`*[_type == "post" && defined(slug.current)][0...50]{
    _id,
    title,
    slug,
    mainImage,
    publishedAt,
    _updatedAt,
    featured,
    "categories": categories[]->title, 
    author->{name},
}`);

export const POST_QUERY =
  defineQuery(`*[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    body,
    mainImage,
    publishedAt,
    _updatedAt,
    featured,
    "categories": categories[]->title, 
    author->{name},
    seo,
}`);
