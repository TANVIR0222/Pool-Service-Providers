# Pool Valet

A comprehensive React Native mobile application built with Expo that connects pool owners with professional pool service providers. The platform features dual user roles, real-time communication, quote management, payment processing, and subscription services.

##App Screenshots

<img width="309" height="669" alt="Screenshot 2025-12-23 at 9 52 15 PM" src="https://github.com/user-attachments/assets/a7c088ca-75a3-45bf-a3d8-fce3df98a92b" />

<img width="309" height="657" alt="Screenshot 2025-12-23 at 9 54 48 PM" src="https://github.com/user-attachments/assets/3bae4953-2119-435d-b26b-a8ce7091dfeb" />

<img width="309" height="657" alt="Screenshot 2025-12-23 at 9 52 53 PM" src="https://github.com/user-attachments/assets/cb333861-7220-487f-a1c3-7cea1c2e9075" />

<img width="309" height="657" alt="Screenshot 2025-12-23 at 9 53 10 PM" src="https://github.com/user-attachments/assets/587b7552-dcc2-4682-9f78-90ac8a7fa9f1" />

<img width="309" height="657" alt="Screenshot 2025-12-23 at 9 53 25 PM" src="https://github.com/user-attachments/assets/c20761be-4dd9-401e-a6fd-a4358f2e5030" />

<img width="309" height="657" alt="Screenshot 2025-12-23 at 9 54 39 PM" src="https://github.com/user-attachments/assets/5f7fb771-408a-4bd0-9f60-5ab3b4cd8fad" />



## 📱 Overview


Pool Valet streamlines the process of finding and hiring pool maintenance professionals. Home owners can request quotes for pool services, while business providers can browse opportunities, submit bids, and manage their service offerings. The app includes real-time chat, secure payments via Stripe, and a subscription-based business model.

## 🚀 Tech Stack

### Core Framework
- **React Native** (0.79.5) - Cross-platform mobile development
- **Expo** (~53.0.22) - Development platform and tooling
- **TypeScript** (~5.8.3) - Type-safe development
- **Expo Router** (~5.1.7) - File-based navigation

### State Management & Data
- **Redux Toolkit** (2.8.2) - State management
- **RTK Query** - API data fetching and caching
- **React Redux** (9.2.0) - React bindings for Redux
- **MMKV** (3.3.0) - Fast local storage

### Authentication & Backend
- **Firebase** (12.0.0) - Authentication and analytics
- **React Native Firebase** (23.1.0) - Native Firebase integration
- **Google Sign-In** (15.0.0) - OAuth authentication
- **Axios** (1.11.0) - HTTP client

### UI & Styling
- **NativeWind/Tailwind** (twrnc 4.9.0) - Utility-first styling
- **React Native Reanimated** (3.17.4) - Smooth animations
- **Expo Linear Gradient** (14.1.5) - Gradient components
- **Expo Blur** (14.1.5) - Blur effects
- **Bottom Sheet** (@gorhom/bottom-sheet 5.1.6) - Modal bottom sheets

### Payment Processing
- **Stripe React Native** (0.45.0) - Payment integration

### Communication
- **Socket.io Client** (4.8.1) - Real-time messaging
- **React Native Webview** (13.13.5) - In-app web content

### Forms & Validation
- **Formik** (2.4.6) - Form management
- **Yup** (1.6.1) - Schema validation

### Media & Assets
- **Expo Image** (2.4.1) - Optimized image component
- **Expo Image Picker** (16.1.4) - Camera and gallery access
- **Expo Video** (2.2.2) - Video playback
- **React Native SVG** (15.11.2) - SVG support

### Additional Libraries
- **React Native Toast Message** (2.3.3) - Toast notifications
- **React Native OTP Entry** (1.8.4) - OTP input component
- **React Native Render HTML** (6.3.4) - HTML rendering
- **use-debounce** (10.0.5) - Debounce hooks

## ✨ Key Features

