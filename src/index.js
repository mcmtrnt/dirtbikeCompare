/* 
Author: Trent McMillan
Title: Dirt bike comparison
Description: This app allows users to select dirt bikes and view their specs in a side by side comparison.
Technologies and techniques used: React, Flexbox, sortable table rows, regex, css hover, slick api for image carousel
*/

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CRF450X from './media/CRF450X.PNG';
import CRF250F from './media/CRF250F.PNG';
import CRF230F from './media/CRF230F.PNG';
import YZ450F from './media/2020YZ450F.PNG';
import YZ250F from './media/2020YZ250F.PNG';


function Product(props) {
      return (
        <div className="product" value={props.bike.title}>
            <div className="productImage">
                <img src={props.bike.img} alt={props.bike.model} />
            </div>
            <div className="productTitle">
                {props.bike.model}
            </div>
            <div className="productPrice">
                {props.bike.price}
            </div>   

            <div className="overlay" style={{display: props.bike.display2}}>
                <div className="overlayText"><data value={props.bike.id} onClick={props.selectProduct}>Compare</data></div>
            </div>

            <div className="overlay2" style={{display: props.bike.display1}}>
                <div className="overlayText2"><data value={props.bike.id} onClick={props.removeProduct}>Remove</data></div>
            </div>                   
        </div>
      );    
  }
  
  class ProductList extends React.Component {
    renderProduct(bike) {
      return <Product bike={bike}  selectProduct={(i) => this.props.selectProduct(i)} removeProduct={(id) => this.props.removeProduct(id)}/>;
    }
  
    render() {  
      return (
            <div className="product-row"> 
                {this.props.bikes.map((bike) =>                               
                    <span className="productCard" key={bike.index}>{this.renderProduct(bike)}</span>                                
                )}
            </div>
      );
    }
  }

  class Chart extends React.Component {

    render() {
        
        return(
            <div class="table-responsive" id="tableDiv">
            <table class="table" id="myTable"> 
                <thead>
                    <tr id="tableHeader">
                        <th>Model <data value="model" className="sorter" onClick={this.props.onSort}>▲▼</data></th>
                        <th>MSRP <data value="price" className="sorter" onClick={this.props.onSort}>▲▼</data></th>
                        <th>Weight <data value="weight" className="sorter" onClick={this.props.onSort}>▲▼</data></th>
                        <th>Front Tire <data value="fronttire" className="sorter" onClick={this.props.onSort}>▲▼</data></th>
                        <th>Rear Tire <data value="reartire" className="sorter" onClick={this.props.onSort}>▲▼</data></th>
                        <th>Seat Height <data value="seatheight" className="sorter" onClick={this.props.onSort}>▲▼</data></th>
                        <th>Wheelbase <data value="wheelbase" className="sorter" onClick={this.props.onSort}>▲▼</data></th>                
                    </tr>   
                </thead>             
                <tbody>
                    {this.props.selected.map((bike) =>                    
                        <tr key={bike.index}>
                            <td><span className="remove tooltip"><data value={bike.id} onClick={this.props.removeProduct}>X</data><span className="tooltiptext">Remove</span></span>{bike.year} {bike.make} {bike.model}</td>
                            <td>{bike.price}</td>
                            <td>{bike.weight}</td>
                            <td>{bike.fronttire}</td>
                            <td>{bike.reartire}</td>
                            <td>{bike.seatheight}</td>
                            <td>{bike.wheelbase}</td>
                        </tr>                    
                    )}
                </tbody>                
            </table>
            </div>
        );
    }
  }

  class Compare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bikes: [ //how to pull this in dynamically??
                {id: 1, year: '2020', make: 'Honda', model: 'CRF450X', price: '$9,799', img: CRF450X, display1: 'none', display2: 'flex', fronttire: '21', reartire: '18', weight: '275', seatheight: '37.4', wheelbase: '58.8'}, //display none or flex
                {id: 2, year: '2020', make: 'Honda', model: 'CRF250F', price: '$4,599', img: CRF250F, display1: 'none', display2: 'flex', fronttire: '21', reartire: '18', weight: '265', seatheight: '34.8', wheelbase: '55.9'},
                {id: 3, year: '2019', make: 'Honda', model: 'CRF230F', price: '$4,349', img: CRF230F, display1: 'none', display2: 'flex', fronttire: '21', reartire: '18', weight: '249', seatheight: '34.6', wheelbase: '54.1'},
                {id: 4, year: '2020', make: 'Yamaha', model: 'YZ450F', price: '$9,399', img: YZ450F, display1: 'none', display2: 'flex', fronttire: '21', reartire: '19', weight: '245', seatheight: '38', wheelbase: '58.3'},
                {id: 5, year: '2020', make: 'Yamaha', model: 'YZ250F', price: '$8,199', img: YZ250F, display1: 'none', display2: 'flex', fronttire: '21', reartire: '19', weight: '234', seatheight: '38.2', wheelbase: '58.1'},
            ],
            selected: [],            
        };
        this.selectProduct = this.selectProduct.bind(this); 
        this.resetButton = this.resetButton.bind(this); 
        this.removeProduct = this.removeProduct.bind(this);
    }

    selectProduct(i) {        
        let selectedId = i.target.value;
        let selectedBike = this.state.bikes[selectedId - 1];
        selectedBike.display1 = 'flex'; //does this need to be in a setstate?
        selectedBike.display2 = 'none';

        this.setState((prevState) => ({ 
            selected: prevState.selected.concat(selectedBike), 
        })); 
    }

    resetButton() {
        this.setState({ selected: [] }); 
        
        {this.state.bikes.map((bike) =>  
            bike.display1 = "none",
        )}

        {this.state.bikes.map((bike) =>  
            bike.display2 = "flex",                                  
        )}
    }

    removeProduct(id) {
        let removeID = id.target.value;

        let removeBike = this.state.bikes[removeID - 1];
        removeBike.display1 = 'none';
        removeBike.display2 = 'flex';

        this.setState((prevState) => ({ 
            selected: prevState.selected.filter(selected => selected.id !== Number(removeID)),
        })); 
    }

    onSort(event){
        let sortIndex = event.target.value.toLowerCase();
        sortIndex = sortIndex.replace(/\s/g, '');
        console.log(sortIndex);

        const data = this.state.selected;

        if (data[0] === data.sort((a,b) => a[sortIndex].localeCompare(b[sortIndex]))[0] && data[data.length - 1] === data.sort((a,b) => a[sortIndex].localeCompare(b[sortIndex]))[data.length - 1]) { //if already low to high, then sort high to low
            data.sort((a,b) => b[sortIndex].localeCompare(a[sortIndex]));
        } 
        else { //sort low to high
            data.sort((a,b) => a[sortIndex].localeCompare(b[sortIndex]));
        }

        
        this.setState({data});
      }
    

      renderProductList() {
          return <ProductList bikes={this.state.bikes} selectProduct={(i) => this.selectProduct(i)} removeProduct={(id) => this.removeProduct(id)}/> //do i need to pass selected to this?
      }

      renderChart() {
          return <Chart selected={this.state.selected} removeProduct={(id) => this.removeProduct(id)} onSort={(e) => this.onSort(e)}/>
      }

      render() {
          return(
              <div className="compare">                  
                  {this.renderProductList()}
                  <div className="clear-btn" role="button" onClick={() => this.resetButton()}>Clear</div>
                  {this.renderChart()}
              </div>                
          );
      }
  }

  
  // ========================================
  
  ReactDOM.render(
    // <ProductList />,
    // <Chart />,
    <Compare />,
    document.getElementById('root')
  );
  
  