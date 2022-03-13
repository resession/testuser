<template>
<div>
    <div>
        <p>Create a profile</p>
    </div>
    <div>
        <b-form>
            <b-form-input placeholder="username" v-model="username"></b-form-input>
            <b-form-input placeholder="password" v-model="password"></b-form-input>
            <b-button type="button" @click="onLogin">login</b-button>
            <b-button type="button" @click="onCreate">create</b-button>
        </b-form>
    </div>
    <div v-if="err">
        <p>{{err}}</p>
    </div>
</div>
</template>

<script>
export default {
    props: ['user'],
    data(){
        return {
            username: '',
            password: '',
            err: ''
        }
    },
    methods: {
        onLogin(){
            if(this.username && this.password){
                fetch('gun://_', {method: 'PUT', headers: {'X-Login': this.username}, body: this.password}).then(res => {
                    if(!res.ok){
                        throw new Error('was not successful')
                    } else {
                        return res.text()
                    }
                }).then(res => {
                    console.log(res)
                    let useRes = JSON.parse(res)
                    localStorage.setItem('dsite', JSON.stringify({token: useRes.token, address: useRes.address, alias: this.username, timer: Date.now()}))
                        this.$store.dispatch('auth', {token: useRes.token, address: useRes.address, alias: this.username})
                        useRes = null
                        this.username = ''
                        this.password = ''
                        this.$router.push({name: 'home'})
                }).catch(error => {
                    console.log(JSON.parse(error))
                        this.username = ''
                        this.password = ''
                        this.err = error
                        setTimeout(() => {this.err = ''}, 5000)
                })
            }
        },
        onCreate(){
            if(this.username && this.password){
                fetch('gun://_', {method: 'PUT', headers: {'X-Create': this.username}, body: this.password}).then(res => {
                    if(!res.ok){
                        throw new Error('was not successful')
                    } else {
                        return res.json()
                    }
                }).then(res => {
                    console.log(res)
                    this.onLogin()
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