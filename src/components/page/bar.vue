<template>
    <div>
        <!--  客户列表文字  -->
        <div class='crumbs'>
            <el-breadcrumb separator='/'>
                <el-breadcrumb-item>
                    <i class='el-icon-cold-drink'></i>酒吧走廊
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-card>
            <div>
                <img src='../../assets/img/sangna.jpg' class='image'>
            </div>
            <div style='display:flex;align-content: center;margin-top: 10px;'>
                <span style='font-weight: bold;font-size: 22px;margin-left: 100px;'>酒吧可入场人数 {{chartData.current}}/{{chartData.total}}</span>

                <el-button style='margin-left: 450px;' type='danger' @click='handleAdd'>入场一位</el-button>
                <el-button style='margin-left: 50px;' type='danger' @click='handleSub'>离场一位</el-button>
            </div>
            <div style='height: 400px;display:flex;justify-content:center;'>
                <div id='statisticsEcharts' style='width: 400px;height: 400px;'></div>
            </div>
        </el-card>
    </div>
</template>

<script>
import * as chart from 'echarts';

export default {
    name: 'bar',
    data() {
        return {
            chartData: {},
            dataName: 'jiuba'
        };
    },
    methods: {
        getData() {
            this.$http.post('/facilities/getData', { name: this.dataName}).then(async res => {
                if (res.data.code === 200) {
                    this.chartData = res.data.data;
                    await this.initEcharts(this.chartData);
                } else {
                    this.$message.error(res.data.msg);
                }
            });
        },
        initEcharts(data) {
            let htmlElement = document.getElementById('statisticsEcharts');
            let myChart = chart.init(htmlElement);
            myChart.clear()
            let option = {
                tooltip: {
                    trigger: 'item'
                },
                legend: {
                    orient: 'horizontal',
                    bottom: 20
                },
                series: [{
                    type: 'pie',
                    radius: '50%',
                    data: [
                        { value: data.current, name: '已占用' },
                        { value: (data.total - data.current), name: '未占用' }
                    ]
                }]
            };
            myChart.setOption(option);
            window.addEventListener('resize', function() {
                myChart.resize();
            });
        },
        handleAdd(){
            if (this.chartData.current>=this.chartData.total){
                this.$message.error('已满员')
                return
            }
            this.$http.post('/facilities/currentAdd',{name: this.dataName}).then(res=>{
                if (res.data.code === 200){
                    this.getData()
                }
            })
        },
        handleSub(){
            if (!this.chartData.current>0){
                this.$message.error('已无人员')
                return
            }
            this.$http.post('/facilities/currentSub',{name: this.dataName}).then(res=>{
                if (res.data.code === 200){
                    this.getData()
                }
            })
        }
    },
    async created() {
        await this.getData();
    }
};
</script>

<style scoped>
.image {
    object-fit: cover;
    width: 100%;
    height: 400px;
}
</style>

