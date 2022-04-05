<template>

    <div>
        <!--  客户列表文字  -->
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-s-custom'></i> 酒店员工信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--  头部容器      -->
        <div class='container'>
            <div class='handle-box'>
                <el-button plain round type='primary' icon='el-icon-plus' @click='addStaff'>添加员工</el-button>
            </div>
            <!-- 主列表 -->
            <el-table :data='tableData' border style='width: 100%'>
                <el-table-column label='员工照片' align='center'></el-table-column>
                <el-table-column prop='workNumber' label='工号' align='center'></el-table-column>
                <el-table-column prop='name' label='姓名' align='center'></el-table-column>
                <el-table-column prop='post' label='职务' align='center'></el-table-column>
                <el-table-column prop='status' label='状态' align='center'></el-table-column>
                <el-table-column prop='phone' label='联系电话' align='center'></el-table-column>
                <el-table-column prop='workYear' label='入职时间(年)' align='center'></el-table-column>
                <el-table-column prop='description' label='工作描述' align='center'></el-table-column>
                <el-table-column label='操作' align='center'>
                    <template slot-scope='scope'>
                        <el-button size='mini' icon='el-icon-edit' @click='editStaff(scope.row)'>编辑
                        </el-button>
                        <el-button plain size='mini' type='danger' icon='el-icon-delete'
                                   @click='handleDelete(scope.row.id)'>删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class='block' style='display: flex;justify-content: right'>
                <el-pagination
                    @current-change='changePage'
                    layout='prev, pager, next'
                    :total='tableDataCount'>
                </el-pagination>
            </div>


            <!-- 编辑弹出框 -->
            <el-dialog title='编辑' :visible.sync='editVisible' width='30%'>
                <el-form ref='form' :model='form' label-width='80px'>
                    <el-form-item label='员工照片'>
                        <el-upload
                            class='avatar-uploader'
                            action=''
                            :show-file-list='false'
                            :on-success='handleAvatarSuccess'
                            :on-change='onchange'
                            :before-upload='beforeAvatarUpload'>
                            <img v-if='imageUrl' :src='imageUrl' class='avatar'>
                            <i v-else class='el-icon-plus avatar-uploader-icon'></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label='工号' prop='workNumber' required >
                        <el-input v-model='form.workNumber'></el-input>
                    </el-form-item>
                    <el-form-item label='姓名' prop='name' required>
                        <el-input v-model='form.name'></el-input>
                    </el-form-item>
                    <el-form-item label='职务' prop='post' required>
                        <el-input v-model='form.post'></el-input>
                    </el-form-item>
                    <el-form-item label='状态' prop='status' required>
                        <el-input v-model='form.status'></el-input>
                    </el-form-item>
                    <el-form-item label='联系电话' prop='phone' required>
                        <el-input v-model='form.phone'></el-input>
                    </el-form-item>
                    <el-form-item label='入职时间(年)' >
                        <el-input v-model='form.workYear'></el-input>
                    </el-form-item>
                    <el-form-item label='工作描述' prop='description' required>
                        <el-input v-model='form.description'></el-input>
                    </el-form-item>
                </el-form>
                <span slot='footer' class='dialog-footer'>
                    <el-button @click='editVisible = false'>取 消</el-button>
                    <el-button type='primary' @click='doEdit'>确 定</el-button>
                </span>
            </el-dialog>

            <!-- 添加弹出框 -->
            <el-dialog title='添加' :visible.sync='addVisible' width='30%'>
                <el-form ref='addForm' :model='addForm' label-width='95px' :rules='rules'>
                    <el-form-item label='员工照片'>
                        <el-upload
                            class='avatar-uploader'
                            action=''
                            :show-file-list='false'
                            :on-success='handleAvatarSuccess'
                            :on-change='onchange'
                            :before-upload='beforeAvatarUpload'>
                            <img v-if='imageUrl' :src='imageUrl' class='avatar'>
                            <i v-else class='el-icon-plus avatar-uploader-icon'></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label='工号' prop='workNumber' required>
                        <el-input v-model='addForm.workNumber'></el-input>
                    </el-form-item>
                    <el-form-item label='姓名' prop='name' required>
                        <el-input v-model='addForm.name'></el-input>
                    </el-form-item>
                    <el-form-item label='职务' prop='post' required>
                        <el-input v-model='addForm.post'></el-input>
                    </el-form-item>
                    <el-form-item label='状态' prop='status' required>
                        <el-input v-model='addForm.status'></el-input>
                    </el-form-item>
                    <el-form-item label='联系电话' prop='phone' required>
                        <el-input v-model='addForm.phone'></el-input>
                    </el-form-item>
                    <el-form-item label='入职时间(年)'>
                        <el-input v-model='addForm.workYear'></el-input>
                    </el-form-item>
                    <el-form-item label='工作描述' prop='description' required>
                        <el-input v-model='addForm.description'></el-input>
                    </el-form-item>
                </el-form>
                <span slot='footer' class='dialog-footer'>
                    <el-button @click='addVisible = false'>取 消</el-button>
                    <el-button type='primary' @click='doAdd'>确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import _ from 'lodash'
