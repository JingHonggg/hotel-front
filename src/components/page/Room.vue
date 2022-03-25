<template>
    <div>
        <!--  客户列表文字  -->
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-school'></i> 房间列表
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <!--  头部容器      -->
        <div class='container'>
            <div class='handle-box'>
                <el-button plain round type='primary' icon='el-icon-s-promotion' @click='getAllRooms'>所有房间</el-button>
                &nbsp;


                &nbsp;&nbsp;
                <el-button plain round style='float: right' type='primary' icon='el-icon-plus' @click='handRoom'>添加房间
                </el-button>
            </div>

            <!-- 主列表 -->
            <el-table :data='tableData' style='width: 100%' border>
                <el-table-column prop='roomNumber' label='房间号' align='center' width='150'>
                    <template slot-scope='scope'>
                        <el-link :type="scope.row.roomStatus!==3?'':'primary'"
                                 :disabled='scope.row.roomStatus!==3'
                                 @click='checkIn(scope.row)'>{{scope.row.roomNumber}}</el-link>
                    </template>
                </el-table-column>
                <el-table-column prop='roomType' label='房间类型' align='center' width='150'></el-table-column>
                <el-table-column prop='size' label='容纳人数' align='center' width='150'></el-table-column>
                <el-table-column prop='price' label='今日价格' align='center' width='150'></el-table-column>
                <el-table-column prop='location' label='房间位置' align='center' width='150'></el-table-column>
                <el-table-column prop='facility' label='房间设施' align='center' width='180'></el-table-column>

                <el-table-column label='房间状态' align='center' width='150'>
                    <template slot-scope='scope'>
                        <el-tag v-if='scope.row.roomStatus===1' type='success'>空闲中</el-tag>
                        <el-tag v-if='scope.row.roomStatus===2' type='warning'>打扫中</el-tag>
                        <el-tag v-if='scope.row.roomStatus===3' type='danger'>入住中</el-tag>
                    </template>
                </el-table-column>

                <el-table-column label='操作' align='center'>
                    <template slot-scope='scope'>
                        <el-dropdown>
                            <span class='el-dropdown-link'>下拉菜单<i class='el-icon-arrow-down el-icon--right'></i></span>
                            <el-dropdown-menu slot='dropdown'>
                                <el-dropdown-item>
                                    <el-button size='mini' icon='el-icon-edit' v-if="name==='admin'"
                                               @click='handleEdit(scope.$index, scope.row)'>编辑
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button plain size='mini' icon='el-icon-coffee-cup'
                                               @click='handleUpdate(scope.row.roomNumber)'>更新
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button plain size='mini' type='danger' icon='el-icon-delete'
                                               v-if="name==='admin'"
                                               @click='handleDelete(scope.$index, scope.row,scope.row.roomNumber)'>删除
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button plain size='mini' type='success' icon='el-icon-chat-round'
                                               @click='checkIn(scope.row)'>入住
                                    </el-button>
                                </el-dropdown-item>
                                <el-dropdown-item>
                                    <el-button plain icon='el-icon-lx-exit' type='primary'
                                               @click='checkOut(scope.row)'>退房
                                    </el-button>
                                </el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </template>
                </el-table-column>

            </el-table>


            <!-- 编辑弹出框 -->
            <el-dialog title='编辑' :visible.sync='editVisible' width='30%'>
                <el-form ref='editForm' :model='editForm' label-width='80px' :rules='rules'>
                    <el-form-item label='房间图片'>
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
                    <el-form-item label='房间号' prop='roomNumber'>
                        <el-input disabled v-model='editForm.roomNumber'></el-input>
                    </el-form-item>
                    <el-form-item  label='房间级别' prop='roomType'>
                        <el-input v-model='editForm.roomType'></el-input>
                    </el-form-item>
                    <el-form-item label='容纳人数' prop='size'>
                        <el-input v-model='editForm.size' placeholder='请输入正整数'></el-input>
                    </el-form-item>
                    <el-form-item label='今日价格' prop='price'>
                        <el-input v-model='editForm.price' placeholder='请输入正数'></el-input>
                    </el-form-item>
                    <el-form-item label='房间位置' prop='location'>
                        <el-input v-model='editForm.location'></el-input>
                    </el-form-item>
                    <el-form-item label='房间设施'>
                        <el-input v-model='editForm.facility'></el-input>
                    </el-form-item>
                </el-form>
                <span slot='footer' class='dialog-footer'>
          <el-button @click='closeEditModal'>取 消</el-button>
          <el-button type='primary' @click='saveRoomEdit'>确 定</el-button>
        </span>
            </el-dialog>

            <!-- 添加弹出框 -->
            <el-dialog title='添加' :visible.sync='addVisible' width='30%'>
                <el-form ref='addForm' :model='addForm' label-width='80px' :rules='rules'>
                    <el-form-item label='房间图片'>
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
                    <el-form-item label='房间号' prop='roomNumber'>
                        <el-input v-model='addForm.roomNumber'></el-input>
                    </el-form-item>
                    <el-form-item label='房间类型' prop='roomType'>
                        <el-input v-model='addForm.roomType'></el-input>
                    </el-form-item>
                    <el-form-item label='房间位置' prop='location'>
                        <el-input v-model='addForm.location'></el-input>
                    </el-form-item>
                    <el-form-item label='容纳人数' prop='size'>
                        <el-input v-model='addForm.size'></el-input>
                    </el-form-item>
                    <el-form-item label='今日房价' prop='price'>
                        <el-input v-model='addForm.price'></el-input>
                    </el-form-item>
                    <el-form-item label='房间设施' >
                        <el-input v-model='addForm.facility'></el-input>
                    </el-form-item>
                    <el-form-item label='添加人' prop='createdBy'>
                        <el-input v-model='addForm.createdBy'></el-input>
                    </el-form-item>
                </el-form>
                <span slot='footer' class='dialog-footer'>
                     <el-button @click='closeCreateModal'>取 消</el-button>
                     <el-button type='primary' @click='saveRoom'>确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Room',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            value: '',
            imageUrl: '',
            serviceData: [], //服务数据
            tableData: [],
            flag: false,
            switchValue: true,
            editVisible: false,
            addVisible: false,
            inspectVisible: false,
            serviceVisible: false,
            pageTotal: 50, //总共有多少条数据
            editForm: {
                roomNumber: null,
                roomType: null,
                location: null,
                roomStatus: null,
                size: null,
                createdBy: null,
                facility: null,
                price: null,
                file: null
            },
            addForm: {
                roomNumber: null,
                roomType: null,
                location: null,
                roomStatus: null,
                size: null,
                createdBy: null,
                facility: null,
                price: null,
                file: null
            },
            rules: {
                roomNumber: {
                    required: true,
                    message: '房间号必填'
                },
                roomType: {
                    required: true,
                    message: '房间类型必填'
                },
                location:{
                    required: true,
                    message: '房间位置必填'
                },
                size: [
                    {
                        required: true,
                        message: '房间容纳人数必填'
                    }
                ],
                price: [
                    {
                        required: true,
                        message: '房间价格必填'
                    }
                ],
                createdBy: {
                    required: true,
                    message: '房间添加人不能为空'
                }
            },
            idx: -1,
            id: -1
        };
    },
    created() {
        this.getAllRooms();
    },
    methods: {
        getImage(imageUrl) {
            if (imageUrl === null)
                return;
            this.$http.request({
                url: '/room/getImage',
                responseType: 'blob',
                method: 'POST',
                params: { imageUrl: imageUrl }
            }).then(res => {
                let blob = new Blob([res.data], { type: 'image/JPEG' });
                let url = window.URL.createObjectURL(blob);
                this.imageUrl = url;
            });
        },
        //更新房间状态
        handleUpdate(roomNumber) {
            this.$confirm('确定要更新房间状态吗？', '提示', {
                type: 'warning'
            }).then(() => {
                this.$http.post('/room/updateRoomStatus?roomNumber=' + roomNumber).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success(res.data.msg);
                        this.getAllRooms();
                    } else
                        this.$message.error(res.data.msg);
                });
            });
        },

        //入住弹窗
        checkIn(row) {
            this.$router.push({
                name: 'CheckIn',
                params: {
                    room: row,
                    checkIn: null
                }
            });
        },

        //退房
        checkOut(row) {
            if (row.roomStatus !== 3) {
                this.$message.warning('房间不处于入住状态,无法执行该操作!');
                return;
            }
            this.$confirm('是否确认退房？', '提示', {
                type: 'warning'
            }).then(() => {
                this.$http.post('/room/checkOut?roomNumber=' + row.roomNumber).then(res => {
                    if (res.data.code === 200) {
                        this.$message.success(`您已退房成功！`);
                        this.getAllRooms();
                    } else {
                        this.$message.error(res.data.msg);
                    }
                });
            });

        },

        getAllRooms() {
            this.$http.get('/room/getRooms').then((res) => {
                this.tableData = res.data.data;
            });
        },

        // 编辑房间
        saveRoomEdit() {
            const _this = this;
            this.$refs.editForm.validate().then(res => {
                if (res) {
                    const formData = new FormData();
                    let keys = Object.keys(_this.editForm);
                    keys.forEach(key => {
                        if (_this.editForm[key] !== null)
                            formData.append(key, _this.editForm[key]);
                    });
                    this.$http.post('/room/saveRoom', formData).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success(`编辑成功`);
                            this.editVisible = false;
                            this.getAllRooms();
                            this.editForm = {};
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                }
            });
        },

        // 添加房间
        saveRoom() {
            const _this = this;
            this.$refs.addForm.validate().then(res => {
                if (res) {
                    const formData = new FormData();
                    let keys = Object.keys(_this.addForm);
                    keys.forEach(key => formData.append(key, _this.addForm[key]));
                    this.$http.post('/room/saveRoom', formData).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success(`添加成功`);
                            this.addVisible = false;
                            this.getAllRooms();
                            this.addForm = {};
                        } else {
                            this.$message.error('添加失败');
                        }
                    });
                }
            });
        },


        //删除房间信息
        handleDelete(index, row, roomId) {
            if (localStorage.getItem('ms_username') === 'admin') {
                // 二次确认删除
                this.$confirm('确定要删除吗？', '提示', {
                    type: 'warning'
                })
                    .then(() => {
                        this.$http.post('/room/deleteRoom', row).then((res) => {
                            if (res.data.code === 200) {
                                this.$message.success(res.data.msg);
                                this.getAllRooms();
                            } else {
                                this.$message.error(res.data.msg);
                            }
                        });
                    })
                    .catch(() => {
                    });
            } else {
                this.$message.error('抱歉您没有该权限');
            }

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
        //添加预定信息框
        handRoom() {
            if (localStorage.getItem('ms_username') === 'admin') {
                this.addVisible = true;
                this.addForm = {};
                this.imageUrl = '';
            } else {
                this.$message.error('抱歉您没有该权限');
            }
        },

        // 编辑操作
        async handleEdit(index, row) {
            if (localStorage.getItem('ms_username') === 'admin') {
                this.idx = index;
                this.editForm = row;
                this.imageUrl = '';
                await this.getImage(row.imageUrl);
                this.editForm.file = null;
                this.editVisible = true;
            } else {
                this.$message.error('抱歉您没有该权限');
            }
        },

        closeCreateModal(){
            this.$refs.addForm.resetFields()
            this.addForm = {}
            this.addVisible = false
        },

        closeEditModal(){
            this.$refs.editForm.resetFields()
            this.editForm = {}
            this.editVisible = false
            this.getAllRooms()
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
