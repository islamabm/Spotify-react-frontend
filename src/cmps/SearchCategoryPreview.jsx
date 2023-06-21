import React from 'react'

export function SearchCategoryPreview({ category }) {
  return (
    <article
      className="category-container"
      style={{ backgroundColor: category.color }}
    >
      <img src={category.img} alt={category.title} />
      <h2>{category.title}</h2>
    </article>
  )
}
