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

<style>
.modalOverlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  transition: all .5s ease;
}

.modalOverlay .modalWindow {
  min-width: 15%;
  height: 24%;
  font-size: 20px;
  border-radius: 4px;
  background: #fff;
  position: relative;
  top: 15%;
  padding-top: 1%;
}

.modalOverlay .modalWindow .modalBtn {
  background: #d8d8d8;
  height: 40%;
  border-radius: 0 0 4px 4px;
}

.modalOverlay .modalWindow .modalBtn .btnClose {
  position: relative;
  top: 15%;
  left: 25%;
}
</style>
