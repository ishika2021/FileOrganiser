<template>
  <Tooltip v-if="showTooltip">
    <div :id="uniqueID" class="svg-icon"></div>
    <template #tooltip-content>
      {{ tooltip }}
    </template>
  </Tooltip>
  <div v-else :id="uniqueID" class="svg-icon"></div>
</template>

<script>
import Tooltip from "@/components/Tooltip";
export default {
  name: "Icon",
  components: {
    Tooltip,
  },
  props: {
    name: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: "",
    },
    tooltip: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      uniqueID: `icon-${Math.random().toString(36).substring(2, 9)}`,
      svgCache: {},
    };
  },
  computed: {
    showTooltip() {
      return this.tooltip;
    },
  },
  mounted() {
    this.svgLoader();
  },
  methods: {
    async svgLoader() {
      if (this.name) {
        if (this.svgCache[this.name]) {
          this.insertSVG(this.svgCache[this.name]);
        } else if (localStorage.getItem(this.name)) {
          const svg = localStorage.getItem(this.name);
          this.svgCache[this.name] = svg;
          this.insertSVG(svg);
        } else {
          try {
            const response = await fetch(`icons/${this.name}.svg`, {
              cache: "default",
            });
            const svg = await response.text();
            this.svgCache[this.name] = svg;
            localStorage.setItem(this.name, svg);
            this.insertSVG(svg);
          } catch (e) {
            console.error("Error loading svg:", e);
          }
        }
      }
    },
    insertSVG(svg) {
      const ele = document.querySelector(`#${this.uniqueID}`);
      ele.innerHTML = svg;
      const pathElements = ele.querySelectorAll("svg path");
      if (this.color) {
        pathElements.forEach((path) => path.setAttribute("fill", this.color));
      }
    },
  },

  watch: {
    color() {
      this.svgLoader();
    },
    name() {
      this.svgLoader();
    },
  },
};
</script>
