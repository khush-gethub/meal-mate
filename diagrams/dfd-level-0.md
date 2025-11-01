```mermaid
graph TD
    subgraph "DFD Level 0: Context Diagram"
        User --"Search Queries, Login, Favorites"--> RecipeSystem(Recipe Management System)
        Admin --"User/Recipe Management"--> RecipeSystem
        RecipeSystem --"Recipe Data, UI"--> User
        RecipeSystem --"Management Data"--> Admin
    end
```