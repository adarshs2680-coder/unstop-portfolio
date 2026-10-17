import fs from "fs";
import path from "path";
import https from "https";

const postersDir = path.resolve(process.cwd(), "public", "posters");
if (!fs.existsSync(postersDir)) {
  fs.mkdirSync(postersDir, { recursive: true });
}

const posters = [
  { id: 3, fileId: "12hvYBC54ShmQXqyByErh8hoV7AHmRlGP" },
  { id: 4, fileId: "1STdWE3d9ddC8JBCwIAvvyIlAXWaEDckm" },
  { id: 5, fileId: "11HHicMFitHzKk7Wv290HdEz4EDFO8fP9" },
  { id: 6, fileId: "1rsQ_1z9Ld0QCqplWKgiQmMN7rIBSAXff" },
  { id: 7, fileId: "18Ie8lJiOTfTd3AbBnk6zDPx4ompkV0PZ" },
  { id: 8, fileId: "1AX4hhjNVtENFbwPAgXP3kpX09EVRd6sS" },
  { id: 9, fileId: "1xVHbFKtgTjVAVFeah727j8ZBg48fYk2B" },
  { id: 10, fileId: "1SU1PhbKm1KvX1Aj38RlgX1vNNhJ2I2N3" },
  { id: 11, fileId: "1nF0O8WcqOHh-zXlOevvf3EePj5_M5FkI" },
  { id: 12, fileId: "1uV-RmmNiVhLOVi6KlKYLQOodQ2AWHSk_" },
  { id: 13, fileId: "1fQhoVhIeicCVJd7H9kawGDwhS85jrYPI" },
  { id: 14, fileId: "1CMN6QNPJFgUfmKPerSIybjUppaPcb_H5" },
  { id: 15, fileId: "1GtJXsoIM5p53fkcjQhCmFK3SoluHRH8w" },
  { id: 16, fileId: "1US3HZHDVJEHOQTv0_WPTNpLymrrYFRVk" },
];

function downloadFile(fileId) {
  return new Promise((resolve, reject) => {
    const dest = path.join(postersDir, `${fileId}.jpg`);
    if (fs.existsSync(dest) && fs.statSync(dest).size > 1000) {
      console.log(`Already cached: ${fileId}.jpg`);
      return resolve();
    }

    const url = `https://lh3.googleusercontent.com/d/${fileId}=w800`;
    const file = fs.createWriteStream(dest);

    https
      .get(url, (res) => {
        if (res.statusCode === 302 || res.statusCode === 301) {
          https
            .get(res.headers.location, (redirectRes) => {
              redirectRes.pipe(file);
              file.on("finish", () => {
                file.close();
                console.log(`Downloaded: ${fileId}.jpg (${fs.statSync(dest).size} bytes)`);
                resolve();
              });
            })
            .on("error", (err) => {
              fs.unlink(dest, () => {});
              reject(err);
            });
        } else if (res.statusCode === 200) {
          res.pipe(file);
          file.on("finish", () => {
            file.close();
            console.log(`Downloaded: ${fileId}.jpg (${fs.statSync(dest).size} bytes)`);
            resolve();
          });
        } else {
          fs.unlink(dest, () => {});
          reject(new Error(`Failed with status ${res.statusCode}`));
        }
      })
      .on("error", (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
  });
}

async function main() {
  console.log("Caching posters locally to public/posters/...");
  for (const item of posters) {
    try {
      await downloadFile(item.fileId);
    } catch (e) {
      console.error(`Error downloading ${item.fileId}:`, e.message);
    }
  }
  console.log("Finished caching posters!");
}

main();

