<template>
  <div class="tTable container body-content">
    <div class="form-group">
      <div class="form-group">
        <div class="pager" id="pager">
          <label>共 {{totalCount}} 条数据 </label>
          每页显示数量：<span class="form-inline">
                        <select class="form-control" v-model="pageSize" v-on:change="showPage(pageCurrent,$event,true)" number>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </span>
          <span v-for="item in pageCount+1">
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(1,$event)" :class="{'disabled':fDisabled}">
                            首页
                        </span>
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(pageCurrent-1,$event)" :class="{'disabled':fDisabled}">
                            上一页
                        </span>
                        <span v-if="item==1" class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
                        <span v-if="item==1&&item<showPagesStart-1" class="btn btn-default disabled">
                            ...
                        </span>
                        <span v-if="item>1&&item<=pageCount-1&&item>=showPagesStart&&item<=showPageEnd&&item<=pageCount" class="btn btn-default" v-on:click="showPage(item,$event)">
                            {{item}}
                        </span>
                        <span v-if="item==pageCount&&item>showPageEnd+1" class="btn btn-default disabled">
                            ...
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(item,$event)"  >
                            {{item}}
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCurrent+1,$event)" :class="{'disabled':lDisabled}">
                            下一页
                        </span>
                        <span v-if="item==pageCount" class="btn btn-default" v-on:click="showPage(pageCount,$event)" :class="{'disabled':lDisabled}">
                            尾页
                        </span>
                    </span>
          <span>{{pageCurrent}}/{{pageCount}}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script >
  import Alert from './Alert'
  export default {

    data(){
      return{
        //为第一页或者最后一页时，首页，尾页不能点击
        fDisabled:false,
        lDisabled:false,
        //总项目数
        totalCount: 0,
        //分页数
        pageCount: 10,
        //当前页面
        pageCurrent: 1,
        //分页大小
        pageSize: 5,
        //显示分页按钮数
        showPages: 11,
        //开始显示的分页按钮
        showPagesStart: 1,
        //结束显示的分页按钮
        showPageEnd: 100,
        //分页数据
        arrayData: [],
      }
    },
    created(){
      this.fetchCustomers();
    },
    methods:{
      fetchCustomers(){
        this.$http.get("http://api.go-qxd.com/admin/community_list?page="+ this.pageCurrent + "&size=" + this.pageSize)
          .then(function(response){
            var res = response.body;
            this.totalCount = res.total
            this.pageCount = res.last_page
            this.pageSize = res.per_page
            this.arrayData = res.data
          })
      },
      updateCustomer(id,status,$event){
        let updateCustomer = {
          id:id,
          status:status,
        }
        this.$http.put("http://api.go-qxd.com/admin/community/status",updateCustomer)
          .then(function(response){
            this.$router.push({path:"/community_list?page="+ this.pageCurrent + "&size=" + this.pageSize});
            alert('ok!');
            $event.preventDefault();
          })
        $event.preventDefault();
      },
      showPage(pageIndex, $event, forceRefresh){

        if (pageIndex > 0) {
          if (pageIndex > this.pageCount) {
            pageIndex = this.pageCount;
          }
          //判断数据是否需要更新
          var currentPageCount = Math.ceil(this.totalCount / this.pageSize);
          if (currentPageCount != this.pageCount) {
            pageIndex = 1;
            this.pageCount = currentPageCount;
          }
          else if (this.pageCurrent == pageIndex && currentPageCount == this.pageCount && typeof (forceRefresh) == "undefined") {
            console.log("not refresh");
            return;
          }

          //处理分页点中样式
          var buttons = $("#pager").find("span");
          for (var i = 0; i < buttons.length; i++) {
            if (buttons.eq(i).html() != pageIndex) {
              buttons.eq(i).removeClass("active");
            }
            else {
              buttons.eq(i).addClass("active");
            }
          }

          //测试数据 随机生成的
          var newPageInfo = [];
          // var time=new Date();
          // for (var i = 0; i < this.pageSize; i++) {
          //   newPageInfo[newPageInfo.length] = {
          //     timestamp: time,
          //     count: (i + (pageIndex - 1) * 20)
          //   };
          // }
          this.pageCurrent = pageIndex;
          this.arrayData = newPageInfo;
          this.fetchCustomers();

          //如果当前页首页或者尾页，则上一页首页就不能点击，下一页尾页就不能点击
          if(this.pageCurrent===1){
            this.fDisabled=true;
            this.lDisabled=false;
          }else if(this.pageCurrent===this.pageCount){
            this.fDisabled=false;
            this.lDisabled=true;
          }else{
            this.fDisabled=false;
            this.lDisabled=false;
          }

          //计算分页按钮数据
          if (this.pageCount > this.showPages) {
            if (pageIndex <= (this.showPages - 1) / 2) {
              this.showPagesStart = 1;
              this.showPageEnd = this.showPages - 1;
            }
            else if (pageIndex >= this.pageCount - (this.showPages - 3) / 2) {
              this.showPagesStart = this.pageCount - this.showPages + 2;
              this.showPageEnd = this.pageCount;
            }
            else {
              this.showPagesStart = pageIndex - (this.showPages - 3) / 2;
              this.showPageEnd = pageIndex + (this.showPages - 3) / 2;
            }
          }
        }
      }
    },
    mounted(){
      this.showPage(this.pageCurrent, null, true);
    },
    computed:{
    }
  }
</script>
