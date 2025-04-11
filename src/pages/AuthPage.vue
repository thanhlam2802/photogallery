<template>
  <div class="min-h-[80vh] flex items-center justify-center px-4 py-12">
    <div class="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
      <div class="text-center">
        <h1 class="text-3xl font-bold">{{ isLogin ? 'Sign in to your account' : 'Create your account' }}</h1>
        <p class="mt-2 text-gray-600">
          {{ isLogin ? 'Welcome back! Please enter your details.' : 'Join Pixelshare to upload and share your photos.' }}
        </p>
      </div>
      <div class="flex justify-center space-x-4">
        <button
          :class="['px-4 py-2 text-sm font-medium rounded-lg', isLogin ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
          @click="isLogin = true"
        >
          Sign In
        </button>
        <button
          :class="['px-4 py-2 text-sm font-medium rounded-lg', !isLogin ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200']"
          @click="isLogin = false"
        >
          Sign Up
        </button>
      </div>

      <!-- Google Button -->
          <div class="flex justify-center space-x-4">
      <button @click="loginWithGoogle" class="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-lg w-full hover:bg-gray-50">
        <svg class="w-5 h-5 mr-2" viewBox="0 0 24 24">
          <!-- Google icon -->
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
        <span>Continue with Google</span>
      </button>
    </div>

      
      <div class="flex items-center justify-center">
        <div class="border-t border-gray-200 flex-grow"></div>
        <span class="px-4 text-gray-500 text-sm">or</span>
        <div class="border-t border-gray-200 flex-grow"></div>
      </div>

      <form class="space-y-6" @submit.prevent="handleSubmit">
        <div v-if="!isLogin">
          <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
          <input
            id="name"
            name="name"
            type="text"
            v-model="name"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your name"
          />
        </div>
        <div>
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Enter your email"
          />
        </div>
        <div>
          <label for="password" class="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div class="relative">
            <input
              id="password"
              name="password"
              :type="showPassword ? 'text' : 'password'"
              v-model="password"
              required
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              :placeholder="isLogin ? 'Enter your password' : 'Create a password'"
            />
            <button
              type="button"
              class="absolute inset-y-0 right-0 pr-3 flex items-center"
              @click="togglePasswordVisibility"
            >
              <span v-if="showPassword">👁️</span>
              <span v-else>👁️‍🗨️</span>
            </button>
          </div>
        </div>
        
        <div v-if="isLogin" class="flex items-center justify-between">
          <div class="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              class="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label for="remember-me" class="ml-2 block text-sm text-gray-700">Remember me</label>
          </div>
          <div class="text-sm">
            <a href="#" class="font-medium text-blue-600 hover:text-blue-500">Forgot your password?</a>
          </div>
        </div>

        <div v-if="errorMessage" class="text-red-500 text-sm text-center">
          {{ errorMessage }}
        </div>

        <div>
          <button
            type="submit"
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {{ isLogin ? 'Sign In' : 'Sign Up' }}
          </button>
        </div>
      </form>

      <p class="text-center text-sm text-gray-600">
        <span v-if="isLogin">
          Don't have an account? 
          <button
            class="font-medium text-blue-600 hover:text-blue-500"
            @click="isLogin = false"
          >
            Sign up
          </button>
        </span>
        <span v-else>
          Already have an account? 
          <button
            class="font-medium text-blue-600 hover:text-blue-500"
            @click="isLogin = true"
          >
            Sign in
          </button>
        </span>
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { useUserStore } from '@/stores/userStore'
export default {
  props: {
    user: Object, 
  },
  data() {
    return {
      isLogin: true,
      showPassword: false,
      email: '',
      password: '',
      name: '',
      token: '',
      errorMessage: '', 
    };
  },
  methods: {
    loginWithGoogle() {
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    },
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    async handleSubmit() {
  const userStore = useUserStore();  
  const userCredentials = {
    username: this.email,
    password: this.password,
  };

  try {
    let response;

    // Kiểm tra xem người dùng có đang đăng nhập bằng Google không
    if (this.isLogin ) 
    
      response = await axios.post('http://localhost:8080/api/login', userCredentials);
  

    const token = response.data.token;
    const user = response.data.userRoles;

    // Lưu thông tin người dùng và token vào store
    this.errorMessage = '';
    
    
        
    if (user[0]?.role?.roleID === "GUEST" || user[0]?.role?.roleID === "USER") {
      this.$router.push('/home');
    } else {
      
      console.warn("User role not authorized:", userRole);
      this.errorMessage = 'khong cos quyen ';
    }
    userStore.setUser(user, token);
    localStorage.setItem('isLoggedIn', true);


  } catch (error) {
    console.error('Login failed:', error);
    if (error.response && error.response.status === 401) {
      this.errorMessage = 'Invalid username or password';
    } else {
      this.errorMessage = 'An error occurred. Please try again.';
    }
  }
}

  },
};
</script>
