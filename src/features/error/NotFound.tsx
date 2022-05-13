import { PureComponent, ReactNode } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends PureComponent{
    render(): ReactNode {
        return(
            <div className="container">
            <h3 style={{
                paddingBottom: 20
            }}>
                Oops, we could not find what you are looking for</h3>
                <hr/>
                <button style={{
                    width:'100%'
                }}>
                    <Link
                    to='/'
                    style={{
                        textDecoration:'none',
                        padding:'0 20px 0 20px'
                    }}
                    >
                         Go back to the store
                    </Link>
                   
                    </button>
        </div>
        )
    }
}