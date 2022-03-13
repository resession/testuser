<template>
  <b-row>
      <b-col>
          <b-form @submit.prevent="onSubmit">
              <b-form-file v-model="mainFile" :state="Boolean(mainFile)" placeholder="Choose a file or drop it here..." drop-placeholder="Drop file here..."></b-form-file>
              <b-form-input v-model="mainText" placeholder="Enter your name"></b-form-input>
              <b-button type="submit">submit</b-button>
          </b-form>
            <b-row v-if="err">
                <b-col>
                    <p>{{err}}</p>
                </b-col>
            </b-row>
            <b-row v-if="postRes">
                <b-col>
                    <p>{{postRes}}</p>
                </b-col>
            </b-row>
      </b-col>
  </b-row>
</template>

<script>
export default {
    created(){
        console.log(this.$store.getters.status)
    },
    data(){
        return {
            mainFile: null,
            mainText: '',
            postRes: null,
            err: '',
            status: this.$store.getters.status
        }
    },
    methods: {
        onSubmit(){
            if(this.mainFile && this.mainText){
                const dataBody = new FormData()
                dataBody.append('file', new Blob([this.mainFile]), this.mainFile.name)
                fetch('ipfs://bafyaabakaieac/' + this.mainFile.name, {method: 'PUT', body: dataBody}).then(res => {
                    // if(!res.ok){
                    //     throw new Error('was not successful')
                    // } else {
                        return res.text()
                    // }
                }).then(ipfsLink => {
                    console.log(ipfsLink)
                    throw new Error('hello')
                    const postData = {link: ipfsLink, text: this.mainText, alias: this.status.alias, address: this.status.address, id: Date.now() + Math.random()}
                        fetch('gun://agregore/test', {method: 'PUT', body: JSON.stringify(postData)}).then(res => {
                            if(!res.ok){
                                throw new Error('was not successful')
                            } else {
                                return res.json()
                            }
                        }).then(res => {
                            this.postRes = res
                        }).catch(error => {
                            this.err = error
                            setTimeout(() => {this.err = ''}, 5000)
                        })
                }).catch(error => {
                    console.log(error)
                    this.err = error
                    setTimeout(() => {this.err = ''}, 5000)
                })
            }
        }
    }
}
</script>

<style>

</style>