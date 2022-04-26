<template>
  <div class="login">
    <form class="login__form">
      <div class="login__field">
        <label class="login__label" for="username">Username</label>
        <input class="login__input" name="username" type="text" />
      </div>
      <div class="login__field">
        <label class="login__label" for="password">Password</label>
        <input class="login__input" name="password" type="password" />
      </div>
      <button class="login__button button">Login</button>
    </form>
  </div>
</template>

<script></script>

<style lang="scss" scoped>
.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;

  &__form {
    display: flex;
    flex-direction: column;
    padding: 50px 30px 40px;
    min-width: 250px;

    background: var(--color-form);
    border-radius: var(--border-radius);
  }

  &__field {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;

    & + & {
      margin-top: 20px;
    }

    @media (min-width: 768px) {
      flex-direction: row;

      & + & {
        margin-top: 10px;
      }
    }
  }

  &__label {
    display: inline-block;

    font-size: 1.2rem;
    font-weight: bold;
  }

  &__input {
    width: 100%;
    padding: 5px 7px;
    margin-top: 10px;

    border-radius: calc(var(--border-radius) - 5px);

    text-align: center;

    @media (min-width: 768px) {
      width: 60%;

      text-align: left;
    }
  }

  &__button {
    margin-top: 30px;

    border-radius: calc(var(--border-radius) - 2px);
  }
}
</style>
