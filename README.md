# Backend API for E-commerce System
This backend is built with NestJS and Prisma ORM and provides CRUD and status management endpoints for products, categories, cart items, and carts.

## **How to Run**
1. Start the NestJS server (development mode)
```bash
pnpm start:dev
```

This command runs your backend API locally in development mode with hot reload.

2. Open Prisma Studio (Database UI)
```bash
pnpx prisma studio
```
Prisma Studio provides a GUI to view and edit your database records directly.

Functionalities
This backend provides the following core functionalities via RESTful API endpoints:

Manage Products: create, read, update, delete, and search by name or category.

Manage Categories: create, read, update, delete.

Manage Cart Items: add items to cart, read, update, delete.

Manage Carts: create carts, update carts, delete carts, and manage cart status (active, checkout, completed, abandoned).

## API Usage Guide
### Product Endpoints **(/product)**

**POST /product/create**
Create a new product.
Body: { name, price, description, categoryId, ... }

**GET /product/information**
Get all products.

**GET /product/information/:id**
Get a product by ID.

**PATCH /product/update/:id**
Update a product by ID.
Body: fields to update.

**DELETE /product/remove/:id**
Delete a product by ID.

**GET /product/search?name=&categoryId=&categoryName=**
Search products by name and/or category ID or category name (query parameters optional).

### Category Endpoints **(/category)**

**POST /category/create**
Create a new category.
Body: { name, description, ... }

**GET /category/all**
Get all categories.

**GET /category/:id**
Get category by ID.

**PATCH /category/update/:id**
Update category by ID.
Body: fields to update.

**DELETE /category/remove/:id**
Delete category by ID.

### Cart Item Endpoints **(/cart-item)**

**POST /cart-item/create**
Add item to cart.
Body: { cartId, productId, quantity, ... }

**GET /cart-item/all**
Get all cart items.

**GET /cart-item/get/:id**
Get cart item by ID.

**PATCH /cart-item/update/:id**
Update cart item by ID.
Body: fields to update.

**DELETE /cart-item/delete/:id**
Delete cart item by ID.

### Cart Endpoints **(/cart)**

**POST /cart/create**
Create a new cart.
Body: { userId, status, ... }

**GET /cart/all**
Get all carts.

**GET /cart/get/:id**
Get cart by ID.

**PATCH /cart/:id**
Update cart by ID.
Body: fields to update.

**DELETE /cart/delete/:id**
Delete cart by ID.

**POST /cart/checkout/:id**
Change cart status to CHECKOUT.

**POST /cart/complete/:id**
Change cart status to COMPLETED.

**POST /cart/abandon/:id**
Change cart status to ABANDONED.

## **Notes**
All IDs in URL parameters are numbers.

Use JSON format in request bodies for create/update.

Successful responses have a consistent structure with statusCode, message, and data.

Errors return appropriate HTTP status codes and error messages.

Use Prisma Studio to view and manipulate data directly in the database during development.
