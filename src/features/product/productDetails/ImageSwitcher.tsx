import { Component, DOMAttributes, ReactNode } from "react";

type ImageState = {
  
    imageIndex: number,
  };

interface Props extends DOMAttributes<HTMLImageElement>{
     value:string;
     index: number;
     imageIndex: number;
  }
class ImageSwitcher extends Component<Props, ImageState>{

    state: ImageState={
        imageIndex : 0
    }
    render(): ReactNode {
       // const { imageIndex } = this.state;

       
        const{value, index , imageIndex , onClick} = this.props;
        return(
            <img
            className="miniImagesItem"
            alt="product-mini"
            key={index}
            src={value}
            onClick={onClick}
            style={{
              border: `${
                imageIndex === index
                  ? "3px solid #5ece7b"
                  : ""
              }`,
            }}
          />
        )
    }
}

export default ImageSwitcher;

 /*<img
                          className="miniImagesItem"
                          key={index}
                          alt="product-mini"
                          src={value}
                          onClick={() => {
                            this.setState({ imageIndex: index });
                          }}
                          style={{
                            border: `${
                              imageIndex === index
                                ? "3px solid #5ece7b"
                                : "none"
                            }`,
                          }}
                        />*/