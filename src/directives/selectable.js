import { nextTick } from "vue";
export default {
  mounted(el, binding) {
    let isSelecting = false;
    let selectionArea = null;
    let startX = null;
    let startY = null;
    let selectables = [];

    const updateSelectables = () => {
      nextTick(() => {
        selectables = el.querySelectorAll(".selectable");
      });
    };

    updateSelectables();

    const onSelectedChange = binding.value.onSelectedChange;

    const checkSelected = (selectedArea) => {
      const { left, top, right, bottom } = selectedArea.getBoundingClientRect();
      const selectedFolderIds = [];
      selectables.forEach((selectable) => {
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
          const folderId = selectable.dataset.id;
          selectable.classList.add("selected");
          if (folderId) {
            selectedFolderIds.push(folderId);
          }
        } else {
          selectable.classList.remove("selected");
        }
      });
      onSelectedChange(selectedFolderIds);
    };

    const createSelectionArea = (x, y) => {
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
      startX = event.pageX;
      startY = event.pageY;
      selectionArea = createSelectionArea(startX, startY);
      selectables.forEach((item) => item.classList.remove("selected"));
    };

    const handleMouseMove = (event) => {
      if (!isSelecting) return;
      const currentX = event.pageX;
      const currentY = event.pageY;
      const diffX = currentX - startX;
      const diffY = currentY - startY;
      selectionArea.style.left = diffX < 0 ? currentX + "px" : startX + "px";
      selectionArea.style.top = diffY < 0 ? currentY + "px" : startY + "px";
      selectionArea.style.width = Math.abs(diffX) + "px";
      selectionArea.style.height = Math.abs(diffY) + "px";
      checkSelected(selectionArea);
    };

    const handleMouseUp = () => {
      if (isSelecting) {
        isSelecting = false;
        selectionArea.remove();
      }
    };

    binding.instance.$watch("currentFolderList", () => {
      updateSelectables();
    });

    el.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    el._cleanup = () => {
      el.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  },
  unmounted(el) {
    el._cleanup();
  },
};
