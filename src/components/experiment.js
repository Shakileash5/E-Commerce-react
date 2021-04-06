import React, { Component } from 'react';
import ScrollMenu from 'react-horizontal-scrolling-menu';
import './exper.css';
import Typography from '@material-ui/core/Typography';

// list of items
const list = [
  { name: 'item1' },
  { name: 'item2' },
  { name: 'item3' },
  { name: 'item4' },
  { name: 'item5' },
  { name: 'item6' },
  { name: 'item7' },
  { name: 'item8' },
  { name: 'item9' },
  { name: 'item10' },
  { name: 'item11' },
  { name: 'item12' },
  { name: 'item13' }
];

const colorList = [
    "#D5FBFC",
    "#FFF1E4",
    "#E3EEDF7",
    "#FCEEC7",
    "#B8D6F2",
    "#EEE5C6"
]

var colorIndex = 0;
// One item component
// selected prop will be passed
const MenuItem = ({text, selected}) => {
  return <div
    className={`menu-item ${selected ? 'active' : ''}`}
    >{text}</div>;
};

// All items component
// Important! add unique key
const Card = ({text,src,key,idx})=>{
    return(
        <div style={{padding:10,margin:8,borderRadius:5,borderWidth:1,backgroundColor:colorList[idx], boxShadow: '4px 3px 4px grey'}} key={key} >
            <img
            src={src}
            alt="Second slide"
            style={{height:150,width:200,borderRadius:5}}
            />    
            <Typography variant="h6" component="h6" style={{padding:5}} align="left">  
                {text}
            </Typography>
        </div>
    )
}
export const Menu = (list, selected) =>
  list.map(el => {
    const {name} = el;
    colorIndex = colorIndex+1;
    console.log(colorIndex,colorList.length)
    if(colorIndex>=colorList.length){
        colorIndex = 0;
    }    
    return <Card text={name} idx ={colorIndex} src={"https://preview.redd.it/ppawzo4o1sn51.png?width=440&format=png&auto=webp&s=d09c261013546996e8325d507ff230a7e9513793"} key={name} selected={selected} />;

  });


const Arrow = ({ text, className }) => {
  return (
    <div
      className={className}
    >{text}</div>
  );
};


const ArrowLeft = Arrow({ text: '<', className: 'arrow-prev' });
const ArrowRight = Arrow({ text: '>', className: 'arrow-next' });

const selected = 'item1';

export default class Exper extends Component {
  constructor(props) {
    super(props);
    // call it again if items count changes
    this.menuItems = Menu(list, selected);
  }

  state = {
    selected
  };

  onSelect = key => {
    this.setState({ selected: key });
  }


  render() {
    const { selected } = this.state;
    // Create menu from items
    const menu = this.menuItems;

    return (
      <div className="App" style={{marginBottom:25}}>
        <ScrollMenu
          data={menu}
          arrowLeft={ArrowLeft}
          arrowRight={ArrowRight}
          
        />
      </div>
    );
  }
}