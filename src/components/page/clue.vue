<template>
    <div>
        <div v-show="!isEdit">
            <nav-menu></nav-menu>  
            <div class="main">
                <div class="dt-caption">
                    <h2 class="caption-title">线索列表</h2>
                </div>
                <div class="dt-term-batch">
                    <div class="dt-term-filter" v-show="selectNum == 0"> 
                        <span class="dt-filter-title">场景</span>
                        <div class="dt-filter-dropdown">
                            <el-dropdown trigger="click" placement="top-start"  @command="handleCommand">
                                <span class="el-dropdown-link">
                                    {{clueListName}}
                                    <i class="el-icon-arrow-down el-icon--right"></i>
                                </span>
                                <el-dropdown-menu class="filter-dropdown" slot="dropdown">
                                    <el-dropdown-item command="我的线索">我的线索</el-dropdown-item>
                                    <el-dropdown-item command="我团队的线索">我团队的线索</el-dropdown-item>
                                    <el-dropdown-item command="我管理的线索">我管理的线索</el-dropdown-item>
                                </el-dropdown-menu>
                            </el-dropdown>
                        </div>
                        <span class="line"></span>
                        <div class="filterBtn" @click="filterDialog = true;">
                            <i class="icon iconfont icon-filter"></i>
                            筛选
                        </div>
                    </div>
                    <div class="dt-batch-opera" v-show="selectNum != 0">
                        <span class="batch-opera-title">已选择 <em>{{selectNum}}</em> 条</span>
                        <el-button size="mini" @click="$store.commit('openSaleDialog');">转出</el-button>
                        <el-button size="mini">回池</el-button>
                        <i class="icon iconfont  icon-guanbi close" @click="toggleSelection()"></i>
                    </div>
                </div>
                <div class="dt-batch-filterInfo">
                    <span class="filter-box" v-for="filter in filterList">
                        {{filter.class}}-{{filter.filter}}{{filter.subFilter}}
                        <em class="del" @click="deleteFilter(filter.key,filter.subKey)">×</em>
                    </span>
                </div>
                <div class="dt-main">
                    <el-table class="dt-table" v-loading="loading" ref="multipleTable" :data="tableData" tooltip-effect="dark" style="width: 100%" @selection-change="handleSelectionChange" @row-click="rowClick">
                        <el-table-column type="selection" width="55" :selectable="canSelection">
                        </el-table-column>
                        <el-table-column label="状态" >
                          <template slot-scope="scope">
                              <i class="round" v-bind:class="scope.row.status|clueStatus().color"></i>
                              {{ scope.row.status | clueStatus().status}}
                          </template>
                        </el-table-column>
                        <el-table-column prop="customName" label="公司名称">  
                        </el-table-column>
                        <el-table-column prop="userName" label="负责人">
                        </el-table-column>
                        <el-table-column prop="name" label="联系人">
                        </el-table-column>
                        <el-table-column prop="position" label="职务">
                        </el-table-column>
                        <el-table-column prop="productTypeName" label="意向产品">
                        </el-table-column>
                        <el-table-column  label="来源">
                            <template slot-scope="scope">
                                  {{ scope.row.origin | getClueSource}}
                            </template>
                        </el-table-column>
                        <el-table-column label="最后跟进">
                          <template slot-scope="scope">
                          {{ scope.row.lastLogTime  | formatDate("yyyy-MM-dd hh : mm") }}
                          </template>
                        </el-table-column>
                    </el-table>
                    <div class="block pagination">
                        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,50]" :page-size="10"
                          layout="total, sizes, prev, pager, next, jumper"
                          :total="count">
                        </el-pagination>
                    </div>
                </div>
            </div>
            <div class="crm-slide crm-detail" v-show="isDetail">
                <div class="crm-detail-header">
                    <img src="../../assets/img/a1.jpg" alt="" class="detail-header-img">
                    <div class="detail-header-content">
                        <span class="detail-header-title">线索详情</span>
                        <span class="detail-header-name">{{clueDetail.business.customName}}</span>
                    </div>
                    <div class="detail-header-opera">
                        <i class="icon iconfont  icon-shuaxin" @click="initDetail(clueDetail.business.pid)"></i>
                        <i class="icon iconfont  icon-guanbi" @click="closeSilde"></i>
                    </div>
                    <div class="detail-header-button">
                        <el-button type="primary" @click="editClueDetail">编辑</el-button>
                        <el-dropdown trigger="click" @command="clueOperate">
                          <el-button>
                            更多
                            <i class="el-icon-arrow-down el-icon--right"></i>
                          </el-button>
                          <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item command="a">标为重点</el-dropdown-item>
                            <el-dropdown-item command="unUse">置为无效</el-dropdown-item>
                            <el-dropdown-item command="backToPool">回池</el-dropdown-item>
                            <el-dropdown-item command="a">转出</el-dropdown-item>
                            <el-dropdown-item command="a">转换</el-dropdown-item>
                          </el-dropdown-menu>
                        </el-dropdown>  
                    </div>
                    
                </div>
                <div class="crm-detail-content">
                    <el-tabs v-model="activeTab">
                        <el-tab-pane label="线索信息" name="first">
                            <div class="tab-pane-tit">
                                <h3>线索信息</h3> 
                            </div>
                            <div class="tab-pane-con">
                                <el-collapse v-model="activeCollapse">
                                    <el-collapse-item  name="1">
                                        <template slot="title">
                                            <span class="collapse-title">客户需求</span> 
                                        </template>
                                        <div>
                                            <div class="item">
                                                <div class="item-allLine">
                                                    <div class="item-tit">企业名称</div>
                                                    <div class="item-con">{{clueDetail.business.customName}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-allLine">
                                                    <div class="item-tit">意向产品</div>
                                                    <div class="item-con">{{clueDetail.business.productTypeName}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-allLine">
                                                    <div class="item-tit">需求备注</div>
                                                    <div class="item-con">{{clueDetail.business.requirement || '--'}}</div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item name="2">
                                        <template slot="title">
                                            <span class="collapse-title">企业信息</span> 
                                        </template>
                                        <div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">企业名称</div>
                                                    <div class="item-con">{{clueDetail.business.customName}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">所属行业</div>
                                                    <div class="item-con">
                                                    {{clueDetail.business.oneIndustry}}
                                                    {{clueDetail.business.twoIndustry}}
                                                    {{clueDetail.business.threeIndustry}}
                                                    {{clueDetail.business.fourIndustry}}
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">人员规模</div>
                                                    <div class="item-con">{{clueDetail.business.personSize || '--'}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">经营规模</div>
                                                    <div class="item-con">{{clueDetail.business.scaleOperation || '--'}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">公司电话</div>
                                                    <div class="item-con">{{clueDetail.business.phone || '--'}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">官方网站</div>
                                                    <div class="item-con">{{clueDetail.business.website || '--'}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">公司地址</div>
                                                    <div class="item-con">{{clueDetail.business.address || '--'}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">所在地区</div>
                                                    <div class="item-con">
                                                    {{clueDetail.business.province || '--'}}
                                                    {{clueDetail.business.city}}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                    <el-collapse-item name="3">
                                         <template slot="title">
                                            <span class="collapse-title">其他信息</span> 
                                        </template>
                                        <div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">获取方式</div>
                                                    <div class="item-con">{{clueDetail.response.origin | getMethod}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">获取时间</div>
                                                    <div class="item-con">{{clueDetail.response.createTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">线索池名称</div>
                                                    <div class="item-con">{{clueDetail.business.seaName || '--'}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">线索来源</div>
                                                    <div class="item-con">
                                                    {{clueDetail.business.sourceName}}
                                                    {{clueDetail.business.sourceSubName}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">来源说明</div>
                                                    <div class="item-con">{{clueDetail.business.sourceDes || '--'}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">创建人</div>
                                                    <div class="item-con">{{clueDetail.business.creatorName || '--'}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">创建时间</div>
                                                    <div class="item-con">{{clueDetail.business.createTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
                                                </div>
                                                <div class="item-r">
                                                    <div class="item-tit">最后更新</div>
                                                    <div class="item-con">{{clueDetail.business.updateTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
                                                </div>
                                            </div>
                                            <div class="item">
                                                <div class="item-l">
                                                    <div class="item-tit">过期时间</div>
                                                    <div class="item-con">{{clueDetail.business.outTime | formatDate('yyyy-MM-dd hh:mm')}}</div>
                                                </div>
                                                
                                            </div>
                                        </div>
                                    </el-collapse-item>
                                </el-collapse>
                            </div>
                            
                        </el-tab-pane>
                        <el-tab-pane label="线索跟进" name="second">
                             <div class="tab-pane-tit">
                                <h3>线索跟进</h3>
                                <div class="tab-pane-tit-btn">
                                    <el-button type="text">跟进</el-button>
                                </div>
                            </div>
                        </el-tab-pane>
                        <el-tab-pane label="联系人" name="third">
                             <div class="tab-pane-tit">
                                <h3>联系人</h3> 
                                <div class="tab-pane-tit-btn">
                                    <el-button type="text" @click="$store.commit('openAddContactDialog')">新建</el-button>
                                </div>
                            </div>
                            <div class="tab-pane-con">
                                <div class="contacts-list" v-for="contact in contactList">
                                    <div>联系人 - {{contact.businesscontact.name}}</div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">姓名</div>
                                            <div class="item-con">{{contact.businesscontact.name}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">性别</div>
                                            <div class="item-con">{{contact.businesscontact.sex | getSex}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">所在部门</div>
                                            <div class="item-con">{{contact.businesscontact.department || '--'}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">职务头衔</div>
                                            <div class="item-con">{{contact.businesscontact.position || '--'}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">决策链角色</div>
                                            <div class="item-con">{{contact.businesscontact.type || '--'}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">汇报对象</div>
                                            <div class="item-con">{{contact.businesscontact.reportObject || '--'}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">联系电话</div>
                                            <div class="item-con">{{contact.businesscontact.mobile || '--'}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">微信账号</div>
                                            <div class="item-con">{{contact.businesscontact.wechatAccount || '--'}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">电子邮件</div>
                                            <div class="item-con">{{contact.businesscontact.email || '--'}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">收货地址</div>
                                            <div class="item-con">{{contact.businesscontact.address || '--'}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">个人特点</div>
                                            <div class="item-con">{{contact.businesscontact.personality || '--'}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">关注问题</div>
                                            <div class="item-con">{{contact.businesscontact.problem || '--'}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-l">
                                            <div class="item-tit">备注信息</div>
                                            <div class="item-con">{{contact.businesscontact.ramark || '--'}}</div>
                                        </div>
                                        <div class="item-r">
                                            <div class="item-tit">创建时间</div>
                                            <div class="item-con">{{contact.businesscontact.createTime | formatDate('yyyy-MM-dd')}}</div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-allLine">
                                            <div class="item-tit">标签</div>
                                            <div class="item-con"></div>
                                        </div>
                                    </div>
                                    <div class="item">
                                        <div class="item-allLine">
                                            <div class="item-tit">相关附件</div>
                                            <div class="item-con"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </el-tab-pane>
                    </el-tabs>

                </div>
            </div>
            <sale-table v-on:childSureEvent="sureSelect"></sale-table>
            <add-contact v-on:addContactSure="addContact"></add-contact>
        </div>
        <div class="edit" v-show="isEdit">
            <div class="edit-header">
                <h4>编辑</h4>
                <div class="button-group-fr">
                    <el-button type="primary">保存</el-button>
                    <el-button @click="cancelEdit">取消</el-button>
                </div>
            </div>
            <div class="edit-content">
                <el-form :model="clueDetailForm"  ref="clueDetailForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="所属行业" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="人员规模" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="经营规模" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司电话" prop="phone">
                        <el-input type="text" v-model="clueDetailForm.phone" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="官方网站" prop="website">
                        <el-input type="text" v-model="clueDetailForm.website" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="公司地址" prop="website">
                        <el-input type="text" v-model="clueDetailForm.website" auto-complete="off"></el-input>
                    </el-form-item>   
                     <el-form-item label="所在地区" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="" prop="pass">
                        <el-select v-model="clueDetailForm.industry" placeholder="请选择">
                            <el-option v-for="item in industry" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </div>
        </div>    
        <el-dialog title="筛选" :visible.sync="filterDialog" width="30%" >
            <el-form :inline="true" :model="filterForm" class="demo-form-inline" label-position="top">
                <el-form-item label="筛选条件">
                    <el-col :span="8">
                        <el-form-item prop="filterClass">
                            <el-select v-model="filterForm.filterClass" placeholder="全部" @change="changeFilterClass">
                                <el-option key="address" label="客户区域" value="address"></el-option>
                                <el-option key="product" label="意向产品" value="product"></el-option>
                                <el-option key="clueStatus" label="线索状态" value="clueStatus"></el-option>
                                <el-option key="clueSource" label="线索来源" value="clueSource"></el-option>
                                <el-option key="label" label="标签" value="label"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8">
                        <el-form-item prop="parentFilter">
                            <el-select v-model="filterForm.parentFilter" placeholder="全部" @change="changeParentFilter">
                                <el-option v-for="item in filterParent" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="8" v-show="hasSubFilter">
                        <el-form-item prop="subFilter">
                            <el-select v-model="filterForm.subFilter" placeholder="全部">
                                <el-option v-for="item in filterSon" :key="item.value" :label="item.label" :value="item.value"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>

                </el-form-item>
                  
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="filterDialog = false">取 消</el-button>
            <el-button type="primary" @click="filterSure">确 定</el-button>
          </span>
        </el-dialog>
        <el-dialog title="置为无效" :visible.sync="unUseDialog" width="30%">
          <el-form :model="unUseForm"  :rules="unUseRules" ref="unUseForm" label-width="100px" class="demo-ruleForm" label-position="left">
                <el-form-item label="无效理由" prop="reason">
                    <el-input type="textarea" v-model="unUseForm.reason" auto-complete="off" :rows="4"></el-input>
                </el-form-item>
            </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="unUseDialog = false">取 消</el-button>
            <el-button type="primary" @click="unUseSure">确 定</el-button>
          </span>
        </el-dialog>
    </div>
</template>
<style>
    .edit{width: 50%;margin: 0 auto;}
    .edit-header{margin:10px;overflow: hidden;height: 70px;}
    .edit-header h4{float: left;margin: 0;line-height: 70px;font-size: 28px;font-weight: 500;}
    .button-group-fr{float: right;margin-top: 17px;}
    .edit-content{padding:20px;}
    .filterBtn{cursor: pointer;float:left;}
    
</style>
<script>
import NavMenu from '../navMenu.vue'
import SaleTable from '../page/sale.vue'
import AddContact from '../page/addContact.vue'
export default{ 
    components: {
        NavMenu,
        SaleTable,
        AddContact
    },
    data() {
      return {
            isEdit: false,
            tableData: [],
            loading: true,
            multipleSelection: [],
            selectNum: 0,
            count: 0,
            limit: 10,
            offset: 0,
            isDetail: false,
            clueDetail: {
                business: {},
                contacts: [],
                custom: {},
                salers: [],
                response: {}
            },
            activeTab: 'first',
            activeCollapse: ["1","2","3"],
            contactList: [],
            clueListName: '我的线索',
            clueDetailForm: {
                phone: '',
                website: '',
                industry: ''
            },
            industry: [{value: '选项1',
              label: '黄金糕'
            }],
            filterDialog: false,
            filterForm:{
                filterClass: '',
                parentFilter: '',
                subFilter: ''
            },
            filterParent:[],
            filterSon: [],
            filterObj:{},
            hasSubFilter: false,
            filterList: [],
            unUseDialog: false,
            unUseForm: {
                reason: ''
            },
            unUseRules: {
              reason: [
                { required: true, message: '请输入无效理由', trigger: 'blur' }
              ],
              
            }

      }
    },
    created(){
        this.init();
    },
    computed:{
        user(){
            return JSON.parse(window.localStorage.getItem('user'));
        }
    },
    methods: {
        toggleSelection(rows) {
            if (rows) {
                rows.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row);
                });
            } else {
                this.$refs.multipleTable.clearSelection();
            }
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            this.selectNum = val.length;
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getClueList();
        },
        handleCurrentChange(val) {
            this.offset = ( val - 1 ) * this.limit;
            this.getClueList();
        },
        rowClick(row,event,column){
            if(event.target.nodeName != "INPUT" && event.target.nodeName != "SPAN"){
                this.isDetail = true;
                this.activeTab = 'first';
                this.initDetail(row.pid);
            }
            event.cancelBubble = true;
        },
        canSelection(row,index){
            if([-1,-2,3].indexOf(row.status) != -1){
                return 0;
            }else{
                return 1;
            }
            
        },
        handleCommand(command){
            this.clueListName = command;
            this.getClueList();
        },
        closeSilde(){
            this.isDetail = false;
        },
        sureSelect(data){
            console.log(data);
        },
        init(){
            this.getClueList();
        },
        initDetail(pid){
            this.getClueDetail(pid);
            this.getContactList(pid);
        },
        getClueList(){
            if(this.clueListName == '我的线索'){
                this.getClueListApi('myList',[this.user.pid]);
            }else if(this.clueListName == '我团队的线索'){
                this.$axios.get('organization/orgasAndUsers/'+this.user.pid)
                .then((response) => {
                    if(response.data.userList.length > 0){
                        var dealUserIds = [];
                        for(var i = 0;i<response.data.userList.length;i++){
                            dealUserIds.push(response.data.userList[i].pid);
                        }
                        this.getClueListApi('myList',dealUserIds);
                    }else{

                    }
                })
                .catch((err) => {
                    console.log(err);
                });
                
            }else{

            }
        },
        getClueListApi(url,userIds){
            this.loading = true;
            this.$axios.post('business/'+url+'?limit='+this.limit+'&offset='+this.offset,Object.assign({
                dealUserIds: userIds
            },this.filterObj))
            .then((response) => {
                this.tableData = response.data.datas;
                this.count = response.data.paging.count;
                this.loading = false;
            })
            .catch((err) => {
                console.log(err);
            }); 
        },
        getClueDetail(pid){
            this.$axios.get('business/get?pid='+pid)
            .then((response) => {
                this.clueDetail = response.data;
                if(new Date(response.data.business.outChangeTime) > new Date(response.data.business.notDealTime)){
                    this.clueDetail.business.outTime = response.data.business.notDealTime;
                }else{
                    this.clueDetail.business.outTime = response.data.business.outChangeTime || response.data.business.notDealTime;
                }
                for(var i = 0;i<response.data.salers.length;i++){
                    if(response.data.salers[i].type == 1){
                        this.clueDetail.response = response.data.salers[i];
                    }
                }
            })
            .catch((err) => {
            });
        },
        editClueDetail(){
            this.isEdit = true;
        },
        cancelEdit(){
            this.isEdit = false;
        },
        getContactList(pid){
            this.$axios.post('contact/cms/contacts',{"uuid":pid,"type":0})
            .then((response) => {
                this.contactList = response.data;
            })
            .catch((err) => {
            });
        },  
        addContact(data){
            var param = Object.assign({ "uuid": this.clueDetail.business.pid,"style": 0},data);
            this.$axios.post('contact/add',param)
            .then((response) => {
                this.$message({message: '新建成功',type: 'success'});
                this.getContactList(this.clueDetail.business.pid);
            })
            .catch((err) => {

            });
        },
        changeFilterClass(data){
            this.filterParent = [];
            this.filterForm.parentFilter = '';
            this.filterForm.subFilter = '';
            if(data == 'address'){
                this.$comAxios.get('areas/0/subareas')
                .then((response) => {
                    for(var i = 0;i<response.data.datas.length;i++){
                        this.filterParent.push({"value":response.data.datas[i].id,"label":response.data.datas[i].name});
                    }
                    
                })
            }else if(data == 'product'){
                this.hasSubFilter = false;
                this.$axios.get('productType/getList')
                .then((response) => {
                    for(var i = 0;i<response.data.length;i++){
                        this.filterParent.push({"value":response.data[i].productType.pid,"label":response.data[i].productType.name});
                    }
                })
            }
        },
        changeParentFilter(data){
            if(this.filterForm.filterClass == 'address'){
                this.hasSubFilter = true;
                this.$comAxios.get('areas/'+data+'/subareas')
                .then((response) => {
                    this.filterSon = [];
                    for(var i = 0;i<response.data.datas.length;i++){
                        this.filterSon.push({"value":response.data.datas[i].id,"label":response.data.datas[i].name});
                    }
                })
            }
        },
        filterSure(){
            var label = {};
            label = this.filterParent.find((item)=>{
               return item.value === this.filterForm.parentFilter ;
            }) || {};
            var subLabel = {};
            subLabel = this.filterSon.find((item)=>{
               return item.value === this.filterForm.subFilter;
            }) || {};
            var className = '',key = '',subKey = '';
            if(this.filterForm.filterClass == 'address'){
                this.filterObj.provinceId = this.filterForm.parentFilter;
                this.filterObj.cityId = this.filterForm.subFilter;
                className = "客户区域",key = "provinceId",subKey = "cityId";
            }else if(this.filterForm.filterClass == 'product'){
                this.filterObj.productTypeId = this.filterForm.parentFilter;
                className = "意向产品",key = "productTypeId",subKey = "";
            }
            this.filterList.push({"class":className,"filter":label.label,"subFilter":subLabel.label,"key":key,"subKey":subKey});
            this.getClueList();
            this.filterDialog = false;
        },
        deleteFilter(key,subKey){
            for(var i=0; i<this.filterList.length; i++) {
                if(this.filterList[i].key == key) {
                  this.filterList.splice(i, 1);
                  break;
                }
            }
            delete this.filterObj[key];
            delete this.filterObj[subKey];
            this.getClueList();
        },
        clueOperate(command){
            if(command == 'unUse'){
                this.unUseDialog = true;
            }else if(command == 'backToPool'){
                this.$confirm('确定要回池此线索吗?', '提示', {
                          confirmButtonText: '确定',
                          cancelButtonText: '取消',
                          type: 'warning'
                        }).then(() => {
                          this.$axios.put('business/backToCluePool',{busiIds: [this.clueDetail.business.pid]})
                            .then((response) => {
                                this.isDetail = false;
                                this.$message({message: '回池成功',type: 'success'});
                                this.getClueList();
                            })
                        }).catch(() => {
                               
                });
            }
        },
        unUseSure(){
             this.$refs["unUseForm"].validate((valid) => {
              if(valid){
                var param = {
                    busiIds: [this.clueDetail.business.pid],
                    reason: this.unUseForm.reason
                }
                this.$axios.put('business/unEffective',param)
                .then((response) => {
                    this.unUseDialog = false;
                    this.isDetail = false;
                    this.$message({message: '无效成功',type: 'success'});
                    this.getClueList();
                })
              }else{
                return false;
              }
            });
        }

    }






    
}
</script>