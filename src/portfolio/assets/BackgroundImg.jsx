import React, { useMemo, useState } from "react";
import artApiService from "../../services/artApiService";

const BackgroundImg = (props) => {
  const [backgroundImage, setBackgroundImage] = useState();

  const onSearchObjectsWin = (response) => {
    const filterForImages = async (objectIds, outputArraySize) => {
      const promises = [];
      for (let i = 0; i < outputArraySize; i++) {
        promises.push(
          artApiService
            .getObject(props.getRandomObject(objectIds))
            .then((response) => {
              return response;
            })
        );
      }
      const objects = await Promise.all(promises);
      const outputArray = objects?.filter((object) => object.primaryImage);
      console.log("Output array", outputArray);
      const firstImage = props.getRandomObject(outputArray);
      setBackgroundImage(() => {
        const newBackgroundImage = firstImage.primaryImage;
        return newBackgroundImage;
      });
      props.setImageInfo(firstImage);
      props.setImageArray(outputArray);

      return outputArray;
    };

    filterForImages(response.objectIDs, 8);
    // Not scalable. More than ten gets slow. Investigate more efficent filltering method, be mildly irritated.
    // Get 5 images, start at first index, refactor so that it grabs next five images in background on fourth index
  };
  useMemo(() => {
    console.log("!!", props);
    artApiService.searchObjects("Landscape").then(onSearchObjectsWin);
  }, []);

  const backgroundStyle = {
    pointerEvents: "none",
    position: "absolute",
    objectFit: "cover",
    objectPosition: "center",
    width: "100%",
    height: "100%",
    zIndex: -1,
  };
  return <img style={backgroundStyle} src={backgroundImage}></img>;
};

export default BackgroundImg;