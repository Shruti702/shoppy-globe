ShoppyGlobe E-commerce Application:

Project Overview:
ShoppyGlobe is a React-based e-commerce application that allows users to browse products, view details, add items to a cart, and complete a dummy checkout process. The project demonstrates proficiency in React, Redux Toolkit, React Router (Data Router), and Performance Optimization techniques.

Git Repository Link:
https://github.com/Shruti702/shoppy-globe.git

🚀 Features:
1. Product Management:
Product List:** Fetches data from `https://dummyjson.com/products` using a custom hook (`useFetchProducts`).
Search Functionality:** Filters products in real-time using Redux state.
Product Details:** Dynamic routing (`/product/:id`) fetches and displays individual product information.

2. Shopping Cart (Redux Powered):
Add to Cart: Users can add items from the list or detail view.
Quantity Controls: Increase/decrease quantity (minimum 1) or remove items completely.
Cart Icon: The Header displays a real-time count of items in the cart.

3. Checkout System:
Validation: Custom form validation ensures the credit card number is exactly 16 digits.
Error Handling: Visual feedback (red borders/text) for invalid inputs.
Success Flow: Clears the cart and redirects to Home upon successful "order placement."

4. Technical Implementations (Project Requirements):
Routing: Utilizes `createBrowserRouter` (Data APIs) instead of legacy `BrowserRouter`.
Performance: Implements **Code Splitting** using `React.lazy()` and `Suspense` for all main routes.
Lazy Loading: Images use `loading="lazy"` for better performance.
State Management: Fully typed Redux Toolkit implementation (`cartSlice`, `productSlice`).
Error Handling: Dedicated 404 Page and error boundaries for failed API requests.


🛠️ Technology Stack:
Framework: React (Vite)
State Management: Redux Toolkit
Routing: React Router DOM (v6.4+)
Styling: CSS3 (Variables, Responsive Grid, Flexbox)
API: DummyJSON


## ⚙️ Installation & Setup:

1.  Clone the repository:
    git clone [INSERT YOUR GITHUB LINK HERE]

2.  Navigate to the project directory:
    cd shoppy-globe

3.  Install dependencies:
    npm install

4. Install React-Redux and Redux Toolkit:
   npm install @reduxjs/toolkit react-redux

5.  Run the development server:
    npm run dev