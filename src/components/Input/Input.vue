<template>
  <div
    class="input-box"
    :contenteditable="isEdit"
    :class="isEdit ? 'edit-input' : ''"
    @keydown="handleKeydown"
    :innerHTML="isEdit ? modelValue : value"
    ref="focusRenameInput"
  ></div>
</template>

<script>
import { nextTick } from "vue";
export default {
  name: "Input",
  props: {
    isEdit: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: String,
      default: "Test",
    },
    fileExtension: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      value: this.truncateText(this.modelValue),
    };
  },
  methods: {
    handleKeydown(e) {
      if (e.key === "Enter") {
        // default behaviour of enter adds a new line
        e.preventDefault();
        this.handleInput();
      }
    },
    handleInput() {
      let inputName = this.$refs.focusRenameInput.innerHTML;
      if (inputName.length > 0) {
        if (this.fileExtension.length) {
          const extension = inputName.split(".")[1];
          if (extension !== this.fileExtension) {
            inputName = inputName.split(".")[0] + "." + this.fileExtension;
          }
        }
        this.value = this.truncateText(inputName);
        this.$emit("update:modelValue", inputName);
      }
    },
    truncateText(text) {
      if (text.length > 15) {
        return text.substr(0, 15) + "\u2026";
      }
      return text;
    },
    selectText() {
      // highlights text on edit
      const el = this.$refs.focusRenameInput;
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
      }
    },
  },
  watch: {
    modelValue(val) {
      this.value = this.truncateText(val);
    },
    isEdit: {
      immediate: true,
      handler: function () {
        nextTick(() => {
          if (this.$refs.focusRenameInput) {
            this.$refs.focusRenameInput.focus();
            this.selectText();
          }
        });
      },
    },
  },
};
</script>
