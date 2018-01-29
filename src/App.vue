<template>
  <div id="app">
    <nav class="navbar navbar-default">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </button>
          <a class="navbar-brand" href="http://www.nuan-x.com/">暖象科技</a>
        </div>
        <div id="navbar" class="collapse navbar-collapse">
          <ul class="nav navbar-nav">
            <li ><router-link to="/">登录</router-link></li>

            <li><router-link to="/report">数据概览</router-link></li>
            <li><router-link to="/customer">数据展示</router-link></li>
            <li><router-link to="/community_list">行动社管理</router-link></li>
            <li><router-link to="/user_list">用户管理</router-link></li>
            <!--<li><router-link to="/page">分页管理</router-link></li>-->
            <li><router-link to="/test_demo">测试样例</router-link></li>
          </ul>
        </div><!--/.nav-collapse -->
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
  import Hello from './components/Hello'

  export default {
    name: 'app',
    components: {
      Hello
    }
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
  </style>
