<template>
    <div>
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-document'></i> 入住信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class='container'>
            <el-row class='diy-col backgroundColor'>
                <span><strong>房间信息</strong></span>
            </el-row>
            <el-row style='height: 500px;'>
                <el-col :span='3' style='height: 100%' class='diy-col backgroundColor'>
                    <span>房间图片</span>
                </el-col>
                <el-col :span='21' style='height: 100%;' class='diy-col'>
                    <img :src='imageUrl' alt='' class='image' />
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>房间编号</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <span>{{ room.roomNumber }}</span>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>房间类型</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <span>{{ room.roomType }}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>房间位置</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <span>{{ room.location }}</span>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>可入住人数</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <span>{{ room.size }}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>今日房价</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <span>{{ room.price }}</span>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span> </span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <span></span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor' style='height:60px'><span>房间设施</span></el-col>
                <el-col :span='21' class='diy-col' style='height:60px'><span>{{ room.facility }}</span></el-col>
            </el-row>
            <el-row>
                <span class='diy-col backgroundColor'><strong>入住信息</strong></span>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>入住日期</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-date-picker
                        v-model='checkIn.inDate'
                        type='datetime'
                        style='width: 100%;'
                        placeholder='选择入住日期'>
                    </el-date-picker>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>离店日期</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-date-picker
                        v-model='checkIn.outDate'
                        type='datetime'
                        style='width: 100%;'
                        placeholder='选择离店日期'>
                    </el-date-picker>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>开房人</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-input v-model='checkIn.registrant' placeholder='请输入开房人'></el-input>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>缴纳押金</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-input v-model='checkIn.cashPledge' placeholder='请输入缴纳的押金金额'></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>房费应缴纳</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-input v-model='checkIn.shouldPay' placeholder='请输入应缴纳金额'></el-input>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>开房人实际缴纳</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-input v-model='checkIn.realPay' placeholder='请输入实际缴纳金额'></el-input>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span>入住信息录入人</span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                    <el-input v-model='checkIn.createdBy' placeholder='请输入录入人'></el-input>
                </el-col>
                <el-col :span='3' class='diy-col backgroundColor'>
                    <span></span>
                </el-col>
                <el-col :span='9' class='diy-col'>
                </el-col>
            </el-row>
            <el-row>
                <div style='height: 35px;'></div>
            </el-row>
            <el-row>
                <el-col :span='24'>
                    <span class='diy-col backgroundColor'><strong>入住人信息</strong></span>
                </el-col>
            </el-row>
            <el-row>
                <el-col class='diy-col' style='display: flex;justify-content: right' :span='24'>
                    <el-button type='primary' style='margin-right: 44px;' size='mini' @click='addColumn'>新增</el-button>
                </el-col>
            </el-row>
            <el-table :data='checkInUser'
                      border>
                <el-table-column label='姓名' align='center'>
                    <template slot-scope='scope'>
                        <el-input v-model='scope.row.name' placeholder='请输入客人姓名'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label='电话' align='center'>
                    <template slot-scope='scope'>
                        <el-input v-model='scope.row.phone' placeholder='请输入客人电话'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label='身份证号码' align='center'>
                    <template slot-scope='scope'>
                        <el-input v-model='scope.row.idNumber' placeholder='请输入客人身份证号码'></el-input>
                    </template>
                </el-table-column>
                <el-table-column label='操作' align='center' width='150'>
                    <template slot-scope='scope'>
                        &nbsp;
                        <el-button type='danger' size='small' @click='deleteColumn(scope.$index)'>删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style='display:flex;justify-content:center;align-items:center;margin-top: 16px;'>
                <el-button type='primary' @click='confirmCheckIn' style='width: 100px;'>{{
                    checkIn.id === null || checkIn.id === undefined ? '入住' : '修改'}}</el-button>
            </div>
            <div style='height:180px'></div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'CheckIn',
    data() {
        return {
            room: this.$route.params.room,
            imageUrl: null,
            multipleSelection: [],
            checkIn: {
                inDate: null,
                outDate: null,
                registrant: null,
                cashPledge: null,
                shouldPay: null,
                realPay: null,
                createdBy: null,
                checkInUser: []
            },
            checkInUser: [{
                name: null,
                phone: null,
                idNumber: null
            }]
        };
    },
    watch: {},
    async mounted() {
        this.getCheckIn(this.room.roomNumber);
        await this.getImage(this.room.imageUrl);
    },
    methods: {
        confirmCheckIn() {
            if (this.room.roomStatus === 2) {
                this.$message.warning('房间处于打扫中,不允许入住!');
                return;
            }
            this.checkIn.checkInUser = this.checkInUser;
            this.checkIn.roomNumber = this.room.roomNumber;
            if (this.checkIn.inDate !== null && this.checkIn.outDate !== null &&
                this.checkIn.registrant !== null && this.checkIn.cashPledge !== null &&
                this.checkIn.shouldPay !== null && this.checkIn.realPay !== null &&
                this.checkIn.createdBy !== null) {
                let flag = false;
                this.checkInUser.forEach(item => {
                    if (item.name === null || item.phone === null || item.idNumber === null) {
                        this.$message.error('请完整填写入住人信息');
                        flag = true;
                    }
                });
                if (flag)
                    return;
                const _this = this;
                this.$confirm('确认入住吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.$http.post('/check-in/addCheckIn', this.checkIn).then(res => {
                        if (res.data.code === 200) {
                            this.$message.success('新增入住信息成功');
                            this.getCheckIn(_this.checkIn.roomNumber);
                        } else {
                            this.$message.error(res.data.msg);
                        }
                    });
                });
            } else {
                this.$message.error('请填写完整的入住信息');
            }
        },
        getCheckIn(roomNumber) {
            try {
                this.$http.get('/check-in/getCheckIn?roomNumber=' + roomNumber).then(res => {
                    if (res.data.code === 200 && res.data.data !== null) {
                        this.checkIn = res.data.data;
                        this.checkInUser = this.checkIn.checkInUser;
                    }
                });
            } catch (e) {
                this.$message.error(e);
            }
        },
        addColumn() {
            this.checkInUser.push({
                name: null,
                phone: null,
                idNumber: null
            });
        },
        deleteColumn(index) {
            if (this.checkInUser.length === 1) {
                this.$message.warning('入住客人不能少于一位');
                return;
            }
            this.checkInUser.splice(index, 1);
        },
        handleSelectionChange(val) {
            this.multipleSelection = val;
            console.log(this.multipleSelection);
        },
        getImage(imageUrl) {
            if (imageUrl === null || imageUrl === '')
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
        }
    }
};
</script>

<style scoped>
.diy-col {
    height: 35px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #daa7a7;
}

.backgroundColor {
    background-color: #fce9e8;
}

.image {
    height: 100%;
    display: block;
}

/deep/ .el-table th {
    background-color: #daa7a7;
}

/deep/ .el-table thead {
    color: black;
}

/deep/ .el-table--mini, .el-table--small, .el-table__expand-icon {
    font-size: 14px;
}

/deep/ .el-table th{
    background-color: #fce9e8 !important;
}
</style>
