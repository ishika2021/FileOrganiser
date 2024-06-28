<template>
  <div :id="name" class="svg-icon"></div>
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

  mounted() {
    this.svgLoader();
  },
  methods: {
    svgLoader() {
      fetch(`icons/${this.name}.svg`)
        .then((response) => response.text())
        .then((svg) => {
          document.getElementById(this.name).innerHTML = svg;
          const pathElements = document.querySelectorAll(
            `#${this.name} svg path`
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
    },
  },

  watch: {
    color() {
      this.svgLoader();
    },
  },
};
</script>
