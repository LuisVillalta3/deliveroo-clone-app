export const getFeaturedRows = `
  *[_type == "featured"] {
    ...,
    restaurants[]->{
      ...,
      dishes[]->
    }
  }`;
