<template>
    <div>

        <el-dialog title="选择人员" :visible="$store.state.saleDialog" @close="$store.commit('closeSaleDialog')">
            <el-table :data="gridData">
                <el-table-column width="55">
                    <template scope="scope" >
                        <el-radio  class="radio" v-model="radio" :label="scope.row.pid" @change="changeRadio">&nbsp;</el-radio>
                    </template>
                </el-table-column>
                <el-table-column property="name" label="姓名" width="200"></el-table-column>
                <el-table-column property="deptUrl" label="部门路径"></el-table-column>
                <el-table-column property="mobile" label="手机"></el-table-column>
            </el-table>
            <div class="block pagination">
                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[10,20,50]" :page-size="10"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="count">
                </el-pagination>
            </div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="sendCancelToParent">取 消</el-button>
                <el-button type="primary" @click="sendSureToParent">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default{
        data(){
            return {
                gridData: [],
                radio: '',
                sale: '',
                count: 0,
                limit: 10,
                offset: 0,
                isDetail: false,
            }            
        },
        created(){
            this.getSaleList();
        },
        methods: {
            getSaleList(){
                this.$axios.post('user/users?limit='+this.limit+'&offset='+this.offset,{})
                .then((response) => {
                    this.gridData = response.data.datas;
                    this.count = response.data.paging.count;
                    this.loading = false;
                })
                .catch((err) => {
                    console.log(err);
                });
            },
            handleSizeChange(val) {
                this.limit = val;
                this.getSaleList();
            },
            handleCurrentChange(val) {
                this.offset = ( val - 1 ) * this.limit;
                this.getSaleList();
            },
            sendSureToParent(){
                if(this.sale){
                    this.$emit("childSureEvent",this.sale);
                    this.$store.commit('closeSaleDialog');
                }else{
                    this.$message.error('请选择一个人员');
                }
            },
            sendCancelToParent(){
                this.$store.commit('closeSaleDialog');
            },
            changeRadio(value){
                this.sale = value;
            }
        }
    }
</script>