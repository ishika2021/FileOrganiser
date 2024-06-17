import { nextTick } from "vue";
export default {
  mounted(el, binding) {
    let isSelecting = false;
    let selectionSquare = null;
    let initialClickX = null;
    let initialClickY = null;
    let selectableElements = [];

    const updateSelectableElements = () => {
      nextTick(() => {
        selectableElements = el.querySelectorAll(".selectable");
      });
    };

    updateSelectableElements();

    const getSelectedItems = binding.value.getSelectedItems;

    const checkSelectedArea = (selectedArea) => {
      const { left, top, right, bottom } = selectedArea.getBoundingClientRect();
      const selectedItemID = [];
      selectableElements.forEach((selectable) => {
        const {
          left: elLeft,
          top: elTop,
          right: elRight,
          bottom: elBottom,
        } = selectable.getBoundingClientRect();
        if (
          elRight > left &&
          elBottom > top &&
          elLeft < right &&
          elTop < bottom
        ) {
          const itemID = selectable.dataset.id;
          selectable.classList.add("selected");
          if (itemID) {
            selectedItemID.push(itemID);
          }
        } else {
          selectable.classList.remove("selected");
        }
      });
      getSelectedItems(selectedItemID);
    };

    const createSelectionSquare = (x, y) => {
      const div = document.createElement("div");
      div.classList.add("drag-select");
      div.style.left = x + "px";
      div.style.top = y + "px";
      div.style.width = "0";
      div.style.height = "0";
      document.body.append(div);
      return div;
    };

    const handleMouseDown = (event) => {
      isSelecting = true;
      initialClickX = event.pageX;
      initialClickY = event.pageY;
      selectionSquare = createSelectionSquare(initialClickX, initialClickY);
      selectableElements.forEach((item) => item.classList.remove("selected"));
    };

    const handleMouseMove = (event) => {
      if (!isSelecting) return;
      const currentX = event.pageX;
      const currentY = event.pageY;
      const diffX = currentX - initialClickX;
      const diffY = currentY - initialClickY;
      selectionSquare.style.left =
        diffX < 0 ? currentX + "px" : initialClickX + "px";
      selectionSquare.style.top =
        diffY < 0 ? currentY + "px" : initialClickY + "px";
      selectionSquare.style.width = Math.abs(diffX) + "px";
      selectionSquare.style.height = Math.abs(diffY) + "px";
      checkSelectedArea(selectionSquare);
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        isSelecting = false;
        selectionSquare.remove();
      }
    };

    binding.instance.$watch("currentFolderList", () => {
      updateSelectableElements();
    });

    el.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    el.cleanup = () => {
      el.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  },
  unmounted(el) {
    el.cleanup();
  },
};
