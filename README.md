# FormGenie

FormGenie is a user-friendly web application designed to simplify the creation and management of online forms. Users can intuitively build custom forms for various purposes, such as surveys, feedback collection, registrations, and more, without needing any coding knowledge. The platform aims to streamline data collection and provide a seamless experience for both form creators and respondents.

## Core Technologies

FormGenie is built using a modern tech stack:

*   **React:** A declarative, efficient, and flexible JavaScript library for building user interfaces.
*   **Vite:** A next-generation frontend tooling that provides a faster and leaner development experience for modern web projects.
*   **Supabase:** An open-source Firebase alternative that provides a suite of tools to build backends quickly, including a PostgreSQL database, authentication, real-time subscriptions, and storage.
*   **Tailwind CSS:** A utility-first CSS framework packed with classes that can be composed to build any design, directly in your markup.

## Frontend Structure

The frontend of FormGenie is organized to promote modularity and maintainability. Here's an overview of key directories and components:

### Key Directories:

*   **`src/components`**: Contains reusable UI components that are used across different parts of the application. These are further categorized (e.g., `builder`, `dashboard`, `shared`, `ui`) for better organization.
    *   `shared/`: Components like Layout, Header, Footer used across multiple pages.
    *   `ui/`: Generic UI elements like buttons, inputs, cards, dialogs, etc., often styled with Tailwind CSS.
    *   `builder/`: Components specific to the form building interface.
    *   `dashboard/`: Components used in the user dashboard area.
*   **`src/pages`**: Contains top-level components that represent different pages of the application (e.g., `HomePage.jsx`, `LoginPage.jsx`, `DashboardPage.jsx`). Each page component typically assembles various smaller components.
*   **`src/lib`**: Includes helper functions, utility modules, and client-side configurations. For example, `supabaseClient.js` for Supabase interaction and `utils.js` for common utility functions.
*   **`src/contexts`**: Holds React Context API implementations for managing global state or providing data to component trees without prop drilling (e.g., `AuthContext.jsx` for authentication state).

### Core Components:

*   **`src/App.jsx`**: The main application component. It typically sets up the primary routing structure for the application, determining which page component to render based on the current URL.
*   **`src/components/shared/Layout.jsx`**: Provides a consistent structure for pages across the application. This usually includes common elements like a header, footer, and navigation, wrapping the content of each page.
*   **`src/components/shared/ProtectedRoute.jsx`**: A higher-order component or wrapper component used to protect certain routes. It checks if a user is authenticated (e.g., using `AuthContext`) before allowing access to a page; otherwise, it might redirect to a login page.

## Calculator Creation Process

FormGenie allows users to dynamically build custom calculators for various needs. The primary interface for this is the `src/pages/CalculatorBuilderPage.jsx`.

### Building a Calculator:

1.  **Navigate to the Builder:** Users access the calculator builder page to start creating or editing a calculator.
2.  **Name the Calculator:** Each calculator is given a unique name (e.g., "Cleaning Service Calculator").
3.  **Add Fields:** Users can add various types of fields to their calculator form. The `src/components/builder/FieldTypeSelector.jsx` component allows users to choose a field type, and `src/components/builder/FieldList.jsx` displays and manages the added fields.
4.  **Configure Fields:** Each added field can be customized with:
    *   **Label:** A display name for the field (e.g., "Room Size", "Service Type").
    *   **Placeholder:** Hint text for input fields (e.g., "Enter your name").
    *   **Options:** For fields like 'Dropdown Select' and 'Radio Buttons', users can define the available choices (e.g., for a "Service Type" dropdown, options could be "Basic Cleaning", "Deep Cleaning"). Each option typically has a value and a label.
    *   **Required Status:** Mark fields as mandatory.
5.  **Arrange Fields:** Users can reorder fields as needed using a drag-and-drop interface.
6.  **Save Calculator:** Once the structure is defined, the calculator configuration is saved.

### Field Types:

The builder supports a variety of field types, defined in `src/components/builder/fieldTypes.jsx`, including:

*   Text Input (`text`)
*   Text Area (`textarea`)
*   Number Input (`number`)
*   Dropdown Select (`select`)
*   Radio Buttons (`radio`)
*   Checkbox (`checkbox`)
*   Date Picker (`date`)
*   Switch Toggle (`switch`)

### Data Storage:

*   The configuration for each calculator (its name and the array of field objects with their settings) is stored in the Supabase database.
*   A dedicated table, named `calculators`, holds this information.
*   Each entry in the `calculators` table is linked to the user who created it via a `user_id` foreign key, ensuring users can only access and manage their own calculators.

## Dashboard Functionality

The user dashboard, primarily managed by `src/pages/DashboardPage.jsx`, serves as the central hub for users to manage their created calculators and view booking submissions.

### Managing Calculators:

