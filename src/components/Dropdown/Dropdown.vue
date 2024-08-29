<template>
  <div v-if="visible">
    <v-menu location="bottom">
      <template v-slot:activator="{ props }">
        <Button
          :icon="button.icon"
          :label="button.label"
          :hasList="button.hasList"
          :type="button.type"
          :size="iconSize || button.size"
          v-bind="props"
        />
      </template>
      <v-list v-if="menu.length">
        <v-list-item v-for="menuItem in menu" :key="menuItem.icon">
          <v-list-item-title>
            <component :is="menuItem.component" v-bind="menuItem.props">
              {{ menuItem.text }}
            </component>
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
import Button from "@/components/Button";
import { mapGetters } from "vuex";
export default {
  name: "Dropdown",
  components: {
    Button,
  },
  props: {
    button: {
      type: Object,
      required: true,
      default: () => {},
    },
    menu: {
      type: Object,
      required: true,
      default: () => {},
    },
    visible: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    ...mapGetters({
      screenSize: "display/screenSize",
    }),
    iconSize() {
      if (this.screenSize === "medium" || this.screenSize === "small") {
        return "small";
      }
      return "";
    },
  },
};
</script>
