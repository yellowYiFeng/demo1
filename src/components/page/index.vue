<template>
    <div>
        <nav-menu></nav-menu>  
    </div>
</template>

<script>
    import NavMenu from '../navMenu.vue'
    export default{
        components: {
            NavMenu
        },
        created(){
            this.$logAxios.post('userRole/login',{"code":"wangyx"})
                .then((response) => {
                    window.localStorage.setItem('crmToken',response.data.token);
                    window.localStorage.setItem('user',JSON.stringify(response.data.user));
                    this.$store.commit('setUser',response.data);
                })
                .catch((err) => {
                    console.log(err);
            });
        },
        methods: {
            getClueList(){
                this.$axios.post('business/myList?limit=10&offset=0',{
                    dealUserIds: ["7d624ec8-0d24-4dba-9cb7-b4a52f308e9c"]
                })
                .then((response) => {
                    this.tableData = response.data.datas,
                    this.count = response.data.paging.count
                })
                .catch((err) => {
                    console.log(err);
                });
            },
        }
    }
</script>