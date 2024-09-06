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
    svgLoader() {
      if (this.name) {
        fetch(`icons/${this.name}.svg`)
          .then((response) => response.text())
          .then((svg) => {
            const ele = document.querySelector(`#${this.uniqueID}`);
            ele.innerHTML = svg;
            const pathElements = document.querySelectorAll(
              `#${this.uniqueID} svg path`
            );
            if (this.color) {
              if (pathElements.length > 1) {
                pathElements.forEach((ele) => {
                  ele.setAttribute("fill", this.color);
                });
              } else {
                pathElements[0].setAttribute("fill", this.color);
              }
            }
          });
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
