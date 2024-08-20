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
      <div class="project-name">Local Drop</div>
    </header>
    <section>
      <MenuItem
        v-for="(item, index) in menu"
        :icon="item.icon"
        :key="index"
        :label="item.title"
        :isActive="activeMenuTitle === item.title ? true : false"
        :isAllowed="item.isAllowed"
        @click="handleMenuItem(item)"
      />
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
          isAllowed: false,
        },
        {
          title: "Folders",
          label: "folders",
          icon: "folder",
          isAllowed: true,
        },
        {
          title: "Recent",
          label: "recent",
          icon: "recent",
          isAllowed: false,
        },
        {
          title: "Starred",
          label: "starred",
          icon: "starred",
          isAllowed: false,
        },
        {
          title: "Trash",
          label: "trash",
          icon: "trash",
          isAllowed: false,
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
      if (item.label !== "folders") {
        title += item.label;
      }
      this.$router.push(title);
    },
  },
};
</script>
