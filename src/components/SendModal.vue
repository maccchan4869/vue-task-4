<template>
  <div class="modalWallet modalOverlay" @click.self="$emit('close')">
    <div class="modalWindow">
      <p>あなたの残高：{{ val.wallet }}</p>
      <p>送る金額</p>
      <input type="number" class="sendWallet" placeholder="0" v-model.number="sendWallet">
      <div class="modalBtn">
        <input type="button" class="btn btn-danger btnClose" value="送信" @click='send'>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SendModal',
  props: ['val'],
  data () {
    return {
      sendWallet: null
    }
  },
  methods: {
    send() {
      this.$emit('send', this.sendWallet);
    }
  }
}
</script>

<style scoped>
.sendWallet{
  text-align: right;
  width: 80%;
  margin-bottom: 0.5rem;
}
</style>
