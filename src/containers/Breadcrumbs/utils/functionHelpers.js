const getUpdatedBreadcrumbs = (allBreadcrumbs, clickedBreadcrumb, view) => {
  let titleIndex = 0;
  allBreadcrumbs.map((item, index) => {
    //get index of clicked breadcrumb
    if (item.id === clickedBreadcrumb.id) {
      titleIndex = index;
    }
  });

  const updatedBreadcrumbs = [...allBreadcrumbs];
  updatedBreadcrumbs.splice(titleIndex + 1); //removes all breadcrumbs after the clicked one

  const nextCurrentFolderID =
    updatedBreadcrumbs[updatedBreadcrumbs.length - 1].id;
  const payload = {
    page: view.toLowerCase(),
    breadcrumb: updatedBreadcrumbs,
  };

  return { nextCurrentFolderID, payload };
};

export default getUpdatedBreadcrumbs;
