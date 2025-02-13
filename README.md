# 🏢 Smart Hostel Management System

A modern, mobile-first hostel management solution built with Expo and React Native. Streamline your hostel operations with an intuitive interface and powerful features.

![Hostel Management System]

## ✨ Features

### 👥 For Administrators
- **Dashboard Analytics**: Real-time insights into occupancy rates, revenue, and pending payments
- **Room Management**: Easily manage room assignments, maintenance, and availability
- **Student Records**: Comprehensive student database with quick search and filters
- **Payment Tracking**: Process payments and generate professional receipts instantly
- **Booking Management**: Handle room bookings and check-ins efficiently

### 🎓 For Students
- **Room Booking**: Browse and book available rooms seamlessly
- **Digital Payments**: Secure payment processing with instant receipts
- **Profile Management**: Update personal information and view booking history
- **Real-time Notifications**: Stay updated about payments, maintenance, and announcements

## 🚀 Tech Stack

- **Frontend**: React Native + Expo
- **Backend**: Supabase
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL (via Supabase)
- **File Storage**: Supabase Storage
- **Notifications**: Expo Notifications

## 🛠️ Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Olimibrave01/hostel-management.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials to `.env.local`

4. Start the development server:
   ```bash
   npx expo start
   ```

## 📱 Development

- iOS: `i` - requires XCode
- Android: `a` - requires Android Studio
- Web: `w` - opens in your default browser

## 🔐 Environment Variables

Create a `.env.local` file with the following:

```env
EXPO_PUBLIC_SUPABASE_URL=your_supabase_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Expo](https://expo.dev) for the amazing development platform
- [Supabase](https://supabase.com) for the powerful backend services
- [React Navigation](https://reactnavigation.org) for seamless navigation



Made with ❤️ by [Brave Olimi]
