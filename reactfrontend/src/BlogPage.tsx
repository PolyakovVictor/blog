import React from 'react';
import axios from 'axios';
import { Product } from './components/product';


class BlogPage extends React.Component{
  state = { details: [], }


  componentDidMount(): void {
      let data;
      axios.get('http://localhost:8000/api/post/')
      .then(res => {
        data = res.data;
        this.setState({
          details: data
        });
      })
      .catch(err => {
        console.log(err);
      })
  }
  render() {
    return (
      <div>
      {this.state.details.map((output, id) => (
        <div className="container mx-auto max-w-3xl pt-5" key={id}>
          <Product key={id} product={output}></Product>
        </div>
      ))}
    </div>
    );
  }
}
export default BlogPage;
