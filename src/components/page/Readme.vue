<template>
    <div>
        <!--<div class="crumbs">-->
            <!--<el-breadcrumb separator="/">-->
                <!--<el-breadcrumb-item><i class="el-icon-setting"></i> 报表</el-breadcrumb-item>-->
            <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="ms-doc">
            <h1 style="text-align: center;">数据概览</h1>
            <br/>
            <article>
                <h1>社群总数：
                    <label>{{report.community_count}}</label>
                </h1>
                <h1>用户总数：<label>{{report.user_count}}</label></h1>
                <h1>净收入：<label>{{report.income_expenses}}</label> 元</h1>
                <h1>计划总数：<label>{{report.act_plan_count}}</label></h1>
                <h1>课程总数：<label>{{report.course_count}}</label></h1>
                <h1>活动总数：<label>{{report.activity_count}}</label></h1>
                <div class="clear"></div>
            </article>
        </div>

    </div>
</template>

<script>
    export default {
        data () {
            return {
                report: ''
            }
        },
        methods:{

            fetchCustomers(){
                let that = this;
                this.$axios.get("http://api.go-qxd.com/admin/report")
                    .then(function(response){
                        console.log(response.data)
                        that.report = response.data;
                        console.log(this.report)
                    })
                    .catch(function (error) {
                        if (error.response) {
                            // 请求已发出，但服务器响应的状态码不在 2xx 范围内
                            console.log(error.response.data);
                            console.log(error.response.status);
                            console.log(error.response.headers);
                        } else {
                            // Something happened in setting up the request that triggered an Error
                            console.log('Error', error.message);
                        }
                        console.log(error.config);
                    });
            }
        },
        created(){
            this.fetchCustomers();
        }
    }
</script>

<style scoped>
    label {
        color: #00ff00
    }
    .clear{
        clear: both;
    }
    .ms-doc{
        width:100%;
        max-width: 980px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
    }
    .ms-doc article{
        padding: 45px;
        word-wrap: break-word;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-right-radius: 3px;
        border-bottom-left-radius: 3px;
    }
    .ms-doc article h1{
        font-size:32px;
        color: #333333;
        padding-bottom: 10px;
        margin-bottom: 15px;
        margin-left: 15px;
        padding-right: 15px;
        padding-left: 10px;
        border-bottom: 1px solid #ddd;
        background: grey;
        border-radius: 8px;
        float: left;
        width: 250px;
        height: 250px;
        line-height: 250px;
    }
</style>
