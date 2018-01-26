<template>
  <div class="customers container">
    <Alert v-if="alert"  v-bind:message="alert"></Alert>
    <h1 class="page-header">暖象科技</h1>
    <form v-on:submit="login(username,password,check_code,$event)">
      <div class="form-group">
        <label>用户名：</label>
        <input type="text" class="form-control" placeholder="username" value="admin" v-model="username">
      </div>
      <div class="form-group">
        <label>密码：</label>
        <input type="password" class="form-control" placeholder="password" value="admin1234" v-model="password">
      </div>
      <!--<div class="form-group float:left" >-->
        <!--<label>验证码：</label>-->
           <!--&lt;!&ndash;<input type="text" class="form-control" placeholder="验证码" v-model="check_code">&ndash;&gt;-->
        <!--<div @click="fetchCustomers">-->
          <!--<img v-bind:src="check_code_img.base64_img">-->
        <!--</div>-->
      <!--</div>-->
      <button type="submit" class="btn btn-primary">登录</button>
    </form>
  </div>
</template>

<script>
  import Alert from './Alert'
  export default {
    name: 'customers',
    data () {
      return {
        username:'',
        password:'',
        check_code:'',
        check_code_img:'',
        alert:"",
        filterInput:""
      }
    },
    methods:{
      checkLogin(){
        var token = localStorage.getItem("token");
        console.log(token)
        if (token !== null){
          this.$router.push({path:"/report"});
        }
      },
      fetchCustomers(){
        this.$http.get("http://auth.go-qxd.com/api/v1/user/check_code")
          .then(function(response){
            console.log(response)
            this.check_code_img = response.body;
          })
      },
      login(username,password,check_code,$event){
        if (!this.username || !this.password) {
          // console.log("请添加对应的信息!");
          this.alert = "请填写对应的信息!";
        }else {
          let updateCustomer = {
            username:username,
            password:password,
            check_code:check_code,
          };
          this.$http.get("http://auth.go-qxd.com/api/v1/user/admin_token?username=" + username +
            "&password=" + password + "&check_code=" +check_code)
            .then(function(response){
              console.log(response.body)
              var res = response.body;
              localStorage.setItem("token",res.token);
              localStorage.setItem("username",res.user_info.username);
              alert('登录成功!')
              this.$router.push({path:"/report",query:{alert:"登录成功!"}});
            })
            .catch(e => {
            // 打印一下错误
              console.log(e)
            var error = e.body;
              if (error.error_code){
                alert(error.msg)
              }
          })
          $event.preventDefault();
        }
        $event.preventDefault();
      },
    },
    created(){
      // if (this.$route.query.alert) {
      //   this.alert = this.$route.query.alert;
      // }
      this.fetchCustomers();
      this.checkLogin();
    },
    // updated(){
    //   this.fetchCustomers();
    // },
    components:{
      Alert
    }
  }
</script>

