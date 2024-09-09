<template>
  <main class="sidebar">
    <header>
      <div class="logo">
        <img
          :src="logo"
          alt="project-logo"
          height="100%"
          width="100%"
          loading="lazy"
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
import MenuItem from "@/components/MenuItem";
import logo from "@/assets/logo.png";
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
      logo,
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
