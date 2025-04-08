<template>
    <div>Đang xác thực, vui lòng chờ...</div>
  </template>
  
  <script>
  import axios from 'axios';
  import { useUserStore } from '@/stores/userStore';
  
  export default {
    async mounted() {
      const userStore = useUserStore();
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      
      if (!token) {
        console.error('❌ Không tìm thấy token trong URL');
        return this.$router.push('/');  // Quay về trang chủ nếu không có token
      }
      
      // Lưu token vào localStorage và thêm vào header của Axios
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  
      try {
        // Gửi yêu cầu tới API để lấy thông tin người dùng
        const res = await axios.get('http://localhost:8080/api/me');
        const user = res.data.userRoles;
  
        // Lưu thông tin người dùng và token vào store
        userStore.setUser(user, token);
  
        // Chuyển hướng tới trang chính sau khi đăng nhập thành công
        this.$router.push('/home');
      } catch (err) {
        if (err.response && err.response.status === 401) {
          console.error('❌ Token không hợp lệ hoặc đã hết hạn');
        } else {
          console.error('❌ Lỗi khi gọi API /api/me:', err);
        }
  
        // Quay lại trang chủ nếu có lỗi xảy ra
        this.$router.push('/');
      }
    }
  };
  </script>
  