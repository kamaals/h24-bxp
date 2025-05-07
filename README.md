
## Architecture
 - Next.js as fullstack framework.
 - Tailwind CSS for styling.
 - PostgreSQL as database.
 - Drizzle ORM for database interaction.
 - BetterAuth for authentication.
 - zod for types.
 - RHF for form handling.
 - UI components from Radix UI & Tanstack with ShadCN (headless UI)
   - Instead of Ant Design, I use Radix UI & Tanstack with ShadCN for UI components.
   - Reason is shadcn is more flexible and customizable than Ant Design.
   - Also, shadcn is more lightweight than Ant Design.
   - Ant Design is a bit heavy and not very flexible.
   - I personally prefer shadcn over Ant Design.
 - Features: authentication, authorization, and login/logout
   - BetterAuth for authentication
   - Using next middleware for authorization
 - Features: Category tree structure in UI
    - Using custom component to show user to tree structure
- Features: Category tree structure in DB
    - Using the same schema as parent category or null for root level category
- Features: Product category list in the UI
    - Use tan-stack table to display the list and for the pagination function
- Features: Product category list in the API/State
    - Use rtk query to fetch data from the API with pagination & category filter
- Features: Filter and Sort product list in the UI
    - Use tan-stack table coupled with rtk query to fetch data from the API?
    - Or directly let API to handle the filter and sort?
- Features: Show details of the product in the UI
    - use nextjs slot routing and interceptor to display the product details with fallback
- Features: Show the last modified product on top of the page.
    - Use DB trigger to update the last modified date? or use postgres realtime?

- TDD 
    - Use jest and react testing library for unit test
    - Istanbul for coverage
    - Supertest for API testing
 
- Deployment
  - Use Vercel for deployment
  - DB is NeonDB
  - Use Github actions for CI/CD

- Local development
  - Use Docker for local development
  - Use postgres docker container
  - Use docker-compose to run the app and db


## TODO
 - [x] Initialized
 - [x] Setup ShadCN
 - [x] Setup Tailwind CSS
 - [x] Add Redux toolkit
   - [] Add rtk query
 - [ ] Add BetterAuth
 - [ ] Add DB
   - [ ] Add NeonDB
   - [ ] Add Drizzle ORM
   - [ ] Configure .env 
 - [ ] Dockerize
   - [ ] Add postgres docker container
   - [ ] Add docker-compose
 - [x] Setup Test
   - [x] Add jest
   - [x] Add React testing library
   - [] Add supertest
   - [x] Add Istanbul
   - [x] Add coverage
   - [] Add Husky precommit
  
