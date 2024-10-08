import { ref, onMounted, onBeforeUnmount, watch, nextTick } from "vue";

export function useSelectable(
  getSelectedItems,
  currentFolder,
  actionMenuVisibility
) {
  const isSelecting = ref(false);
  let selectionSquare = null;
  let initialClickX = null;
  let initialClickY = null;
  let selectableElements = [];

  const updateSelectableElements = () => {
    actionMenuVisibility(false); //to make file action menu inactive on folder navigation
    nextTick(() => {
      const referencedElement = document.getElementById("mainContainer");
      selectableElements = referencedElement.querySelectorAll(".selectable");
    });
  };

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
      actionMenuVisibility(true);
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
    if (!isSelecting.value) {
      actionMenuVisibility(false); //makes actionMenu inactive when selection is removed
    }
    if (selectionSquare) {
      selectionSquare.remove();
    }
    isSelecting.value = true;
    initialClickX = event.pageX;
    initialClickY = event.pageY;
    selectionSquare = createSelectionSquare(initialClickX, initialClickY);
    selectableElements.forEach((item) => item.classList.remove("selected"));
  };

  const handleMouseMove = (event) => {
    if (!isSelecting.value) return;
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
    if (isSelecting.value) {
      isSelecting.value = false;
      selectionSquare.remove();
    } else {
      // to remove selected elements on clicking on menu option
      if (selectableElements.length) {
        selectableElements.forEach((selectable) => {
          selectable.classList.remove("selected");
        });
      }
    }
  };

  onMounted(() => {
    updateSelectableElements();
    const referencedElement = document.getElementById("mainContainer");

    referencedElement.addEventListener("mousedown", handleMouseDown);
    referencedElement.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  });

  onBeforeUnmount(() => {
    const referencedElement = document.getElementById("mainContainer");

    referencedElement.removeEventListener("mousedown", handleMouseDown);
    referencedElement.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  });

  watch(
    currentFolder,
    () => {
      updateSelectableElements();
    },
    { deep: true }
  );
}