*   **View Calculators:** Users can see a list of all calculators they have created. This is handled by the `src/components/dashboard/CalculatorList.jsx` component, which displays each calculator's name, creation date, and number of fields in a card format.
*   **Share Calculators:** A "Share Link" feature is available for each calculator. Clicking this button, typically found in `CalculatorList.jsx`, copies a unique booking URL (e.g., `https://[your-app-domain]/book/[calculatorId]`) to the clipboard, allowing users to easily share their calculators.
*   **Delete Calculators:** Users can delete calculators they no longer need. This action also removes associated booking submissions. A confirmation dialog is shown before deletion.

### Managing Submissions:

*   **View Submissions:** All booking submissions received through the user's calculators are listed, usually sorted by submission date. The `src/components/dashboard/SubmissionList.jsx` component renders these submissions, showing key details like the calculator used and a preview of the submitted data.
*   **Submission Details:** Users can click on a submission to view its full details in a modal window. The `src/components/dashboard/SubmissionDetailsModal.jsx` component is responsible for displaying all submitted data fields and their values in a readable format.
*   **Delete Submissions:** Individual submissions can be deleted if necessary, with a confirmation step.

### Data Fetching:

*   The dashboard fetches data directly from Supabase:
    *   Created calculators are retrieved from the `calculators` table (filtered by the authenticated user).
    *   Booking submissions are retrieved from the `submissions` table (also filtered based on the calculators owned by the user).
*   This data is then passed down to the respective components (`CalculatorList`, `SubmissionList`) for display and interaction.

## User Authentication

User authentication in FormGenie is handled by Supabase Auth, providing a secure and robust system for managing user accounts. The frontend integration is primarily managed through `src/contexts/AuthContext.jsx`.

### Core Authentication Flow:

1.  **Supabase Auth:** All user data, including credentials and session management, is handled by Supabase's built-in authentication service. This ensures that sensitive user information is managed securely.
2.  **`AuthContext.jsx`:** This React context is central to the authentication system.
    *   It initializes the Supabase client and interacts with `supabase.auth` for operations like sign-up (`signUp`), sign-in (`signInWithPassword`), and sign-out (`signOut`).
    *   It listens for authentication state changes (`onAuthStateChange`) to keep the application's `user` and `session` state synchronized with Supabase.
    *   It provides the current authentication status (`user`, `session`, `loading`) and auth functions (`signIn`, `signUp`, `signOut`) to components throughout the application via the `useAuth` hook.
3.  **Authentication UI (`src/pages/AuthPage.jsx`):**
    *   This page provides the user interface for both signing in and signing up. It typically features forms for email and password input.
    *   It utilizes the `signIn` and `signUp` functions from `AuthContext` to perform the respective actions with Supabase.
    *   Separate `src/pages/LoginPage.jsx` and `src/pages/SignUpPage.jsx` also exist, offering more direct routes or styled presentations for these actions.
4.  **Route Protection (`src/components/shared/ProtectedRoute.jsx`):**
    *   This component acts as a guard for routes that require authentication (e.g., dashboard, calculator builder).
    *   It checks the user's authentication status via `AuthContext`.
    *   If the user is not authenticated, they are redirected to the authentication page (e.g., `/auth`). The original intended destination is often stored so the user can be redirected back after a successful login.
    *   If the user is authenticated, `ProtectedRoute` renders the requested page component.
5.  **Sign-Out:** The `signOut` function in `AuthContext` clears the session in Supabase and updates the local application state, typically redirecting the user to a public page like the homepage.

## Booking Process (End-User Perspective)

This section outlines the journey of an end-user (customer) when they interact with a calculator form to make a booking.

1.  **Accessing the Calculator:**
    *   Customers receive a unique link (e.g., `https://[your-app-domain]/book/:calculatorId`) from the service provider (the FormGenie user).
    *   This link directly opens the specific calculator form designed by the provider.

2.  **Dynamic Form Interaction (`src/pages/BookingPage.jsx`):**
    *   The `BookingPage.jsx` component is responsible for rendering the booking experience.
    *   Upon loading, it fetches the configuration of the specific calculator (identified by `:calculatorId`) from the Supabase `calculators` table. This configuration includes the calculator's name, and all its fields (types, labels, options, required status, etc.).
    *   The page then dynamically renders the form based on this fetched configuration. For example, a field marked as 'select' in the calculator setup will appear as a dropdown menu, and a 'date' field will use a date picker.

3.  **Filling Out the Form:**
    *   The customer fills out the displayed form fields according to their requirements.
    *   Client-side validation (e.g., for required fields) provides immediate feedback.

4.  **Submitting the Booking:**
    *   Once the form is completed, the customer clicks the "Submit Booking" button.
    *   The collected data (`formData`) along with the `calculator_id` and `calculator_name` is compiled into a submission record.
    *   This record is then saved to the `submissions` table in the Supabase database.

5.  **Notification to Owner (Simulated):**
    *   Upon successful submission of the form data to the `submissions` table, the system attempts to notify the calculator owner.
    *   This is achieved by invoking a Supabase Edge Function named `send-booking-email`.
    *   This function is responsible for sending an email (simulated in the current implementation, particularly regarding dynamic owner email retrieval) to the service provider, informing them of the new booking submission and its details.
    *   The customer typically sees a success message indicating their booking has been sent.
