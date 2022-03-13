<template>
<div>
    <div>
        <p>Create a profile</p>
    </div>
    <div>
        <b-form>
            <p>username and password not needed to logout, username and password is required to delete</p>
            <b-form-input placeholder="username" v-model="username"></b-form-input>
            <b-form-input placeholder="password" v-model="password"></b-form-input>
            <b-button type="button" @click="onLogout">logout</b-button>
            <b-button type="button" @click="onDestroy">destroy</b-button>
        </b-form>
    </div>
    <div v-if="err">
        <p>{{err}}</p>
    </div>
</div>
</template>

<script>
export default {
    created(){
        console.log(this.user)
    },
    props: ['user'],
    data(){
        return {
            username: '',
            password: '',
            err: ''
        }
    },
    methods: {
        onLogout(){
                fetch('gun://_', {method: 'DELETE', headers: {'X-Logout': this.user.alias, 'Authorization': this.user.token}}).then(res => {
                    if(!res.ok){
                        throw new Error('was not successful')
                    } else {
                        return res.text()
                    }
                }).then(res => {
                        console.log(JSON.parse(res))
                        this.username = ''
                        this.password = ''
                        this.$store.dispatch('deauth')
                        this.$router.push({name: 'home'})
                }).catch(error => {
                        this.username = ''
                        this.password = ''
                        this.err = error
                        setTimeout(() => {this.err = ''}, 5000)
                })
        },
        onDestroy(){
            if(this.username && this.password){
                fetch('gun://_', {method: 'DELETE', headers: {'X-Logout': this.user.alias, 'Authorization': this.user.token}}).then(res => {
                    if(!res.ok){
                        throw new Error('was not successful')
                    } else {
                        return res.text()
                    }
                }).then(res => {
                    console.log(JSON.parse(res))
                    fetch('gun://_', {method: 'DELETE', headers: {'X-DELETE': this.username}, body: this.password}).then(res => {
                        if(!res.ok){
                            throw new Error('was not successful')
                        } else {
                            return res.text()
                        }
                    }).then(res => {
                        console.log(JSON.parse(res))
                        this.username = ''
                        this.password = ''
                        this.$store.dispatch('deauth')
                        this.$router.push({name: 'home'})
                    }).catch(error => {
                        this.username = ''
                        this.password = ''
                        this.err = error
                        setTimeout(() => {this.err = ''}, 5000)
                    })
                }).catch(error => {
                    this.username = ''
                    this.password = ''
                    this.err = error
                    setTimeout(() => {this.err = ''}, 5000)
                })
            }
        },
        onError(errData){
            this.err = errData
            setTimeout(() => {
                this.err = ''
            }, 5000)
        }
    }
}
</script>

<style>

</style>