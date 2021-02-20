<template>
  <img alt="Vue logo" src="./assets/logo.png">
  <router-view/>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0 20%;
}

.btnMargin {
  margin-top: 2rem;
}

.cell {
  margin: 2px 0;
  display: inline-block;
}

.cellTitle {
  width: 120px;
}

.cellInput {
  width: 200px;
}

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
