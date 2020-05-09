# FattInvoice Challenge

This demo was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

To run the app locally, you will need to install all the dependencies by running the command below in the project directory.

`npm install`

Run the command below in the project directory to start the app locally in development mode, it will automatically open [http://localhost:3000](http://localhost:3000) in your default browser:

`npm start`

## What does the app do?

The app allows users to create invoices from predefined items and customer information coming from the API.

## How the app works?

When the app loads it will make an API call to fetch the customers and items data. That data is then loaded into the corresponding dropdowns on the page. The user also have ability to load more customers or items by selecting the "Load More..." option on the corresponding dropdown. Selecting "Load More..." will trigger another API call to get the next set of either the customers or items and insert the result into the array of customers or items.

The user is expected to select a customer and have at least one line item in the invoice, otherwise it will not allow the user to submit the invoice. A user can select the item from a dropdown and it will auto populate the quantity to 1 and will show the price of the item. Once a user click the "Add Item" button the item will be added into a list of items (this is an array) which will also automatically compute for the item total and the invoice total. The user will also have the option to remove an item from the list by clicking the "Remove Item" next to the item name in the invoice table. It will also take into account if the added item is a discount item and subtract the correct amount to the invoice total.

## What's going on behind the scene when a user adds an item to the invoice?

The moment a user selects an item from the items dropdown, it initializes the default amount to 1 and at the same time displays the unit price on the corresponding field. It does that by using the item ID as a key to grab the item's data from the list of items that was created when the page initially loaded, it then grabs the price then sets that as a temporary item price together with the item ID and quantity. Once the user clicks the "Add Item" button it creates an item object and pushes that object into the line items array and then clears out the temporary item details. It repeats this process for other items that are added to the invoice. When a user submits the invoice the line items array gets added to the API payload together with the customer ID, the computed subtotal and total amounts before it send a POST request to the API endpoint.

## Tools Used

Create React App\
ReactJS\
NodeJS\
Axios\
Node Sass\
Bootstrap 4\
ReactStrap\
React-Router-Dom