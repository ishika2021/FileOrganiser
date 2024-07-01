<template>
  <div :id="uniqueID" class="svg-icon"></div>
</template>

<script>
export default {
  name: "Icon",
  props: {
    name: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      uniqueID: `icon-${Math.random().toString(36).substring(2, 9)}`,
    };
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
  },
};
</script>
