import imagemin from "imagemin";
import imageminSvgo from "imagemin-svgo";
import path from "path";

// Exclude the svgs that needs to be responsive
const excludedFiles = [
  "docx.svg",
  "excel.svg",
  "folder-full.svg",
  "pdf.svg",
  "text.svg",
];
const outputDir = "dist/icons";

(async () => {
  // Gathers all svgs from the public/icons directory
  const allFiles = await imagemin(["public/icons/**/*.svg"], {
    destination: outputDir,
    plugins: [],
  });

  // Filters out excluded ones
  const filteredFiles = allFiles.filter((file) => {
    const fileName = path.basename(file.sourcePath);
    return !excludedFiles.includes(fileName);
  });

  await imagemin(
    filteredFiles.map((f) => f.sourcePath),
    {
      destination: outputDir,
      plugins: [
        imageminSvgo({
          plugins: [
            { name: "removeViewBox", active: false },
            { name: "removeEmptyAttrs", active: true },
          ],
        }),
      ],
    }
  );
})();
