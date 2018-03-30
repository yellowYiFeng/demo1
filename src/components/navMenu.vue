<template>
   <div class="demo-block demo-box  demo-menu menu-box">
    <div class="nav-tab">
        <a href="javascript:;">
            <span class="ico-sale" v-bind:class="{active: activeTab == 1}" @click="changeTab(1)">
                <i class=" iconfont  icon-diannao"></i>
            </span>
        </a>
        <a href="javascript:;">
            <span class="ico-sale" v-bind:class="{active: activeTab == 2}" @click="changeTab(2)">
                <i class=" iconfont  icon-diannao"></i>
            </span>
        </a>
        <a href="javascript:;">
            <span class="ico-sale" v-bind:class="{active: activeTab == 3}" @click="changeTab(3)">
                <i class=" iconfont  icon-diannao"></i>
            </span>
        </a>
        <a href="javascript:;">
            <span class="ico-sale" v-bind:class="{active: activeTab == 4}" @click="changeTab(4)">
                <i class=" iconfont  icon-diannao"></i>
            </span>
        </a>
    </div>
    <el-row class="tac nav-menu-list menu-height">
            <el-col class="menu-height">
                <el-menu :default-active="$route.path" router="router" class="el-menu-vertical-demo menu-height"  background-color="#2d3037" text-color="#fff"
                active-text-color="#ffd04b">
                    <div v-show="activeTab == 1">
                        <el-menu-item index="/clue">
                            <i class="icon iconfont icon-xianlu"></i>
                            <span slot="title">我的线索</span>
                        </el-menu-item>
                        <el-menu-item index="/business">
                            <i class="icon iconfont icon-jihui"></i>
                            <span slot="title">我的商机</span>
                        </el-menu-item>
                        <el-menu-item index="/customer">
                            <i class="icon iconfont icon-kehu"></i>
                            <span slot="title">我的客户</span>
                        </el-menu-item>
                    </div>
                    
                    
                </el-menu>
            </el-col>
    </el-row>
   </div>
</template>

<style scoped>

    a {text-decoration: none;}
    .nav-tab{width:200px;padding: 0 20px;height:44px;background-color: #2d3037;border-bottom: 2px solid #22262a;}
    .nav-tab a{width:25%;color:#2d3037;float:left;line-height:44px;text-align: center;}
    .nav-tab a .ico-sale{display: block;height: 44px;margin:0 6px;border-bottom: 2px solid #22262a;}
    .nav-tab a .ico-sale.active{border-bottom-color: #fc923f;}
    .nav-tab i{font-size: 20px; color: #637381; }
    .nav-tab i:hover{color: #fff;}
    .nav-tab a .ico-sale.active i{color: #fff;}
    .menu-box{position: absolute;top: 0; bottom: 0;}
    .menu-height{position: absolute;top:0;bottom:0;}
    .nav-menu-list{top:46px;}
    .demo-box.demo-menu .el-menu-demo{padding-left:55px}
    .demo-box.demo-menu .el-menu-vertical-demo:not(.el-menu--collapse){width:240px;min-height:400px}
    .demo-box.demo-menu .line{height:1px;background-color:#e0e6ed;margin:35px -24px}
    .demo-box.demo-menu h5{font-size:14px;color:#8492a6;margin-top:10px}
    .demo-box.demo-menu .tac{text-align:left}
    .demo-box.demo-menu .tac .el-menu-vertical-demo{display:inline-block;text-align:left}
    .icon{
        vertical-align: middle;
        margin-right:5px;
        width: 24px;
        text-align: center;
    }
</style>

<script>
    export default {
        data() {
            return {
                activeTab: 1
            };
        },
        methods: {
            changeTab(index){
                this.activeTab = index;
            }
        }
    }
</script>