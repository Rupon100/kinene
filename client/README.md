# TO-DO

// req to admin is ultimate sending email to admin

- customer profile, 

---- add to cart

---- show everything in cart list like

---- add if have discount

---- checkOut button

--- dashboard for order history and white list

--- button for delete from white list and cart individually 

- seller nothing just show information of his business and image and shop location

---- then move to post product and everything

---- and show those in seller dashboard

---- add delete edit option in stock or not 

---- ordered for specific product and amount + can set coupon for product

---- show every product list and progress

---- if product is out of stock show out Of stock

---- make pagination for table(dashboard) + product 



## too many api request(network) when enter in profile 

# revision all at first



##### profile dash cart
1.  Profile vs Dashboard vs Cart
Profile
- Personal info: name, email, avatar

- Role & upgrade requests

- Account settings: password, notifications

- Basically, what the user “is”

- option for upgrade information like location, image URL, user name

2. Dashboard

- Role-specific actions:

    - Customer: order history, wishlist, saved addresses

    - Seller: products, sales, analytics

    - Admin: manage users, products, orders, reports

- This is where the “work” happens, depending on role

- Can live under /dashboard route:

   /dashboard/customer
   /dashboard/seller
   /dashboard/admin

3. Cart

- Should be completely separate from Profile or Dashboard

- Can live under /cart route

- Only concerned with shopping workflow

- Components: list of items, quantities, checkout, payment

Example:
    /cart               -> main cart page
    /cart/checkout      -> checkout page
    /cart/order-success -> order confirmation








- see the requirement pdf + design link

- framer motion

- add more technology that i can


#### - for google login or signin use passport.js + Oath2

----------------------------------------

- On profile page, add a “Request Seller Account” button.

- When clicked, notify admin → admin approves → update role in database.

- You can also display “Seller Pending” status on the dashboard.

- send email for buying && request to seller
 

------------------------------------------


#### requirement - https://www.notion.so/PROJECT-AI-GEMINI-258e4350166c80dd9db2eb63814e7128


### Deployment & DevOps
Docker basics (containerize frontend + backend)
GitHub Actions (CI/CD automation)
Cloud hosting:
- Frontend → Vercel / Netlify
- Backend → Render / Railway / AWS / Heroku


### Testing
- Unit testing → Jest
- API testing → Supertest with Express
- E2E testing → Cypress / Playwright