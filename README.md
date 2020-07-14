# Supermarket kata

## Project design

For this task, I decided to follow a data-driven design approach. The bulk of the complexity lies in the discount calculations, I therefore adopted a variation of the Strategy pattern, whereby the type of `offer` retrieved from the backend system dictates how discounts should be applied. 

The benefit of this approach is that when a new offer is made available, we simply need to write a new implementation strategy to accomodate it, and could even provide an administrative UI view for admins to create new types of offers. For example, if a new type of offer was made that offered a flat rate discount if the cart spend exceeded £x, then this would simply require a new offer type to be created in the backend, and a new discount strategy written up.

I make some assumptions about how this offer data is retrieved; since each offer has a slightly different schema, I'm assuming that we have some kind of intermediary aggregation layer (perhaps GraphQL) that retrieves the various offer types.

## Modifications to be made in a production system

It's important to note that I would make the following changes if this were a production system, namely:

- Discounts would ultimately be applied and validated in the backend
- Stock checks before adding items to the cart
- I'd consider using GraphQL for aggregation of offer data and Apollo for cached queries
- More page tests - particularly around edge cases (like what to do if the discounts applied cause the total to drop below £0)

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