export default {
    name: 'staff',
    data() {
        return {
            editVisible: false,
            addVisible: false,
            imageUrl: '',
            searchForm: {
                workNumber: null,
                name: null,
                status: null,
                size: 10,
                currentPage: 1
            },
            form: {
                file: null,
                workNumber: null,
                name: null,
                post: null,
                status: null,
                phone: null,
                workYear: null,
                description: null
            },
            addForm:{
                file: null,
                workNumber: null,
                name: null,
                post: null,
                status: null,
                phone: null,
                workYear: null,
                description: null
            },
            tableData: [],
            tableDataCount: 0,
            rules: {
                workNumber: [{ require: true, trigger: 'blur', message: '工号不能为空' }],
                name: [{ require: true, trigger: 'blur', message: '姓名不能为空' }],
                post:[ { require: true, trigger: 'blur', message: '职务不能为空' }],
                status: [{ require: true, trigger: 'blur', message: '请选择状态' }],
                phone: [{ require: true, trigger: 'blur', message: '联系电话不能为空' }],
                description: [{ require: true, trigger: 'blur', message: '描述内容不能为空' }]
            }
        };
    },
    methods: {
        search(page) {
            this.searchForm.currentPage = page;
        },
        addStaff() {
            this.addVisible = true
            this.addForm = {}
        },
        doAdd() {
            this.$refs.addForm.validate().then(res => {
                if (res){
                    console.log("ok");
                    this.$http.post("/staff/add",this.addForm).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success(res.data.msg);
                            this.search(1);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    })
                }else {
                    this.$message.error("请填写完整内容")
                }
            })

        },
        editStaff(row) {
            this.editVisible = true
            this.form = _.cloneDeep(row)
        },
        doEdit() {

        },
        handleDelete(id) {

        },
        handleAvatarSuccess(res, file) {
            this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
            const isJPG = file.type === 'image/jpeg';
            const isLt4M = file.size / 1024 / 1024 < 4;
            if (!isJPG) {
                this.$message.error('上传图片只能是 JPG 格式!');
                return false;
            }
            if (!isLt4M) {
                this.$message.error('上传图片大小不能超过 4MB!');
                return false;
            }
            this.editForm.file = file;
            this.addForm.file = file;
            return false;
        },
        //当上传图片后，调用onchange方法，获取图片本地路径
        onchange(file, fileList) {
            var _this = this;
            var event = event || window.event;
            var file = event.target.files[0];
            var reader = new FileReader();
            //转base64
            reader.onload = function(e) {
                _this.imageUrl = e.target.result; //将图片路径赋值给src
            };
            reader.readAsDataURL(file);
        },
        changePage(page) {
            this.search(page);
        }
    }
};
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}

.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}

.avatar-uploader .el-upload:hover {
    border-color: #409EFF;
}

.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 170px;
    height: 170px;
    line-height: 170px;
    text-align: center;
}

/deep/ .el-upload {
    display: inline-block;
    text-align: center;
    cursor: pointer;
    outline: 0;
    width: -webkit-fill-available;
    height: auto;
}

.avatar {
    width: 100%;
    height: auto;
    display: block;
}

.el-dropdown-link {
    cursor: pointer;
    color: #409EFF;
}

.el-icon-arrow-down {
    font-size: 12px;
}
</style>
