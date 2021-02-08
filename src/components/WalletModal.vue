<template>
  <div class="modalWallet modalOverlay" @click.self="$emit('close')">
    <div class="modalWindow">
      <p>{{ val.userName }}さんの残高</p>
      <p>{{ val.wallet }}</p>
      <div class="modalBtn">
        <input type="button" class="btn btn-danger btnClose" value="close" @click="$emit('close')">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['val']
}
</script>
