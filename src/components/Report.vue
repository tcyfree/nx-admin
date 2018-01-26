<template>
  <div class="customers container">
    <Alert v-if="alert"  v-bind:message="alert"></Alert>
    <h1 class="page-header">数据概览</h1>

    <br>
    <table class="table table-striped">
      <thead>
      <tr>
        <th  style="font-size: x-large">行动社总数</th>
        <th  style="font-size: x-large">用户总数</th>
        <th  style="font-size: x-large">净收入总数</th>
      </tr>
      </thead>

      <tbody>
      <tr style="width:200px; height:100px;">
        <td style="font-size: xx-large">{{customers.community_count}}</td>
        <td style="font-size: xx-large">{{customers.user_count}}</td>
        <td style="font-size: xx-large">{{customers.income_expenses}}</td>
      </tr>
      </tbody>
      <thead>
      <tr>
        <th  style="font-size: x-large">行动计划总数</th>
        <th  style="font-size: x-large">互动课程总数</th>
        <th  style="font-size: x-large">社群活动总数</th>
      </tr>
      </thead>

      <tbody>
      <tr style="width:200px; height:100px;">
        <td  style="font-size: xx-large">{{customers.act_plan_count}}</td>
        <td  style="font-size: xx-large">{{customers.course_count}}</td>
        <td  style="font-size: xx-large">{{customers.activity_count}}</td>
      </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
  import Alert from './Alert'
  export default {
    name: 'customers',
    data () {
      return {
        customers:[],
        alert:"",
        filterInput:""
      }
    },
    methods:{
      checkLogin(){
        var token = localStorage.getItem("token");
        console.log(token)
        if (token === null){
          this.$router.push({path:"/"});
        }
      },
      fetchCustomers(){
        this.$http.get("http://api.go-qxd.com/admin/report")
          .then(function(response){
            console.log(response.body);
            this.customers = response.body;
          })
          .catch(e => {
            // 打印一下错误
            console.log(e)
            var error = e.body;
            if (error.error_code){
              alert(error.msg)
            }
          })
      }
    },
    created(){
      this.fetchCustomers();
      this.checkLogin();
    },
    components:{
      Alert
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
