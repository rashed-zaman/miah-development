export function departmentExists(catalog, department) {
  return Boolean(catalog && catalog[department])
}

export function categoryExists(catalog, department, category) {
  return Boolean(catalog && catalog[department] && catalog[department].categories && catalog[department].categories[category])
}

export function subcategoryExists(catalog, department, category, subcategory) {
  return Boolean(
    catalog &&
      catalog[department] &&
      catalog[department].categories &&
      catalog[department].categories[category] &&
      catalog[department].categories[category].subcategories &&
      catalog[department].categories[category].subcategories[subcategory]
  )
}
