<template>
  <div class="login">
    <form class="login__form">
      <div class="login__field">
        <label class="login__label" for="username">Username</label>
        <input class="login__input" name="username" type="text">
      </div>
      <div class="login__field">
        <label class="login__label" for="password">Password</label>
        <input class="login__input" name="password" type="password">
      </div>
      <button class="login__button button">Login</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
};
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);
    
  &__form {
    display: flex;
    flex-direction: column;
    padding: 30px;
    min-width: 250px;

    background: var(--color-form);
    border-radius: 10px;
  }

  &__field {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    margin-top: 10px;

    @media (min-width: 768px) {
      flex-direction: row;
    }
  }

  &__label {
    display: inline-block;

    font-size: 1.2rem;
    font-weight: bold;
  }

  &__input {
    width: 100%;
    height: 30px;
    margin-top: 10px;
    padding: 5px;

    border-radius: 5px;

    @media (min-width: 768px) {
      margin-top: 0;
      width: 60%;

      border-radius: 0;
    }
  }

  &__button {
    display: inline-block;
    margin-top: 30px;
    padding: 10px;

    background-color: var(--color-rare);
    border-radius: 10px;

    font-weight: bold;
    color: var(--color-main);
    letter-spacing: 0.05em;

    transition: background-color .3s ease;

    &:hover {
      background-color: var(--color-accent);
    }
  }
}
</style>