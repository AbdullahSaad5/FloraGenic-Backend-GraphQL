import axios from "axios";
import { scrapeGoogleResults } from "../scraping/plant-species.js";
import { scrapePlantDisease } from "../scraping/plant_diseases.js";

export const aiScan = async (req, res) => {
  const { image_url } = req.body;

  let predictions = null;

  const EC2_URL = "http://44.201.73.106:8080";

  try {
    const response = await axios.post(`${EC2_URL}/identify`, {
      image_url,
    });

    predictions = response.data;

    if (predictions.plant_species) {
      try {
        const speciesData = await scrapeGoogleResults(
          predictions.plant_species.Species
        );
        predictions.plant_species = {
          ...predictions.plant_species,
          ...speciesData,
        };
      } catch (err) {
        console.log(err);
      }
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
      try {
        diseasesData = await Promise.all(diseaseDataPromises);
      } catch (err) {
        console.log(err);
      }

      predictions.plant_disease = predictions.plant_disease.map(
        (disease, index) => {
          return {
            ...disease,
            diseaseData: diseasesData[index].diseaseData,
          };
        }
      );
    }
    res.status(200).json({ predictions });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
