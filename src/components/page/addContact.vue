<template>
    <div>
        <el-dialog title="新建联系人"  :visible="$store.state.addContactDialog" @close="$store.commit('closeAddContactDialog')">
            <el-form :model="ruleForm"  :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm half-line-form" label-position="left">
                <el-form-item label="姓名" prop="name">
                    <el-input type="text" v-model="ruleForm.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-select v-model="ruleForm.sex" placeholder="请选择" auto-complete="off">
                        <el-option  label="男" :value="0"></el-option>
                        <el-option  label="女" :value="1"></el-option>
                    </el-select>  
                </el-form-item>
                <el-form-item label="所在部门" prop="department">
                     <el-select v-model="ruleForm.department" placeholder="请选择">
                        <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="职务头衔" prop="position">
                     <el-select v-model="ruleForm.position" placeholder="请选择" auto-complete="off">
                        <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="决策链角色" prop="role">
                     <el-select v-model="ruleForm.role" placeholder="请选择" auto-complete="off">
                        <el-option v-for="item in department" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                      </el-select>
                </el-form-item>
                <el-form-item label="汇报对象" prop="reportObject">
                    <el-input type="text" v-model="ruleForm.reportObject" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="phone">
                    <el-input type="text" v-model="ruleForm.phone" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="微信账号" prop="weChat">
                    <el-input type="text" v-model="ruleForm.weChat" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="电子邮件" prop="email">
                    <el-input type="text" v-model="ruleForm.email" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货地址" prop="address">
                    <el-input type="text" v-model="ruleForm.address" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="个人特点" prop="personality">
                    <el-input type="text" v-model="ruleForm.personality" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="关注问题" prop="problem">
                    <el-input type="text" v-model="ruleForm.problem" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="备注信息" prop="remark">
                    <el-input type="text" v-model="ruleForm.remark" auto-complete="off"></el-input>
                </el-form-item>


                  
                  
                <!-- <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                    <el-button @click="resetForm('ruleForm')">重置</el-button>
                </el-form-item> -->
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="$store.commit('closeAddContactDialog')">取 消</el-button>
                <el-button type="primary" @click="sendMessageToParent">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    data() {
      
      return {
        department:[{value: '选项1',
              label: '黄金糕'
            }, {
              value: '选项2',
              label: '双皮奶'
            }, {
              value: '选项3',
              label: '蚵仔煎'
            }, {
              value: '选项4',
              label: '龙须面'
            }, {
              value: '选项5',
              label: '北京烤鸭'
            }
        ],
        ruleForm: {
          name: '',
          sex: '',
          department: '',
          position: '',
          role: '',
          reportObject: '',
          phone: '',
          weChat: '',
          email: '',
          address: '',
          personality: '',
          problem: '',
          remark: '',

        },
        rules: {
          name: [
            { required: true, message: '请输入姓名', trigger: 'blur' }
          ],
          phone: [
            { required: true, message: '请输入联系电话', trigger: 'blur' }
          ]
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$emit("addContactSure",this.ruleForm);
            this.$store.commit('closeAddContactDialog');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      sendMessageToParent(){
        this.submitForm('ruleForm');
      }
    }
  }
</script>