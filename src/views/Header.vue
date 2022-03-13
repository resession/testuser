<template>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand :to="{name: 'home'}">Dtest</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <!-- <b-nav-item href="#">Home</b-nav-item> -->
        <!-- <b-nav-item href="#" disabled>Disabled</b-nav-item> -->
        <b-nav-form>
          <b-form-input size="sm" placeholder="Search"></b-form-input>
          <b-button size="sm" type="submit">Search</b-button>
        </b-nav-form>
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <b-nav-item :to="{name: 'static'}" v-if="user">Static</b-nav-item>
        <b-nav-item :to="{name: 'deauth'}" v-if="user">Logout/Destroy</b-nav-item>
        <b-nav-item :to="{name: 'auth'}" v-else>Login/Create</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style>

</style>