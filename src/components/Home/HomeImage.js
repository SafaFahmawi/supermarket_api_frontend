import media1 from "../../assets/uu.jpg";
import media2 from "../../assets/sup_electronic.jpeg";
import media3 from "../../assets/sup_food.jpeg";
import media4 from "../../assets/sup_hometools.jpeg";

export const media = [media1, media2, media3, media4];
export const mediaByIndex = index => media[index % media.length];