### For Home Owners
- 🏊 **Service Discovery** - Browse and search pool service providers
- 💬 **Request Quotes** - Submit service requests and receive bids
- 📊 **Quote Comparison** - Compare multiple provider quotes
- 💳 **Secure Payments** - Pay for services via Stripe integration
- ⭐ **Review & Rating** - Rate and review service providers
- 📱 **Real-time Chat** - Communicate directly with providers
- 🔔 **Notifications** - Stay updated on quote status and messages
- 📋 **Service History** - Track completed and ongoing services

### For Business Providers
- 📈 **Quote Management** - Browse and bid on service requests
- 💰 **Earnings Tracking** - Monitor income and transactions
- 🎯 **Service Categories** - Manage service offerings
- 💬 **Client Communication** - Chat with potential clients
- 📊 **Subscription Plans** - Access premium features
- ⭐ **Reputation Building** - Collect reviews and ratings
- 🔔 **Bid Notifications** - Get notified of new opportunities
- 📱 **Account Management** - Update profile and business info

### Shared Features
- 🔐 **Secure Authentication** - Firebase Auth with Google Sign-In
- 🌓 **Dark Mode Support** - Automatic theme switching
- 📱 **Cross-platform** - iOS and Android support
- 🔄 **Real-time Updates** - Live data synchronization
- 🎨 **Modern UI/UX** - Clean, intuitive interface
- 🔒 **Data Security** - Encrypted communication and storage

## 📁 Project Structure

```
Pool-Mate-/
├── src/
│   ├── app/                          # Expo Router pages (file-based routing)
│   │   ├── auth/                     # Authentication screens
│   │   │   ├── index.tsx             # Login screen
│   │   │   ├── register.tsx          # Registration
│   │   │   ├── reset-password.tsx    # Password reset
│   │   │   ├── verify-otp.tsx        # OTP verification
│   │   │   └── create-new-password.tsx
│   │   ├── home-owner/               # Home owner app section
│   │   │   ├── (drawer)/             # Drawer navigation
│   │   │   │   └── (tabs)/           # Bottom tab navigation
│   │   │   │       ├── index.tsx     # Home screen
│   │   │   │       ├── add.tsx       # Create quote request
│   │   │   │       ├── view-quotes.tsx
│   │   │   │       └── chat.tsx
│   │   │   ├── badding/              # Bidding screens
│   │   │   ├── payment-procedure/    # Payment flow
│   │   │   ├── review-and-rating/    # Review system
│   │   │   └── search/               # Provider search
│   │   ├── business-provider/        # Business provider section
│   │   │   ├── (drawer)/             # Drawer navigation
│   │   │   │   └── (tabs)/           # Bottom tab navigation
│   │   │   │       ├── index.tsx     # Dashboard
│   │   │   │       ├── view-quotes.tsx
│   │   │   │       ├── earnings.tsx  # Earnings tracker
│   │   │   │       └── chat.tsx
│   │   │   ├── subscription-plan/    # Subscription management
│   │   │   ├── view-quotes/          # Quote details
│   │   │   └── transactions-view/    # Transaction history
│   │   ├── common/                   # Shared screens
│   │   ├── user-profile/             # Profile management
│   │   ├── welcome/                  # Onboarding
│   │   ├── index.tsx                 # App entry point
│   │   └── _layout.tsx               # Root layout
│   ├── components/                   # Reusable components
│   │   ├── ui/                       # UI components
│   │   ├── CustomHeader.tsx          # Navigation header
│   │   ├── CustomDrawerContent.tsx   # Drawer menu (home owner)
│   │   ├── BuCustomDrawerContent.tsx # Drawer menu (provider)
│   │   └── GlobalLoading.tsx         # Loading indicator
│   ├── redux/                        # State management
│   │   ├── api/                      # RTK Query API
│   │   │   └── baseApi.ts            # Base API configuration
│   │   ├── authApi/                  # Authentication API
│   │   ├── profileApi/               # User profile API
│   │   ├── my_quote_api/             # Quote management
│   │   ├── subscriptionApi/          # Subscription API
│   │   ├── chat/                     # Chat API
│   │   ├── message/                  # Messaging
│   │   ├── notifications/            # Notifications API
│   │   ├── reviewApi/                # Reviews API
│   │   └── redux-store/              # Redux store config
│   ├── lib/                          # Utilities and config
│   │   ├── firebase.config.ts        # Firebase configuration
│   │   ├── mmkvStorage.ts            # MMKV storage setup
│   │   ├── tailwind.js               # Tailwind config
│   │   ├── authType.ts               # Auth type definitions
│   │   ├── global-type.ts            # Global types
│   │   └── auth-validationSchema.ts  # Form validation schemas
│   ├── hooks/                        # Custom React hooks
│   ├── utils/                        # Helper functions
│   └── constants/                    # App constants
├── assets/                           # Static assets
│   ├── images/                       # Images and icons
│   └── fonts/                        # Custom fonts (Roboto family)
├── app.json                          # Expo configuration
├── package.json                      # Dependencies
├── tsconfig.json                     # TypeScript config
├── tailwind.config.js                # Tailwind configuration
├── .env.example                      # Environment variables template
└── google-services.json              # Firebase Android config
```

