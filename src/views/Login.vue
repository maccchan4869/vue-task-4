<template>
  <div class="login">
    <h1>ログイン画面</h1>
    <div>
      <div class="cell cellTitle">メールアドレス</div>
      <div class="cell cellInput"><input type="text" placeholder="E-mail"></div>
    </div>
    <div>
      <div class="cell cellTitle">パスワード</div>
      <div class="cell cellInput"><input type="password" placeholder="Password"></div>
    </div>
    <input type="button" class="btn btn-outline-primary btnMargin" value="ログイン">
    <p><router-link to="/register">新規登録はこちら</router-link></p>
  </div>
</template>