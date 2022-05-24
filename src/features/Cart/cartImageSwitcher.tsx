import { Component, ReactNode } from "react";
import { SlideShow } from "../../app/util/util";
import { ReactComponent as ArrowIcon } from "../../images/arrowRbg.svg";



type CartState = {
    slideArr: number[];
  };

  interface Props{
    cartLength: number;
    gallery: string[];
    index:number;
  }
class CartImageSwitcher extends Component<Props, CartState>{
    state: CartState = {
        slideArr: new Array(this.props.cartLength).fill(0),
      };

      setImage(
        galleryLength: number,
        slideNum: number,
        index: number,
        slide: number[]
      ) {
        const newSlide = SlideShow(galleryLength, slideNum, index, slide);
    
        this.setState({ slideArr: newSlide });
      }
    
    render(): ReactNode {

     const {gallery, index} = this.props;
     const {slideArr} = this.state;
        return(
            <div className="cartImageDiv">
                      <div
                        className="cartImage"
                        style={{
                          backgroundImage: `url(${
                            gallery[slideArr[index]]
                          })`,
                        }}
                      >
                        <div className="cartImageArrows">
                          <ArrowIcon
                            className="prev arrowIcon"
                            onClick={() => {
                              this.setImage(
                                gallery.length,
                                -1,
                                index,
                                slideArr
                              );
                            }}
                          />
                          <ArrowIcon
                            className="arrowIcon"
                            onClick={() => {
                              this.setImage(
                                gallery.length,
                                1,
                                index,
                                slideArr
                              );
                            }}
                          />
                        </div>
                      </div>
                    </div>
        )
    }
}

export default CartImageSwitcher;