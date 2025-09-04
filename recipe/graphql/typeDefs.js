export const typeDefs = /* GraphQL */ `
  # Enum för olika kosttyper (t.ex. VEGAN, VEGETARIAN, osv.)
  enum Diet {
    # ...
  }

  # En ingrediens i ett recept
  type Ingredient {
    
  }

  # Ett recept
  # Diet ska hänvisa till enumen Diet
  type Recipe {
    id: ID!
    # totalTimeMin: Int!   # beräknat fält som vi måste lösa i resolvers.js
  }

  type Query {
    # Lista alla recept, valfritt filter
    recipes(title: String, diet: Diet, maxTimeMin: Int, limit: Int): [Recipe!]!

    # Hämta ett specifikt recept
    recipe(id: ID!): Recipe
  }

  # Input-typer för mutationer
  input IngredientInput {
    # ...
  }

  input CreateRecipeInput {
    # ...
  }

  input UpdateRecipeInput {
    # ...
  }

  type Mutation {
    createRecipe
    updateRecipe
    deleteRecipe

    addIngredient
    updateIngredient
    removeIngredient
  }
`;
