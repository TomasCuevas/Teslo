import { Slide } from "react-slideshow-image";

//* styles
import Styles from "./ProductSlideshow.module.css";
import "react-slideshow-image/dist/styles.css";

interface Props {
  images: string[];
}

export const ProductSlideshow: React.FC<Props> = ({ images }) => {
  return (
    <Slide easing="ease" duration={7000} indicators>
      {images.map((image) => {
        const url = image;

        return (
          <div className={Styles["each-slide-effect"]} key={image}>
            <div
              style={{
                backgroundImage: `url(${url})`,
                backgroundSize: "cover",
              }}
            />
          </div>
        );
      })}
    </Slide>
  );
};
