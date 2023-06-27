import { SearchCategoryPreview } from './SearchCategoryPreview'
export function SearchCategorieList({ categories }) {
  return (
    <section className="search-station-list">
      {categories[0]?.map((category, idx) => {
        return <SearchCategoryPreview key={idx} category={category} />
      })}
    </section>
  )
}
