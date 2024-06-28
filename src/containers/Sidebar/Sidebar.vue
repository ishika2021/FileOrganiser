<template>
  <main class="sidebar">
    <header>
      <div class="logo">
        <img
          :src="require(`../../assets/logo.png`)"
          alt="project-logo"
          height="100%"
          width="100%"
        />
      </div>
      <div class="project-name">Project Name</div>
    </header>
    <section>
      <MenuItem
        v-for="(item, index) in menu"
        :icon="item.icon"
        :key="index"
        :label="item.title"
        :isActive="activeMenuTitle === item.title ? true : false"
        @click="handleMenuItem(item)"
      />p
    </section>
  </main>
</template>

<script>
import MenuItem from "../../components/MenuItem/MenuItem.vue";
export default {
  name: "Sidebar",
  components: {
    MenuItem,
  },
  data() {
    return {
      menu: [
        {
          title: "Dashboard",
          label: "dashboard",
          icon: "dashboard",
        },
        {
          title: "Folders",
          label: "folders",
          icon: "folder",
        },
        {
          title: "Recent",
          label: "recent",
          icon: "recent",
        },
        {
          title: "Starred",
          label: "starred",
          icon: "starred",
        },
        {
          title: "Trash",
          label: "trash",
          icon: "trash",
        },
      ],
    };
  },
  computed: {
    activeMenuTitle() {
      return this.$route.name;
    },
  },
  methods: {
    handleMenuItem(item) {
      let title = "/";
      if (item.label !== "dashboard") {
        title += item.label;
      }
      this.$router.push(title);
    },
  },
};
</script>