## 🛠️ Setup & Installation

### Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Expo CLI** (installed globally or via npx)
- **iOS Simulator** (Mac only) or **Android Studio** (for Android emulator)
- **Expo Go app** (optional, for physical device testing)

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Pool-Mate-
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   
   Create a `.env` file in the root directory by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
   
   Then edit `.env` and add your actual credentials (see Environment Variables section below).

4. **Configure Firebase**
   
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google Sign-In)
   - Download `google-services.json` (Android) and `GoogleService-Info.plist` (iOS)
   - Place them in the project root directory
   - Add your Firebase config values to `.env`

5. **Start the development server**
   ```bash
   npm start
   # or
   npx expo start
   ```

6. **Run on a platform**
   
   - **iOS Simulator**: Press `i` in the terminal
   - **Android Emulator**: Press `a` in the terminal
   - **Physical Device**: Scan the QR code with Expo Go app

## 🔐 Environment Variables

This project requires the following environment variables. Create a `.env` file in the root directory and populate it with your actual values.

### Firebase Configuration

Get these values from your [Firebase Console](https://console.firebase.google.com/) → Project Settings → General → Your apps → SDK setup and configuration.

```env
EXPO_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key_here
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### API Configuration

```env
EXPO_PUBLIC_API_BASE_URL=https://your-api-url.com/api
```

> **Note**: The `EXPO_PUBLIC_` prefix is required for Expo to expose these variables to your app. Variables without this prefix will not be accessible in your React Native code.

> **Security**: Never commit your `.env` file to version control. The `.gitignore` file is already configured to exclude it.

## 📜 Available Scripts

```bash
# Start the Expo development server
npm start

# Start with cache cleared
npm start -- --clear

# Run on iOS simulator
npm run ios

# Run on Android emulator
npm run android

# Run on web browser
npm run web

# Run linter
npm run lint

# Reset project (for development)
npm run reset-project
```

## 📸 Screenshots

_Screenshots will be added here to showcase the app's features and user interface._

## 🏗️ Build & Deployment

### Development Build

For development builds with custom native code:

```bash
# Install Expo CLI globally (if not already installed)
npm install -g expo-cli

# Create a development build
npx expo run:ios
# or
npx expo run:android
```

### Production Build

For production builds using EAS (Expo Application Services):

```bash
# Install EAS CLI
npm install -g eas-cli

# Configure EAS
eas build:configure

# Build for iOS
eas build --platform ios

# Build for Android
eas build --platform android

# Build for both platforms
eas build --platform all
```

## 👨‍💻 Author

**Pool Valet Development Team**

## 📄 License

This project is private and proprietary. All rights reserved.

---

**Note**: This is a production React Native application. Ensure all environment variables are properly configured before running the app. For any issues or questions, please contact the development team.
