import axios from "axios";
import { scrapeGoogleResults } from "../scraping/plant-species.js";
import { scrapePlantDisease } from "../scraping/plant_diseases.js";

export const aiScan = async (req, res) => {
  const { image_url } = req.body;

  let predictions = null;

  try {
    const response = await axios.post("http://127.0.0.1:5000/identify", {
      image_url,
    });

    predictions = response.data;

    if (predictions.plant_species) {
      const speciesData = await scrapeGoogleResults(
        predictions.plant_species.Species
      );
      predictions.plant_species = {
        ...predictions.plant_species,
        ...speciesData,
      };
    }

    let diseasesData = [];
    if (predictions?.plant_disease?.length > 0) {
      const diseaseDataPromises = predictions.plant_disease.map(
        async (disease) => {
          let plantName = disease.class.split(" ")[0].trim();

          if (plantName.toLowerCase().includes("raspberry")) {
            plantName = "Caneberries";
          } else if (plantName.toLowerCase().includes("squash")) {
            plantName = "Cucurbits";
          }

          let diseaseName = disease.class.split(" ").slice(1).join(" ").trim();

          if (diseaseName.toLowerCase().includes("powdery")) {
            diseaseName = "Powdery Mildew";
          } else if (diseaseName.toLowerCase().includes("rust")) {
            diseaseName = "Rust";
          } else if (diseaseName.toLowerCase().includes("scab")) {
            diseaseName = "Scab";
          } else if (diseaseName.toLowerCase().includes("early")) {
            diseaseName = "Early Blight";
          } else if (diseaseName.toLowerCase().includes("late")) {
            diseaseName = "Late Blight";
          } else if (diseaseName === "leaf") {
            return { disease, diseaseData: null };
          }

          const diseaseData = await scrapePlantDisease(plantName, diseaseName);
          return { disease, diseaseData };
        }
      );

      diseasesData = await Promise.all(diseaseDataPromises);

      diseasesData = diseasesData.filter((diseaseData) => diseaseData !== null);

      predictions.plant_disease = {
        ...predictions.plant_disease,
        diseasesData,
      };
    }
    res.status(200).json({ predictions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
