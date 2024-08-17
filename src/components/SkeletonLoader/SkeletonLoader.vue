<template>
  <div class="skeleton-loader">
    <div class="sidebar">
      <v-skeleton-loader
        boilerplate
        type="heading"
        class="project-title"
      ></v-skeleton-loader>
      <div class="side-menu">
        <v-skeleton-loader
          boilerplate
          type="list-item-avatar"
          v-for="i in 5"
          :key="i"
        >
        </v-skeleton-loader>
      </div>
    </div>

    <div class="content-wrapper">
      <v-skeleton-loader type="heading" class="header-skeleton">
        <v-skeleton-loader
          boilerplate
          type="chip"
          class="search"
        ></v-skeleton-loader>
        <v-skeleton-loader boilerplate type="heading" class="sub-header">
          <v-skeleton-loader
            boilerplate
            type="subtitle"
            class="breadcrumb"
          ></v-skeleton-loader>
          <div class="menu-items">
            <v-skeleton-loader
              type="button"
              v-for="i in 3"
              :key="i"
              class="button"
            ></v-skeleton-loader>
          </div>
        </v-skeleton-loader>
      </v-skeleton-loader>
      <div class="item-container">
        <v-skeleton-loader
          type="card"
          v-for="i in 8"
          :key="i"
          class="folder"
        ></v-skeleton-loader>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SkeletonLoader",
};
</script>
